function Controller() {
    function closeWin() {
        $.menuWin.close();
    }
    function getCafeMenu() {
        var data = [];
        var json = "";
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onerror = function() {
            alert("Sorry! Can´t load the menu. Please try again.");
        };
        xhr.onload = function() {
            json = JSON.parse(this.responseText);
            for (var i = 0; json.length > i; i++) {
                var row = Ti.UI.createTableViewRow({
                    height: "auto",
                    backgroundColor: json[i].Color,
                    backgroundSelectedColor: "transparent"
                });
                if ("1" == json[i].id) {
                    var headLineLbl = Ti.UI.createLabel({
                        height: "auto",
                        width: "90%",
                        left: "5%",
                        text: json[i].Headline,
                        font: {
                            fontSize: "12sp",
                            fontWeight: "bold"
                        },
                        color: "#000"
                    });
                    row.add(headLineLbl);
                } else if ("2" == json[i].id) {
                    var wrapperView = Ti.UI.createView({
                        width: "100%",
                        left: "5%",
                        top: "5%",
                        left: "5%",
                        height: Ti.UI.SIZE,
                        layout: "vertical"
                    });
                    row.add(wrapperView);
                    var dishLbl = Ti.UI.createLabel({
                        width: "70%",
                        height: "auto",
                        left: "0dp",
                        top: "5%",
                        text: json[i].Dish,
                        font: {
                            fontSize: "12sp"
                        },
                        color: "#000"
                    });
                    wrapperView.add(dishLbl);
                    var priceLbl = Ti.UI.createLabel({
                        width: "15%",
                        height: "auto",
                        right: "0dp",
                        top: "5%",
                        text: json[i].Price,
                        font: {
                            fontSize: "12sp"
                        },
                        color: "#000"
                    });
                    row.add(priceLbl);
                }
                data.push(row);
            }
            $.menuTblView.setData(data);
        };
        xhr.open("GET", "http://www.kustcafe.se/app/cafeMenu.json");
        xhr.send();
    }
    function getTodaySpecial() {
        var data = [];
        var json = "";
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onerror = function() {
            alert("Sorry! Can´t load the menu. Please try again.");
        };
        xhr.onload = function() {
            json = JSON.parse(this.responseText);
            Ti.API.info(json.length);
            for (var i = 0; json.length > i; i++) {
                var row = Ti.UI.createTableViewRow({
                    height: "auto",
                    backgroundColor: json[i].Color,
                    backgroundSelectedColor: "transparent"
                });
                if ("1" == json[i].id) {
                    var headLineLbl = Ti.UI.createLabel({
                        height: "auto",
                        width: "90%",
                        left: "5%",
                        text: json[i].Headline,
                        font: {
                            fontSize: "12sp",
                            fontWeight: "bold"
                        },
                        color: "#000"
                    });
                    row.add(headLineLbl);
                } else if ("2" == json[i].id) {
                    var wrapperView = Ti.UI.createView({
                        width: "100%",
                        height: Ti.UI.SIZE,
                        layout: "vertical"
                    });
                    row.add(wrapperView);
                    var dayLbl = Ti.UI.createLabel({
                        width: "95%",
                        left: "5%",
                        top: "5%",
                        height: "auto",
                        text: json[i].Headline,
                        font: {
                            fontSize: "12sp",
                            fontWeight: "bold"
                        },
                        color: "#000"
                    });
                    wrapperView.add(dayLbl);
                    var dishLbl = Ti.UI.createLabel({
                        top: "5%",
                        left: "5%",
                        right: "5%",
                        height: "auto",
                        text: json[i].Dish,
                        font: {
                            fontSize: "12sp"
                        },
                        color: "#000"
                    });
                    wrapperView.add(dishLbl);
                    var extraLbl = Ti.UI.createLabel({
                        width: "95%",
                        left: "5%",
                        top: "5%",
                        height: "auto",
                        text: "",
                        font: {
                            fontSize: "12sp"
                        },
                        color: "#000"
                    });
                    wrapperView.add(extraLbl);
                }
                data.push(row);
            }
            $.menuTblView.setData(data);
        };
        xhr.open("GET", "http://www.kustcafe.se/app/todaySpecialMenu.json");
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.menuWin = Ti.UI.createWindow({
        backgroundColor: "#F9F9F9",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "menuWin",
        fullScreen: "true",
        navBarHidden: "true",
        modal: "true"
    });
    $.__views.menuWin && $.addTopLevelView($.__views.menuWin);
    $.__views.backgroundView = Ti.UI.createView({
        top: "15%",
        bottom: "10%",
        left: 0,
        right: 0,
        visible: true,
        id: "backgroundView"
    });
    $.__views.menuWin.add($.__views.backgroundView);
    $.__views.blueberry = Ti.UI.createImageView({
        top: 0,
        left: 0,
        width: "50%",
        height: "50%",
        image: "/images/blueberry.png",
        borderColor: "#fff",
        borderWidth: "2dp",
        id: "blueberry"
    });
    $.__views.backgroundView.add($.__views.blueberry);
    $.__views.salmon = Ti.UI.createImageView({
        bottom: 0,
        left: 0,
        width: "50%",
        height: "50%",
        image: "/images/lax.png",
        borderColor: "#fff",
        borderWidth: "2dp",
        id: "salmon"
    });
    $.__views.backgroundView.add($.__views.salmon);
    $.__views.bisquits = Ti.UI.createImageView({
        bottom: 0,
        right: 0,
        width: "50%",
        height: "50%",
        image: "/images/skorpor.png",
        borderColor: "#fff",
        borderWidth: "2dp",
        id: "bisquits"
    });
    $.__views.backgroundView.add($.__views.bisquits);
    $.__views.gabor = Ti.UI.createImageView({
        top: 0,
        right: 0,
        width: "50%",
        height: "50%",
        image: "/images/gabor.jpg",
        borderColor: "#fff",
        borderWidth: "2dp",
        id: "gabor"
    });
    $.__views.backgroundView.add($.__views.gabor);
    $.__views.blueView = Ti.UI.createView({
        width: "80%",
        height: "40%",
        backgroundColor: "#003978",
        opacity: .5,
        id: "blueView"
    });
    $.__views.backgroundView.add($.__views.blueView);
    $.__views.cateringLbl = Ti.UI.createLabel({
        width: "75%",
        height: "35%",
        text: "På en hörna mitt i Falsterbo finns Kust med sin speciella atmosfär. En blandning av familjärt och hippt. Amerikansk östkust möter svensk skärgård. Fräscht och hemtrevligt, på Gabors eget vis.",
        color: "#fff",
        font: {
            fontSize: "12sp",
            fontFamily: "Rockwell-Bold"
        },
        textAlign: "center",
        id: "cateringLbl"
    });
    $.__views.backgroundView.add($.__views.cateringLbl);
    $.__views.topView = Ti.UI.createView({
        height: "10%",
        top: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        bubbleParent: false,
        id: "topView"
    });
    $.__views.menuWin.add($.__views.topView);
    $.__views.backBtn = Ti.UI.createButton({
        width: "20dp",
        height: "20dp",
        backgroundImage: "/images/backarrow.png",
        left: "10dp",
        id: "backBtn"
    });
    $.__views.topView.add($.__views.backBtn);
    closeWin ? $.__views.backBtn.addEventListener("click", closeWin) : __defers["$.__views.backBtn!click!closeWin"] = true;
    $.__views.menuTblView = Ti.UI.createTableView({
        width: "80%",
        top: "20%",
        bottom: "15%",
        separatorColor: "#bcebf1",
        minRowHeight: "50dp",
        backgroundColor: "#F9F9F9",
        visible: false,
        id: "menuTblView"
    });
    $.__views.menuWin.add($.__views.menuTblView);
    $.__views.btnContainerView = Ti.UI.createView({
        width: "100%",
        height: "5%",
        top: "10%",
        layout: "horizontal",
        backgroundColor: "#003978",
        id: "btnContainerView"
    });
    $.__views.menuWin.add($.__views.btnContainerView);
    $.__views.bottomView = Ti.UI.createView({
        height: "10%",
        bottom: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        id: "bottomView"
    });
    $.__views.menuWin.add($.__views.bottomView);
    $.__views.homeAway = Ti.UI.createLabel({
        width: "90%",
        height: "90%",
        text: "FEST PÅ GÅNG? VI HJÄLPER ER GÄRNA MED MATEN.",
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontFamily: "Rockwell-Bold"
        },
        textAlign: "center",
        id: "homeAway"
    });
    $.__views.bottomView.add($.__views.homeAway);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var isIos = "iphone" == Titanium.Platform.osname;
    var isAndroid = "android" == Titanium.Platform.osname;
    $.menuWin.addEventListener("androidback", function() {
        $.menuWin.close();
    });
    if (isIos) $.backBtn.top = "25dp"; else if (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "18sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.cateringLbl.font = {
            fontSize: "13sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "30dp";
        $.backBtn.height = "30dp";
    } else if (isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "26sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.cateringLbl.font = {
            fontSize: "20sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "40dp";
        $.backBtn.height = "40dp";
    } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "38sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.cateringLbl.font = {
            fontSize: "30sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "50dp";
        $.backBtn.height = "50dp";
    }
    var data = [ {
        title: "MENY",
        id: "1"
    }, {
        title: "DAGENS",
        id: "2"
    } ];
    for (var i = 0; 2 > i; i++) {
        var menuBtn = Ti.UI.createButton({
            color: "#fff",
            left: "0dp",
            height: "100%",
            width: "50%",
            borderWidth: "2dp",
            borderColor: "#bcebf1",
            title: data[i].title,
            backgroundColor: "#003978",
            font: {
                fontSize: "12sp",
                fontWeight: "bold"
            },
            id: data[i].id,
            bottomViewtxt: data[i].text
        });
        $.btnContainerView.add(menuBtn);
        isAndroid && 1 == Titanium.Platform.Android.physicalSizeCategory || (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory ? menuBtn.font = {
            fontSize: "14sp",
            fontWeight: "bold"
        } : isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory ? menuBtn.font = {
            fontSize: "22sp",
            fontWeight: "bold"
        } : isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory && (menuBtn.font = {
            fontSize: "36sp",
            fontWeight: "bold"
        }));
        menuBtn.addEventListener("click", function(e) {
            if ("1" == e.source.id) {
                $.backgroundView.visible = false;
                $.menuTblView.visible = true;
                getCafeMenu();
                $.homeAway.text = "FEST PÅ GÅNG? VI HJÄLPER ER GÄRNA MED MATEN";
            } else if ("2" == e.source.id) {
                $.backgroundView.visible = false;
                $.menuTblView.visible = true;
                $.homeAway.text = "DAGENS MENY 85 KR\nINKL KAFFE ELLER THÉ";
                getTodaySpecial();
            }
            $.menuTblView.scrollToTop(0, {
                animated: true
            });
        });
    }
    __defers["$.__views.backBtn!click!closeWin"] && $.__views.backBtn.addEventListener("click", closeWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;