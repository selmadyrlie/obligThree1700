

function validateUsername() {
const username = $("#username").val();
const regex = /^[A_ZÆØÅa-zæøå0-9. -_]{2,30}$/;
const ok = regex.test(username);

if (!ok) {
    $("#usernameError").html("ugyldig brukernavn");
    return false;
} else {
    $("#usernameError").html("");
    return true;
}
}


function validatePassword() {
    const password = $("#password").val();
    const regex = /^[A_ZÆØÅa-zæøå0-9. -_]{8,}$/;
    const ok = regex.test(password);

    if (!ok) {
        $("#passwordError").html("ugyldig passord");
        return false;
    } else {
        $("#passwordError").html("");
        return true;
    }
}

function validateLogin() {
    return validateUsername() && validatePassword();
}

function login() {
    if (validateLogin()) {
        const url = "/loggInn?brukernavn="+$("#username").val()+"&passord="+$("#password").val();
        $.get(url, function (acceptedLogin) {
            if (acceptedLogin) {
                window.location.href="main.html";
            } else {
                $("#loginError").html("feil ved innlogging");
            }

        })

    }

    }
