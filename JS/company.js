import companies from "../DATA/companyLoader.js";

import {
    db,
    collection,
    addDoc
} from "../firebase.js";

const companyName =
    (localStorage.getItem("company") || "Google")
        .trim()
        .toLowerCase();

const company = companies[companyName];

document.getElementById("companyTitle").innerText =
`${companyName.charAt(0).toUpperCase() + companyName.slice(1)} Interview Preparation`;

const output = document.getElementById("output");
const generateBtn = document.getElementById("generate");
const practiceBtn = document.getElementById("practiceBtn");
const backBtn = document.getElementById("backBtn");
const printBtn = document.getElementById("printBtn");
const saveBtn = document.getElementById("saveBtn");
const pdfBtn = document.getElementById("pdfBtn");
const STORAGE_KEY = `company_interview_${companyName}`;

const lastCompany = localStorage.getItem("lastCompany");

if (lastCompany) {

    console.log(`Last practiced company: ${lastCompany}`);

}

backBtn.onclick = () => {

    window.location.assign("dashboard.html");

};

practiceBtn.disabled = true;

practiceBtn.onclick = () => {
    window.location.assign("practice.html");
};

function buildSection(title, difficulty, questions) {
    return `
        <div class="section">
            <div class="section-header">
                <h2>${title}</h2>
                <span class="difficulty ${difficulty}">${difficulty}</span>
            </div>
            <ul>
                ${questions.map((q, index) => `
                    <li>
                        <span class="number">${index + 1}</span>
                        <span class="question-text">${q}</span>
                    </li>
                `).join("")}
            </ul>
        </div>
    `;
}

function renderInterview(interview, generatedTime) {
    const html = `
        ${buildSection("Technical Questions", "hard", interview.technical)}
        ${buildSection("HR Questions", "medium", interview.hr)}
        ${buildSection("Coding Questions", "hard", interview.coding)}
        ${buildSection("Interview Tips", "easy", interview.tips)}
    `;

    output.innerHTML = html;
    document.getElementById("technicalCount").textContent = interview.technical.length;
    document.getElementById("hrCount").textContent = interview.hr.length;
    document.getElementById("codingCount").textContent = interview.coding.length;
    document.getElementById("tipsCount").textContent = interview.tips.length;
    document.getElementById("generatedTime").textContent = generatedTime || `Generated on ${new Date().toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}`;
    practiceBtn.disabled = false;
}

function saveInterview(interview) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ interview, generatedTime: document.getElementById("generatedTime").textContent }));
}

function loadSavedInterview() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const { interview, generatedTime } = JSON.parse(saved);
            if (interview && interview.technical && interview.hr && interview.coding && interview.tips) {
                renderInterview(interview, generatedTime);
            }
        } catch (error) {
            console.error("Failed to restore saved interview:", error);
        }
    }
}

loadSavedInterview();

// Print/export/save handlers
if (printBtn) {
    printBtn.addEventListener("click", () => {
        const w = window.open('', '_blank');
        w.document.write(`<html><head><title>${company.company} - Practice</title>` +
            '<link rel="stylesheet" href="../CSS/company.css">' +
            '</head><body>' + output.innerHTML + '</body></html>');
        w.document.close();
        w.focus();
        w.print();
        // Optionally close after print
        // w.close();
    });
}

