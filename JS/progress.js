import{

db,

collection,

getDocs

}

from "../firebase.js";

const history=document.getElementById("history");

const companies=document.getElementById("companies");

const sessions=document.getElementById("sessions");

async function load(){

const snapshot=

await getDocs(collection(db,"history"));

let count=0;

const set=new Set();

snapshot.forEach(doc=>{

count++;

const data=doc.data();

set.add(data.company);

history.innerHTML+=`

<div class="card">

<h3>${data.company}</h3>

<p>${new Date(data.time.seconds*1000).toLocaleString()}</p>

</div>

`;

});

companies.innerText=set.size;

sessions.innerText=count;

}

load();

