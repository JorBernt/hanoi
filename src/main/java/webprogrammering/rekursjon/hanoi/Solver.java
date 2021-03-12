package webprogrammering.rekursjon.hanoi;

import java.util.*;


public class Solver {
    List<Flytt> flyttListe;

    public Solver(int n) {
    Stack<Integer> start = new Stack<>();
    Stack<Integer> slutt = new Stack<>();
    Stack<Integer> midt = new Stack<>();

    for(int i = 0; i < n; i++) {
        start.push(i);
    }

    flyttListe = new ArrayList<>();

    stackRekursjon(n, start, slutt, midt, 0, 2, 1);
        for(Flytt f:flyttListe) {
        System.out.println("Flytt ring " + f.ring + " fra stav " + f.fra + " til stav " + f.til);
    }

}

     void stackRekursjon(int n, Stack<Integer> start, Stack<Integer> slutt, Stack<Integer> midt,
                               int startC, int sluttC, int midtC) {
        if(n == 1) {
            Flytt flytt = new Flytt(start.pop(), startC, sluttC);
            flyttListe.add(flytt);
            slutt.push(flytt.ring);
            return;
        }
        stackRekursjon(n-1, start, midt, slutt, startC, midtC, sluttC);
        Flytt flytt = new Flytt(start.pop(), startC, sluttC);
        flyttListe.add(flytt);
        slutt.push(flytt.ring);
        stackRekursjon(n-1, midt, slutt, start,midtC, sluttC, startC);
    }
}
