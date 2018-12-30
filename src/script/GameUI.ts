import { ui } from './../ui/layaMaxUI';
import HomeUI from './HomeUI';
// import StartUI from './StartUI'
import { BallScript } from "./BallScript";
import { CarScript } from "./CarScript";
import { CoinScript } from "./CoinScript";
import { RocketScript } from "./RocketScript";
import { XTSScript } from "./XTSScript";

import gameoverUI from './gamevoerUI'


var x = 0;
var y = 0;
var c = 0;
var a = -5;
var b = 0;
var c = 0;
var r = 0;
var centerX = 0;
var loadLength = 0;
var distanceTotal = 0.0;
var distanceBuildTotal = 0.0;
var buildZ = 160;
var left = [["0", "1", "2"], ["0", "1", "2"], ["0", "0", "0"], ["0", "1", "0"], ["0", "3", "3"], ["1", "3", "2"], ["1", "0", "3"], ["1", "3", "4"], ["0", "4", "4"], ["0", "4", "1"], ["0", "5", "3"]];
var center = [["1", "0", "0"], ["2", "0", "1"], ["2", "0", "1"], ["2", "1", "0"], ["3", "0", "3"], ["3", "1", "3"], ["3", "0", "0"], ["4", "1", "4"], ["4", "1", "2"], ["0", "0", "4"], ["5", "0", "5"], ["5", "1", "5"], ["3", "1", "5"]];
var right = [["2", "2", "0"], ["2", "2", "1"], ["1", "2", "0"], ["2", "1", "0"], ["3", "3", "0"], ["3", "1", "0"], ["1", "3", "1"], ["4", "1", "0"], ["4", "4", "0"], ["2", "4", "1"], ["5", "5", "1"], ["1", "5", "1"]];
var obstacleTotal = [];
var obstacleSpride = [];
//1 钟  2 icbc
var buildingRandomArr = ["0", "1", "2", "3"];
var leftBd = -120;
var rightBd = -120;
var buildingArr = [];
var build3DArr = [];

var roadArr = [];
var rocketCoinArr = [];
var roadCurrent = 0;
var roadTotal = 0;
var roadChangeNumber = -273;
var lightArr = [];
var lightTotal = -120;
var lightDistance = 136;
var rocketState = false;
var rocketTotal = 0;
var gameIsOver = false;
var directionInt = 1;
var xiahuaState = 0;
var tiaoState = 0;
var xitieshiState = false;
var xitieshiDistance = 0;
var coinTotalArr = [];
var gameStartArr = [];
var score = 0;

