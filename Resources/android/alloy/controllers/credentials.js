function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "credentials";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.C = {
        INSTAGRAM_CLIENT_ID: "cbbec1e746994c27b5ba3b3fbb0ffb19",
        INSTAGRAM_CLIENT_SECRET: "678eeff2c4c84cbea10071be82f306b9",
        INSTAGRAM_CALLBACK_URL: "http://goes-nowhere-at-all"
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;