/**
 * 传入多个并发任务，同一个时间最多只能两个任务在执行
*/
function timeout(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}
class SuperTask {
    constructor(parallelCount = 2) {
        this.parallelCount = parallelCount;//并发数量
        this.tasks = [];//执行队列
        this.runningCount = 0;//正在执行任务数量
    };
    add(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject
            });
            this._run();
        })
    };
    //执行任务
    _run() {
        while (this.runningCount < this.parallelCount && this.tasks.length > 0) {
            const { task, resolve, reject } = this.tasks.shift()
            this.runningCount++;
            task()
                .then(resolve, reject)
                .finally(() => {
                    this.runningCount--;
                    this._run();
                })
        }
    }
}
const superTask = new SuperTask();
function addTask(time, name) {
    superTask
        .add(() => timeout(time))
        .then(() => {
            console.log(`任务${name}完成`)
        })
}
addTask(1000, 1)
addTask(1000, 2)
addTask(1000, 3)
addTask(1000, 4)
addTask(1000, 5)


