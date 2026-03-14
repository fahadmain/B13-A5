document.getElementById("login-btn").addEventListener("click", function () {
    const inputUsername = document.getElementById("input-username")
    const username = inputUsername.value;

    const inputPin = document.getElementById("input-pin")
    const pin = inputPin.value;

    if(username === "admin" && pin === "admin123"){
        alert("Login Successful");
        window.location.assign("/home.html")
    }else{
        alert("Invalid Username or Password!!!");
        return;
    }
})