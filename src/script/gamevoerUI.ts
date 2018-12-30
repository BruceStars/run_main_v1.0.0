import {ui} from './../ui/layaMaxUI'
import HomeUI from './HomeUI'

export default class gaemoverUI extends ui.test.gameOverGGUI{
    private home
    private wx
    private authority
    constructor(){
        super()
        this.onOpened = this.openCod
    }
    private awake (){
        
        this.home = new HomeUI()

        this.overBackButton.on("click",this,()=>{
            // Laya
            Laya.LocalStorage.setItem("back","true")
            console.log(Laya.stage)
            Laya.Browser.window.location.reload();
            
        })

        console.log("+++++++++++++++")
        this.setdata()
    }

    private openCod (){
        console.log("_________________")
        console.log(this.overGetDistance.text)
        console.log(this.overGetMoney.text)

        if (Laya.Browser.onMiniGame) {
            let that  = this
            this.wx = Laya.Browser.window.wx;
            console.log('sdfsdfsdfsfsfds')
            this.wx.getStorage({
                key: 'auth',
                success(res) {
                    console.log("权限验证未")
               
                    that.authority = res.data
                    console.log(that.authority)
                    //检测加载
                    that.awake()
                },
                fail(err) {
                    console.log("没有获取到缓存")
                    console.log(err)
                }
            })
        } else {
            console.log('不是在微信下游戏中无法加载数据')
        }




        if (Laya.Browser.onMiniGame) {
            var wx = Laya.Browser.window.wx;
            wx.setUserCloudStorage({
                KVDataList: [{ key: 'score', value: this.overGetDistance.text }],
                success: res => {
                    console.log(res);
                },
                fail: res => {
                    console.log(res);
                }
            });
        }
    }

    private setdata() {
        console.log("设置数据")
        console.log("icon: " + this.overGetMoney.text)
        console.log("distence: " + this.overGetDistance.text)
        var domain = "https://vetreska.apple.hi.cn/"
        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, this.completeHandler);
        xhr.once(Laya.Event.ERROR, this, this.errorHandler);
        xhr.on(Laya.Event.PROGRESS, this, this.processHandler);
        xhr.send(domain + "api/coin/coin", {coin:this.overGetMoney.text,distance:this.overGetDistance.text}, 'post', "json", ["Authorization", this.authority]);
    }

    
    private processHandler(data: any): void {
        console.log(data);
    }
    private errorHandler(data: any): void {
        console.log(data)
    }
    private completeHandler(e: any): void {
        console.log("UI++++++++=")
        console.log(e)
    }
}