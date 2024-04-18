package com.example.obligthree1700;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/billetter")
public class Controller {

    @Autowired
    Repository repo;
    @PostMapping("/lagre")
    public void lagre(@RequestBody Billett billett, HttpServletResponse response) throws IOException {

        if (!repo.lagreBillett(billett)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i database:(");
        }
    }

    @GetMapping("/hentAlle")
    public List<Billett> hent(){
        return repo.hentAlleBilletter();
    }

    @DeleteMapping("/slettAlle")
    public void slett() { repo.slettALleBilletter(); }
}
