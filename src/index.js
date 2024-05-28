"use strict";
exports.__esModule = true;
var core_1 = require("@actions/core");
var utils_1 = require("./utils");
try {
    var showCardOnStart = (0, core_1.getInput)("show-on-start").toLowerCase() == 'true';
    if (showCardOnStart) {
        (0, utils_1.formatAndNotify)('start');
    }
    else {
        (0, core_1.info)('Configured to not show card upon job start.');
    }
}
catch (error) {
    (0, core_1.setFailed)(error.message);
}
