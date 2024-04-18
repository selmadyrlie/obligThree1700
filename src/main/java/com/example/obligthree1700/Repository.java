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
        String sql = "INSERT INTO Billett (fornavn, etternavn, tlf, epost) VALUES(?,?,?,?)";
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
            List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
            return alleBilletter;
        }

        public void slettALleBilletter() {
            String sql = "DELETE  FROM Billett";
            db.update(sql);
        }
    }

