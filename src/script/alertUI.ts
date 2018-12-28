import {ui} from './../ui/layaMaxUI'

export default class alertView extends ui.test.alertUI{
    constructor(){
        super()
        this.onAwake = this.awake
    }
    private awake (){
        this.closeAlert.on('click',this,()=>{
            this.close()
        })
    }
}