if (saveBtn) {
    saveBtn.addEventListener("click", () => {
        const blob = new Blob([output.innerHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${company.company.replace(/\s+/g, '_')}_practice.html`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });
}

if (pdfBtn) {
    pdfBtn.addEventListener("click", () => {
        // Open print dialog — user can choose "Save as PDF"
        const w = window.open('', '_blank');
        w.document.write(`<html><head><title>${company.company} - Practice (PDF)</title>` +
            '<link rel="stylesheet" href="../CSS/company.css">' +
            '</head><body>' + output.innerHTML + '</body></html>');
        w.document.close();
        w.focus();
        w.print();
    });
}

generateBtn.onclick = generateQuestions;

function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];

    }

    return copy;

}

function pick(array, count) {

    return shuffle(array).slice(0, count);

}

async function generateQuestions() {

    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    output.innerHTML = "";

    try {

        if (!company) {

            output.innerHTML = `

            <div class="error-card">

                <h2>Company Coming Soon</h2>

                <p>
                    Currently supported companies are:
                    Google,
                    Amazon,
                    Microsoft,
                    Adobe,
                    Meta,
                    Netflix,
                    Oracle,
                    Apple,
                    Accenture,
                    TCS,
                    Infosys.
                </p>

            </div>

            `;

            return;

        }

        const interview = {

            technical: pick(company.technical, 5),

            hr: pick(company.hr, 3),

            coding: pick(company.coding, 2),

            tips: pick(company.tips, 5)

        };

        document.getElementById("technicalCount").textContent =
            interview.technical.length;

        document.getElementById("hrCount").textContent =
            interview.hr.length;

        document.getElementById("codingCount").textContent =
            interview.coding.length;

        document.getElementById("tipsCount").textContent =
            interview.tips.length;

        let html = "";

        html += `

        <div class="section">

            <div class="section-header">

                <h2>Technical Questions</h2>

                <span class="difficulty hard">Hard</span>

            </div>

            <ul>

                ${interview.technical.map((q, index) => `

                    <li>

                        <span class="number">${index + 1}</span>

                        ${q}

                    </li>

                `).join("")}

            </ul>

        </div>

        `;

        html += `

        <div class="section">

            <div class="section-header">

                <h2>HR Questions</h2>

                <span class="difficulty medium">Medium</span>

            </div>

            <ul>

                ${interview.hr.map((q, index) => `

                    <li>

                        <span class="number">${index + 1}</span>

                        ${q}

                    </li>

                `).join("")}

            </ul>

        </div>

        `;

        html += `

        <div class="section">

            <div class="section-header">

                <h2>Coding Questions</h2>

                <span class="difficulty hard">Hard</span>

            </div>

            <ul>

                ${interview.coding.map((q, index) => `

                    <li>

                        <span class="number">${index + 1}</span>

                        ${q}

                    </li>

                `).join("")}

            </ul>

        </div>

        `;
                html += `

        <div class="section">

            <div class="section-header">

                <h2>Interview Tips</h2>

                <span class="difficulty easy">Easy</span>

            </div>

            <ul>

                ${interview.tips.map((q, index) => `

                    <li>

                        <span class="number">${index + 1}</span>

                        ${q}

                    </li>

                `).join("")}

            </ul>

        </div>

        `;

        output.innerHTML = html;

        const timeText = `Generated on ${new Date().toLocaleString("en-IN", {
            dateStyle: "long",
            timeStyle: "short"
        })}`;
        document.getElementById("generatedTime").textContent = timeText;
        practiceBtn.disabled = false;
        saveInterview(interview);

        // Save total practice sessions
        let sessions =
            Number(localStorage.getItem("sessions")) || 0;

        sessions++;

        localStorage.setItem("sessions", sessions);

        // Save last practiced company
        localStorage.setItem(
            "lastCompany",
            company.company
        );

        try {

            await addDoc(

                collection(db, "history"),

                {

                    company: company.company,

                    technical: interview.technical,

                    hr: interview.hr,

                    coding: interview.coding,

                    tips: interview.tips,

                    time: new Date()

                }

            );

        }

        catch (error) {

            console.error("Firestore Error:", error);

        }

    }

    catch (error) {

        console.error(error);

        output.innerHTML = `

        <div class="error-card">

            <h2>Something went wrong</h2>

            <p>${error.message}</p>

        </div>

        `;

    }

    finally {

        generateBtn.disabled = false;

        generateBtn.textContent = "Generate Practice Session";

    }

}