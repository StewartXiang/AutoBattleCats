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
const SendStatus = {
    wait: 0,
    run: 1,
    term: 2,
    stop: 3
}

async function sendCat(a, b){
    if (a<=0||a>=2||b<=0||b>=6){
        await acc.click(100, 1000)
        return
    }
    await acc.click(touchPoints[a][b][0], touchPoints[a][b][1])
}

class Send {
    constructor(flow){
        this.flow = flow
        this.status = SendStatus.wait
    }
    async exec(){
        lang.delay(this.flow["end"]).then(this.term)
        await lang.delay(this.flow["begin"])
        this.status = SendStatus.run
        for (;this.status!=SendStatus.term;){
            await sendCat(this.flow["a"], this.flow["b"])
            await lang.delay(this.flow["interval"])
        }
        this.status = SendStatus.stop
    }
    term(){
        this.status = SendStatus.term
    }
}

class Battle{

}