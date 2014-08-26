function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menuRows";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.menuRows = Ti.UI.createTableViewRow({
        height: Ti.UI.FILL,
        id: "menuRows"
    });
    $.__views.menuRows && $.addTopLevelView($.__views.menuRows);
    $.__views.menuLbl = Ti.UI.createLabel({
        color: "#fff",
        height: "auto",
        width: "auto",
        left: "85dp",
        id: "menuLbl"
    });
    $.__views.menuRows.add($.__views.menuLbl);
    $.__views.hasChildImg = Ti.UI.createImageView({
        right: "5dp",
        width: "auto",
        height: "auto",
        id: "hasChildImg"
    });
    $.__views.menuRows.add($.__views.hasChildImg);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.menuLbl.text = args["title"];
    $.hasChildImg.image = args["image"];
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;