/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    public camera: Laya.Camera;
    public man: Laya.MeshSprite3D;
    public taxi: Laya.MeshSprite3D;
    public coin: Laya.MeshSprite3D;
    public zhongBuilding: Laya.MeshSprite3D;
    public txt: Laya.Text;
    // public scene: Laya.Scene3D;
    public bigTaxi: Laya.MeshSprite3D;
    public icbc: Laya.MeshSprite3D;
    public guoqi: Laya.MeshSprite3D;
    public zgh: Laya.MeshSprite3D;
    public chinaBank: Laya.MeshSprite3D;
    public tree: Laya.MeshSprite3D;
    public lamp: Laya.MeshSprite3D;
    public rocket: Laya.MeshSprite3D;
    public rocketing: Laya.MeshSprite3D;
    public houtuidog: Laya.MeshSprite3D;
    public xiahuadog: Laya.MeshSprite3D;
    public tiaodog: Laya.MeshSprite3D;
    public feidog: Laya.MeshSprite3D;
    public bus: Laya.MeshSprite3D;
    public zhangaiwu: Laya.MeshSprite3D;
    public xitieshi: Laya.MeshSprite3D;
    public gouyaowei: Laya.MeshSprite3D;
    public renwu: Laya.MeshSprite3D;
    public sceneRun: Laya.Scene3D;

    private inView: HomeUI//home
    private gameingUI
    private gameOverUI

    private getMoney
    //适配模式
    private modes: string = "full"
    constructor() {
        super()
        // Laya.Shader3D.debugMode = true;

        //初始化引擎
        // Laya3D.init(0, 0);
        // //适配模式
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        // Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        // Laya.URL.basePath = "https://img.apple.hi.cn/";
        // //设置适配模式
        // Laya.stage.scaleMode = this.modes;
        // //设置舞台背景色
        // Laya.stage.bgColor = "#ffffff";
        //实例一个背景



        // var img: Laya.Image = new Laya.Image();
        // img.pos(0, 0);
        // img.skin = "start/loadingBg.jpg";
        // img.width = Laya.Browser.width;
        // img.height = Laya.Browser.height;
        // Laya.stage.addChild(img);

        // var btn: Laya.Image = new Laya.Image();
        // btn.width = Laya.Browser.width / 3;

        // btn.height = Laya.Browser.width / (3 * 1891 / 629);
        // btn.skin = "start/startButton.png";

        // btn.pos(Laya.Browser.width / 3, Laya.Browser.height * 4 / 5 - 100);
        // Laya.stage.addChild(btn);
        // btn.on('click', this, function aaa() {
        //     Laya.stage.removeChild(btn);
        //     Laya.stage.removeChild(img);

        // });

        this.gameInit();

    }


    private gameInit() {

        var mainArr = [{ url: "res/dimian12/layaScene.lh" },
        { url: "res/bigTaxi3/layaScene.lh" },
        { url: "res/taxi6/layaScene.lh" },
        { url: "res/zhong/layaScene.lh" },
        { url: "res/guoqi/layaScene.lh" },
        { url: "res/icbc/layaScene.lh" },
        { url: "res/dog1312311/layaScene.lh" },
        { url: "res/coin/layaScene.lh" },
        { url: "res/zgh/layaScene.lh" },
        { url: "res/chinaBank/example.lh" },
        { url: "res/newtree/layaScene.lh" },
        { url: "res/light/layaScene.lh" },
        { url: "res/rocket/layaScene.lh" },
        { url: "res/houtui/layaScene.lh" },
        { url: "res/xiahua/layaScene.lh" },
        { url: "res/goutiao/layaScene.lh" },
        { url: "res/goufei/layaScene.lh" },
        { url: "res/newtaxi1/layaScene.lh" },
        { url: "res/newtaxi2/layaScene.lh" },
        { url: "res/newtaxi3/layaScene.lh" },
        { url: "res/lumian/layaScene.lh" },
        { url: "res/zhangaiwu/layaScene.lh" },
        { url: "res/newcoin/layaScene.lh" },
        { url: "res/xitieshi/layaScene.lh" },
        { url: "res/guopao/layaScene.lh" },
        { url: "res/gouyaowei/layaScene.lh" },
        { url: "res/newrenwu1/layaScene.lh" },
        { url: "res/lujiazui3/layaScene.lh" },
        { url: "res/newrenwupao/layaScene.lh" }];




        //开启统计信息
        // Laya.Stat.show();

        //添加3D场景-----------------------
        this.sceneRun = new Laya.Scene3D();
        Laya.stage.addChild(this.sceneRun);

        Laya.URL.basePath = "https://img.apple.hi.cn/";
        Laya.LocalStorage.setItem("score", "0");
        Laya.LocalStorage.setItem("gameover", "no");
        Laya.loader.create(mainArr, Laya.Handler.create(this, this.onloadFinish), Laya.Handler.create(this, this.onloadProgress));//加函数完成

        // Laya.loader.create("res/lajiche/layaScene.lh",Laya.Handler.create(this,function(p){
        //     //实例化加载并创建好的3D对象
        //     var road:Laya.MeshSprite3D = Laya.loader.getRes("res/lajiche/layaScene.lh");
        //     // road.addComponent(CarScript);
        //    road.transform.position = new Laya.Vector3(-3.5,8,-200);
        //    road.transform.scale = new Laya.Vector3(2,2,2);
        //    road.name = "car";
        // //    scene.addChild(road);
        //    }));
        //建筑群


        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, function aaa() {

            x = Laya.stage.mouseX;
            y = Laya.stage.mouseY;


            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.bbb);

        });
    }//结束

    //进度条显示
    private onloadProgress(onloadIng) {
        console.log(Math.floor(onloadIng.toFixed(2) * 555))
        let proData = onloadIng
        this.ProgressBar.value = proData
        if (proData == 1) {
            console.log("隐藏加载页")
            this.boxProgress.visible = false
            //加载场景
            // Laya.stage.addChild(this.sceneRun);
        }
    }

    private onloadFinish() {
        // var btn: Laya.Button = new Laya.Button();
        // //将Button添加到舞台上
        // Laya.stage.addChild(btn);
        // //设置Button相关属性
        // btn.width = 200;
        // btn.height = 100;
        // btn.pos(500, 100, false);

        // btn.label = "开始游戏";
        // btn.on('click', this, this.transiton);


        //
        this.gameingUI = new ui.test.gameingUIUI()


        //创建摄像机(横纵比，近距裁剪，远距裁剪)-----
        this.camera = new Laya.Camera(0, 1, 1000);
        //加载到场景
        this.sceneRun.addChild(this.camera);
        //移动摄像机位置
        this.camera.transform.position = new Laya.Vector3(-22, 4, 28.5 + a);
        //旋转摄像机角度
        this.camera.transform.rotate(new Laya.Vector3(6.5, 90, 0), false, false);


        this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;


        Laya.BaseMaterial.load("res/DawnDuskSky/SkyBox.lmat", Laya.Handler.create(this, function (mat) {

            var skyRenderer = new Laya.SkyRenderer();
            skyRenderer.mesh = Laya.SkyBox.instance;
            skyRenderer.material = mat;
            this.camera.skyRenderer = skyRenderer;

        }));





        //创建方向光 ------------------------
        var light: Laya.DirectionLight = this.sceneRun.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //移动灯光位置
        light.transform.translate(new Laya.Vector3(0, 2, 5));
        //调整灯光方向
        light.transform.worldMatrix.setForward(new Laya.Vector3(0.5, -1, 0));
        //设置灯光漫反射颜色
        light.diffuseColor = new Laya.Vector3(0.3, 0.3, 0.3);
        //设置灯光环境色
        this.sceneRun.ambientColor = new Laya.Vector3(1.0, 1.0, 1.0);


        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, function aaa() {

            x = Laya.stage.mouseX;
            y = Laya.stage.mouseY;


            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.bbb);

        });




        this.HomeView(); //加载homeui


        Laya.timer.callLater(this, () => {
            this.gameOverUI = new gameoverUI()
        })




        this.dimianLoad();
        this.bigTaxiLoad();
        this.taxiLoad();
        this.zhongLoad();
        this.guoqiLoad();
        this.icbcLoad();

        this.coinLoad();
        this.dogLoad();
        this.zghLoad();
        this.chinaBankLoad();
        this.treeLoad();
        this.lightLoad();
        this.rocketLoad();
        this.houtuiLoad();
        this.tiaogouLoad();
        this.xiahuaLoad();
        this.goufeiLoad();
        this.busLoad();
        this.zhangaiwuLoad();
        this.xitieshiLoad();
        this.gouyaoweiLoad();
        this.renwuLoad();
        this.lujiazuiLoad();
    }
    //初始化游戏
    private HomeView() {
        this.inView = new HomeUI();
        Laya.stage.addChild(this.inView);
        // inView.popup(true) 
        console.log(this.inView)

        Laya.timer.callLater(this, () => {
            var that = this
            console.log(this.inView)



            Laya.timer.once(1000, this, () => {
                this.inView.buttonStart.on('click', this, () => {
                    console.log("afsfsdfsfdsfsdfds")
                    this.transiton()
                })
            })

            // this.inView.onAwake = function () {
            //     console.log("jiazaiwanc")
            //     // Laya.timer.once(1000,this, () => {
            //         // that.inView.buttonStart.once('click', this, () => {
            //         //     console.log("`12121")
            //         //     that.transiton()
            //         // })
            //     // })

            // }
        })




    }

    private startGame(): void {
        console.log("加载游戏")

    }

    //游戏准备  摄像机移动，
    private transiton() {

        console.log(Laya.stage)
        Laya.stage.removeChild(this.inView)

        this.gameingUI.show(false, true)




        var k = 0;
        var man = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.man, this.sceneRun, false, new Laya.Vector3(0, 0, 0))) as Laya.Sprite3D;


        man.transform.position = this.gouyaowei.transform.position;
        man.transform.scale = new Laya.Vector3(1.3, 1.3, 1.3);
        man.transform.rotate(new Laya.Vector3(0, -45, 0), true, false);
        this.sceneRun.addChild(man);

        this.gouyaowei.removeSelf();



        Laya.timer.frameLoop(1, this, function ccc() {
            k = k + 1;
            man.transform.position = new Laya.Vector3(man.transform.position.x + 0.1, man.transform.position.y, man.transform.position.z - 0.1)
            if (k == 10) {

                this.sceneRun.removeChild(this.camera);

                this.camera = new Laya.Camera(0, 5, 1000);

                this.camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
                this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
                this.sceneRun.addChild(this.camera);
                Laya.BaseMaterial.load("res/DawnDuskSky/SkyBox.lmat", Laya.Handler.create(this, function (mat) {

                    //释放处理！！！
                    var skyRenderer = new Laya.SkyRenderer();
                    skyRenderer.mesh = Laya.SkyBox.instance;
                    skyRenderer.material = mat;
                    this.camera.skyRenderer = skyRenderer;
                    Laya.timer.clear(this, ccc);
                    this.gameStart();

                    for (var i = 0; i < gameStartArr.length; i++) {
                        var sprite3d = gameStartArr[i];
                        sprite3d.removeSelf();
                    }
                }));
            }

        })

    }

    private buildingAction(lorR, number) {
        if (lorR == 0) {

            if (number == 0) {


                var zhongBuilding1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.zhongBuilding, this.sceneRun, false, new Laya.Vector3(-41, 28, leftBd - 0)));
                leftBd = leftBd - 39;
                build3DArr.push(zhongBuilding1);
            }
            else if (number == 1) {
                var icbc1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.icbc, this.sceneRun, false, new Laya.Vector3(-26, 2.2, leftBd + 15))) as Laya.Sprite3D;
                icbc1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                leftBd = leftBd - 24;
                build3DArr.push(icbc1);

            }
            else if (number == 2) {
                var guoqi1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.guoqi, this.sceneRun, false, new Laya.Vector3(-31, 1, leftBd + 18))) as Laya.Sprite3D;
                leftBd = leftBd - 23;
                guoqi1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                build3DArr.push(guoqi1);
            }
            else if (number == 3) {
                var zgh1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.zgh, this.sceneRun, false, new Laya.Vector3(-30, 1, leftBd + 19))) as Laya.Sprite3D;
                zgh1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                leftBd = leftBd - 24;
                build3DArr.push(zgh1);
            } else if (number == 4) {
                var chinaBank1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.chinaBank, this.sceneRun, false, new Laya.Vector3(-29, 10, leftBd + 19))) as Laya.Sprite3D;
                chinaBank1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                leftBd = leftBd - 13;
                build3DArr.push(chinaBank1);
            }


        } else if (lorR == 1) {
            if (number == 0) {
                var zhongBuilding2 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.zhongBuilding, this.sceneRun, false, new Laya.Vector3(36, 28, rightBd - 0))) as Laya.Sprite3D;
                zhongBuilding2.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                rightBd = rightBd - 40;
                build3DArr.push(zhongBuilding2);
            }
            else if (number == 1) {
                var icbc1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.icbc, this.sceneRun, false, new Laya.Vector3(19.8, 2.2, rightBd + 4))) as Laya.Sprite3D;
                rightBd = rightBd - 25;
                build3DArr.push(icbc1);

            }
            else if (number == 2) {
                var guoqi1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.guoqi, this.sceneRun, false, new Laya.Vector3(25, 1, rightBd))) as Laya.Sprite3D;
                rightBd = rightBd - 22;

                build3DArr.push(guoqi1);
            }
            else if (number == 3) {

                var zgh1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.zgh, this.sceneRun, false, new Laya.Vector3(22, 1, rightBd))) as Laya.Sprite3D;

                rightBd = rightBd - 24;
                build3DArr.push(zgh1);
            } else if (number == 4) {
                var chinaBank1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.chinaBank, this.sceneRun, false, new Laya.Vector3(26, 10, rightBd))) as Laya.Sprite3D;

                rightBd = rightBd - 13;
                build3DArr.push(chinaBank1);
            }



        }



    }
    private lujiazuiLoad() {
        var lujiazui = Laya.loader.getRes("res/lujiazui3/layaScene.lh");
        lujiazui.transform.position = new Laya.Vector3(-130, 20, 60);
        lujiazui.transform.scale = new Laya.Vector3(5, 5, 5);
        this.sceneRun.addChild(lujiazui);
        gameStartArr.push(lujiazui);
    }
    private renwuLoad() {
        this.renwu = Laya.loader.getRes("res/newrenwu1/layaScene.lh");
        this.renwu.transform.position = new Laya.Vector3(-39.3, 1.5, 26);
        this.renwu.transform.scale = new Laya.Vector3(1, 1, 1);
        this.renwu.transform.rotate(new Laya.Vector3(0, 90, 0), true, false);
        this.sceneRun.addChild(this.renwu);
        gameStartArr.push(this.renwu);
    }
    private gouyaoweiLoad() {
        this.gouyaowei = Laya.loader.getRes("res/gouyaowei/layaScene.lh");
        this.gouyaowei.transform.position = new Laya.Vector3(-29.5, 0.9, 22);
        this.gouyaowei.transform.scale = new Laya.Vector3(1.2, 1.2, 1.2);
        this.gouyaowei.transform.rotate(new Laya.Vector3(0, 90, 0), true, false);
        this.sceneRun.addChild(this.gouyaowei);
        gameStartArr.push(this.gouyaowei);

    }


    private xitieshiLoad() {
        this.xitieshi = Laya.loader.getRes("res/xitieshi/layaScene.lh");
        this.xitieshi.transform.position = new Laya.Vector3(-10, 3, -10);
        this.xitieshi.transform.scale = new Laya.Vector3(2, 2, 2);
        this.sceneRun.addChild(this.xitieshi);
        this.xitieshi.addComponent(Laya.PhysicsCollider);
        var rigid: Laya.Rigidbody3D = this.xitieshi.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(2, 2, 2);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;
        rigid.isTrigger = true;
        //给球添加脚本
        this.xitieshi.addComponent(XTSScript);
        //给球一个名字 方便识别
        this.xitieshi.name = "xitieshi";
    }
    private zhangaiwuLoad() {
        this.zhangaiwu = Laya.loader.getRes("res/zhangaiwu/layaScene.lh");
        this.zhangaiwu.transform.position = new Laya.Vector3(-10, 4, -30);
        this.zhangaiwu.transform.scale = new Laya.Vector3(3.2, 3.2, 3.2);
        // this.scene.addChild(this.zhangaiwu);

        this.zhangaiwu.addComponent(Laya.PhysicsCollider);


        //     var material:Laya.BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
        // //     //修改材质的反射颜色，让模型偏红
        //     material.albedoColor = new Laya.Vector4(1,0,0,1); 


        var rigid: Laya.Rigidbody3D = this.zhangaiwu.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(2, 1.4, 1.4);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;
        rigid.isTrigger = true;
        //给球添加脚本
        this.zhangaiwu.addComponent(CarScript);
        //给球一个名字 方便识别
        this.zhangaiwu.name = "障碍物";
    }
    private busLoad() {
        this.bus = Laya.loader.getRes("res/newtaxi3/layaScene.lh");
        this.bus.transform.position = new Laya.Vector3(-9, 4, -80);
        this.bus.transform.scale = new Laya.Vector3(1.8, 1.8, 1.8);
        this.bus.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        this.sceneRun.addChild(this.bus);
        this.bus.addComponent(Laya.PhysicsCollider);


        //     var material:Laya.BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
        // //     //修改材质的反射颜色，让模型偏红
        //     material.albedoColor = new Laya.Vector4(1,0,0,1); 


        var rigid: Laya.Rigidbody3D = this.bus.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(2.5, 2.5, 14.5);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;
        rigid.isTrigger = true;
        //给球添加脚本
        this.bus.addComponent(CarScript);
        //给球一个名字 方便识别
        this.bus.name = "JC";
    }
    private goufeiLoad() {
        this.feidog = Laya.loader.getRes("res/goufei/layaScene.lh");
        // console.log(this.tiaodog);
        this.feidog.transform.position = new Laya.Vector3(-3.2, 0.9, 30 + a);
        this.feidog.transform.scale = new Laya.Vector3(2.5, 2.5, 2.5);
        this.feidog.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        this.feidog.addComponent(Laya.PhysicsCollider);


        //     var material:Laya.BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
        // //     //修改材质的反射颜色，让模型偏红
        //     material.albedoColor = new Laya.Vector4(1,0,0,1); 


        var rigid: Laya.Rigidbody3D = this.feidog.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(1, 0.8, 0.8);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;
        rigid.isTrigger = true;
        //给球添加脚本
        this.feidog.addComponent(BallScript);
        //给球一个名字 方便识别
        this.feidog.name = "JC";
    }
    private tiaogouLoad() {
        this.tiaodog = Laya.loader.getRes("res/goutiao/layaScene.lh");
        // console.log(this.tiaodog);
        this.tiaodog.transform.position = new Laya.Vector3(-3.2, 0.9, 30 + a);
        this.tiaodog.transform.scale = new Laya.Vector3(2.5, 2.5, 2.5);
        this.tiaodog.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        this.tiaodog.addComponent(Laya.PhysicsCollider);


        //     var material:Laya.BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
        // //     //修改材质的反射颜色，让模型偏红
        //     material.albedoColor = new Laya.Vector4(1,0,0,1); 


        var rigid: Laya.Rigidbody3D = this.tiaodog.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(1, 0.8, 0.8);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;
        rigid.isTrigger = true;
        //给球添加脚本
        this.tiaodog.addComponent(BallScript);
        //给球一个名字 方便识别
        this.tiaodog.name = "JC";
    }
    private xiahuaLoad() {
        this.xiahuadog = Laya.loader.getRes("res/xiahua/layaScene.lh");
        this.xiahuadog.transform.position = new Laya.Vector3(-3.2, 0.9, 30 + a);
        this.xiahuadog.transform.scale = new Laya.Vector3(2.5, 2.5, 2.5);
        this.xiahuadog.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        this.xiahuadog.addComponent(Laya.PhysicsCollider);


        //     var material:Laya.BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
        // //     //修改材质的反射颜色，让模型偏红
        //     material.albedoColor = new Laya.Vector4(1,0,0,1); 


        var rigid: Laya.Rigidbody3D = this.xiahuadog.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(0.8, 0.5, 0.8);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;
        rigid.isTrigger = true;
        //给球添加脚本
        this.xiahuadog.addComponent(BallScript);
        //给球一个名字 方便识别
        this.xiahuadog.name = "JC";
    }
    private houtuiLoad() {
        //实例化加载并创建好的3D对象
        this.houtuidog = Laya.loader.getRes("res/houtui/layaScene.lh");
        // console.log(this.houtuidog);

        this.houtuidog.transform.position = new Laya.Vector3(-3.2, 0.9, 30 + a);
        this.houtuidog.transform.scale = new Laya.Vector3(2.5, 2.5, 2.5);
        this.houtuidog.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        // this.scene.addChild(this.houtuidog);

    }
    private lightLoad() {
        this.lamp = Laya.loader.getRes("res/light/layaScene.lh");
        this.lamp.transform.position = new Laya.Vector3(-18, 0, -30);
        this.lamp.transform.scale = new Laya.Vector3(0.6, 0.6, 0.6);
        this.sceneRun.addChild(this.lamp);
        var lamp1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.lamp, this.sceneRun, false, new Laya.Vector3(11, 0, -30)));

    }
    private treeLoad() {
        this.tree = Laya.loader.getRes("res/newtree/layaScene.lh");
        this.tree.transform.position = new Laya.Vector3(11, 0, -40);
        this.tree.transform.scale = new Laya.Vector3(5, 5, 5);
        this.sceneRun.addChild(this.tree);
        var tree1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.tree, this.sceneRun, false, new Laya.Vector3(-40, -9, 30)));
        var tree2 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.tree, this.sceneRun, false, new Laya.Vector3(-40, -9, 25)));
        var tree3 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.tree, this.sceneRun, false, new Laya.Vector3(-40, -9, 20)));
        var tree4 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.tree, this.sceneRun, false, new Laya.Vector3(-40, -9, 15)));
        gameStartArr.push(tree1);
        gameStartArr.push(tree2);
        gameStartArr.push(tree3);
        gameStartArr.push(tree4);
    }
    private chinaBankLoad() {
        this.chinaBank = Laya.loader.getRes("res/chinaBank/example.lh");
        this.chinaBank.transform.position = new Laya.Vector3(26, 10, -90);

        this.chinaBank.transform.scale = new Laya.Vector3(0.4, 0.4, 0.4);
        this.sceneRun.addChild(this.chinaBank);

        var chinaBank1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.chinaBank, this.sceneRun, false, new Laya.Vector3(-29, 10, -90))) as Laya.Sprite3D;
        chinaBank1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        build3DArr.push(chinaBank1);
        build3DArr.push(this.chinaBank);
    }

    private dimianLoad() {
        //实例化加载并创建好的3D对象

        var road: Laya.Sprite3D = Laya.loader.getRes("res/lumian/layaScene.lh");
        road.transform.position = new Laya.Vector3(-3, 0, 0);
        road.transform.scale = new Laya.Vector3(2.35, 2.35, 2.35);
        this.sceneRun.addChild(road);
        roadArr.push(road);

        //克隆sprite3d
        var layaMonkey_clone1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(road, this.sceneRun, false, new Laya.Vector3(-3, 0, -136.5)));
        //克隆sprite3d
        roadArr.push(layaMonkey_clone1);
        var layaMonkey_clone2 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(road, null, false, new Laya.Vector3(-3, 0, -273)));
        // camera.transform.lookAt(road.transform.position,new Laya.Vector3(0,0,0));
        roadArr.push(layaMonkey_clone2);
    }






    private bigTaxiLoad() {
        //实例化加载并创建好的3D对象
        this.bigTaxi = Laya.loader.getRes("res/newtaxi2/layaScene.lh");
        //  console.log(this.bigTaxi);
        this.bigTaxi.transform.position = new Laya.Vector3(-3.3, 2.5, -100);
        this.bigTaxi.transform.scale = new Laya.Vector3(3, 3, 3);


        this.sceneRun.addChild(this.bigTaxi);

        this.bigTaxi.addComponent(Laya.PhysicsCollider);





        var rigid: Laya.Rigidbody3D = this.bigTaxi.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(1, 0.6, 2.4);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;
        //    rigid.isTrigger = true;
        //给球添加脚本
        this.bigTaxi.addComponent(CarScript);
        //给球一个名字 方便识别
        this.bigTaxi.name = "bigtaxi";
    }



    private zghLoad() {
        this.zgh = Laya.loader.getRes("res/zgh/layaScene.lh");
        this.zgh.transform.position = new Laya.Vector3(22, 1, 10.2);
        this.zgh.transform.scale = new Laya.Vector3(0.4, 0.4, 0.4);
        this.sceneRun.addChild(this.zgh);
        // var zgh1 = this.scene.addChild(Laya.Sprite3D.instantiate(this.zgh, this.scene, false, new Laya.Vector3(-27, 1, 34.5)));
        // zgh1.transform.rotate(new Laya.Vector3(0,180,0),true,false);

        build3DArr.push(this.zgh);
    }
    private taxiLoad() {
        //实例化加载并创建好的3D对象
        this.taxi = Laya.loader.getRes("res/newtaxi1/layaScene.lh");
        //  console.log(this.taxi);
        this.taxi.transform.position = new Laya.Vector3(4, 2, -100);
        this.taxi.transform.scale = new Laya.Vector3(2.4, 2.4, 2.4);
        this.taxi.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        this.taxi.name = "taxi";
        this.sceneRun.addChild(this.taxi);

        this.taxi.addComponent(Laya.PhysicsCollider);
        var rigid: Laya.Rigidbody3D = this.taxi.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(1, 0.5, 2.8);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;
        //    rigid.isTrigger = true;
        //给球添加脚本
        this.taxi.addComponent(CarScript);
        //给球一个名字 方便识别
        this.taxi.name = "taxi";

    }




    private zhongLoad() {
        this.zhongBuilding = Laya.loader.getRes("res/zhong/layaScene.lh");

        this.zhongBuilding.transform.position = new Laya.Vector3(-41, 28, -35);
        this.zhongBuilding.transform.scale = new Laya.Vector3(0.4, 0.4, 0.4);
        this.sceneRun.addChild(this.zhongBuilding);

        var zhongBuilding1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.zhongBuilding, this.sceneRun, false, new Laya.Vector3(36, 28, -35))) as Laya.Sprite3D;
        zhongBuilding1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        //   var zhongBuilding2 = this.scene.addChild(Laya.Sprite3D.instantiate(this.zhongBuilding, this.scene, false, new Laya.Vector3(-1, 65, 65)));
        //   zhongBuilding2.transform.scale = new Laya.Vector3(0.9,0.9,0.9);
        //   zhongBuilding2.transform.rotate(new Laya.Vector3(0,90,0),true,false);
        build3DArr.push(this.zhongBuilding);
        build3DArr.push(zhongBuilding1);
    }




    private guoqiLoad() {
        this.guoqi = Laya.loader.getRes("res/guoqi/layaScene.lh");
        this.guoqi.transform.position = new Laya.Vector3(25, 1, -14);
        this.guoqi.transform.scale = new Laya.Vector3(1, 1, 1);
        this.sceneRun.addChild(this.guoqi);

        var guoqi1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.guoqi, this.sceneRun, false, new Laya.Vector3(-25, 1, 8))) as Laya.Sprite3D;
        guoqi1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        build3DArr.push(this.guoqi);
        build3DArr.push(guoqi1)
    }



    private icbcLoad() {
        this.icbc = Laya.loader.getRes("res/icbc/layaScene.lh");
        this.icbc.transform.position = new Laya.Vector3(19.8, 2.2, -75);
        this.icbc.transform.scale = new Laya.Vector3(0.4, 0.4, 0.4);
        this.sceneRun.addChild(this.icbc);

        var zhongBuilding1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.icbc, this.sceneRun, false, new Laya.Vector3(-26, 2.2, -60))) as Laya.Sprite3D;
        zhongBuilding1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);

        build3DArr.push(this.icbc);
        build3DArr.push(zhongBuilding1);
    }




    private dogLoad() {
        //实例化加载并创建好的3D对象
        this.man = Laya.loader.getRes("res/guopao/layaScene.lh");


        this.man.transform.position = new Laya.Vector3(-3.6, 0.9, 60 + a);
        this.man.transform.scale = new Laya.Vector3(2.5, 2.5, 2.5);
        this.man.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        this.sceneRun.addChild(this.man);
        this.man.addComponent(Laya.PhysicsCollider);


        //     var material:Laya.BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
        // //     //修改材质的反射颜色，让模型偏红
        //     material.albedoColor = new Laya.Vector4(1,0,0,1); 


        var rigid: Laya.Rigidbody3D = this.man.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(1, 0.8, 0.8);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;
        rigid.isTrigger = true;
        //给球添加脚本
        this.man.addComponent(BallScript);
        //给球一个名字 方便识别
        this.man.name = "JC";




        // this.gameStart();

    }
    private gameStart() {

        Laya.timer.frameLoop(1, this, function aaa() {
            if (gameIsOver) {
                Laya.timer.clear(this, aaa);
            }
            // console.log("score:" +parseInt( Laya.LocalStorage.getItem("score")));
            if (Laya.LocalStorage.getItem("gameover") == "yes") {

                Laya.LocalStorage.setItem("gameover", "no");

                var renwupao = Laya.loader.getRes("res/newrenwupao/layaScene.lh");
                renwupao.transform.scale = new Laya.Vector3(2, 2, 2);
                renwupao.transform.position = new Laya.Vector3(0 + b, 0.9 + r, 65 + a);
                renwupao.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                this.sceneRun.addChild(renwupao);

                var kk = 0;
                var state = 0;
                var roZ = 0;

                this.sceneRun.addChild(this.houtuidog);
                this.houtuidog.transform.position = new Laya.Vector3(-3.6 + b, 0.9 + r, 30 + a);

                console.log("距离：++++++++++" + score)

                this.gameOverUI.overGetMoney.text = this.gameingUI.getMoney.text
                this.gameOverUI.overGetDistance.text = - (a + 5)

                this.gameOverUI.popup(false, true)

                gameIsOver = true;
                Laya.timer.pause();
                this.sceneRun.removeChild(this.man);
                this.sceneRun.removeChild(this.tiaodog);
                this.sceneRun.removeChild(this.xiahuadog);
                Laya.timer.resume();
                Laya.timer.frameLoop(1, this, function aaaaa() {

                    kk = kk + 1;
                    a = a + 0.1;

                    this.camera.transform.position = new Laya.Vector3(-3.5, 12 + r, 60 + a);



                    if (kk == 300 || kk > 300) {


                        Laya.timer.clear(this, aaaaa);

                        // Laya.Browser.window.location.reload();

                    }

                });



            }

            if (Laya.LocalStorage.getItem("xts") == "yes") {

                Laya.LocalStorage.setItem("xts", "no");


                xitieshiState = true;
            }

            if (Laya.LocalStorage.getItem("rocket") == "yes") {

                Laya.timer.pause();
                this.sceneRun.removeChild(this.man);
                this.sceneRun.addChild(this.feidog);
                Laya.timer.resume();

                rocketState = true;
                Laya.LocalStorage.setItem("rocket", "no");
                this.rocketing.transform.position = new Laya.Vector3(this.feidog.transform.position.x + 0.7, this.feidog.transform.position.y - 1, this.feidog.transform.position.z);
                this.rocketing.transform.scale = new Laya.Vector3(0.3, 0.3, 0.3);
                this.sceneRun.addChild(this.rocketing);
            }

            if (xitieshiState) {
                xitieshiDistance = xitieshiDistance + 0.5;
                for (var ee = 0; ee < coinTotalArr.length; ee++) {
                    var coinSprite: Laya.Sprite3D = coinTotalArr[ee];
                    var x1 = coinSprite.transform.position.x;
                    var y1 = coinSprite.transform.position.y;
                    var z1 = coinSprite.transform.position.z;
                    var x2;
                    var y2;
                    var z2;
                    if (rocketState) {
                        x2 = this.feidog.transform.position.x;
                        y2 = this.feidog.transform.position.y;
                        z2 = this.feidog.transform.position.z;

                    } else if (tiaoState) {
                        x2 = this.tiaodog.transform.position.x;
                        y2 = this.tiaodog.transform.position.y;
                        z2 = this.tiaodog.transform.position.z;
                    } else if (xiahuaState) {
                        x2 = this.xiahuadog.transform.position.x;
                        y2 = this.xiahuadog.transform.position.y;
                        z2 = this.xiahuadog.transform.position.z;
                    } else {
                        x2 = this.man.transform.position.x;
                        y2 = this.man.transform.position.y;
                        z2 = this.man.transform.position.z;
                    }
                    var distance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2);
                    // console.log("距离:"+ distance);
                    if (distance < 1000 && distance > 30) {
                        coinSprite.transform.translate(new Laya.Vector3((x1 - x2) / 15, (y1 - y2) / 15 - 0.05, (z1 - z2) / 15));
                        // coinSprite.removeSelf();
                    } else if (distance < 30) {

                        coinTotalArr.splice(ee, 1);
                        coinSprite.removeSelf();
                        var score = parseInt(Laya.LocalStorage.getItem("score"));
                        var scoreAfter = score + 10;
                        Laya.LocalStorage.setItem("score", scoreAfter.toString());

                    }
                }
            }
            if (xitieshiDistance > 500) {
                xitieshiDistance = 0;
                xitieshiState = false;
            }
            if (rocketState) {
                this.rocketing.transform.position = new Laya.Vector3(this.feidog.transform.position.x + 0.7, this.feidog.transform.position.y - 1, this.feidog.transform.position.z);
                r = 10;
                rocketTotal = rocketTotal + 0.5;
                if (rocketTotal > 500) {
                    Laya.timer.pause();
                    this.sceneRun.addChild(this.man);
                    this.sceneRun.removeChild(this.feidog);
                    Laya.timer.resume();

                    rocketTotal = 0;
                    rocketState = false;
                    this.sceneRun.removeChild(this.rocketing)
                    r = 0;
                    for (var i = 0; i < rocketCoinArr.length; i++) {
                        var sprite1: Laya.Sprite3D = rocketCoinArr[i];
                        sprite1.removeSelf();

                    }
                    rocketCoinArr.splice(0, rocketCoinArr.length);
                }
            }
            if (rocketState) {
                this.feidog.transform.position = (new Laya.Vector3(-3.8 + b, 0.9 + c + r, 26 + (a -= 0.5)));
            } else
                if (tiaoState == 1) {
                    this.tiaodog.transform.position = (new Laya.Vector3(-3.8 + b, 0.9 + c + r, 26 + (a -= 0.5)));
                } else
                    if (xiahuaState == 1) {
                        this.xiahuadog.transform.position = (new Laya.Vector3(-3.8 + b, 0.9 + c + r, 26 + (a -= 0.5)));
                    } else {
                        this.man.transform.position = (new Laya.Vector3(-3.6 + b, 0.9 + c + r, 30 + (a -= 0.5)));
                    }
            //160
            // camera.transform.lookAt(this.man.transform.position,new Laya.Vector3(0,0,0));
            if (!gameIsOver) {
                this.camera.transform.position = new Laya.Vector3(-3.5, 12 + r, 60 + a);
            }
            //  rigid.applyForce(new Laya.Vector3(0,0,-50),null);

            // this.txt.text  = obstacleTotal.length;

            distanceTotal = distanceTotal + 0.5;
            lightDistance = lightDistance + 0.5;
            distanceBuildTotal = distanceBuildTotal + 0.5;
            score = parseInt(Laya.LocalStorage.getItem("score")) / 10;

            // this.txt.text = "测试分数:" + score;
            //单局获取金币
            this.gameingUI.getMoney.text = score
            // this.getMoney = this.gameingUI.getMoney.text
            //单局距离
            this.gameingUI.getScore.text = "得分：" + Math.round(-(a + 5))

            if (distanceTotal > 50 || distanceTotal == 50) {
                buildZ = buildZ + 50;
                distanceTotal = 0.0
                if (!rocketState) {
                    this.buildObstacleAction();
                } else {
                    this.rocketBuildAction();
                }


            }
            if (lightDistance > 136.5 || lightDistance == 136.5) {

                lightDistance = 0;
                this.buildLightAction();
            }
            if (distanceBuildTotal > 25.5 || distanceBuildTotal == 25.5) {
                distanceBuildTotal = 0.0;

                this.buildingRandomAction();

            }
            roadTotal = roadTotal + 0.5;
            if (roadTotal > 136) {
                roadTotal = 0;

                var roadSprite: Laya.Sprite3D = roadArr[roadCurrent];
                roadSprite.transform.position = new Laya.Vector3(-3, 0, roadChangeNumber -= 136.5);


                roadCurrent = roadCurrent + 1;
                if (roadCurrent == 3) {
                    roadCurrent = 0;
                }
            }

        });
    }
    private rocketBuildAction() {
        var i = Math.round(Math.random() * (3 - 1));
        let offsetX = -9 + i * 6;
        var coin1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2 + r, -(buildZ - 120))))
        var coin2 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2 + r, -(buildZ - 110))))
        var coin3 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2 + r, -(buildZ - 100))))
        var coin4 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2 + r, -(buildZ - 90))))
        var coin5 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2 + r, -(buildZ - 80))))
        rocketCoinArr.push(coin1);
        rocketCoinArr.push(coin2);
        rocketCoinArr.push(coin3);
        rocketCoinArr.push(coin4);
        rocketCoinArr.push(coin5);
        coinTotalArr.push(coin1);
        coinTotalArr.push(coin2);
        coinTotalArr.push(coin3);
        coinTotalArr.push(coin4);
        coinTotalArr.push(coin5);
    }
    private rocketLoad() {
        this.rocket = Laya.loader.getRes("res/rocket/layaScene.lh");
        this.rocket.transform.position = new Laya.Vector3(-3, 2, -15);
        this.rocket.transform.scale = new Laya.Vector3(0.12, 0.12, 0.12);

        this.sceneRun.addChild(this.rocket);

        var phy: Laya.PhysicsCollider = this.rocket.addComponent(Laya.PhysicsCollider);

        var rigid: Laya.Rigidbody3D = this.rocket.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(2, 3, 2);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;

        //给球添加脚本
        this.rocket.addComponent(RocketScript);
        //给球一个名字 方便识别
        this.rocket.name = "火箭";

        this.rocketing = Laya.Sprite3D.instantiate(this.rocket, this.sceneRun, false, new Laya.Vector3(-3, 2, 200)) as Laya.MeshSprite3D;
        this.rocketing.transform.rotate(new Laya.Vector3(-90, 0, 0), true, false);
        this.rocketing.name = "火箭1";

        this.rocket.transform.rotate(new Laya.Vector3(0, 0, 30), true, false);
    }

    private coinLoad() {
        //实例化加载并创建好的3D对象
        this.coin = Laya.loader.getRes("res/newcoin/layaScene.lh");

        this.coin.transform.position = new Laya.Vector3(-3, 2, -20);
        this.coin.transform.scale = new Laya.Vector3(3, 3, 3);
        this.coin.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        this.sceneRun.addChild(this.coin);
        coinTotalArr.push(this.coin);
        var phy: Laya.PhysicsCollider = this.coin.addComponent(Laya.PhysicsCollider);
        // console.log(this.coin);

        //     var material:Laya.BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
        // //     //修改材质的反射颜色，让模型偏红
        //     material.albedoColor = new Laya.Vector4(1,0,0,1); 


        var rigid: Laya.Rigidbody3D = this.coin.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(0.9, 0.9, 0.3);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;
        // console.log(this.coin);

        //给球添加脚本
        this.coin.addComponent(CoinScript);
        //给球一个名字 方便识别
        this.coin.name = "金币";

        var coin1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(-3, 2, -30)));
        var coin2 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(-3, 2, -40)));
        var coin3 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(-3, 2, -50)));
        var coin4 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(-3, 2, -60)));

        coinTotalArr.push(coin1);
        coinTotalArr.push(coin2);
        coinTotalArr.push(coin3);
        coinTotalArr.push(coin4);
    }


    private buildLightAction() {
        this.tree.transform.position = new Laya.Vector3(11, 0, -40);
        var lamp1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.lamp, this.sceneRun, false, new Laya.Vector3(11, 0, lightTotal - 30)));
        var lamp2 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.lamp, this.sceneRun, false, new Laya.Vector3(-18, 0, lightTotal - 30)));
        var tree1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.tree, this.sceneRun, false, new Laya.Vector3(11, 0, lightTotal + 35)));
        var tree2 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.tree, this.sceneRun, false, new Laya.Vector3(-18, 0, lightTotal + 35)));
        var tree3 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.tree, this.sceneRun, false, new Laya.Vector3(11, 0, lightTotal - 5)));
        var tree4 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.tree, this.sceneRun, false, new Laya.Vector3(-18, 0, lightTotal - 5)));
        lightArr.push(lamp1);
        lightArr.push(lamp2);
        lightArr.push(tree1);
        lightArr.push(tree2);
        lightArr.push(tree3);
        lightArr.push(tree4);
        lightTotal = lightTotal - 136.5;
        if (lightArr.length > 50) {
            var sprite1: Laya.Sprite3D = lightArr[0];
            var sprite2: Laya.Sprite3D = lightArr[1];
            var sprite3: Laya.Sprite3D = lightArr[2];
            var sprite4: Laya.Sprite3D = lightArr[3];
            var sprite5: Laya.Sprite3D = lightArr[4];
            var sprite6: Laya.Sprite3D = lightArr[5];
            lightArr.splice(0, 6);

            sprite1.removeSelf();
            sprite2.removeSelf();
            sprite3.removeSelf();
            sprite4.removeSelf();
            sprite5.removeSelf();
            sprite6.removeSelf();
        }

    }
    private buildingRandomAction() {
        if (build3DArr.length == 0) {

            var buildNoL = Math.round(Math.random() * (buildingRandomArr.length - 1));
            var buildNoR = Math.round(Math.random() * (buildingRandomArr.length - 1));
            this.buildingAction(0, parseInt(buildingRandomArr[buildNoL]));
            this.buildingAction(1, parseInt(buildingRandomArr[buildNoR]));
        } else {
            var buildNoL = Math.round(Math.random() * (buildingRandomArr.length - 1));
            var buildNoR = Math.round(Math.random() * (buildingRandomArr.length - 1));
            this.buildingAction(0, parseInt(buildingRandomArr[buildNoL]));
            this.buildingAction(1, parseInt(buildingRandomArr[buildNoR]));

            if (build3DArr.length > 40) {
                var sprite1: Laya.Sprite3D = build3DArr[0];
                var sprite2: Laya.Sprite3D = build3DArr[1];
                build3DArr.splice(0, 2);

                sprite1.removeSelf();
                sprite2.removeSelf();
            }

        }
    }


    private buildObstacleAction() {


        if (obstacleTotal.length == 0) {
            var roadNo = Math.round(Math.random() * 2);
            this.randomRoadTool(roadNo);
        } else {
            var arr = obstacleTotal[obstacleTotal.length - 1];
            var newArr = [];
            for (var i = 0; i < arr.left; i++) {
                if (parseInt(arr[i]) == 0 || parseInt(arr[i]) == 1) {
                    newArr.push(i);
                }
            }
            var number = Math.round(Math.random() * (newArr.length - 1));
            if (newArr[number] == 0) {
                this.randomRoadTool(0);
            } else if (newArr[number] == 1) {
                this.randomRoadTool(1);
            } else if (newArr[number] == 2) {
                this.randomRoadTool(2);
            }
        }



    }
    private randomRoadTool(roadNo) {

        if (roadNo == 0) {
            var roadNo1 = Math.round(Math.random() * (left.length - 1));
            var roadSelected = left[roadNo1];
            this.buildTool(roadSelected);
        }
        else if (roadNo == 1) {
            var roadNo1 = Math.round(Math.random() * (center.length - 1));
            var roadSelected = center[roadNo1];
            this.buildTool(roadSelected);
        }
        else if (roadNo == 2) {
            var roadNo1 = Math.round(Math.random() * (right.length - 1));
            var roadSelected = right[roadNo1];
            this.buildTool(roadSelected);
        }
    }
    private buildTool(arr) {
        var rocket = 0;
        for (var i = 0; i < 3; i++) {
            var number = arr[i];
            var arrr = [];
            if (number == 0) {
                var rocketNum = Math.round(Math.random() * (26 - 1));
                if (rocketNum == 9) {
                    if (rocket == 0) {
                        rocket = 1;
                        let offsetX = -10 + i * 7;
                        arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.rocket, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 10)))));
                    }
                }
                if (rocketNum == 10) {
                    if (rocket == 0) {
                        rocket = 1;
                        let offsetX = -10 + i * 7;
                        arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.xitieshi, this.sceneRun, false, new Laya.Vector3(offsetX, 3, -(buildZ + 10)))));
                    }
                }

            } else if (number == 1) {
                let offsetX = -10 + i * 7;
                var coin1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 10))));
                var coin2 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 20))));
                var coin3 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 30))));
                var coin4 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 40))));
                var coin5 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 50))));
                arrr.push(coin1);
                arrr.push(coin2);
                arrr.push(coin3);
                arrr.push(coin4);
                arrr.push(coin5);
                coinTotalArr.push(coin1);
                coinTotalArr.push(coin2);
                coinTotalArr.push(coin3);
                coinTotalArr.push(coin4);
                coinTotalArr.push(coin5);
            } else if (number == 2) {
                let offsetX = -11 + i * 8.2;
                // new Laya.Vector3(2,5,-100);
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.taxi, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 20)))));
            }
            else if (number == 3) {
                let offsetX = -9.8 + i * 7.1;
                // new Laya.Vector3(2,5,-100);
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.bigTaxi, this.sceneRun, false, new Laya.Vector3(offsetX, 2.5, -(buildZ + 20)))));
            }
            else if (number == 4) {
                let offsetX = -10 + i * 7.2;
                // new Laya.Vector3(2,5,-100);
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.zhangaiwu, this.sceneRun, false, new Laya.Vector3(offsetX, 4, -(buildZ + 20)))));
            } else if (number == 5) {
                let offsetX = -9.2 + i * 6.9;
                // new Laya.Vector3(2,5,-100);
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.bus, this.sceneRun, false, new Laya.Vector3(offsetX, 4, -(buildZ + 20)))));
            }


        }

        obstacleSpride.push(arrr);

        if (obstacleSpride.length > 20) {

            var subArr = obstacleSpride[0];
            for (var i = 0; i < subArr.length; i++) {

                var a: Laya.Sprite3D = subArr[i];
                //    console.log(a);
                a.removeSelf();
            }
            obstacleSpride.splice(0, 1);


        }


    }
    private onAniComplete() {
        alert(123);
    }
    private bbb() {
        if (Laya.stage.mouseX > x && ((Math.abs(Laya.stage.mouseY - y) / (Laya.stage.mouseX - x)) < 1)) {
            if (Laya.stage.mouseX - x > 20) {

                if (directionInt == 2) {

                } else {
                    directionInt = directionInt + 1;
                    // b = b + 6;
                    // alert("右");
                    var kk = 0;
                    var state = 0;
                    Laya.timer.frameLoop(1, this, function aaa() {

                        kk = kk + 0.5;
                        b = b + 0.6;
                        if ((c > 1.2 || c == 1.2) || (state == 1)) {
                            state = 1;
                            c = c - 0.2;
                        } else {
                            c = c + 0.2;
                        }
                        if (kk == 6) {

                            c = 0;
                            Laya.timer.clear(this, aaa);

                        }

                    });
                }
            }
        } else
            if (Laya.stage.mouseX < x && ((Math.abs(Laya.stage.mouseY - y) / (x - Laya.stage.mouseX)) < 1)) {

                if (x - Laya.stage.mouseX > 20) {
                    if (directionInt == 0) {

                    } else {
                        directionInt = directionInt - 1;
                        // b = b - 6;
                        // alert("左");
                        var kk = 0;
                        var state = 0;
                        Laya.timer.frameLoop(1, this, function aaa() {

                            kk = kk + 0.5;
                            b = b - 0.6;
                            if ((c > 1.2 || c == 1.2) || (state == 1)) {
                                state = 1;
                                c = c - 0.2;
                            } else {
                                c = c + 0.2;
                            }
                            if (kk == 6) {

                                c = 0;
                                Laya.timer.clear(this, aaa);

                            }

                        });
                    }
                }
            } else if (Laya.stage.mouseY < y && ((Math.abs(Laya.stage.mouseX - x) / (y - Laya.stage.mouseY)) < 1)) {
                if (y - Laya.stage.mouseY > 20) {
                    if (!rocketState) {
                        // c = c + 10;
                        // alert("上");
                        var kk = 0;
                        var state = 0;
                        var roZ = 0.9;
                        Laya.timer.pause();
                        this.sceneRun.removeChild(this.man);
                        Laya.timer.resume();
                        this.sceneRun.addChild(this.tiaodog);
                        tiaoState = 1;
                        Laya.timer.frameLoop(1, this, function aaa() {
                            if (!gameIsOver) {
                                kk = kk + 0.18;

                                if ((c > 10 || c == 10) || (state == 1)) {
                                    state = 1;
                                    roZ = roZ - 0.038;
                                    c = c - 0.7 / roZ;
                                } else {
                                    roZ = roZ + 0.08;
                                    c = c + 0.7 / roZ;
                                }
                                if (kk == 10 || kk > 10) {
                                    tiaoState = 0;
                                    this.sceneRun.removeChild(this.tiaodog);
                                    this.sceneRun.addChild(this.man);
                                    c = 0;
                                    Laya.timer.clear(this, aaa);

                                }
                            }
                        });
                    }

                }
            } else if (Laya.stage.mouseY > y && ((Math.abs(Laya.stage.mouseX - x) / (Laya.stage.mouseY - y)) < 1)) {
                if (Laya.stage.mouseY - y > 20) {
                    // alert("下");
                    // c = c - 10;
                    if (!rocketState) {
                        var kk = 0;

                        Laya.timer.pause();
                        this.sceneRun.removeChild(this.man);
                        Laya.timer.resume();
                        this.sceneRun.addChild(this.xiahuadog);
                        xiahuaState = 1;
                        Laya.timer.frameLoop(1, this, function aaa() {
                            if (!gameIsOver) {
                                kk = kk + 0.5;


                                if (kk == 20 || kk > 20) {

                                    xiahuaState = 0;
                                    this.sceneRun.removeChild(this.xiahuadog);
                                    this.sceneRun.addChild(this.man);
                                    Laya.timer.clear(this, aaa);

                                }
                            }
                        });
                    }
                }
            }
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.bbb);

    }
}