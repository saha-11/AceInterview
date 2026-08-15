const username = document.getElementById("username");
const profile = document.getElementById("profilePic");
const greeting = document.getElementById("dashboardGreeting");

const rawName = localStorage.getItem("username") || "Guest";
const firstName = rawName.split(" ")[0] || "Guest";
const storedPhoto = localStorage.getItem("photo");
const fallbackPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}&background=C8A96A&color=fff`;

username.textContent = rawName;
profile.src = storedPhoto || fallbackPhoto;

greeting.textContent = `${getTimeGreeting()}, ${firstName}`;

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

const searchBtn = document.getElementById("searchBtn");
const companyInput = document.getElementById("company");

function handleSearch() {
  const company = companyInput.value.trim();
  if (company === "") {
    companyInput.focus();

companyInput.style.border =
"2px solid #C53030";

setTimeout(()=>{

companyInput.style.border="";

},1500);

return;
    return;
  }
  localStorage.setItem("company", company);
  window.location.href = "company.html";
}

searchBtn.addEventListener("click", handleSearch);
companyInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearch();
  }
});

const navItems = document.querySelectorAll(".nav-item");

const navTargetMap = {
  dashboard: "dashboard.html",
  companies: "company.html",
  coding: "practice.html",
  "hr-round": "practice.html",
  progress: "progress.html",
  logout: "index.html"
};

navItems.forEach(item => {
  item.addEventListener("click", () => {
    const target = item.dataset.target;
    if (!target) return;
    if (target === "logout") {
      localStorage.removeItem("username");
      localStorage.removeItem("photo");
      localStorage.removeItem("company");
    }
    // If user clicked Companies, show the companies list inside the dashboard
    if (target === 'companies') {
      // update active class
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      // show companies in dashboard content area
      showCompanies();
      // update section description text
      const sectionDesc = document.getElementById('sectionDescription');
      if (sectionDesc) sectionDesc.textContent = 'Select a company below to prepare specific interview questions.';
      return;
    }

    const destination = navTargetMap[target] || "dashboard.html";
    if (destination === "company.html" && target === "companies") {
      localStorage.setItem("company", "Google");
    }
    window.location.href = destination;
  });
});

const companies = [

{
name:"Google",
desc:"Cloud, Search, Android, AI, System Design."
},

{
name:"Amazon",
desc:"Leadership Principles, DSA, Low Level Design."
},

{
name:"Microsoft",
desc:"OOP, Azure, C#, System Design."
},

{
name:"Adobe",
desc:"Algorithms, OS, DBMS, Problem Solving."
},

{
name:"Apple",
desc:"Swift, iOS, Memory Management."
},

{
name:"Meta",
desc:"Coding, Graphs, Trees, Behavioral."
},

{
name:"Netflix",
desc:"Distributed Systems, Scalability."
},

{
name:"Oracle",
desc:"Java, SQL, Backend Development."
},

{
name:"Accenture",
desc:"Aptitude, HR, Communication."
},

{
name:"Infosys",
desc:"DBMS, Java, Aptitude."
},

{
name:"TCS",
desc:"NQT, HR, Coding Fundamentals."
}

];

function showCompanies(){

const container=document.getElementById("dashboardContent");

container.innerHTML="";

companies.forEach(company=>{

container.innerHTML+=`

<div class="company-card">

<h3>${company.name}</h3>

<p>${company.desc}</p>

<button
class="open-company"
onclick="openCompany('${company.name}')">

Prepare

</button>

</div>

`;

});

}

window.openCompany=function(name){

localStorage.setItem("company",name);

window.location.href="company.html";

}