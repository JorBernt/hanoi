$("#okButton").click(()=>{
    let antallRinger = $("#antallRinger").val()
    lagRinger(antallRinger)
})
const farger = ["red", "blue", "green","yellow", "darkred", "darkblue", "lightblue", "darkgreen", "lightgreen", "pink"];

let staver = [50, 250, 450];
let staverStack = [0, 0, 0];
const ringSize = 25;
let total = 0;
let current = 0;
const lagRinger = antallRinger => {
    for(let i = 0; i < antallRinger; i++) {
        staverStack[0]+=ringSize;
        const w = 100-(i*10);
        const p = 375-(i*ringSize);
        const l = staver[0]+i*5;

        $("#container").append("<div id=ring"+i+"></div>")
        $("#ring"+i).css({"width": w+"px","height": "25px", "background-color":farger[i], "position":"absolute", "top":p+"px", "left":l+"px"})
    }

    $.get("/hentInstruksjoner?n="+antallRinger, instruksjoner => {
        $("#output").html("Instruksjon 0 av " +instruksjoner.length)
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
        top: (375-staverStack[instruksjoner[l].til])+"px"}, "slow", () => {
        console.log(375-staverStack[instruksjoner[l].til])
        staverStack[instruksjoner[l].fra] -=ringSize;
        staverStack[instruksjoner[l].til] +=ringSize;
        startAnimering(instruksjoner, l+1)
    })

}
