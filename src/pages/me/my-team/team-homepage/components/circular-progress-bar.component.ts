/**
 * Created by allenou on 2017/3/20.
 */
import { Component, Input } from '@angular/core';

@Component({
    selector: 'circular-progress-bar',
    template: `
              <canvas></canvas>
    `
})
export class CircularProgressBarComponent {
    @Input() opts: Array<any>;
    canvasSize;
    ngOnInit() {
        let canvas = document.querySelectorAll('canvas');
        let opts = this.opts;
        for (let i = 0; i < canvas.length; i++) {
            this.drawBar(canvas[i], opts[i]);
        }
    }

    drawBar(canvas, opts) {
        let context = canvas.getContext('2d');
        let wdpr = window.devicePixelRatio;  
        let dpr = parseInt(document.getElementsByTagName('html')[0].getAttribute('data-dpr'));
        let clientWidth = document.documentElement.clientWidth;
        let canvasWidth = Math.floor(clientWidth * 45 * wdpr / 720);
        let radius = canvasWidth * 0.8 * 0.5;
        let fontSize = 13 * dpr + 'px';
        canvas.setAttribute('width', canvasWidth + 'px');
        canvas.setAttribute('height', canvasWidth + 'px');

        context.translate(canvasWidth / 2, canvasWidth / 2);
        context.beginPath();
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
        context.lineWidth = opts.border;
        context.strokeStyle = "#eee";
        context.stroke();

        //context.font = 'bold +"13 * dpr"+ Arial';
        context.font = `bold ${fontSize} Arial`;
        context.textAlign = "center";
        context.textBaseline = 'middle';

        context.fillStyle = opts.color;
        context.fillText(`${opts.percent}%`, 0, 2);
        let start = 0,
            end = 0;
        context.beginPath();
        context.arc(0, 0, radius, -90 * Math.PI / 180, (opts.percent * 3.6 - 90) * Math.PI / 180, false);
        context.lineWidth = opts.border;
        context.strokeStyle = opts.color;
        context.stroke();


    }
    // drawProgressBar(target, opts) {
    //     let context = target.getContext('2d');

    //     let clientWidth = document.documentElement.clientWidth;
    //     this.canvasSize = Math.floor(clientWidth * opts.size / 720);
    //     let radius = this.canvasSize * 0.7 * 0.5;
    //     console.log(radius)
    //     context.translate(this.canvasSize / 2, this.canvasSize / 2);
    //     target.width = this.canvasSize;
    //     target.height = this.canvasSize;

    //     context.beginPath();
    //     // 坐标移动到圆心  
    //     context.moveTo(radius, radius);
    //     context.arc(radius, radius, radius, 0, Math.PI * 2, false);
    //     context.closePath();
    //     // 填充颜色  
    //     context.fillStyle = '#ddd';
    //     context.fill();

    //     // 画进度  
    //     context.beginPath();
    //     // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
    //     context.moveTo(radius, radius);
    //     // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
    //     context.arc(radius, radius, radius, -90 * Math.PI / 180, (opts.percent * 3.6 - 90) * Math.PI / 180, false);
    //     context.closePath();
    //     context.fillStyle = opts.color;
    //     context.fill();

    //     // 画内部空白  
    //     context.beginPath();
    //     context.moveTo(radius, radius);
    //     context.arc(radius, radius, radius - opts.border, 0, Math.PI * 2, true);
    //     context.closePath();
    //     context.fillStyle = 'rgba(255,255,255,1)';
    //     context.fill();

    //     //文字
    //     context.font = "bold 9pt Arial";
    //     context.fillStyle = opts.color;
    //     context.textAlign = 'center';
    //     context.textBaseline = 'middle';
    //     context.moveTo(radius, radius);
    //     context.fillText(`${opts.percent}%`, radius, radius);
    // }

}
