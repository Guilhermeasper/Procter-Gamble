var onCreate = false;
var onHolding = false;
var quantity = 0;
var currentCurves = [];
var currentCurve = undefined;
var canvas = document.getElementById("quadro");
var canvasContext = quadro.getContext("2d");
var onCreateDialog = document.getElementById("dialog");
var finishButton = document.getElementById("conclui");
var cancelButton = document.getElementById("cancel");
var curveText = document.getElementById("curva");
var selected = undefined;
var canvasTopOffset = document.getElementById("quadro").offsetTop;
var pointSize = 5;

document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded() {
    updateCurvesQuantityHtml();
}

finishButton.addEventListener("click", () => {
    onCreate = false;
    dialog.style.display = "none";
    updateCurvesQuantityHtml();
});

cancelButton.addEventListener("click", () => {
    onCreate = false;
    dialog.style.display = "none";
    deletarCurva();
    updateCurvesQuantityHtml();
});

function mouseDown(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let canvasX = mouseX - 10;
    let canvasY = mouseY - 2 - canvasTopOffset;
    console.log(currentCurves[currentCurve].controlPointsMatrix[canvasX][canvasY]);
    if (
        currentCurve != undefined &&
        currentCurves[currentCurve].controlPointsMatrix[canvasX][canvasY] != -1
    ) {
        selected =
            currentCurves[currentCurve].controlPointsMatrix[canvasX][canvasY];
        console.log(selected);
    } else if (onCreate) {
        let newPoint = new Point(canvasContext, canvasX, canvasY, pointSize);
        pointIndex = currentCurves[currentCurve].addControlPoint(newPoint);
        desenhar();
        showCreationMenu(mouseX, mouseY);
    }
    onHolding = true;
}

function mouseUp(event) {
    onHolding = false;
    selected = undefined;
}

function mouseMove(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let canvasX = mouseX - 10;
    let canvasY = mouseY - 2 - canvasTopOffset;
    if (onHolding && onCreate) {
        console.log("onhold creating");
        currentCurves[currentCurve].points.pop();
        let newPoint = new Point(canvasContext, canvasX, canvasY, pointSize);
        pointIndex = currentCurves[currentCurve].addControlPoint(newPoint);
        desenhar();
        showCreationMenu(mouseX, mouseY);
    } else if (onHolding && selected != -1) {
        currentCurves[currentCurve].points[selected].x = canvasX;
        currentCurves[currentCurve].points[selected].y = canvasY;
        currentCurves[currentCurve].updateMatrix();
        desenhar();
        //showCreationMenu(mouseX, mouseY);
    }
}

function desenhar() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    if (document.getElementById("linhas").checked == true) {
        desenharLinhas();
    }
    if (document.getElementById("pontos").checked == true) {
        desenharPontos();
    }
    if (document.getElementById("curvas").checked == true) {
        desenharcurrentCurves();
    }
}

function desenharPontos() {
    for (let j = 0; j < currentCurves.length; j++) {
        if (currentCurves[j].points.length > 0) {
            for (let i = 0; i < currentCurves[j].points.length; i++) {
                currentCurves[j].points[i].draw();
            }
        }
    }
}

function desenharLinhas() {
    for (let j = 0; j < currentCurves.length; j++) {
        if (j == currentCurve) currentCurves[j].drawControlLines("red");
        else currentCurves[j].drawControlLines("black");
    }
}

function criarCurva() {
    onCreate = true;
    quantity += 1;
    let newCurve = new Curve(canvasContext, quantity + 1);
    currentCurves.push(newCurve);
    currentCurve = quantity - 1;
    updateCurvesQuantityHtml();
}

function deletarCurva() {
    if (quantity > 0) {
        quantity--;

        currentCurves.splice(currentCurve, 1);
        if (currentCurve - 1 < 0) {
            currentCurve = currentCurves.length - 1;
        } else {
            currentCurve--;
        }
        if(quantity == 0) currentCurve = undefined;
        updateCurvesQuantityHtml();
        for (let i = 0; i < quantity; i++) {
            currentCurves[i].id = i + 1;
        }
        desenhar();
    }
}

function curvaMenos() {
    if (currentCurve - 1 < 0) {
        currentCurve = currentCurves.length - 1;
    } else {
        currentCurve--;
    }
    desenhar();
    updateCurvesQuantityHtml();
}

function curvaMais() {
    currentCurve = (currentCurve + 1) % currentCurves.length;
    desenhar();
    updateCurvesQuantityHtml();
}

function desenharcurrentCurves() {
    for (let j = 0; j < currentCurves.length; j++) {
        if (j == currentCurve) currentCurves[j].drawCurves("red");
        else currentCurves[j].drawCurves("black");
    }
}

function showCreationMenu(xPosition, yPosition) {
    onCreateDialog.style.display = "block";
    onCreateDialog.style.position = "absolute";
    onCreateDialog.style.left = xPosition + "px";
    onCreateDialog.style.top = yPosition - 40 + "px";
}

function updateCurvesQuantityHtml() {
    if (quantity > 0) curveText.innerHTML = "Curva " + (currentCurve + 1);
    else curveText.innerHTML = "Nenhuma Curva";
}
