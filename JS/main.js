var signupName = document.getElementById("signup-name")
var signupEmail = document.getElementById("signup-email")
var signupPassword = document.getElementById("signup-password")
var signupList = []

var signupForm = document.getElementById("signup")
var signinForm = document.getElementById("signin")
var homePage = document.getElementById("home")


var showSignin = document.getElementById("showSignin")
var showSignup = document.getElementById("showSignup")

var signupSuccessMessage = document.getElementById("sigupsuccess-message")
var signinErrorMessage = document.getElementById("signinError-message")
var signupErrorMessage = document.getElementById("signupError-message")



var logoutBtn = document.getElementById("logoutBtn")

showSignin.addEventListener("click", function () {
    signinForm.classList.remove("d-none")
    signupForm.classList.add("d-none")
    signinErrorMessage.textContent = ""
    clearSignupValue()


})
showSignup.addEventListener("click", function () {
    signinForm.classList.add("d-none")
    signupForm.classList.remove("d-none")
    signupErrorMessage.textContent = ""
    clearSigninValue()
})

function signUp() {

    signupErrorMessage.textContent = ""
    signupSuccessMessage.textContent = ""
    var signup = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value
    }

    if (signup.name == "" || signup.email == "" || signup.password == "") {
        signupErrorMessage.textContent = "All inputs are required"

        return
    }

    var existList = JSON.parse(localStorage.getItem("signupArray") || "[]")


    var isExist = existList.some(user => user.email == signup.email)
    if (isExist == true) {
        console.log("4")

        signupErrorMessage.textContent = "Email already exists!"
        signupSuccessMessage.textContent = ""
        return
    }

    signupErrorMessage.textContent = ""
    signupList.push(signup)
    localStorage.setItem("signupArray", JSON.stringify(signupList))
    console.log(signupList)

    signupSuccessMessage.textContent = "Success"

    clearSignupValue()


}

function signIn() {
    signinErrorMessage.textContent = ""


    var signinEmail = document.getElementById("signin-email").value
    var signinPassword = document.getElementById("signin-password").value

    if (signinEmail == "" || signinPassword == "") {
        signinErrorMessage.textContent = "All inputs are required"
        return
    }

    var existList = JSON.parse(localStorage.getItem("signupArray") || "[]")

    var user = existList.find(user => user.email == signinEmail)
    if (!user) {
        signinErrorMessage.textContent = "Incorrect Email"
        return
    }
    if (user.password != signinPassword) {
        signinErrorMessage.textContent = "Incorrect Password!"
        return
    }
    localStorage.setItem("currentUser", JSON.stringify(user))

    signinForm.classList.add("d-none")
    signupForm.classList.add("d-none")
    homePage.classList.remove("d-none")
    document.querySelector(".welcome h1").textContent = `Welcome ${user.name}`

}

function logout() {
    localStorage.removeItem("currentUser")
    signinForm.classList.remove("d-none")
    signupForm.classList.add("d-none")
    homePage.classList.add("d-none")
    clearSigninValue()

}


function clearSignupValue() {
    signupName.value = ""
    signupEmail.value = ""
    signupPassword.value = ""

}
function clearSigninValue() {
    document.getElementById("signin-email").value = ""
    document.getElementById("signin-password").value = ""
}