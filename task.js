const TaskStatus = {
    "prepare": 1, 
    "restore": 2,
    "battle": 3, 
    "end": 4,
    "term": 5,
}

class Task{
    constructor(battleId){
        this.status = TaskStatus.prepare
        this.battle = battleId
    }
    exec(){
        switch (this.status){
            case TaskStatus.prepare:
                break
            case TaskStatus.restore:
                break
            case TaskStatus.battle:
                break
            case TaskStatus.end:
                break
            case TaskStatus.term:
                break
        }
    }
    term(){
        this.status = TaskStatus.term
    }

}