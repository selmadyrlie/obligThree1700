package com.example.obligthree1700;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:63342", "http://localhost:8080"} )
@RestController
public class Controller {

    @Autowired
    Repository repo;

    @Autowired
    private HttpSession session;

    private Logger logger = (Logger) LoggerFactory.getLogger(Controller.class);

    @PostMapping("/lagre")
    public void lagre(@RequestBody Billett billett, HttpServletResponse response) throws IOException {

        if (!repo.lagreBillett(billett)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i database:(");
        } else {
            repo.lagreBillett(billett);
        }
    }

    @GetMapping("/hentAlle")
    public List<Billett> hent(HttpServletResponse response) throws IOException {
     //   if ((boolean) session.getAttribute("loggetInn")) {
            List<Billett> alleBilletter = repo.hentAlleBilletter();
            if (alleBilletter == null) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i hent funksjon i kontrollerklasse");
            }
            return alleBilletter;
        }
        /* else {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "kan ikke vise billetter, du er ikke logget inn");
            return null;
        }
    } */






    @DeleteMapping("/slettAlle")
    public void slett(HttpServletResponse response) throws IOException {
        if (!repo.slettAlleBilletter()) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i database:(");
        } else {
            repo.slettAlleBilletter();
        }
    }


    /*
    @GetMapping("/login")
    public boolean logIn(String username, String password) {
        if (repo.logIn(username, password)) {
            session.setAttribute("loggetInn", true);
            return true;
        } else {
            return false;
        }
    }

    @GetMapping("/logut")
    public void logOut() {
        session.setAttribute("loggetInn", false);
    }



private boolean validerBillett(Billett billett) {
    String regexFornavn = "[A_ZÆØÅa-zæøå]{2,30}";
    String regexEtternavn = "[A_ZÆØÅa-zæøå]{2,30}";
    String regexTlf = "[0-9]{8,10}";
    String regexEpost = "[A_ZÆØÅa-zæøå0-9.@-_]{2,100}";

    String fornavn = billett.getFornavn();
    String etternavn = billett.getEtternavn();
    String tlf = billett.getTlf();
    String epost = billett.getEpost();

    boolean fornavnValid = fornavn.matches(regexFornavn);
    boolean etternavnValid = etternavn.matches(regexEtternavn);
    boolean tlfValid = tlf.matches(regexTlf);
    boolean epostValid = epost.matches(regexEpost);

    if (fornavnValid && etternavnValid && tlfValid && epostValid) {
        return true;
    } else {
        logger.error("Valideringsfeil for billettobjekt");
        return false;
    }
*/
}














