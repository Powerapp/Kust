function Controller() {
    function closeWin() {
        $.faceBWin.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "faceB";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.faceBWin = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "faceBWin",
        fullScreen: "true",
        navBarHidden: "true",
        modal: "true"
    });
    $.__views.faceBWin && $.addTopLevelView($.__views.faceBWin);
    $.__views.topView = Ti.UI.createView({
        height: "10%",
        top: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        bubbleParent: false,
        id: "topView"
    });
    $.__views.faceBWin.add($.__views.topView);
    $.__views.backBtn = Ti.UI.createButton({
        width: "20dp",
        height: "20dp",
        backgroundImage: "/images/backarrow.png",
        left: "10dp",
        id: "backBtn"
    });
    $.__views.topView.add($.__views.backBtn);
    closeWin ? $.__views.backBtn.addEventListener("click", closeWin) : __defers["$.__views.backBtn!click!closeWin"] = true;
    $.__views.fbView = Ti.UI.createWebView({
        top: "10%",
        bottom: 0,
        left: 0,
        right: 0,
        url: "https://www.facebook.com/pages/Kust-Caf%C3%A9-Home-away-from-home/201828036004",
        id: "fbView"
    });
    $.__views.faceBWin.add($.__views.fbView);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading..."
    });
    $.__views.faceBWin.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var isIos = "iphone" == Titanium.Platform.osname;
    var isAndroid = "android" == Titanium.Platform.osname;
    $.faceBWin.addEventListener("open", function() {
        $.activityIndicator.show();
    });
    $.fbView.addEventListener("load", function() {
        $.activityIndicator.hide();
    });
    $.faceBWin.addEventListener("androidback", function() {
        $.faceBWin.close();
    });
    isAndroid && ($.fbView.softKeyboardOnFocus = Titanium.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS);
    if (isIos) $.backBtn.top = "25dp"; else if (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory) {
        $.backBtn.width = "30dp";
        $.backBtn.height = "30dp";
    } else if (isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory) {
        $.backBtn.width = "40dp";
        $.backBtn.height = "40dp";
    } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
        $.backBtn.width = "50dp";
        $.backBtn.height = "50dp";
    }
    __defers["$.__views.backBtn!click!closeWin"] && $.__views.backBtn.addEventListener("click", closeWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;