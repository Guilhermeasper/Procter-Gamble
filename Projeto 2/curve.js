class Curve{
    constructor(context, id){
        this.context = context
        this.id = id;
        this.points = [];
        this.controlPointsMatrix = [...Array(1280)].map(x=>Array(418).fill(-1));
        this.pointSize = 5;
    }

    drawControlLines(color){
        for (let i = 0; i < this.points.length - 1; i++) {
            let b1 = this.points[i];
            let b2 = this.points[i + 1];
            this.context.beginPath();
            this.context.moveTo(b1.x, b1.y);
            this.context.lineTo(b2.x, b2.y);
            this.context.lineWidth = 4;
            this.context.strokeStyle = color;
            this.context.stroke();
        }
    }

    drawCurves(color){
        let aval = document.getElementById("avaliacoes").value;
        let ratio = 1 / aval;
        let pts = [];
        if (this.points.length > 1) {
            let t = 1;
            let tm1 = 0;
            for (let k = 0; k <= aval; k++) {
                let ponto = this.deCast(this.points, t, tm1);
                pts.push(ponto);
                t = t - ratio;
                tm1 = tm1 + ratio;
            }
            for (let k = 0; k < pts.length - 1; k++) {
                let b1 = pts[k];
                let b2 = pts[k + 1];
                this.context.beginPath();
                this.context.moveTo(b1.x, b1.y);
                this.context.lineTo(b2.x, b2.y);
                this.context.strokeStyle = color;
                this.context.stroke();
            }
        }
    }

    addControlPoint(controlPoint){
        let position = this.points.push(controlPoint);
        this.updateMatrix();
    }

    removeControlPoint(controlPointPosition){
        this.updateMatrix();
        curvas.splice(this.points, controlPointPosition);
    }

    deCast(pontos, t, tm1) {
        let pts = [];
        if (pontos.length > 1) {
            for (let i = 0; i < pontos.length - 1; i++) {
                let b1 = pontos[i];
                let b2 = pontos[i + 1];
                let newPoint = new Point(this.context, b1.x * t + b2.x * tm1, b1.y * t + b2.y * tm1, 5);
                pts.push(newPoint);
            }
            return this.deCast(pts, t, tm1);
        } else {
            return pontos[0];
        }
    }

    updateMatrix() {
        for (let i = 0; i < this.controlPointsMatrix.length; i++) {
            const rows = this.controlPointsMatrix[i];
            for (let j = 0; j < rows.length; j++) {
                this.controlPointsMatrix[i][j] = -1;
            }
        }
        for (let index = 0; index < this.points.length; index++) {
            const point = this.points[index];
            for (let x = point.x - this.pointSize; x <= point.x + this.pointSize; x++) {
                for (let y = point.y - this.pointSize; y <= point.y + this.pointSize; y++) {
                    this.controlPointsMatrix[x][y] = index;
                }
            }
        }
    }
}