function Controller() {
    function closeWin() {
        $.contactWin.close();
    }
    function callKust() {
        $.callKustView.visible = true;
        $.opDialogContainerView.visible = true;
    }
    function yesCallKust() {
        Titanium.Platform.openURL("tel:004640473830");
    }
    function cancelCallKust() {
        $.callKustView.visible = false;
        $.opDialogContainerView.visible = false;
    }
    function sendEmail() {
        if ("" == $.messageTxtArea.value) alert("Skriv in ditt meddelande"); else {
            var emailDialog = Ti.UI.createEmailDialog();
            emailDialog.subject = "Mail från appen";
            emailDialog.toRecipients = [ "info@kustcafe.se" ];
            emailDialog.messageBody = $.messageTxtArea.value;
            emailDialog.isSupported() ? emailDialog.open() : alert("You need to configure your email account");
            emailDialog.addEventListener("complete", function(e) {
                if (isIos) {
                    e.result == emailDialog.SENT && alert("Message sent!");
                    e.result == emailDialog.FAILED && alert("Message not sent. Please try again!");
                }
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contact";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.contactWin = Ti.UI.createWindow({
        backgroundColor: "#F9F9F9",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "contactWin",
        fullScreen: "true",
        navBarHidden: "true",
        modal: "true"
    });
    $.__views.contactWin && $.addTopLevelView($.__views.contactWin);
    $.__views.backgroundImg = Ti.UI.createImageView({
        top: "10%",
        bottom: "10%",
        left: 0,
        right: 0,
        backgroundImage: "/images/hat.jpg",
        opacity: .4,
        id: "backgroundImg"
    });
    $.__views.contactWin.add($.__views.backgroundImg);
    $.__views.topView = Ti.UI.createView({
        height: "10%",
        top: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        bubbleParent: false,
        id: "topView"
    });
    $.__views.contactWin.add($.__views.topView);
    $.__views.backBtn = Ti.UI.createButton({
        width: "20dp",
        height: "20dp",
        backgroundImage: "/images/backarrow.png",
        left: "10dp",
        id: "backBtn"
    });
    $.__views.topView.add($.__views.backBtn);
    closeWin ? $.__views.backBtn.addEventListener("click", closeWin) : __defers["$.__views.backBtn!click!closeWin"] = true;
    $.__views.callKustBtn = Ti.UI.createButton({
        height: "20dp",
        width: "30dp",
        right: "10dp",
        backgroundImage: "/images/phone.png",
        id: "callKustBtn"
    });
    $.__views.topView.add($.__views.callKustBtn);
    callKust ? $.__views.callKustBtn.addEventListener("click", callKust) : __defers["$.__views.callKustBtn!click!callKust"] = true;
    $.__views.txtFieldContainer = Ti.UI.createView({
        width: "100%",
        top: "10%",
        bottom: "10%",
        backgroundColor: "transparent",
        layout: "vertical",
        scrollType: "vertical",
        id: "txtFieldContainer"
    });
    $.__views.contactWin.add($.__views.txtFieldContainer);
    $.__views.messageLbl = Ti.UI.createLabel({
        top: "5%",
        width: "80%",
        height: "auto",
        textAlign: "left",
        color: "#003978",
        font: {
            fontSize: "12dp"
        },
        text: "SKICKA ETT MAIL TILL OSS. SKRIV DITT MEDDELANDE I RUTAN.",
        id: "messageLbl"
    });
    $.__views.txtFieldContainer.add($.__views.messageLbl);
    $.__views.borderLine = Ti.UI.createView({
        top: "1%",
        width: "80%",
        height: "40%",
        borderWidth: "3dp",
        borderColor: "#003978",
        id: "borderLine"
    });
    $.__views.txtFieldContainer.add($.__views.borderLine);
    $.__views.messageTxtArea = Ti.UI.createTextArea({
        top: "1%",
        width: "100%",
        height: "100%",
        color: "#003978",
        font: {
            fontSize: "14dp"
        },
        keyboardType: Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        autocorrect: false,
        backgroundSelectedColor: "transparent",
        id: "messageTxtArea"
    });
    $.__views.borderLine.add($.__views.messageTxtArea);
    $.__views.hintTextLbl = Ti.UI.createLabel({
        id: "hintTextLbl"
    });
    $.__views.messageTxtArea.add($.__views.hintTextLbl);
    $.__views.sendEmailBtn = Ti.UI.createButton({
        height: "25dp",
        width: "30dp",
        top: "3%",
        right: "10%",
        backgroundImage: "/images/envelope.png",
        id: "sendEmailBtn"
    });
    $.__views.txtFieldContainer.add($.__views.sendEmailBtn);
    sendEmail ? $.__views.sendEmailBtn.addEventListener("click", sendEmail) : __defers["$.__views.sendEmailBtn!click!sendEmail"] = true;
    $.__views.bottomView = Ti.UI.createView({
        height: "10%",
        bottom: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        id: "bottomView"
    });
    $.__views.contactWin.add($.__views.bottomView);
    $.__views.homeAway = Ti.UI.createLabel({
        width: "90%",
        height: "90%",
        text: "+46 40 47 38 30\nStorgatan 14, 23940 Falsterbo, Sverige\ninfo@kust.se   www.kustcafe.se",
        color: "#003978",
        font: {
            fontSize: "12dp"
        },
        textAlign: "center",
        id: "homeAway"
    });
    $.__views.bottomView.add($.__views.homeAway);
    $.__views.callKustView = Ti.UI.createView({
        width: "80%",
        height: "20%",
        backgroundColor: "#bcebf1",
        visible: false,
        opacity: .8,
        id: "callKustView"
    });
    $.__views.contactWin.add($.__views.callKustView);
    $.__views.opDialogContainerView = Ti.UI.createView({
        width: "80%",
        height: "20%",
        visible: false,
        id: "opDialogContainerView"
    });
    $.__views.contactWin.add($.__views.opDialogContainerView);
    $.__views.opDialogHeadlineLbl = Ti.UI.createLabel({
        width: "90%",
        height: "auto",
        top: "15%",
        text: "RINGA TILL KUST CAFÉ?",
        color: "#003978",
        font: {
            fontSize: "16sp",
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "opDialogHeadlineLbl"
    });
    $.__views.opDialogContainerView.add($.__views.opDialogHeadlineLbl);
    $.__views.yesCallBtn = Ti.UI.createButton({
        bottom: "15%",
        left: "10%",
        width: "25%",
        height: "25%",
        title: "Ja",
        backgroundColor: "#003978",
        color: "#fff",
        font: {
            fontSize: "16sp",
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "yesCallBtn"
    });
    $.__views.opDialogContainerView.add($.__views.yesCallBtn);
    yesCallKust ? $.__views.yesCallBtn.addEventListener("click", yesCallKust) : __defers["$.__views.yesCallBtn!click!yesCallKust"] = true;
    $.__views.noCallBtn = Ti.UI.createButton({
        bottom: "15%",
        right: "10%",
        width: "25%",
        height: "25%",
        title: "Nej",
        color: "#fff",
        backgroundColor: "#003978",
        font: {
            fontSize: "16sp",
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "noCallBtn"
    });
    $.__views.opDialogContainerView.add($.__views.noCallBtn);
    cancelCallKust ? $.__views.noCallBtn.addEventListener("click", cancelCallKust) : __defers["$.__views.noCallBtn!click!cancelCallKust"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var isIos = false;
    var isAndroid = true;
    $.contactWin.addEventListener("androidback", function() {
        $.contactWin.close();
    });
    if (isAndroid) {
        var first = true;
        $.messageTxtArea.addEventListener("focus", function f() {
            if (first) {
                first = false;
                $.messageTxtArea.blur();
            } else $.messageTxtArea.removeEventListener("focus", f);
        });
    }
    if (isIos) {
        $.backBtn.top = "25dp";
        $.callKustBtn.top = "25dp";
    } else if (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "13sp"
        };
        $.messageLbl.font = {
            fontSize: "12sp"
        };
        $.messageTxtArea.font = {
            fontSize: "12sp"
        };
        $.backBtn.width = "30dp";
        $.backBtn.height = "30dp";
        $.callKustBtn.width = "40dp";
        $.callKustBtn.height = "30dp";
        $.sendEmailBtn.width = "40dp";
        $.sendEmailBtn.height = "35dp";
    } else if (isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "20sp"
        };
        $.messageLbl.font = {
            fontSize: "16sp"
        };
        $.messageTxtArea.font = {
            fontSize: "18sp"
        };
        $.callKustBtn.visible = false;
        $.backBtn.width = "40dp";
        $.backBtn.height = "40dp";
        $.callKustBtn.width = "50dp";
        $.callKustBtn.height = "40dp";
        $.sendEmailBtn.height = "45dp";
        $.sendEmailBtn.width = "50dp";
    } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "28sp"
        };
        $.messageLbl.font = {
            fontSize: "24sp"
        };
        $.messageTxtArea.font = {
            fontSize: "24sp"
        };
        $.callKustBtn.visible = false;
        $.backBtn.width = "50dp";
        $.backBtn.height = "50dp";
        $.callKustBtn.width = "60dp";
        $.callKustBtn.height = "50dp";
        $.sendEmailBtn.width = "60dp";
        $.sendEmailBtn.height = "55dp";
    }
    __defers["$.__views.backBtn!click!closeWin"] && $.__views.backBtn.addEventListener("click", closeWin);
    __defers["$.__views.callKustBtn!click!callKust"] && $.__views.callKustBtn.addEventListener("click", callKust);
    __defers["$.__views.sendEmailBtn!click!sendEmail"] && $.__views.sendEmailBtn.addEventListener("click", sendEmail);
    __defers["$.__views.yesCallBtn!click!yesCallKust"] && $.__views.yesCallBtn.addEventListener("click", yesCallKust);
    __defers["$.__views.noCallBtn!click!cancelCallKust"] && $.__views.noCallBtn.addEventListener("click", cancelCallKust);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;