import {ui} from './../ui/layaMaxUI'

export default class HomeUI extends ui.test.StartUI{
    constructor(){
        super()
        this.onAwake = this.awake
        console.log("homeUI加载中")
    }

    private awake(){
        console.log("开始页面加载完成")
        this.buttonStart.on('click',this,()=>{
            console.log('开始游戏')
        })
    }
}