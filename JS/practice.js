import companies from "../Data/companyLoader.js";

const questionEl = document.getElementById("question");
const feedback = document.getElementById("feedback");
const answer = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next");
const wordCountEl = document.getElementById("wordCount");

const companyName = (localStorage.getItem("company") || "Google").trim().toLowerCase();
const company = companies[companyName] || companies.google;

let questions = [];
let current = 0;

function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function makeQuestions() {
    const pool = [
        ...company.technical,
        ...company.hr,
        ...company.coding,
        ...company.tips
    ];
    questions = shuffle(pool).slice(0, 8);
}

function renderQuestion() {
    if (!questions.length) {
        questionEl.innerText = "No questions available.";
        return;
    }
    questionEl.innerText = questions[current];
    const tag = document.querySelector('.practice-tag');
    if (tag) tag.textContent = `Question ${current + 1} of ${questions.length}`;
}

function saveAnswer(index, text) {
    const key = `practice_answers_${company.company.replace(/\s+/g, '_')}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing[index] = { question: questions[index], answer: text, time: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(existing));
}

answer.addEventListener('input', () => {
    const words = answer.value.trim() ? answer.value.trim().split(/\s+/).length : 0;
    if (wordCountEl) wordCountEl.textContent = words;
});

submitBtn.addEventListener("click", () => {
    const answerText = answer.value.trim();

    if (answerText === "") {
        alert("Write an answer first.");
        return;
    }

    saveAnswer(current, answerText);
    evaluateAnswer(answerText);
    feedback.style.display = 'block';
});

nextBtn.addEventListener('click', () => {
    if (current < questions.length - 1) current++;
    else current = 0;
    answer.value = '';
    if (wordCountEl) wordCountEl.textContent = '0';
    feedback.style.display = 'none';
    renderQuestion();
});

// Initialize
makeQuestions();
renderQuestion();

export {};

function evaluateAnswer(answer){

    const words = answer.trim().split(/\s+/);

    let score = 0;

    let feedback = "";

    if(words.length>=150){

        score+=40;

        feedback+="Excellent answer length.<br>";

    }

    else if(words.length>=80){

        score+=30;

        feedback+="Good detailed answer.<br>";

    }

    else{

        score+=10;

        feedback+="Try explaining your answer in more detail.<br>";

    }

    if(answer.includes(".")){

        score+=20;

        feedback+="Well structured sentences.<br>";

    }

    if(

        answer.toLowerCase().includes("example") ||

        answer.toLowerCase().includes("for instance")

    ){

        score+=20;

        feedback+="Great use of examples.<br>";

    }

    if(words.length>40){

        score+=20;

        feedback+="Your response is sufficiently descriptive.<br>";

    }

    document.getElementById("feedback").innerHTML=`

        <h3>Overall Score : ${score}/100</h3>

        <br>

        ${feedback}

    `;

}