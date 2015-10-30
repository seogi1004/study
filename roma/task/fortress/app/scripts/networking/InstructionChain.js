var InstructionChain = (function () {
    function InstructionChain(instructionChain, args) {
        if (instructionChain === void 0) {
            instructionChain = "";
        }
        if (args === void 0) {
            args = [];
        }
        this.iC = instructionChain.split('.');
        this.a = args;
    }

    InstructionChain.prototype.callFunc = function (objectToApplyInstruction) {
        var obj = objectToApplyInstruction;
        var objMethod;
        var objCalledMethod;
        if (this.iC.length > 1) {
            for (var i = 0; i < this.iC.length - 1; i++) {
                // If the next instruction is not a member varible but actually a function, call it.
                if (typeof obj[this.iC[i]] == "function") {
                    obj = obj[this.iC[i]].call(obj);
                }
                else {
                    obj = obj[this.iC[i]];
                }
            }
            objMethod = this.iC[this.iC.length - 1];
        }
        else {
            obj = objectToApplyInstruction;
            objMethod = this.iC[0];
        }
        obj[objMethod].call(obj, this.a);
    };
    return InstructionChain;
})();