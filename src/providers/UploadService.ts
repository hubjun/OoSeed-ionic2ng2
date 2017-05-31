/**
 * Created by allenou on 2017/3/13.
 */
import { Injectable } from '@angular/core';
import { ToolsService } from './ToolsService';
@Injectable()
export class UploadService {
    constructor(public toolsService: ToolsService) { }
    /**
   * @description 图片格式检测
   * @param 图片流
   */
    imageFormatCheck(file: any) {
        if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) {
            this.toolsService.showToast('不支持该文件格式', 1500)
            return
        }
    }
    /**
    * @description 图片压缩
    * @param 图片流
    * @param 图片格式
    */
    imageCompression(image, fileType) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d')

        canvas.width = image.width
        canvas.height = image.heightight

        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

        let compressedBase64 = canvas.toDataURL(fileType, 0.2)
        canvas = ctx = null
        return compressedBase64
    }
    /**
      * @description 图片预览
      * @param 图片流
      */
    picturePreview(file: any) {
        let result
        let reader = new FileReader()
        let maxSize = 200 * 1024

        reader.onload = function () {
            result = this.result
            //超过指定大小时先压缩
            // if (result.length >= maxSize) {
            //     let image = new Image()
            //     image.src = result
            //     image.onload = function () {
            //         result = _this.imageCompression(image, file.type); //压缩
            //         // image = null
            //     }
            // }

            return result
        }
        reader.readAsDataURL(file)
    }
}