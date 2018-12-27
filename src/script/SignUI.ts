import {ui} from './../ui/layaMaxUI'

export default class HomeUI extends ui.test.signUIUI{
    constructor(){
        super()
        console.log("signUI加载中")
        this.onAwake = this.awake
       
    }
    private awake(){
        Laya.loader.load("res/atlas/ui.atlas", Laya.Handler.create(this, this.onLoaded));
    
    }
    private onLoaded(){
        this.no1.on("click",this,()=>{
            console.log(this.no1)
            // this.no1.texture.url = "/main/yes1.png"
            this.no1.graphics.clear();
            var texture: Laya.Texture = Laya.loader.getRes("main/yes1.png");
            this.no1.loadImage('main/yes1.png');

        })
    }
}