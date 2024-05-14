package com.example.obligthree1700;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@org.springframework.stereotype.Repository
public class Repository {

    @Autowired
    private JdbcTemplate db;
    private Logger logger = LoggerFactory.getLogger(Repository.class);

    // Example of using try-catch to catch potentional errors
    public boolean lagreBillett(Billett billett) {
        String sql = "INSERT INTO Billett (filmvalg, antall, fornavn, etternavn, tlf, epost) VALUES(?,?,?,?,?,?)";
        try {
            db.update(sql, billett.getFornavn(), billett.getEtternavn(), billett.getTlf(), billett.getEpost());
            return true;
        } catch (Exception e) {
            logger.error("Feil i lagreBillett: " + e);
            return false;
        }
    }

    public List<Billett> hentAlleBilletter() {
        String sql = "SELECT * FROM Billett";
        try {
            List<Billett> alleBilletter =  db.query(sql, new BeanPropertyRowMapper(Billett.class));
            return alleBilletter;
        } catch (Exception e) {
            logger.error("Feil i hentAlleBilletter" + e);
            return null;
        }
    }


    public boolean slettAlleBilletter() {
        String sql = "DELETE FROM Billett";
        try {
            db.update(sql);
            return true;
        } catch (Exception e) {
            logger.error("Feil i slettAlleBilletter" + e);
            return false;
        }
    }


/*
    public boolean logIn(String username, String password) {
        String sql = "SELECT FROM User WHERE username = ? AND password = ?";
        try {
            int foundUser = db.queryForObject(sql, Integer.class, username, password);
            if (foundUser > 0) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }
*/



}

