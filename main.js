"nodejs";

const { showToast } = require('toast');
const acc = require("accessibility")
const img = require("image")
const md = require("media_projection");
const lang = require('lang');
const app = require("app")
const us = require("ui_selector")
const dx = 220
const dy = 160
const x0 = 650
const y0 = 760
const conn = await img.readImage("screenshots/level-connecting-words.png")
const disconn = await img.readImage("screenshots/level-timeout-words.png")

globalThis.status = 0
const touchPoints = {
    1: [
        []
    ], 
    2: [

    ]
}

let status = 0

async function begin(){
    acc.click(2050, 750)
    await lang.delay(8000)
} 

async function end(){
    acc.click(2150,50)
    await lang.delay(800)
    acc.click(2150,50)
    await lang.delay(800)
    acc.click(2150,50)
    await lang.delay(800)
}

async function isConn(){
    p = await acc.takeScreenshot()
    r = await img.findImageInRegion(p, w, 1800, 400, 500, 250)
    if (r) {
        return true
    }
    return false
}

async function isDisconn(){
    p = await acc.takeScreenshot()
    r = await img.findImageInRegion(p, w, 1800, 400, 500, 250)
    if (r) {
        return true
    }
    return false
}

async function isBattle(){
    
}


async function sendCat(a, b, t){
    
}


async function sendCatOrigin(a, b, t, loop=1){
    x = x0 + (b-0.5)*dx
    y = y0 + (a-0.5)*dy
    for (i=0; i<loop; i++){
        acc.click(x, y)
        await lang.delay(200)
    }
    await lang.delay(t)
}

async function dailyExp(){
    await begin()
    await sendCat(1, 2, 9000)
    await sendCat(1, 2, 2000)
    await sendCat(2, 2, 1500, 3)
    
}

async function exp3(){
    await begin()
    await sendCat(1,1,3000,3)
    await sendCat(2,2,3000,3)
    for (i=0;1<10;i++){
        await sendCat(2,2,400)
        await sendCat(1,5,400)
        await sendCat(1,1,400)
        await sendCat(1,4,400)
        await sendCat(2,3,400)
        await sendCat(2,4,400)
        await sendCat(2,5,400)
    }
    await end
}

async function changeTime(forward=true){
    // acc.openQuickSettings()
    app.launch("com.android.settings")
    // acc.scrollBackward()
    await lang.delay(500)
    acc.scrollForward()
    await lang.delay(500)
    acc.scrollForward()
    await lang.delay(500)
    acc.clickText("高級設定")
    await lang.delay(500)
    acc.clickText("日期和時間")
    await lang.delay(500)
    acc.clickText("設定日期")
    await lang.delay(500)
    if (forward){
        acc.swipe(850, 1700, 850, 1800, 500)
    } else {
        acc.swipe(850, 1800, 850, 1700, 500)
    }
    await lang.delay(500)
    acc.click(800, 2200)
    await lang.delay(500)
}


async function main() {
    for (;;){
        c = await isConn()
        if (c) {
            console.log("...connecting...");
            await lang.delay(2000)
            continue
        }
        await lang.delay(1000)
        d = await isDisconn()
        if (d) {
            console.log("disconnected!")


        }
    }
}

async function test(){
    //await changeTime()
    //await changeTime(false)
    // await exp3()
    acc.click(1385, 772)
    acc.click(1385, 1000)
}

// main();
test();

