
$(document).ready(function() {
    // Function to handle buying a ticket
    function kjopBillett() {
        const billett = {
            filmTitle: $("#filmTitle").val(),
            antall: $("#antall").val(),
            fNavn: $("#fNavn").val(),
            eNavn: $("#eNavn").val(),
            tlf: $("#tlf").val(),
            epost: $("#epost").val(),
        };

        $.post("http://localhost:8080/billetter/lagre", billett, function(result) {
            hentAlleBilletter();
            console.log(result);
        });

        // Check if any field is empty
        if (!billett.filmTitle || !billett.antall || !billett.fNavn || !billett.eNavn || !billett.tlf || !billett.epost) {
            alert("Please fill in all fields.");
            return;
        }

        // Reset input fields
        $("#filmTitle").val("");
        $("#antall").val("");
        $("#fNavn").val("");
        $("#eNavn").val("");
        $("#tlf").val("");
        $("#epost").val("");
    }

    // Function to retrieve all tickets
    function hentAlleBilletter() {
        $.get("/billetter/hentAlle", function(billetter) {
            formaterBilletter(billetter);
        });
    }

    // Function to format and display tickets
    function formaterBilletter(billetter) {
        let output = "<table><tr><th>Film</th><th>Navn</th><th>Epost</th><th>Telefon</th></tr>";

        for (let billett of billetter) {
            output += "<tr><td>" + billett.filmTitle + "</td><td>" + billett.fNavn + " " + billett.eNavn + "</td><td>" + billett.epost + "</td><td>" + billett.tlf + "</td></tr>";
        }
        output += "</table>";

        $("#alleBilletter").html(output);
    }

    // Function to delete all tickets
    function slettAlle() {
        $.get("/billetter/slettAlle", function() {
            hentAlleBilletter();
        });
    }

    // Bind click event for "Kjøp billett" button
    $("#kjopBillett").click(kjopBillett);

    // Bind click event for "Slett alle billetter" button
    $("#slett-btn").click(slettAlle);

    // Load all tickets when the page loads
    hentAlleBilletter();
});
