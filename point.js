export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.1;
        this.cur = index;
        this.max = Math.random() * 100 + 150; //얼마큼 움직일것인가에 대한 값
    }

    update() {
        this.cur += this.speed; //현재값을 speed 만큼 증가
        this.y = this.fixedY + (Math.sin(this.cur) * this.max); //sin 함수 아래위로 움직일 수 있게 값 설정
    }
}