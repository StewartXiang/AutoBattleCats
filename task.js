"nodejs";
const acc = require("accessibility")
const img = require("image")
const TaskStatus = {
    "prepare": 1, 
    "restore": 2,
    "battle": 3, 
    "end": 4,
    "term": 5,
}
const TplAttr = {
    "img": 0, 
    "x": 1, 
    "y": 2, 
    "width": 3, 
    "height": 4
}

class Task{
    constructor(battleId){
        this.status = TaskStatus.prepare
        this.battle = battleId
    }
    exec(){

    }
    term(){
        this.status = TaskStatus.term
    }
}


class BasicStep {
    constructor(task){
        this.task = task
    }
    exec(){
        pass
    }
}

class StepPrepare extends BasicStep{
    constructor(task){
        super(task)
        

    }
    exec(){
        this.task.step = StepRestore(this.task) 
    }
}

class StepRestore extends BasicStep{
    constructor(task){
        super(task)

    }
    exec(){
    }
}

class StepBattle extends BasicStep{
    constructor(task){
        super(task)

    }

}

class StepEnd extends BasicStep{
    constructor(task){
        super(task)

    }

}

class StepTerm extends BasicStep{
    constructor(task){
        super(task)

    }

}

async function check(imgName){
    template = globalThis.imgInfo[imgName]
    screen = await acc.takeScreenShot()
    result = img.findImageInRegionSync(
        screen, 
        template[TplAttr.img], 
        template[TplAttr.x], 
        template[TplAttr.y], 
        template[TplAttr.height], 
        template[TplAttr.width]
    )
    return result
}