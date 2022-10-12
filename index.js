const pi = "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";

var current = "";
var score = 0;
var dead = false;

document.querySelector("#high").innerHTML = `Highscore: ${localStorage.highscore}`;

document.addEventListener("keyup", (e) => {
    const valid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Enter"];
    if (!valid.includes(e.key)) return;
    if (dead && e.key == "Enter") {
        dead = false;
        current = "";
        score = 0;
        document.querySelector("#correction").innerHTML = "";
        document.querySelector("#digits").innerHTML = `3.${current}`;
        document.querySelector("#last").innerHTML = "";
        document.querySelector("#last").style.color = "white";
        document.querySelector("#starttext").style.display = "inline";
        document.querySelector("#score").innerHTML = "Score: 0";
        document.querySelector("#underscore").style.display = "inline";
        return;
    }
    if (e.key == "Enter" && !dead || dead) return;
    document.querySelector("#starttext").style.display = "none";
    current += e.key;
    var correct = current == pi.substring(0, current.length);
    document.querySelector("#digits").innerHTML = `3.${current.substring(0, current.length - 1)}`;
    document.querySelector("#last").innerHTML = current[current.length - 1]
    document.querySelector("#last").style.color = correct ? "limegreen" : "red";
    if (correct) {
        score++;
        if (score > Number(localStorage.highscore ?? 0)) localStorage.highscore = score;
        document.querySelector("#score").innerHTML = `Score: ${score}`;
        document.querySelector("#high").innerHTML = `Highscore: ${localStorage.highscore}`;
    } else {
        dead = true;
        document.querySelector("#underscore").style.display = "none";
        document.querySelector("#correction").innerHTML = `Digit #${score + 1} is ${pi[score]}, not ${current[score]}.<br>The next 5 digits are ${pi.substring(score, score + 5)}.<br>Press Enter to continue.`
    }
})