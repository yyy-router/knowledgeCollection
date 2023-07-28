Function.prototype.mybind = function (ctx,) {
    var args = Array.prototype.slice.call(arguments, 1);//获取bind传来的剩余参数
    var fn = this;
    return function A() {
        var restArgs = Array.prototype.slice.call(arguments);//获取函数本身参数
        var allArgs = args.concat(restArgs);//拼接两种参数
        //判断是否使用new来调用
        if (Object.getPrototypeOf(this) === A.prototype) {
            return new fn(...allArgs);
        } else {
            return fn.apply(ctx, allArgs);
        }
    }
}