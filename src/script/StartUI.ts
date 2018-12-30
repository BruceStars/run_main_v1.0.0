import { ui } from './../ui/layaMaxUI'

export default class startUI extends ui.test.StartUI {
    constructor() {
        super()
        this.onAwake = this.awake
        this.login()
        
        let back =  Laya.LocalStorage.getItem("back")
        console.log(back)
        if(back){
            console.log(")000000000")
            Laya.Scene.open("test/TestScene.json");
            Laya.LocalStorage.removeItem("back")
        }
       
    }

    private awake() {
        console.log("开始页面加载完成")
      
       
    }

    private login() {
        var that = this
        var domain = "https://vetreska.apple.hi.cn/"
        if (Laya.Browser.onMiniGame) {
            var wx = Laya.Browser.window.wx;
            wx.login({
                success(res) {
                    if (res.code) {
                        // 发起网络请求
                        wx.request({
                            url: domain + 'api/user/login',
                            data: {
                                code: res.code
                            },
                            success(result) {
                                var auth = result.header['Authorization']
                                console.log(auth)
                                wx.setStorage({
                                    key: 'auth',
                                    data: auth,
                                    success(res) {
                                        console.log("数据保存成功")
                                        that.buttonStart.on('click', that, () => {
                                            console.log('开始游戏')
                                            Laya.Scene.open("test/TestScene.json");
                                            that.removeSelf();
                                        })
                                    }
                                })
                            },
                            fail(result) {
                                console.log('登录失败！' + result.errMsg)
                            }
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                },
                fail(error) {
                    console.log(error)
                }
            })
        }else{
            console.log("请在微信环境中登陆")
            that.buttonStart.on('click', that, () => {
                console.log('开始游戏')
                Laya.Scene.open("test/TestScene.json");
                that.removeSelf();
            })
        }
    }
    // private onpp() {
    //     this.startButton.on(("click"),this,()=>{
    //         Laya.Scene.open("test/TestScene.json");
    //         this.removeSelf();
    //     })
    // }
}