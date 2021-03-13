let antallRinger = 0;
$(()=>{
    $("#animFart").val(1)
})
$("#okButton").click(()=>{
    resett()
    antallRinger = $("#antallRinger").val()
    if(antallRinger <= 0 || antallRinger > 15) {
        $("#feilInput").html("Du må skrive inn et tall over 0, og maks 15")
    }
    else lagRinger()
})

const farger = ["red", "blue", "green","yellow", "darkred", "darkblue", "lightblue", "darkgreen", "lightgreen", "pink"]
const staver = [50, 250, 450]
const staverStack = [0, 0, 0]
const ringSize = 25
let total = 0
let current = 0

const resett = () => {
    $("#feilInput").html("")
    for(let i = 0; i < 3; i++) staverStack[i] = 0;
    total = 0;
    current = 0;
    for(let i = 0; i < antallRinger; i++) {
        $("#ring"+i).stop()
        $("#ring"+i).remove()
    }
}

const lagRinger = () => {
    for(let i = 0; i < antallRinger; i++) {
        staverStack[0]+=ringSize;
        const w = 150-(i*10);
        const p = 375-(i*ringSize);
        const l = staver[0]+i*5;

        $("#container").append("<div id=ring"+i+"></div>")
        $("#ring"+i).css({"width": w+"px","height": "25px", "background-color":farger[i%9], "position":"absolute", "top":p+"px", "left":l+"px"})
    }

    $.get("/hentInstruksjoner?n="+antallRinger, instruksjoner => {
            startAnimering(instruksjoner, 0)
    })
}

const startAnimering = (instruksjoner, l) => {
    if(l==instruksjoner.length) {
        $("#output").html("Ferdig!")
        return;
    }
    $("#instruksjonOutput").html("Flytter ring fra stav "+(instruksjoner[l].fra+1)+" til stav " +(instruksjoner[l].til+1))
    total++
    $("#output").html("Instruksjon "+total+" av " +instruksjoner.length)
    $("#ring"+instruksjoner[l].ring).animate({left: (staver[instruksjoner[l].til]+(instruksjoner[l].ring*5))+"px",
        top: (375-staverStack[instruksjoner[l].til])+"px"}, (1000/$("#animFart").val()), () => {
        staverStack[instruksjoner[l].fra] -=ringSize
        staverStack[instruksjoner[l].til] +=ringSize
        startAnimering(instruksjoner, l+1)
    })
}
