function Controller() {
    function closeWin() {
        $.partnersWin.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "partners";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.partnersWin = Ti.UI.createWindow({
        backgroundColor: "#F9F9F9",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "partnersWin",
        fullScreen: "true",
        navBarHidden: "true",
        modal: "true"
    });
    $.__views.partnersWin && $.addTopLevelView($.__views.partnersWin);
    $.__views.topView = Ti.UI.createView({
        height: "10%",
        top: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        bubbleParent: false,
        id: "topView"
    });
    $.__views.partnersWin.add($.__views.topView);
    $.__views.backBtn = Ti.UI.createButton({
        width: "20dp",
        height: "20dp",
        backgroundImage: "/images/backarrow.png",
        left: "10dp",
        id: "backBtn"
    });
    $.__views.topView.add($.__views.backBtn);
    closeWin ? $.__views.backBtn.addEventListener("click", closeWin) : __defers["$.__views.backBtn!click!closeWin"] = true;
    $.__views.titleLbl = Ti.UI.createLabel({
        width: "auto",
        height: "auto",
        font: {
            fontSize: "16dp",
            fontFamily: "Rockwell-Bold"
        },
        color: "#fff",
        id: "titleLbl"
    });
    $.__views.topView.add($.__views.titleLbl);
    $.__views.bottomView = Ti.UI.createView({
        height: "10%",
        bottom: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        id: "bottomView"
    });
    $.__views.partnersWin.add($.__views.bottomView);
    $.__views.homeAway = Ti.UI.createLabel({
        width: "90%",
        height: "90%",
        text: "HOME AWAY FROM HOME",
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontWeight: "bold",
            fontFamily: "Rockwell-Bold"
        },
        textAlign: "center",
        id: "homeAway"
    });
    $.__views.bottomView.add($.__views.homeAway);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var isIos = "iphone" == Titanium.Platform.osname;
    var isAndroid = "android" == Titanium.Platform.osname;
    var winTitle = args.winTitle;
    $.titleLbl.text = winTitle;
    $.partnersWin.addEventListener("androidback", function() {
        $.partnersWin.close();
    });
    if (isIos) {
        $.backBtn.top = "25dp";
        $.titleLbl.top = "25dp";
    } else if (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "20dp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.titleLbl.font = {
            fontSize: "20dp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "30dp";
        $.backBtn.height = "30dp";
    } else if (isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "28dp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.titleLbl.font = {
            fontSize: "28dp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "40dp";
        $.backBtn.height = "40dp";
    } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "40dp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.titleLbl.font = {
            fontSize: "40dp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "50dp";
        $.backBtn.height = "50dp";
    }
    __defers["$.__views.backBtn!click!closeWin"] && $.__views.backBtn.addEventListener("click", closeWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;