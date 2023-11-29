import { WaveGroup } from "./wavegroup.js";

class App {
    constructor() { //캔버스 생성 -> 바디에 추가
        this.canvas = document.createElement('canvas'); 
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.WaveGroup = new WaveGroup();

        window.addEventListener('resize', this.resize.bind(this), false); //스크린 사이즈 가져오기 위해 resize 이벤트 걸어줌
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2; //캔버스 사이즈 2배로 해서 선명하게 보여줌
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.WaveGroup.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.WaveGroup.draw(this.ctx);
        //console.log("111");
        requestAnimationFrame(this.animate.bind(this));
    }
}

//캔버스 깨끗하게 지워줌
window.onload = () => {
    new App();
};
