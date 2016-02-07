"use strict";

module.exports = {
    LOG: function (name = undefined, verbose = true, obj = undefined) {
        if (verbose) {
            console.log(name + "\n" + JSON.stringify(obj, null, 2));
        } else {
            console.log(name + " : " + JSON.stringify(obj));
        }
        return obj;
    }
};
