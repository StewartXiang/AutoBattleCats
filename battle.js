const lang = require("lang")
const acc = require("accessibility")
const touchPoints = {
    1: [
        [730, 770], 
        [950, 770], 
        [1170, 770], 
        [1390, 770], 
        [1610, 770]
    ], 
    2: [
        [730, 990], 
        [950, 990], 
        [1170, 990], 
        [1390, 990], 
        [1610, 990]
    ]
}

async function sendCat(a, b){
    if (a<=0||a>=2||b<=0||b>=6){
        await acc.click(100, 1000)
        return
    }
    await acc.click(touchPoints[a][b][0], touchPoints[a][b][1])
}

class Battle {
    constructor(flow, id){
        this.flow = flow
        this.id = id
    }
    async run(){
        await lang.delay(this.flow["delay"])
        for (this.id==globalThis.status){
            await sendCat(this.flow["a"], this.flow["b"])
            await lang.delay(this.flow["interval"])
        }
    }
}