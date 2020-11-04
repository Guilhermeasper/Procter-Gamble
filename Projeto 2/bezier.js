function Curva(id) {
    this.id = id,
    this.pontos = []
}

function Ponto(x, y) {
    this.x = x,
    this.y = y
}

let cont = 1
let curvas = [new Curva(cont)]
let curva = 1
let quadro = document.getElementById('quadro');
let contexto = quadro.getContext('2d');
document.getElementById('curva').innerHTML = 'Curva ' + curva

addPonto = function(event) {
    let x = event.clientX
    let y = event.clientY
    curvas[curva-1].pontos.push(new Ponto(x - 10, y - 2 - document.getElementById('quadro').offsetTop))
    desenhar()
    console.log(curvas)
}

desenhar = function() {
    contexto.clearRect(0, 0, quadro.width, quadro.height)
    if(document.getElementById('linhas').checked == true){
        desenharLinhas()
    }
    if(document.getElementById('pontos').checked == true){
        desenharPontos()
    }
}

desenharPontos = function() {
    for (let j = 0; j < curvas.length; j++) {
        if(curvas[j].pontos.length > 0){
            for (let i = 0; i < curvas[j].pontos.length; i++) {
                let b1 = curvas[j].pontos[i]
                contexto.fillRect(b1.x - 1, b1.y - 1, 3, 3)
            }
        }
    }
}

desenharLinhas = function() {
    for (let j = 0; j < curvas.length; j++) {
        if(curvas[j].pontos.length > 1){
            for (let i = 0; i < curvas[j].pontos.length - 1; i++) {
                let b1 = curvas[j].pontos[i]
                let b2 = curvas[j].pontos[i + 1]
                contexto.beginPath()
                contexto.moveTo(b1.x, b1.y)
                contexto.lineTo(b2.x, b2.y)
                contexto.stroke()
            }
        }
    }
}

criarCurva = function() {
    cont++
    curvas.push(new Curva(cont))
    curva = cont
    document.getElementById('curva').innerHTML = 'Curva ' + curva
    console.log(curvas)
}

deletarCurva = function() {
    if(cont > 1){
        cont--
        curvas.splice(curva - 1, 1)
        curva = cont
        document.getElementById('curva').innerHTML = 'Curva ' + curva
        for (let i = 0; i < cont; i++) {
            curvas[i].id = i + 1
        }
        desenhar()
        console.log(curvas)
    }
}

curvaMenos = function() {
    if(curva > 1){
        curva--
        document.getElementById('curva').innerHTML = 'Curva ' + curva
        console.log(curvas)
    }
}

curvaMais = function() {
    if(curva < cont){
        curva++
        document.getElementById('curva').innerHTML = 'Curva ' + curva
        console.log(curvas)
    }
}