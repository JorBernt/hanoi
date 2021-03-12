package webprogrammering.rekursjon.hanoi;

public class Flytt {
    int ring, fra, til;

    public Flytt(int ring, int fra, int til) {
        this.ring = ring;
        this.fra = fra;
        this.til = til;
    }

    public int getRing() {
        return ring;
    }

    public void setRing(int ring) {
        this.ring = ring;
    }

    public int getFra() {
        return fra;
    }

    public void setFra(int fra) {
        this.fra = fra;
    }

    public int getTil() {
        return til;
    }

    public void setTil(int til) {
        this.til = til;
    }
}
