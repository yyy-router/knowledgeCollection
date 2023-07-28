/**
* 依次顺序执行一系列任务
* 所有任务全部完成后可以得到每个任务的执行结果
* 需要返回两个方法，start用于启动任务，pause用于暂停任务
* 每个任务具有原子性，即不可中断，只能在两个任务之间中断
*@param {...Function} task 任务列表，每个任务无参、异步
*/
function processTasks(...tasks) {
    let i = 0;//暂停之后再恢复，不需要从头开始执行
    let isRuning = false;
    const result = [];
    return {
        start() {
            return new Promise(async (resolve, reject) => {
                if (isRuning) {
                    return;
                }
                isRuning = true;
                while (i < tasks.length) {
                    console.log("startTask", i)
                    result.push(await tasks[i]());
                    console.log("endTask", i)
                    i++;
                    if (!isRuning) {//判断中途是否调用pause方法
                        return;
                    }
                }
                // 所有任务均结束
                isRuning = false;
                resolve(result);
            })
        },
        pause() {
            isRuning = false;

        }
    }
}