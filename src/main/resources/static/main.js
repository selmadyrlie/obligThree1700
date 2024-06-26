
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

        /*
        $.post("http://localhost:8080/billetter/lagre", billett, function(result) {
            hentAlleBilletter();
            console.log(result);
        });
        */

            $.ajax({
                url: 'http://localhost:8080/lagre',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(billett),
                success: function(data) {
                    console.log(data);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
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
        /*
        $.get("/billetter/hentAlle", function(billetter) {
            formaterBilletter(billetter);
        });
        */

        $.ajax({
            url: "http://localhost:8080/hentAlle",
            type: "GET",
            dataType: "json",
            success: function(billetter) {
                formaterBilletter(billetter);
            },
            error: function(xhr, status, error) {
                console.error("Error retrieving tickets: " + error);
                alert("Error retrieving tickets. Please try again later.");
            }
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
        /*
        $.get("/billetter/slettAlle", function() {
            hentAlleBilletter();
        });
         */

        $.ajax({
            url: "http://localhost:8080/slettAlle",
            type: "DELETE",
            success: function(response) {
                console.log("Billetter slettet:", response);
                hentAlleBilletter(); // Refresh the list of tickets after deletion
            },
            error: function(xhr, status, error) {
                console.error("Error deleting tickets:", error);
                alert("Error deleting tickets. Please try again later.");
            }
        });
    }

    // Bind click event for "Kjøp billett" button
    $("#kjopBillett").click(kjopBillett);

    // Bind click event for "Slett alle billetter" button
    $("#slett-btn").click(slettAlle);

    // Load all tickets when the page loads
    hentAlleBilletter();
});
