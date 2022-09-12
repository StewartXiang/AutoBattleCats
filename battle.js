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


async function sendCatM(a, b){
    if (a<=0||a>=3||b<=0||b>=6){
        console.log("..")
        return
    }
    console.log("click x on " + touchPoints[a][b-1][0] + "y on " + touchPoints[a][b-1][1] )
}

async function sendCat(a, b){
    if (a<=0||a>=3||b<=0||b>=6){
        await acc.click(100, 1000)
        return
    }
    await acc.click(touchPoints[a][b-1][0], touchPoints[a][b-1][1])
}

class Send {
    constructor(flow){
        this.flow = flow
        this.status = SendStatus.wait
    }
    async exec(){
        console.log(this.flow[SendList.begin])
        this.term(this.flow[SendList.end])
        await lang.delay(this.flow[SendList.begin])

        this.status = SendStatus.run
        for (;this.status!=SendStatus.term;){
            console.log(this.flow[SendList.a], this.flow[SendList.b])
            await sendCat(this.flow[SendList.a], this.flow[SendList.b])
            await lang.delay(this.flow[SendList.interval])
        }

        this.status = SendStatus.stop
    }
    async term(t=0){
        if (t>0){
            await lang.delay(t)
        }
        console.log("term", this.flow[SendList.a], this.flow[SendList.b])
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
    levels = JSON.parse(fs.readFileSync("battles.json"))
    console.log(levels)
    //b = new Battle(levels["daily_exp"])
    //b = new Battle(levels["summer_act"])
    //b = new Battle(levels["black_pepper"])
    b = new Battle(levels["august_lucky_g"])
    
    
    await lang.delay(10000)
    // console.log("term all")
    // b.termAll()
    await lang.delay(100000)
}

exports.testBattle = testBattle