document.getElementById("photo").src=

localStorage.getItem("photo");

document.getElementById("name").innerText=

localStorage.getItem("username");

document.getElementById("logout").onclick=()=>{

localStorage.clear();

window.location.href="index.html";

};

