import {ui} from './../ui/layaMaxUI'

export default class alertView extends ui.test.rankingUI{
    private rank
    private openData
    constructor(){
        super()
        this.onAwake = this.awake


        this.openData = window["wx"].getOpenDataContext();

        Laya.Browser.window.sharedCanvas.width = this.stage.width;
        Laya.Browser.window.sharedCanvas.height = this.stage.height;
        // console.log('________'+Laya.Browser.window.sharedCanvas.width)
        this.openData.postMessage({
            command:"loadRes"
        })



        this.rank = new Laya.Sprite();
        this.addChild(this.rank);

    }
    private awake (){

        if (Laya.Browser.onWeiXin) {
       
            // var wx = Laya.Browser.
            this.openData.postMessage({
                command:'open'
            });

            //alwaysChange = true不好用了 手动刷新
            Laya.timer.once(500, this, () => {
                var texture2D = new Laya.Texture2D();
                texture2D.loadImageSource(Laya.Browser.window.sharedCanvas, true);
                var texture = new Laya.Texture(texture2D);
                //texture.bitmap.alwaysChange = true;
                this.rank.graphics.clear();
                this.rank.graphics.drawTexture(texture, 0, 0, texture.width, texture.height);
            });
            
        }


        this.closeRanking.on('click',this,()=>{
            this.close()
            this.openData.postMessage({
                command:'close'
            });
        })
    }
}