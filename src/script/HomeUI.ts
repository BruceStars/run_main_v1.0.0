import {ui} from './../ui/layaMaxUI'
import alertUI from './alertUI'
import signUI from './SignUI'
import rankingUI from './rankingUI'

export default class HomeUI extends ui.test.HomeUI{
    private signUI
    private ranking
    constructor(){
        super()
        console.log("homeUI加载中")
        this.onAwake = this.awake
        this.signUI = new signUI()

        this.ranking = new rankingUI()
    }
    private awake (){
        this.buttonRanking.on('click',this,()=>{
            this.ranking.popup(false,true)          
        })

        this.buttonSign.on('click',this,()=>{
            this.signUI.popup(false,true)
        })
    }
}