import { ui } from '../ui/layaMaxUI'
 import alertUI from './alertUI'

export default class HomeUI extends ui.test.signUIUI {
    private alertUI
    constructor() {
        super()
        console.log("signUI加载中")
        this.alertUI =  new alertUI()
        this.onAwake = this.awake
    }
    private awake() {    
        Laya.loader.load(["res/atlas/main.atlas",], Laya.Handler.create(this, this.onLoaded));
        this.buttonSignClick.on('click', this, () => {
            this.onLoaded("post")
        })
    }
    private onLoaded(type1) {
        let poneType = "get"
        console.log(type1)
        if (type1 == "post") {
            poneType = type1
        }
        var domain = "https://vetreska.apple.hi.cn/"
        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, this.completeHandler);
        xhr.once(Laya.Event.ERROR, this, this.errorHandler);
        xhr.on(Laya.Event.PROGRESS, this, this.processHandler);
        xhr.send(domain + "api/regist/regist", null, poneType, "json", ["Authorization", "b2NhWDE1Vk1OS0xsM0NyamgxNHRHcjFCS0o4OA=="]);
    }
    private processHandler(data: any): void {
        console.log(data);
    }
    private errorHandler(data: any): void {
        console.log(data)
    }
    private completeHandler(e: any): void {
        console.log(e)
        if (e instanceof Array) {
            console.log('我加载数据')
            e.forEach((item, index) => {
                if (item.isRegist) {
                    this[`no${item.day}`].graphics.clear();
                    var texture: Laya.Texture = Laya.loader.getRes(`main/yes${item.day}.png`);
                    this[`no${item.day}`].loadImage(`main/yes${item.day}.png`);
                }
            });
        }else {
            console.log('亲到请求')
            Laya.timer.callLater(this,function(){
                console.log(this.alertUI.inputAlert)
                this.alertUI.inputAlert.text = e.msg
                this.alertUI.popup(false,true)
            })
        }

    }
}