export class CoinScript extends Laya.Script3D{
    constructor(){
        super();
    }
     /**
      * 当其他碰撞器进入绑定物体碰撞器时触发（子弹进入物品时）
      * 注：如相对移动速度过快，可能直接越过
      */
     onTriggerEnter(other):void{
        //  console.log("触发器enter" + this.owner.name);

         var score =  parseInt(Laya.LocalStorage.getItem("score"));
           var scoreAfter = score + 1;
            Laya.LocalStorage.setItem("score",scoreAfter.toString());
         
            this.owner.removeSelf();
        // console.log(other);
     }
     /**
      * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹在物品内时）
      * 注：如相对移动速度过快，可能直接越过
      */
     onTriggerStay(other):void{
        // console.log("触发器stay" + this.owner.name );
     }
     /**
      * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
      * 注：如相对移动速度过快，可能直接越过
      */
     onTriggerExit(other):void{
        // console.log("触发器exit" + this.owner.name);
     }
     /**
      * 与触发器相同
      */
     onCollisionEnter(collision):void{
        // console.log("碰撞器enter" + this.owner.name);
        // console.log(this.owner);
        // var animator = this.owner.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
        // var ani = this.owner.getChildAt(0).getComponent(Laya.Animator);
        // console.log(ani);
        //        animator.play("Dead");
            //    Laya.timer.pause();
           var score =  parseInt(Laya.LocalStorage.getItem("score"));
           var scoreAfter = score + 1;
            Laya.LocalStorage.setItem("score",scoreAfter.toString());
         
            this.owner.removeSelf();
             
     }
     onCollisionStay(collision):void{
        // console.log("碰撞器stay" + this.owner.name );
     }
     onCollisionExit(collision):void{
        // alert("碰撞器exit" + this.owner.name);
     }
     onDisable():void{
        // alert("脚本已被移除");
     }
 }