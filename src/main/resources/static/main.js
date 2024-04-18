function kjopBillett() {
    // Get the values of input fields
    const filmTitle = $("#filmTitle").val();
    const antall = $("#antall").val();
    const fNavn = $("#fNavn").val();
    const eNavn = $("#eNavn").val();
    const tlf = $("#tlf").val();
    const epost = $("#epost").val();

    // Check if any field is empty
    if (!filmTitle || !antall || !fNavn || !eNavn || !tlf || !epost) {
        alert("Please fill in all fields.");
        return;
    }

    // Create a ticket object
    const billett = {
        filmTitle: filmTitle,
        antall: antall,
        fNavn: fNavn,
        eNavn: eNavn,
        tlf: tlf,
        epost: epost
    };

    $.post("http://localhost:8080/lagre", billett, function(result){
        hentAlle();
        console.log(result);
    });

    // Reset input fields
    $("#filmTitle").val("");
    $("#antall").val("");
    $("#fNavn").val("");
    $("#eNavn").val("");
    $("#tlf").val("");
    $("#epost").val("");
}

function hentAlle() {
    $.get("/hentAlle", function(billettOversikt) {
        formater(billettOversikt);
    });
}

function formater(billettOversikt) {
    let output = "<table><tr><th>Film</th><th>Navn</th><th>Epost</th><th>Telefon</th></tr>";

    for (let billett of billettOversikt) {
        output += "<tr><td>" + billett.filmTitle + "</td><td>" + billett.fNavn + " " + billett.eNavn + "</td><td>" + billett.epost + "</td><td>" + billett.tlf + "</td></tr>";
    }
    output += "</table>";

    $("#alleBilletter").html(output);
}

function slettAlle() {
    $.get("/slettALle", function(){
        hentAlle();
    });
}


