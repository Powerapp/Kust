function Controller() {
    function closeWin() {
        $.eventsChildWin.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "eventChildWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.eventsChildWin = Ti.UI.createWindow({
        backgroundColor: "#F9F9F9",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "eventsChildWin",
        fullScreen: "true",
        navBarHidden: "true",
        modal: "true"
    });
    $.__views.eventsChildWin && $.addTopLevelView($.__views.eventsChildWin);
    $.__views.topView = Ti.UI.createView({
        height: "10%",
        top: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        bubbleParent: false,
        id: "topView"
    });
    $.__views.eventsChildWin.add($.__views.topView);
    $.__views.backBtn = Ti.UI.createButton({
        width: "20dp",
        height: "20dp",
        backgroundImage: "/images/backarrow.png",
        left: "10dp",
        id: "backBtn"
    });
    $.__views.topView.add($.__views.backBtn);
    closeWin ? $.__views.backBtn.addEventListener("click", closeWin) : __defers["$.__views.backBtn!click!closeWin"] = true;
    $.__views.childUrlWin = Ti.UI.createWebView({
        top: "10%",
        bottom: "10%",
        width: "100%",
        id: "childUrlWin"
    });
    $.__views.eventsChildWin.add($.__views.childUrlWin);
    $.__views.bottomView = Ti.UI.createView({
        height: "10%",
        bottom: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        id: "bottomView"
    });
    $.__views.eventsChildWin.add($.__views.bottomView);
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
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading..."
    });
    $.__views.eventsChildWin.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var winUrl = args.winUrl;
    $.childUrlWin.url = winUrl;
    var isIos = "iphone" == Titanium.Platform.osname;
    var isAndroid = "android" == Titanium.Platform.osname;
    $.eventsChildWin.addEventListener("open", function() {
        $.activityIndicator.show();
    });
    $.childUrlWin.addEventListener("load", function() {
        $.activityIndicator.hide();
    });
    $.eventsChildWin.addEventListener("androidback", function() {
        $.eventsChildWin.close();
    });
    isAndroid && ($.childUrlWin.softKeyboardOnFocus = Titanium.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS);
    if (isIos) $.backBtn.top = "25dp"; else if (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
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
        $.backBtn.width = "40dp";
        $.backBtn.height = "40dp";
    } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
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