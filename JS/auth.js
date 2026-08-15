import {

    auth,
    provider,
    signInWithPopup

} from "../firebase.js";

const loginBtn = document.querySelector(".login");
const startBtn = document.querySelector(".primary");

async function login() {

    try {

        const result = await signInWithPopup(auth, provider);

        localStorage.setItem(
            "username",
            result.user.displayName
        );

        localStorage.setItem(
            "photo",
            result.user.photoURL
        );

        window.location.href = "dashboard.html";

    }

    catch (err) {

        console.error(err);

        alert("Login Failed");

    }

}

loginBtn.addEventListener("click", login);

startBtn.addEventListener("click", login);