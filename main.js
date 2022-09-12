"nodejs";

const { showToast } = require('toast');
const acc = require("accessibility");
const img = require("image");
const md = require("media_projection");
const lang = require('lang');
const app = require("app");
const us = require("ui_selector");
const { testBattle } = require('./battle');
const dx = 220;
const dy = 160;
const x0 = 650;
const y0 = 760;


globalThis.Pic = {};

async function init(){
    console.log("init");
    p = img.readImageSync("pic/need-power.jpg");
    
    globalThis.Pic["need-power"] = p;
}

async function begin(i=0){
    if (i>10){
        showToast("bad!");
        exit();
    }
    acc.click(2050, 750);
    await lang.delay(1000);
    t = await powerEnough();
    console.log(t);
    if (!t){
        await acc.click(1450,700);
        await lang.delay(30000);
        await changeTime();
        await lang.delay(1000);
        await app.launch("jp.co.ponos.battlecats");
        await lang.delay(1000);
        await changeTime(false);
        await lang.delay(1000);
        await app.launch("jp.co.ponos.battlecats");
        await lang.delay(1000);
        await begin(i+1);
    } else {
        await lang.delay(4500);
    }
} 

async function powerEnough(){
    p = await acc.takeScreenshot();
    r = await img.findImageInRegion(
        p, globalThis.Pic["need-power"], 
        830, 420, 700, 100);
    if (r){
        return false;
    }
    return true;
    
}

async function end(){
    console.log("end")
    await lang.delay(8000);
    acc.click(2250,85);
    await lang.delay(800);
    acc.click(2250,85);
    await lang.delay(800);
    acc.click(2250,85);
    await lang.delay(800);
}




async function changeTime(forward=true){
    // acc.openQuickSettings()
    app.launch("com.android.settings");
    // acc.scrollBackward()
    await lang.delay(500);
    await acc.scrollForward();
    await lang.delay(500);
    await acc.scrollForward();
    await lang.delay(500);
    await acc.clickText("高級設定");
    await lang.delay(500);
    await acc.clickText("日期和時間");
    await lang.delay(500);
    if (forward){
        await acc.clickText("設定日期");
        await lang.delay(500);
    
        await acc.swipe(850, 1700, 850, 1800, 500);
        await lang.delay(500);
        await acc.click(800, 2200);
    } else {
        //await acc.swipe(850, 1800, 850, 1700, 500);
        await acc.clickText("使用網路提供的時間")
        await lang.delay(500);
        await acc.clickText("使用網路提供的時間")
    }
    
    await lang.delay(500);
}


async function main() {
    await init();
    for (;true;){
        await begin();
        await testBattle();
        await end();
        
    }
}

async function test(){
    await changeTime();
    await changeTime(false);
    // await exp3()
    // acc.click(1385, 772);
    // acc.click(1385, 1000);
}

main();
//test();
async function test2(){
    await begin();
    await testBattle();
}

//test2()
