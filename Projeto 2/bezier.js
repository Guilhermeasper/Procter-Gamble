function Curva(id) {
    (this.id = id), (this.pontos = []);
}

function Ponto(x, y) {
    (this.x = x), (this.y = y);
}
var criando = false;
var holding = false;
let cont = 0;
var curvas = [];
let curva = 0;
let quadro = document.getElementById("quadro");
let contexto = quadro.getContext("2d");
document.getElementById("curva").innerHTML = "Curva " + curva;
var dialog = document.getElementById("dialog");
var botao_conclui = document.getElementById("conclui");
var botao_cancela = document.getElementById("cancel");
var pixelsDict = {};

botao_conclui.addEventListener("click", () => {
    criando = false;
    dialog.style.display = "none";
    document.getElementById("curva").innerHTML = "Curva " + (curva + 1);
});

botao_cancela.addEventListener("click", () => {
    criando = false;
    dialog.style.display = "none";
    deletarCurva();
});

// addPonto = function(event) {
//     console.log("onClick")
//     if(cont > 0 && criando){
//         let x = event.clientX
//         let y = event.clientY
//         curvas[curva].pontos.push(new Ponto(x - 10, y - 2 - document.getElementById('quadro').offsetTop))
//         desenhar()
//         console.log(curvas)
//         dialog.style.display = "block";
//         dialog.style.position = "absolute"
//         dialog.style.left = event.clientX.toString()+"px"
//         dialog.style.top = (event.clientY - 50).toString()+"px"
//     }
// }

function mouseDown(event) {
    console.log("clicking");
    if (cont > 0 && criando) {
        let x = event.clientX;
        let y = event.clientY;
        curvas[curva].pontos.push(
            new Ponto(
                x - 10,
                y - 2 - document.getElementById("quadro").offsetTop
            )
        );
        desenhar();
        console.log(curvas);
        dialog.style.display = "block";
        dialog.style.position = "absolute";
        dialog.style.left = event.clientX.toString() + "px";
        dialog.style.top = (event.clientY - 50).toString() + "px";
    }
    holding = true;
}

function mouseUp(event) {
    console.log("not clicking");
    holding = false;
}

function mouseMove(event) {
    console.log("Moving");
    if (holding && criando) {
        let x = event.clientX;
        let y = event.clientY;
        curvas[curva].pontos.pop()
        curvas[curva].pontos.push(
            new Ponto(
                x - 10,
                y - 2 - document.getElementById("quadro").offsetTop
            )
        );
        desenhar();
        dialog.style.display = "block";
        dialog.style.position = "absolute";
        dialog.style.left = event.clientX.toString() + "px";
        dialog.style.top = (event.clientY - 50).toString() + "px";
    }
}

desenhar = function () {
    contexto.clearRect(0, 0, quadro.width, quadro.height);
    if (document.getElementById("linhas").checked == true) {
        desenharLinhas();
    }
    if (document.getElementById("pontos").checked == true) {
        desenharPontos();
    }
    if (document.getElementById("curvas").checked == true) {
        desenharCurvas();
    }
};

desenharPontos = function () {
    for (let j = 0; j < curvas.length; j++) {
        if (curvas[j].pontos.length > 0) {
            for (let i = 0; i < curvas[j].pontos.length; i++) {
                let b1 = curvas[j].pontos[i];
                contexto.fillRect(b1.x - 1, b1.y - 1, 3, 3);
                for (let x = b1.x - 1; x <= b1.x + 3; x++) {
                    for (let y = b1.y - 1; y <= b1.y + 3; y++) {
                        let info = {curva: undefined, number: undefined};
                        let dummy = {};
                        dummy[y] = info;
                        pixelsDict[x] = dummy;
                    }
                    
                }
            }
        }
    }
};

desenharLinhas = function () {
    for (let j = 0; j < curvas.length; j++) {
        if (curvas[j].pontos.length > 1) {
            for (let i = 0; i < curvas[j].pontos.length - 1; i++) {
                let b1 = curvas[j].pontos[i];
                let b2 = curvas[j].pontos[i + 1];
                contexto.beginPath();
                contexto.moveTo(b1.x, b1.y);
                contexto.lineTo(b2.x, b2.y);
                contexto.lineWidth = 4;
                if (j == curva) contexto.strokeStyle = "red";
                else contexto.strokeStyle = "black";
                contexto.stroke();
            }
        }
    }
};

criarCurva = function () {
    criando = true;
    cont++;
    curvas.push(new Curva(cont + 1));
    document.getElementById("curva").innerHTML = "Curva " + (curva + 1);
    curva = cont - 1;
    console.log(curvas);
};

deletarCurva = function () {
    if (cont > 0) {
        cont--;
        curvas.splice(curva, 1);
        if (curva - 1 < 0) {
            curva = curvas.length - 1;
        } else {
            curva--;
        }
        document.getElementById("curva").innerHTML = "Curva " + (curva + 1);
        for (let i = 0; i < cont; i++) {
            curvas[i].id = i + 1;
        }
        desenhar();
        console.log(curvas);
    }
};

curvaMenos = function () {
    if (curva - 1 < 0) {
        curva = curvas.length - 1;
    } else {
        curva--;
    }
    desenhar();
    document.getElementById("curva").innerHTML = "Curva " + (curva + 1);
};

curvaMais = function () {
    curva = (curva + 1) % curvas.length;
    desenhar();
    document.getElementById("curva").innerHTML = "Curva " + (curva + 1);
};

function deCast(pontos, t, tm1) {
    let pts = [];
    let localPontos = pontos;
    if (pontos.length > 1) {
        for (let i = 0; i < pontos.length - 1; i++) {
            let b1 = pontos[i];
            let b2 = pontos[i + 1];
            pts.push(new Ponto(b1.x * t + b2.x * tm1, b1.y * t + b2.y * tm1));
        }
        return deCast(pts, t, tm1);
    } else {
        return localPontos[0];
    }
}

desenharCurvas = function () {
    let aval = document.getElementById("avaliacoes").value;
    let ratio = 1 / aval;
    for (let j = 0; j < curvas.length; j++) {
        let pts = [];
        if (curvas[j].pontos.length > 1) {
            let t = 1;
            let tm1 = 0;
            for (let k = 0; k <= aval; k++) {
                let ponto = deCast(curvas[j].pontos, t, tm1);
                pts.push(ponto);
                t = t - ratio;
                tm1 = tm1 + ratio;
            }
            for (let k = 0; k < pts.length - 1; k++) {
                let b1 = pts[k];
                let b2 = pts[k + 1];
                contexto.beginPath();
                contexto.moveTo(b1.x, b1.y);
                contexto.lineTo(b2.x, b2.y);
                if (j == curva) contexto.strokeStyle = "red";
                else contexto.strokeStyle = "black";
                contexto.stroke();
            }
        }
    }
};
