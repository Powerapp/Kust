function Controller() {
    function tableViewLayout() {
        if (isIos) ; else if (isAndroid && 1 == Titanium.Platform.Android.physicalSizeCategory) titleLbl.font = {
            fontSize: "12sp"
        }; else if (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory) {
            titleLbl.font = {
                fontSize: "18sp"
            };
            row.height = "60dp";
        } else if (isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory) {
            titleLbl.font = {
                fontSize: "24sp"
            };
            row.height = "80dp";
        } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
            titleLbl.font = {
                fontSize: "36sp"
            };
            row.height = "120dp";
        }
    }
    function showMenu() {
        if (0 == clicked) {
            $.menuContainer.animate({
                left: "25%",
                duration: 100
            });
            clicked = 1;
            $.slide.left = "40%";
        } else hideMenu();
    }
    function hideMenu() {
        $.menuContainer.animate({
            left: "0%",
            duration: 100
        });
        clicked = 0;
        $.slide.left = "0%";
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.container = Ti.UI.createWindow({
        backgroundColor: "#F9F9F9",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "container",
        fullScreen: "true",
        navBarHidden: "true",
        modal: "true",
        exitOnClose: "true"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.menuTblView = Ti.UI.createTableView({
        left: "3%",
        top: "13%",
        right: "35%",
        bottom: "13%",
        backgroundColor: "#003978",
        separatorColor: "transparent",
        bubbleParent: false,
        id: "menuTblView"
    });
    $.__views.container.add($.__views.menuTblView);
    $.__views.topView = Ti.UI.createView({
        height: "10%",
        top: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        bubbleParent: false,
        id: "topView"
    });
    $.__views.container.add($.__views.topView);
    $.__views.callKustBtn = Ti.UI.createButton({
        height: "20dp",
        width: "30dp",
        right: "10dp",
        backgroundImage: "/images/phone.png",
        id: "callKustBtn"
    });
    $.__views.topView.add($.__views.callKustBtn);
    callKust ? $.__views.callKustBtn.addEventListener("click", callKust) : __defers["$.__views.callKustBtn!click!callKust"] = true;
    $.__views.menuBtn = Ti.UI.createButton({
        height: "20dp",
        width: "25dp",
        left: "10dp",
        backgroundImage: "/images/menu.png",
        id: "menuBtn"
    });
    $.__views.topView.add($.__views.menuBtn);
    showMenu ? $.__views.menuBtn.addEventListener("click", showMenu) : __defers["$.__views.menuBtn!click!showMenu"] = true;
    $.__views.slide = Ti.UI.createView({
        left: 0,
        right: "-70%",
        top: "10%",
        bottom: "10%",
        bubbleParent: true,
        id: "slide"
    });
    $.__views.container.add($.__views.slide);
    $.__views.menuContainer = Ti.UI.createView({
        backgroundColor: "#fff",
        top: 0,
        bottom: 0,
        left: 0,
        width: "59%",
        id: "menuContainer"
    });
    $.__views.slide.add($.__views.menuContainer);
    $.__views.signs = Ti.UI.createImageView({
        top: 0,
        left: 0,
        width: "50%",
        height: "50%",
        image: "/images/P1070317.jpg",
        borderColor: "#fff",
        borderWidth: "2dp",
        id: "signs"
    });
    $.__views.menuContainer.add($.__views.signs);
    $.__views.sandwich = Ti.UI.createImageView({
        top: 0,
        right: 0,
        width: "50%",
        height: "50%",
        image: "/images/wine.jpg",
        borderColor: "#fff",
        borderWidth: "2dp",
        id: "sandwich"
    });
    $.__views.menuContainer.add($.__views.sandwich);
    $.__views.beach = Ti.UI.createImageView({
        bottom: 0,
        right: 0,
        width: "50%",
        height: "50%",
        image: "/images/beach.jpg",
        borderColor: "#fff",
        borderWidth: "2dp",
        id: "beach"
    });
    $.__views.menuContainer.add($.__views.beach);
    $.__views.openingHours = Ti.UI.createView({
        bottom: 0,
        left: 0,
        width: "50%",
        height: "50%",
        backgroundColor: "#F9F9F9",
        borderColor: "#FFF",
        borderWidth: "2dp",
        id: "openingHours"
    });
    $.__views.menuContainer.add($.__views.openingHours);
    $.__views.headLine = Ti.UI.createLabel({
        text: "ÖPPETTIDER",
        top: "0dp",
        width: "auto",
        height: "15%",
        textAlign: "center",
        color: "#003978",
        font: {
            fontSize: "18sp",
            fontWeight: "bold"
        },
        id: "headLine"
    });
    $.__views.openingHours.add($.__views.headLine);
    $.__views.hourLblContainer = Ti.UI.createView({
        top: "15%",
        left: "0",
        right: "0",
        bottom: "3%",
        backgroundColor: "#F9F9F9",
        id: "hourLblContainer"
    });
    $.__views.openingHours.add($.__views.hourLblContainer);
    $.__views.hoursLbl = Ti.UI.createLabel({
        text: "",
        color: "#003978",
        top: "3%",
        height: "auto",
        width: "auto",
        font: {
            fontSize: "10sp"
        },
        textAlign: "center",
        id: "hoursLbl"
    });
    $.__views.hourLblContainer.add($.__views.hoursLbl);
    $.__views.bottomView = Ti.UI.createView({
        height: "10%",
        bottom: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        id: "bottomView"
    });
    $.__views.container.add($.__views.bottomView);
    $.__views.homeAway = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        right: "5dp",
        bottom: "5dp",
        text: "HOME AWAY FROM HOME",
        color: "#fff",
        font: {
            fontSize: "16sp",
            fontFamily: "Rockwell-Bold"
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
    $.__views.container.add($.__views.callKustView);
    $.__views.opDialogContainerView = Ti.UI.createView({
        width: "80%",
        height: "20%",
        visible: false,
        id: "opDialogContainerView"
    });
    $.__views.container.add($.__views.opDialogContainerView);
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
    var isIos = false;
    var isAndroid = true;
    Ti.API.info("Ti.Platform.displayCaps.density: " + Ti.Platform.displayCaps.density);
    Titanium.Network.networkType === Titanium.Network.NETWORK_NONE && Titanium.API.info("Your internet connection seems to be a bit shaky. Kust Café app depends on internet to display data correctly.");
    isAndroid && Titanium.Platform.Android.physicalSizeCategory;
    urbanairport.register({
        debug: true,
        sound: true,
        vibrate: true,
        badge: true,
        alert: true,
        autoBadge: false,
        compatibility: true,
        alias: "Test",
        tags: "single",
        callback: function(e) {
            if ("error" === e.type) ; else if ("success" === e.type) ; else if ("callback" === e.type) {
                var pushView = Ti.UI.createView({
                    top: "10%",
                    bottom: "10%",
                    backgroundColor: "#fff"
                });
                $.container.add(pushView);
                var pushLbl = Ti.UI.createLabel({
                    width: "90%",
                    height: "50%",
                    top: "5%",
                    textAlign: "center",
                    text: e.message,
                    color: "#003978"
                });
                pushView.add(pushLbl);
                isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory ? pushLbl.font = {
                    fontSize: "16sp"
                } : isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory ? pushLbl.font = {
                    fontSize: "20sp"
                } : isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory && (pushLbl.font = {
                    fontSize: "30sp"
                });
                var closePushMsg = Ti.UI.createButton({
                    width: "25%",
                    height: "10%",
                    bottom: "5%",
                    title: "Stäng",
                    font: {
                        fontSize: "20sp"
                    },
                    color: "#fff",
                    backgroundColor: "#003978"
                });
                pushView.add(closePushMsg);
                closePushMsg.addEventListener("click", function() {
                    pushView.visible = false;
                });
            }
        }
    });
    urbanairport.enable();
    urbanairport.addTags("foo");
    urbanairport.showOnAppClick = true;
    var xhr = Ti.Network.createHTTPClient();
    xhr.open("GET", "http://www.kustcafe.se/app/openingHours.json");
    xhr.onerror = function() {
        alert("Can´t load openinghours, please try again");
    };
    var mydata = "";
    xhr.onload = function() {
        mydata = JSON.parse(this.responseText);
        Ti.API.info(this.responseText);
        $.hoursLbl.text = mydata.openingHours.Headline;
    };
    xhr.send();
    if (isIos) {
        $.menuBtn.top = "25dp";
        $.callKustBtn.top = "25dp";
    } else if (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "20sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.headLine.font = {
            fontSize: "18sp",
            fontWeight: "bold"
        };
        $.hoursLbl.font = {
            fontSize: "12sp"
        };
        $.opDialogHeadlineLbl.font = {
            fontSize: "18sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.menuBtn.width = "30dp";
        $.menuBtn.height = "30dp";
        $.callKustBtn.width = "40dp";
        $.callKustBtn.height = "30dp";
    } else if (isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "28sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.headLine.font = {
            fontSize: "24sp",
            fontWeight: "bold"
        };
        $.hoursLbl.font = {
            fontSize: "18sp"
        };
        $.callKustBtn.visible = false;
        $.menuBtn.width = "40dp";
        $.menuBtn.height = "40dp";
        $.callKustBtn.width = "50dp";
        $.callKustBtn.height = "40dp";
    } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "40sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.headLine.font = {
            fontSize: "36sp",
            fontWeight: "bold"
        };
        $.hoursLbl.font = {
            fontSize: "24sp"
        };
        $.callKustBtn.visible = false;
        $.menuBtn.width = "50dp";
        $.menuBtn.height = "50dp";
        $.callKustBtn.width = "60dp";
        $.callKustBtn.height = "50dp";
    }
    var clicked = 0;
    $.menuContainer.addEventListener("click", function() {
        if (0 == clicked) {
            $.menuContainer.animate({
                left: "25%",
                duration: 100
            });
            clicked = 1;
            $.slide.left = "40%";
        } else hideMenu();
    });
    $.container.addEventListener("swipe", function() {
        hideMenu();
    });
    var data = [ {
        title: "MENY",
        image: "/images/arrow.png",
        url: "menu"
    }, {
        title: "KARTA",
        image: "/images/arrow.png",
        url: "map"
    }, {
        title: "KONTAKT",
        image: "/images/arrow.png",
        url: "contact"
    }, {
        title: "EVENTS",
        image: "/images/arrow.png",
        url: "events"
    }, {
        title: "FOTOGALLERI",
        image: "/images/arrow.png",
        url: "photogallery"
    }, {
        title: "FACEBOOK",
        image: "/images/arrow.png",
        url: "faceB"
    } ];
    var rowData = [];
    for (var i = 0; data.length > i; i++) {
        var row = Ti.UI.createTableViewRow({
            height: "50dp",
            rowUrl: data[i].url
        });
        var titleLbl = Ti.UI.createLabel({
            color: "#fff",
            left: "20dp",
            height: "auto",
            width: "auto",
            text: data[i].title,
            font: {
                fontSize: "12sp"
            }
        });
        row.add(titleLbl);
        var hasChildImg = Ti.UI.createImageView({
            right: "10dp",
            image: data[i].image,
            width: "auto",
            height: "30%"
        });
        row.add(hasChildImg);
        rowData.push(row);
        tableViewLayout();
    }
    $.menuTblView.setData(rowData);
    $.menuTblView.addEventListener("click", function(e) {
        var childWin = Alloy.createController(e.rowData.rowUrl, {}).getView();
        childWin.open();
    });
    $.container.open();
    __defers["$.__views.callKustBtn!click!callKust"] && $.__views.callKustBtn.addEventListener("click", callKust);
    __defers["$.__views.menuBtn!click!showMenu"] && $.__views.menuBtn.addEventListener("click", showMenu);
    __defers["$.__views.yesCallBtn!click!yesCallKust"] && $.__views.yesCallBtn.addEventListener("click", yesCallKust);
    __defers["$.__views.noCallBtn!click!cancelCallKust"] && $.__views.noCallBtn.addEventListener("click", cancelCallKust);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;