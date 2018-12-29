import {ui} from './../ui/layaMaxUI'

export default class gaemoverUI extends ui.test.gameoverUI{
    constructor(){
        super()
        this.onAwake = this.awake
    }
    private awake (){
        console.log('游戏结束')
    }

    private setdata() {

        var domain = "https://vetreska.apple.hi.cn/"
        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, this.completeHandler);
        xhr.once(Laya.Event.ERROR, this, this.errorHandler);
        xhr.on(Laya.Event.PROGRESS, this, this.processHandler);
        xhr.send(domain + "api/regist/regist", null, 'post', "json", ["Authorization", "b2NhWDE1Vk1OS0xsM0NyamgxNHRHcjFCS0o4OA=="]);
    }

    
    private processHandler(data: any): void {
        console.log(data);
    }
    private errorHandler(data: any): void {
        console.log(data)
    }
    private completeHandler(e: any): void {
        console.log(e)
    }
}