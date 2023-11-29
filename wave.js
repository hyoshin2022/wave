import {
    Point
} from './point.js';

export class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }
                                        //애니메이션 만들 때 가장 중요한것은 내가 그리고자 하는 애니메이션의 좌표값을 가져오는 것
    resize(stageWidth, stageHeight) { //스테이지넓이, 스테이지높이
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2; //화면 중간에 설정하기 위한 값
        this.centerY = stageHeight / 2;
        
        // point 넓이
        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init(); //리사이즈가 실행 된 다음 진행
    }

    init() {
        this.points = [];

        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY
            );
            this.points[i] = point;
        }
    }

    draw(ctx) { //캔버스 그리는 함수
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 0; i < this.totalPoints; i++) {
            if (i < this.totalPoints - 1) {
                this.points[i].update();
            }

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            //ctx.lineTo(cx, cy); // 직선
            ctx.quadraticCurveTo(prevX, prevY, cx, cy); //커브

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }
}