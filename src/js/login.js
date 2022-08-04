import { getUser, createUser } from "./ajax";

function createLoginPage() {
    let bigDiv = document.querySelector("#app-login");
    if (bigDiv !== null) {
        let form = document.createElement("div");
        form.classList += "loginForm";
        bigDiv.appendChild(form);

        let emailLabel = document.createElement("p");
        emailLabel.classList += "emailLabel";
        emailLabel.innerText = "Email";
        form.appendChild(emailLabel);

        let emailInput = document.createElement("input");
        emailInput.classList += "emailInput";
        emailInput.type = "email";
        emailInput.placeholder = "Type your email";
        form.appendChild(emailInput);

        let usernameLabel = document.createElement("p");
        usernameLabel.classList += "usernameLabel";
        usernameLabel.innerText = "Username"
        form.appendChild(usernameLabel);

        let usernameInput = document.createElement("input");
        usernameInput.classList += "usernameInput";
        usernameInput.type = "text";
        usernameInput.placeholder = "Type your username";
        form.appendChild(usernameInput);

        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList += "buttonsDiv";
        form.append(buttonsDiv);

        let loginButton = document.createElement("button");
        loginButton.classList += "loginButton";
        loginButton.innerText = "Login";
        buttonsDiv.appendChild(loginButton);

        let createAccount = document.createElement("button");
        createAccount.classList += "createAccount";
        createAccount.innerText = "Register";
        buttonsDiv.appendChild(createAccount);
    }
}

function login() {

    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.setItem('mailFound', "false");

    createLoginPage();

    let loginButton = document.querySelector(".loginButton");

    loginButton.addEventListener('click', () => {
        let emailInput = document.querySelector(".emailInput").value;
        let usernameInput = document.querySelector(".usernameInput").value;

        if (emailInput !== '' && usernameInput !== '') {
            getUser(emailInput.toString());
            setTimeout(() => {
                if (localStorage.getItem('mailFound').toString() === "true") {
                    localStorage.setItem('email', emailInput);
                    localStorage.setItem('username', usernameInput);
                    window.location.replace("../public/index.html");
                }
            }, 1500);
        } else {
            alert("Email and/or username not found.");
        }
    });

    let registerButton = document.querySelector(".createAccount");

    registerButton.addEventListener('click', () => {
        let emailInput = document.querySelector(".emailInput").value;

        if (emailInput !== '') {
            getUser(emailInput.toString());
            setTimeout(() => {
                if (localStorage.getItem('mailFound').toString() === "true") {
                    alert("Account already exists");
                }
            }, 1500);
            if (localStorage.getItem('mailFound').toString() !== "true") {
                createUser(emailInput.toString());
                setTimeout(() => {
                    alert("Account successfully created!");
                }, 1500);
            }
        }
    })
}

console.log(login());