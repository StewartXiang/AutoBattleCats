const lang = require("lang")
const acc = require("accessibility")
const fs = require("fs")
globalThis.levels = {}

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
const SendList = {
    begin: 0,
    end: 1, 
    // endType: 2,
    interval: 3, 
    a: 4,
    b: 5

}


async function sendCatB(a, b){
    console.log("click x on " + touchPoints[a][b][0] + "y on " + touchPoints[a][b][1] )
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
        lang.delay(this.flow[SendList.end]).then(this.term)
        await lang.delay(this.flow[SendList.begin])
        this.status = SendStatus.run
        for (;this.status!=SendStatus.term;){
            await sendCat(this.flow[SendList.a], this.flow[SendList.b])
            await lang.delay(this.flow[SendList.interval])
        }
        this.status = SendStatus.stop
    }
    term(){
        this.status = SendStatus.term
    }
}

class Battle{
    constructor(level){
        this.level = level
        this.sends = []
        for(let i in level["send"]){
            console.log(Date.now())
            let s = new Send(level["send"][i])
            this.sends.push(s)
            s.exec()
        }
    }
    termAll(){
        for(let i in this.sends){
            this.sends[i].term()
        }
    }
}

async function testBattle(){
    levels = JSON.parse(fs.readFileSync("levels.json"))
    console.log(levels)
    b = new Battle(levels)
    await lang.delay(5000)
}

exports.testBattle = testBattle