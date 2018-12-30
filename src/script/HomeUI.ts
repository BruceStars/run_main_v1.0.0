import { ui } from './../ui/layaMaxUI'
import alertUI from './alertUI'
import signUI from './SignUI'
import rankingUI from './rankingUI'

export default class HomeUI extends ui.test.HomeUI {
    private signUI
    private ranking
    private authority
    private wx
    constructor() {
        super()
        console.log("homeUI加载中")
        console.log(Laya.Browser.onMiniGame)
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
                    that.onAwake = that.awake
                },
                fail(err) {
                    console.log("没有获取到缓存")
                    console.log(err)
                }
            })
        } else {
            console.log('不是在微信下游戏中无法加载数据')
        }

        
        //实例化签到
        this.signUI = new signUI()
        //实例化排行版
        this.ranking = new rankingUI()
    }
    private awake() {

        if(this.authority){
            console.log("+++++++++")
            this.getData()
        }


        this.buttonRanking.on('click', this, () => {
            this.ranking.popup(false, true)
        })

        this.buttonSign.on('click', this, () => {
            this.signUI.popup(false, true)
        })
    }
    private getData(){
        var domain = "https://vetreska.apple.hi.cn/"
        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, this.completeHandler);
        xhr.once(Laya.Event.ERROR, this, this.errorHandler);
        xhr.on(Laya.Event.PROGRESS, this, this.processHandler);
        xhr.send(domain + "api/coin/coin", "", 'get', "json", ["Authorization", this.authority]);
    }
    private processHandler(data: any): void {
        console.log(data);
    }
    private errorHandler(data: any): void {
        console.log(data)
    }
    private completeHandler(e: any): void {
        console.log(e)
        console.log(e.coin)
        this.inputMoney.text = e.coin
        this.inputDistance.text = `历史最高记录：` +  e.distance
    }
}