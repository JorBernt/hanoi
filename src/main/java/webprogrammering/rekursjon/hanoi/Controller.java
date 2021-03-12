package webprogrammering.rekursjon.hanoi;

import java.util.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("/hentInstruksjoner")
    public List<Flytt> hentInstruksjoner(int n) {
        Solver solver = new Solver(n);
        return solver.flyttListe;
    }
}
