const cards=document.querySelector(".dashboard-card");

document.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.pageX)/40;

const y=(window.innerHeight/2-e.pageY)/40;

cards.style.transform=`rotateY(${x}deg) rotateX(${-y}deg)`;

});

