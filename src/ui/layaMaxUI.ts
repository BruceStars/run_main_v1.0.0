/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
export module ui.test {
    export class HomeUI extends View {
		public buttonRanking:Laya.Button;
		public buttonSign:Laya.Button;
		public buttonStart:Laya.Button;
		public inputMoney:Laya.TextInput;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("test/Home");
        }
    }
    export class StartUI extends View {
		public buttonStart:Laya.Sprite;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("test/Start");
        }
    }
    export class TestSceneUI extends Scene {
		public progressBox:Laya.Box;
		public progressIng:Laya.ProgressBar;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("test/TestScene");
        }
    }
    export class alertUI extends Dialog {
		public inputAlert:Laya.TextInput;
		public closeAlert:Laya.Button;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("test/alert");
        }
    }
    export class signUIUI extends Dialog {
		public no1:Laya.Sprite;
		public no2:Laya.Sprite;
		public no3:Laya.Sprite;
		public no4:Laya.Sprite;
		public no5:Laya.Sprite;
		public no6:Laya.Sprite;
		public no7:Laya.Sprite;
		public buttonSignClick:Laya.Button;
		public buttonSignClose:Laya.Button;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("test/signUI");
        }
    }
}