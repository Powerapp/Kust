function Controller() {
    function closeWin() {
        $.mapWin.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mapWin = Ti.UI.createWindow({
        backgroundColor: "#F9F9F9",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "mapWin",
        fullScreen: "true",
        navBarHidden: "true",
        modal: "true"
    });
    $.__views.mapWin && $.addTopLevelView($.__views.mapWin);
    $.__views.topView = Ti.UI.createView({
        height: "10%",
        top: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        bubbleParent: false,
        id: "topView"
    });
    $.__views.mapWin.add($.__views.topView);
    $.__views.backBtn = Ti.UI.createButton({
        width: "20dp",
        height: "20dp",
        backgroundImage: "/images/backarrow.png",
        left: "10dp",
        id: "backBtn"
    });
    $.__views.topView.add($.__views.backBtn);
    closeWin ? $.__views.backBtn.addEventListener("click", closeWin) : __defers["$.__views.backBtn!click!closeWin"] = true;
    $.__views.bottomView = Ti.UI.createView({
        height: "10%",
        bottom: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        id: "bottomView"
    });
    $.__views.mapWin.add($.__views.bottomView);
    $.__views.homeAway = Ti.UI.createButton({
        width: "80%",
        height: "80%",
        title: "VISA BARA KUST CAFÈ",
        borderWidth: "2dp",
        borderColor: "#003978",
        color: "#003978",
        font: {
            fontSize: "16sp",
            fontWeight: "bold",
            fontFamily: "Rockwell-Bold"
        },
        textAlign: "center",
        backgroundColor: "transparent",
        id: "homeAway"
    });
    $.__views.bottomView.add($.__views.homeAway);
    $.__views.onlyKustMap = Ti.UI.createView({
        width: "100%",
        top: "10%",
        bottom: "10%",
        visible: false,
        id: "onlyKustMap"
    });
    $.__views.mapWin.add($.__views.onlyKustMap);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var isIos = "iphone" == Titanium.Platform.osname;
    var isAndroid = "android" == Titanium.Platform.osname;
    var mapModule = require("ti.map");
    $.mapWin.addEventListener("androidback", function() {
        $.mapWin.close();
    });
    $.mapWin.addEventListener("open", function() {
        Titanium.Network.networkType === Titanium.Network.NETWORK_NONE && alert("Internet is not 100%. It may be some problems showing the map correctly.");
    });
    if (isAndroid) {
        var googleService = mapModule.isGooglePlayServicesAvailable();
        googleService == mapModule.SUCCESS ? Ti.API.info(" TEST    >    Google Play services is installed.") : alert("Googe Play Service is not installed on this device and can´t show the map correctly.");
    }
    var mapView = mapModule.createView({
        top: "10%",
        bottom: "10%",
        left: 0,
        right: 0,
        mapType: mapModule.NORMAL_TYPE,
        region: {
            latitude: 55.391376,
            longitude: 12.834545,
            latitudeDelta: .09,
            longitudeDelta: .09
        },
        animate: true,
        userLocation: true
    });
    $.mapWin.add(mapView);
    var click = 0;
    var xhr = Ti.Network.createHTTPClient();
    xhr.open("GET", "http://www.kustcafe.se/app/annotations.json");
    xhr.onerror = function() {
        alert("Sorry, can´t load the map correctly. Try again.");
    };
    var response = "";
    xhr.onload = function() {
        response = JSON.parse(this.responseText);
        Ti.API.info(this.responseText);
        for (var j = 0; response.length > j; j++) {
            var annotation = mapModule.createAnnotation({
                latitude: response[j].latitude,
                longitude: response[j].longitude,
                title: response[j].title,
                subtitle: response[j].subtitle,
                animate: true,
                id: response[j].id
            });
            if ("1" == response[j].id) annotation.image = response[j].image; else if ("2" == response[j].id) {
                annotation.pincolor = mapModule.ANNOTATION_BLUE;
                isIos && (annotation.pincolor = mapModule.ANNOTATION_PURPLE);
            } else "3" == response[j].id ? annotation.pincolor = mapModule.ANNOTATION_YELLOW : "4" == response[j].id && (annotation.pincolor = mapModule.ANNOTATION_GREEN);
            mapView.addAnnotations([ annotation ]);
        }
    };
    xhr.send();
    var annotation_falsterbo = mapModule.createAnnotation({
        latitude: 55.392032,
        longitude: 12.834395,
        title: "Kust Café",
        subtitle: "Storgatan 14, Falsterbo",
        image: "/images/kust_annotation.png"
    });
    var annotation_skanor = mapModule.createAnnotation({
        latitude: 55.4163,
        longitude: 12.830572,
        title: "Kust Café",
        subtitle: "Hamnvägen, Skanörs Hamn",
        image: "/images/kust_annotation.png"
    });
    var onlyKustView = mapModule.createView({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        mapType: mapModule.NORMAL_TYPE,
        region: {
            latitude: 55.391376,
            longitude: 12.834545,
            latitudeDelta: .09,
            longitudeDelta: .09
        },
        animate: true,
        userLocation: true,
        annotations: [ annotation_falsterbo, annotation_skanor ]
    });
    $.onlyKustMap.add(onlyKustView);
    $.homeAway.addEventListener("click", function() {
        if (0 == click) {
            $.homeAway.title = "VISA ALLA";
            mapView.visible = false;
            $.onlyKustMap.visible = true;
            click = 1;
        } else {
            $.homeAway.title = "VISA BARA KUST";
            mapView.visible = true;
            $.onlyKustMap.visible = false;
            click = 0;
        }
    });
    if (isIos) $.backBtn.top = "25dp"; else if (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "20sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "30dp";
        $.backBtn.height = "30dp";
    } else if (isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "28sp",
            fontWeight: "bold",
            fontFamily: "RockwellBold"
        };
        $.backBtn.width = "40dp";
        $.backBtn.height = "40dp";
    } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "40sp",
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