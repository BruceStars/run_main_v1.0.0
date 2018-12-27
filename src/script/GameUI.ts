import { ui } from '../ui/layaMaxUI';
import HomeUI from './HomeUI';
// import StartUI from './StartUI'
import { BallScript } from "./BallScript";
import { CarScript } from "./CarScript";
import { CoinScript } from "./CoinScript";
import { RocketScript } from "./RocketScript";
// 方向控制器
var x = 0;
var y = 0;
var c = 0;
var a = -5;
var b = 0;
var c = 0;
var r = 0;
//加载字典
var centerX = 0;
var loadLength = 0;
var distanceTotal = 0.0;
var distanceBuildTotal = 0.0;
var buildZ = 160;
var left = [["0", "1", "2"], ["0", "1", "2"], ["0", "0", "0"], ["0", "1", "0"], ["0", "3", "3"], ["1", "3", "2"], ["1", "0", "3"]];
var center = [["1", "0", "0"], ["2", "0", "1"], ["2", "0", "1"], ["2", "1", "0"], ["3", "0", "3"], ["3", "1", "3"], ["3", "0", "0"]];
var right = [["2", "2", "0"], ["2", "2", "1"], ["1", "2", "0"], ["2", "1", "0"], ["3", "3", "0"], ["3", "1", "0"], ["1", "3", "1"]];
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
var rocketState = false;
var rocketTotal = 0;
var gameIsOver = false;
var directionInt = 1;
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
    public sceneRun: Laya.Scene3D;
    public bigTaxi: Laya.MeshSprite3D;
    public icbc: Laya.MeshSprite3D;
    public guoqi: Laya.MeshSprite3D;
    public zgh: Laya.MeshSprite3D;
    public chinaBank: Laya.MeshSprite3D;
    public tree: Laya.MeshSprite3D;
    public lamp: Laya.MeshSprite3D;
    public rocket: Laya.MeshSprite3D;
    public rocketing: Laya.MeshSprite3D;
    constructor() {
        super()
        // Laya.Shader3D.debugMode = true;

        //初始化引擎
        // Laya3D.init(0, 0);
        //适配模式
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        // Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();
        //添加3D场景-----------------------
        this.sceneRun = new Laya.Scene3D();
        Laya.stage.addChild(this.sceneRun);

        Laya.URL.basePath = "https://img.apple.hi.cn/";
        Laya.LocalStorage.setItem("score", "0");
        Laya.LocalStorage.setItem("gameover", "no");



        this.txt = new Laya.Text();
        this.txt.pos(300, 10, false);
        this.txt.width = 500;
        //设置文本内容
        this.txt.text = "hello_world";
        //设置文本颜色
        this.txt.color = "#ffffff";
        //设置文本字体
        this.txt.font = "Ya Hei";
        //设置字体大小
        this.txt.fontSize = 32;
        //设置文本取背景
        this.txt.bgColor = "#c30c30";
        //设置文本框的颜色
        this.txt.borderColor = "#23cfcf";
        //设置粗体、斜体
        this.txt.bold = true;
        //设置斜体
        this.txt.italic = true;
        Laya.stage.addChild(this.txt);



        //创建摄像机(横纵比，近距裁剪，远距裁剪)-----
        this.camera = new Laya.Camera(0, 5, 1000);
        //加载到场景
        this.sceneRun.addChild(this.camera);
        //移动摄像机位置
        this.camera.transform.position = new Laya.Vector3(-2, 13, 60 + a);
        //旋转摄像机角度
        this.camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);


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
        this.sceneRun.ambientColor = new Laya.Vector3(1, 1, 1);


        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, function aaa() {

            x = Laya.stage.mouseX;
            y = Laya.stage.mouseY;


            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.bbb);

        });


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
        { url: "res/tree/layaScene.lh" },
        { url: "res/light/layaScene.lh" },
        { url: "res/rocket/layaScene.lh" },
            // {url:  "res/atlas/icon.atlas"}
            // { url: "res/atlas/icon.atlas", type: Laya.Loader.ATLAS }
        ];



        Laya.loader.create(mainArr, Laya.Handler.create(this,this.onloadFinish),Laya.Handler.create(this,this.onloadProgress));

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





    }
    //进度条显示
    private onloadProgress(onloadIng){
        console.log(Math.floor(onloadIng.toFixed(2) * 555))
        let proData = Math.floor(onloadIng.toFixed(2) * 555)
        this.progressIng.width = proData
        if(proData == 555){
            console.log("隐藏加载页")
            this.progressBox.visible = false
        }
    }
    //素材加载完成回调
    private onloadFinish(){

        this.HomeView();

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
        // this.treeLoad();
        this.lightLoad();
        this.rocketLoad();


    }

    private HomeView() {
        var inView: HomeUI = new HomeUI();
        // inView.popup(true) 
        console.log(inView)
        Laya.stage.addChild(inView);
    }

    private buildingAction(lorR, number) {
        if (lorR == 0) {

            if (number == 0) {


                var zhongBuilding1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.zhongBuilding, this.sceneRun, false, new Laya.Vector3(-35, 28, leftBd - 0)));
                leftBd = leftBd - 39;
                build3DArr.push(zhongBuilding1);
            }
            else if (number == 1) {
                var icbc1 = Laya.Sprite3D.instantiate(this.icbc, this.sceneRun, false, new Laya.Vector3(-20, 2.2, leftBd + 15))
                this.sceneRun.addChild(icbc1);
                icbc1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                leftBd = leftBd - 24;
                build3DArr.push(icbc1);

            }
            else if (number == 2) {
                var guoqi1 = Laya.Sprite3D.instantiate(this.guoqi, this.sceneRun, false, new Laya.Vector3(-25, 1, leftBd + 18))
                this.sceneRun.addChild(guoqi1);
                leftBd = leftBd - 23;
                guoqi1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                build3DArr.push(guoqi1);
            }
            else if (number == 3) {
                var zgh1 = Laya.Sprite3D.instantiate(this.zgh, this.sceneRun, false, new Laya.Vector3(-24, 1, leftBd + 19))
                this.sceneRun.addChild(zgh1);
                zgh1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                leftBd = leftBd - 24;
                build3DArr.push(zgh1);
            } else if (number == 4) {
                var chinaBank1 = Laya.Sprite3D.instantiate(this.chinaBank, this.sceneRun, false, new Laya.Vector3(-23, 10, leftBd + 19))
                this.sceneRun.addChild(chinaBank1);
                chinaBank1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                leftBd = leftBd - 13;
                build3DArr.push(chinaBank1);
            }


        } else if (lorR == 1) {
            if (number == 0) {
                var zhongBuilding2 = Laya.Sprite3D.instantiate(this.zhongBuilding, this.sceneRun, false, new Laya.Vector3(28, 28, rightBd - 0))

                this.sceneRun.addChild(zhongBuilding1);

                zhongBuilding2.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                rightBd = rightBd - 40;
                build3DArr.push(zhongBuilding1);
            }
            else if (number == 1) {
                var icbc1 = Laya.Sprite3D.instantiate(this.icbc, this.sceneRun, false, new Laya.Vector3(11.8, 2.2, rightBd + 4))
                this.sceneRun.addChild(icbc1);
                rightBd = rightBd - 25;
                build3DArr.push(icbc1);

            }
            else if (number == 2) {
                var guoqi1 = Laya.Sprite3D.instantiate(this.guoqi, this.sceneRun, false, new Laya.Vector3(17, 1, rightBd))
                this.sceneRun.addChild(guoqi1);
                rightBd = rightBd - 22;

                build3DArr.push(guoqi1);
            }
            else if (number == 3) {



                var zgh1 = Laya.Sprite3D.instantiate(this.zgh, this.sceneRun, false, new Laya.Vector3(14, 1, rightBd))
                this.sceneRun.addChild(zgh1);

                rightBd = rightBd - 24;
                build3DArr.push(zgh1);
            } else if (number == 4) {
                var chinaBank1 = Laya.Sprite3D.instantiate(this.chinaBank, this.sceneRun, false, new Laya.Vector3(-23, 10, rightBd))
                this.sceneRun.addChild(chinaBank1);

                rightBd = rightBd - 13;
                build3DArr.push(chinaBank1);
            }



        }



    }
    //var buildingRandomArr
    //         var buildingArr = [];
    // var build3DArr = [];


    // var mainArr = [{url:"res/dimian12/layaScene.lh"},
    // {url:"res/bigTaxi3/layaScene.lh"},
    // {url:"res/taxi6/layaScene.lh"},
    // {url:"res/zhong/layaScene.lh"},
    // {url:"res/guoqi/layaScene.lh"},
    // {url:"res/icbc/layaScene.lh"},
    // {url:"res/dog1312311/layaScene.lh"},
    // {url:"res/coin/layaScene.lh"}];

    private lightLoad() {
        this.lamp = Laya.loader.getRes("res/light/layaScene.lh");
        this.lamp.transform.position = new Laya.Vector3(-15, 0, -30);
        this.lamp.transform.scale = new Laya.Vector3(0.6, 0.6, 0.6);
        this.sceneRun.addChild(this.lamp);
        var lamp1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.lamp, this.sceneRun, false, new Laya.Vector3(8, 0, -30)));

    }
    private treeLoad() {
        this.tree = Laya.loader.getRes("res/tree/layaScene.lh");
        this.tree.transform.position = new Laya.Vector3(20, 0, 40);
        this.tree.transform.scale = new Laya.Vector3(30, 30, 30);
        this.sceneRun.addChild(this.tree);
    }
    private chinaBankLoad() {
        this.chinaBank = Laya.loader.getRes("res/chinaBank/example.lh");
        this.chinaBank.transform.position = new Laya.Vector3(15, 10, -90);

        this.chinaBank.transform.scale = new Laya.Vector3(0.4, 0.4, 0.4);
        this.sceneRun.addChild(this.chinaBank);

        var chinaBank1 = Laya.Sprite3D.instantiate(this.chinaBank, this.sceneRun, false, new Laya.Vector3(-23, 10, -90))
        this.sceneRun.addChild(chinaBank1);
        chinaBank1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);

    }

    private dimianLoad() {
        //实例化加载并创建好的3D对象

        var road: Laya.Sprite3D = Laya.loader.getRes("res/dimian12/layaScene.lh");
        road.transform.position = new Laya.Vector3(0, 0, 0);
        road.transform.scale = new Laya.Vector3(1, 1, 1);
        this.sceneRun.addChild(road);
        roadArr.push(road);

        //克隆sprite3d
        var layaMonkey_clone1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(road, this.sceneRun, false, new Laya.Vector3(0, 0, -136.5)));
        //克隆sprite3d
        roadArr.push(layaMonkey_clone1);
        var layaMonkey_clone2 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(road, null, false, new Laya.Vector3(0, 0, -273)));
        // camera.transform.lookAt(road.transform.position,new Laya.Vector3(0,0,0));
        roadArr.push(layaMonkey_clone2);
    }






    private bigTaxiLoad() {
        //实例化加载并创建好的3D对象
        this.bigTaxi = Laya.loader.getRes("res/bigTaxi3/layaScene.lh");
        console.log(this.bigTaxi);
        this.bigTaxi.transform.position = new Laya.Vector3(-3.3, 2, -100);
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
        this.zgh.transform.position = new Laya.Vector3(17, 1, 10.2);
        this.zgh.transform.scale = new Laya.Vector3(0.4, 0.4, 0.4);
        this.sceneRun.addChild(this.zgh);
        var zgh1 = Laya.Sprite3D.instantiate(this.zgh, this.sceneRun, false, new Laya.Vector3(-24, 1, 34.5))
        this.sceneRun.addChild(zgh1);
        zgh1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
    }
    private taxiLoad() {
        //实例化加载并创建好的3D对象
        this.taxi = Laya.loader.getRes("res/taxi6/layaScene.lh");
        console.log(this.taxi);
        this.taxi.transform.position = new Laya.Vector3(3, 1, -100);
        this.taxi.transform.scale = new Laya.Vector3(2.4, 2.4, 2.4);
        this.taxi.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
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

        this.zhongBuilding.transform.position = new Laya.Vector3(-35, 28, -35);
        this.zhongBuilding.transform.scale = new Laya.Vector3(0.4, 0.4, 0.4);
        this.sceneRun.addChild(this.zhongBuilding);

        var zhongBuilding1 = Laya.Sprite3D.instantiate(this.zhongBuilding, this.sceneRun, false, new Laya.Vector3(28, 28, -35))
        this.sceneRun.addChild(zhongBuilding1);
        zhongBuilding1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
    }




    private guoqiLoad() {
        this.guoqi = Laya.loader.getRes("res/guoqi/layaScene.lh");
        this.guoqi.transform.position = new Laya.Vector3(17, 1, -14);
        this.guoqi.transform.scale = new Laya.Vector3(1, 1, 1);
        this.sceneRun.addChild(this.guoqi);

        var guoqi1 = Laya.Sprite3D.instantiate(this.guoqi, this.sceneRun, false, new Laya.Vector3(-25, 1, 6))
        this.sceneRun.addChild(guoqi1);
        guoqi1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
    }



    private icbcLoad() {
        this.icbc = Laya.loader.getRes("res/icbc/layaScene.lh");
        this.icbc.transform.position = new Laya.Vector3(11.8, 2.2, -75);
        this.icbc.transform.scale = new Laya.Vector3(0.4, 0.4, 0.4);
        this.sceneRun.addChild(this.icbc);

        var zhongBuilding1 = Laya.Sprite3D.instantiate(this.icbc, this.sceneRun, false, new Laya.Vector3(-19, 2.2, -60))
        this.sceneRun.addChild(zhongBuilding1);
        zhongBuilding1.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
    }




    private dogLoad() {
        //实例化加载并创建好的3D对象
        this.man = Laya.loader.getRes("res/dog1312311/layaScene.lh");


        this.man.transform.position = new Laya.Vector3(-3.2, 0.9, 30 + a);
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




        this.gameStart();

    }
    private gameStart() {
        Laya.timer.frameLoop(1, this, function aaa() {

            // console.log("score:" + parseInt(Laya.LocalStorage.getItem("score")));
            // console.log("+++++++++++++++++++++++++++++")

            // this.zjInput.text = parseInt(Laya.LocalStorage.getItem("score"))s
            if (Laya.LocalStorage.getItem("gameover") == "yes") {
                gameIsOver = true;
                Laya.LocalStorage.setItem("gameover", "no");
                // var animator = this.man.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;


                //  animator.play("Dead");


                // Laya.timer.pause();


                var kk = 0;
                var state = 0;
                var roZ = 0;
                Laya.timer.frameLoop(1, this, function aaa() {

                    kk = kk + 1;
                    a = a + 1.6;
                    c = c + 0.3;
                    console.log(1121121)

                    if (kk == 30 || kk > 30) {


                        Laya.timer.clear(this, aaa);
                        Laya.timer.pause();


                        Laya.Browser.window.location.reload();
                        // this.removeSelf();
                        // var sui = new StartUI();
                        // Laya.stage.addChild(sui);

                    }

                });



            }


            if (Laya.LocalStorage.getItem("rocket") == "yes") {


                rocketState = true;
                Laya.LocalStorage.setItem("rocket", "no");
                this.rocketing.transform.position = new Laya.Vector3(this.man.transform.position.x + 0.2, this.man.transform.position.y + 0.5, this.man.transform.position.z - 5.5);
                this.rocketing.transform.scale = new Laya.Vector3(0.3, 0.3, 0.3);
                this.sceneRun.addChild(this.rocketing);
            }


            if (rocketState) {
                this.rocketing.transform.position = new Laya.Vector3(this.man.transform.position.x + 0.2, this.man.transform.position.y + 0.5, this.man.transform.position.z - 5.5);
                r = 10;
                rocketTotal = rocketTotal + 0.5;
                if (rocketTotal > 500) {
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

            this.man.transform.position = (new Laya.Vector3(-3.2 + b, 0.9 + c + r, 30 + (a -= 0.5)));
            //160
            // camera.transform.lookAt(this.man.transform.position,new Laya.Vector3(0,0,0));
            if (!gameIsOver) {
                this.camera.transform.position = new Laya.Vector3(-3.5, 13 + r, 60 + a);
            }
            //  rigid.applyForce(new Laya.Vector3(0,0,-50),null);

            // this.txt.text  = obstacleTotal.length;

            distanceTotal = distanceTotal + 0.5;
            distanceBuildTotal = distanceBuildTotal + 0.5;
            this.txt.text = "测试分数:" + Laya.LocalStorage.getItem("score");

            if (distanceTotal > 60 || distanceTotal == 60) {
                buildZ = buildZ + 60;
                distanceTotal = 0.0
                if (!rocketState) {
                    this.buildObstacleAction();
                } else {
                    this.rocketBuildAction();
                }
                this.buildLightAction();

            }
            if (distanceBuildTotal > 25 || distanceBuildTotal == 25) {
                distanceBuildTotal = 0.0;

                this.buildingRandomAction();

            }
            roadTotal = roadTotal + 0.5;
            if (roadTotal > 136) {
                roadTotal = 0;

                var roadSprite: Laya.Sprite3D = roadArr[roadCurrent];
                roadSprite.transform.position = new Laya.Vector3(0, 0, roadChangeNumber -= 136.5);


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
        rocketCoinArr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2 + r, -(buildZ - 120)))));
        rocketCoinArr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2 + r, -(buildZ - 110)))));
        rocketCoinArr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2 + r, -(buildZ - 100)))));
        rocketCoinArr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2 + r, -(buildZ - 90)))));
        rocketCoinArr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2 + r, -(buildZ - 80)))));
    }
    private rocketLoad() {
        this.rocket = Laya.loader.getRes("res/rocket/layaScene.lh");
        this.rocket.transform.position = new Laya.Vector3(-3, 2, -15);
        this.rocket.transform.scale = new Laya.Vector3(0.1, 0.1, 0.1);
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

        this.rocketing = Laya.Sprite3D.instantiate(this.rocket, this.sceneRun, false, new Laya.Vector3(-3, 2, -30)) as Laya.MeshSprite3D;
        this.rocketing.transform.rotate(new Laya.Vector3(-90, 0, 0), true, false);
        this.sceneRun.removeChild(this.rocketing);
        // this.rocketing._destroyAllComponent();

    }

    private coinLoad() {
        //实例化加载并创建好的3D对象
        this.coin = Laya.loader.getRes("res/coin/layaScene.lh");

        this.coin.transform.position = new Laya.Vector3(-3, 2, -20);
        this.coin.transform.scale = new Laya.Vector3(0.5, 0.5, 0.5);
        this.coin.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        this.sceneRun.addChild(this.coin);
        var phy: Laya.PhysicsCollider = this.coin.addComponent(Laya.PhysicsCollider);


        //     var material:Laya.BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
        // //     //修改材质的反射颜色，让模型偏红
        //     material.albedoColor = new Laya.Vector4(1,0,0,1); 


        var rigid: Laya.Rigidbody3D = this.coin.addComponent(Laya.Rigidbody3D);
        // //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.BoxColliderShape(0.6, 0.6, 0.3);
        // //添加一个重量
        rigid.mass = 20;
        // //给球添加弹力
        rigid.restitution = 0.01;
        // // 给球添加滚动摩擦力
        rigid.rollingFriction = 0.2;
        rigid.isKinematic = true;

        //给球添加脚本
        this.coin.addComponent(CoinScript);
        //给球一个名字 方便识别
        this.coin.name = "金币";

        this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(-3, 2, -30)));
        this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(-3, 2, -40)));
        this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(-3, 2, -50)));
        this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(-3, 2, -60)));
        var a = 0;

    }


    private buildLightAction() {
        var lamp1 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.lamp, this.sceneRun, false, new Laya.Vector3(8, 0, lightTotal - 10)));
        var lamp2 = this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.lamp, this.sceneRun, false, new Laya.Vector3(-15, 0, lightTotal - 10)));
        lightArr.push(lamp1);
        lightArr.push(lamp2);
        lightTotal = lightTotal - 60;
        if (lightArr.length > 30) {
            var sprite1: Laya.Sprite3D = lightArr[0];
            var sprite2: Laya.Sprite3D = lightArr[1];
            lightArr.splice(0, 2);

            sprite1.removeSelf();
            sprite2.removeSelf();
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
                if (sprite1 && sprite2) {
                    sprite1.removeSelf();
                    sprite2.removeSelf();
                }

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
                var rocketNum = Math.round(Math.random() * (25 - 1));
                if (rocketNum == 9) {
                    if (rocket == 0) {
                        rocket = 1;
                        let offsetX = -9 + i * 6;
                        arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.rocket, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 10)))));
                    }
                }

            } else if (number == 1) {
                let offsetX = -9 + i * 6;
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 10)))));
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 20)))));
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 30)))));
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 40)))));
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.coin, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 50)))));
            } else if (number == 2) {
                let offsetX = -9.5 + i * 6.2;
                // new Laya.Vector3(2,5,-100);
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.taxi, this.sceneRun, false, new Laya.Vector3(offsetX, 1, -(buildZ + 20)))));
            }
            else if (number == 3) {
                let offsetX = -8.5 + i * 6;
                // new Laya.Vector3(2,5,-100);
                arrr.push(this.sceneRun.addChild(Laya.Sprite3D.instantiate(this.bigTaxi, this.sceneRun, false, new Laya.Vector3(offsetX, 2, -(buildZ + 20)))));
            }


        }

        obstacleSpride.push(arrr);

        if (obstacleSpride.length > 20) {

            var subArr = obstacleSpride[0];
            for (var i = 0; i < subArr.length; i++) {

                var a: Laya.Sprite3D = subArr[i];
                console.log(a);
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
                        b = b + 0.5;
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
                            b = b - 0.5;
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
                    // c = c + 10;
                    // alert("上");
                    var kk = 0;
                    var state = 0;
                    var roZ = 0.9;
                    Laya.timer.frameLoop(1, this, function aaa() {

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

                            c = 0;
                            Laya.timer.clear(this, aaa);

                        }

                    });


                }
            } else if (Laya.stage.mouseY > y && ((Math.abs(Laya.stage.mouseX - x) / (Laya.stage.mouseY - y)) < 1)) {
                if (Laya.stage.mouseY - y > 20) {
                    // alert("下");
                    // c = c - 10;

                }
            }
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.bbb);

    }
}