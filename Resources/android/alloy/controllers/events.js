function Controller() {
    function closeWin() {
        $.eventsWin.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "events";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.eventsWin = Ti.UI.createWindow({
        backgroundColor: "#F9F9F9",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "eventsWin",
        fullScreen: "true",
        navBarHidden: "true",
        modal: "true"
    });
    $.__views.eventsWin && $.addTopLevelView($.__views.eventsWin);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading..."
    });
    $.__views.eventsWin.add($.__views.activityIndicator);
    $.__views.topView = Ti.UI.createView({
        height: "10%",
        top: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        bubbleParent: false,
        id: "topView"
    });
    $.__views.eventsWin.add($.__views.topView);
    $.__views.backBtn = Ti.UI.createButton({
        width: "20dp",
        height: "20dp",
        backgroundImage: "/images/backarrow.png",
        left: "10dp",
        id: "backBtn"
    });
    $.__views.topView.add($.__views.backBtn);
    closeWin ? $.__views.backBtn.addEventListener("click", closeWin) : __defers["$.__views.backBtn!click!closeWin"] = true;
    $.__views.eventTblView = Ti.UI.createTableView({
        width: "90%",
        top: "15%",
        bottom: "15%",
        separatorColor: "transparent",
        minRowHeight: "50dp",
        backgroundColor: "#F9F9F9",
        id: "eventTblView"
    });
    $.__views.eventsWin.add($.__views.eventTblView);
    $.__views.bottomView = Ti.UI.createView({
        height: "10%",
        bottom: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        id: "bottomView"
    });
    $.__views.eventsWin.add($.__views.bottomView);
    $.__views.homeAway = Ti.UI.createLabel({
        width: "90%",
        height: "90%",
        text: "HOME AWAY FROM HOME",
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
    var isIos = false;
    var isAndroid = true;
    $.eventsWin.addEventListener("androidback", function() {
        $.eventsWin.close();
    });
    $.eventsWin.addEventListener("open", function() {
        $.activityIndicator.show();
    });
    $.eventTblView.addEventListener("load", function() {
        $.activityIndicator.hide();
    });
    if (isIos) $.backBtn.top = "25dp"; else if (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "20sp",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "30dp";
        $.backBtn.height = "30dp";
    } else if (isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "28sp",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "40dp";
        $.backBtn.height = "40dp";
    } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "40sp",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "50dp";
        $.backBtn.height = "50dp";
    }
    var data = [];
    var json = "";
    var xhr = Titanium.Network.createHTTPClient();
    xhr.onerror = function() {
        alert("Sorry, can´t load events at the moment. Please try again.");
    };
    xhr.onload = function() {
        json = JSON.parse(this.responseText);
        for (var i = 0; json.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                height: Ti.UI.SIZE,
                backgroundColor: "#F9F9F9",
                rowUrl: json[i].url,
                rowChild: json[i].hasChild
            });
            var eventLbl = Ti.UI.createLabel({
                width: "100%",
                height: "auto",
                left: "0dp",
                text: json[i].event,
                font: {
                    fontSize: "12sp",
                    fontWeight: "bold"
                },
                color: "#000"
            });
            var descriptionLbl = Ti.UI.createLabel({
                width: "100%",
                height: "auto",
                left: "0dp",
                top: "5%",
                text: json[i].description,
                font: {
                    fontSize: "12sp"
                },
                color: "#000"
            });
            var extraLbl = Ti.UI.createLabel({
                top: "5%",
                width: "100%",
                left: "0dp",
                text: "",
                font: {
                    fontSize: "12sp"
                },
                color: "#000"
            });
            var lblContainerView = Ti.UI.createView({
                width: "65%",
                left: "25%",
                height: Ti.UI.SIZE,
                top: 0,
                layout: "vertical"
            });
            var wrapperView = Ti.UI.createView({
                width: "100%",
                height: Ti.UI.SIZE,
                top: "5%"
            });
            lblContainerView.add(eventLbl);
            lblContainerView.add(descriptionLbl);
            lblContainerView.add(extraLbl);
            wrapperView.add(lblContainerView);
            row.add(wrapperView);
            var dayLbl = Ti.UI.createLabel({
                backgroundColor: "#003978",
                height: "auto",
                width: "20%",
                left: 0,
                top: "5%",
                text: json[i].day + "\n" + json[i].month,
                textAlign: "center",
                color: "#fff",
                font: {
                    fontSize: "20sp",
                    fontWeight: "bold"
                }
            });
            wrapperView.add(dayLbl);
            if ("true" == json[i].hasChild) {
                var hasChildImg = Ti.UI.createImageView({
                    image: "/images/arrow_blue.png",
                    right: "0dp",
                    width: "5%",
                    height: "auto"
                });
                wrapperView.add(hasChildImg);
            }
            if (isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory) {
                eventLbl.font = {
                    fontSize: "16sp",
                    fontWeight: "bold"
                };
                descriptionLbl.font = {
                    fontSize: "16sp"
                };
                dayLbl.font = {
                    fontSize: "26sp",
                    fontWeight: "bold"
                };
            } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
                eventLbl.font = {
                    fontSize: "20sp",
                    fontWeight: "bold"
                };
                descriptionLbl.font = {
                    fontSize: "20sp"
                };
                dayLbl.font = {
                    fontSize: "34sp",
                    fontWeight: "bold"
                };
            }
            data.push(row);
        }
        $.eventTblView.setData(data);
        $.eventTblView.addEventListener("click", function(e) {
            if ("true" == e.rowData.rowChild) {
                var childWin = Alloy.createController("eventChildWin", {
                    winUrl: e.rowData.rowUrl
                }).getView();
                childWin.open();
            } else isIos ? row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : $.eventTblView.touchEnabled = false;
        });
    };
    xhr.open("GET", "http://www.kustcafe.se/app/events.json");
    xhr.send();
    __defers["$.__views.backBtn!click!closeWin"] && $.__views.backBtn.addEventListener("click", closeWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;