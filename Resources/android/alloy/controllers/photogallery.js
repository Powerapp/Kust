function Controller() {
    function closeWin() {
        $.photoGalleryWin.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "photogallery";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.photoGalleryWin = Ti.UI.createWindow({
        backgroundColor: "#F9F9F9",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "photoGalleryWin",
        fullScreen: "true",
        navBarHidden: "true",
        modal: "true"
    });
    $.__views.photoGalleryWin && $.addTopLevelView($.__views.photoGalleryWin);
    $.__views.topView = Ti.UI.createView({
        height: "10%",
        top: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        bubbleParent: false,
        id: "topView"
    });
    $.__views.photoGalleryWin.add($.__views.topView);
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
        id: "titleLbl"
    });
    $.__views.topView.add($.__views.titleLbl);
    $.__views.photosContainerView = Ti.UI.createScrollView({
        width: "90%",
        height: "80%",
        top: "10%",
        bottom: "10%",
        layout: "vertical",
        id: "photosContainerView"
    });
    $.__views.photoGalleryWin.add($.__views.photosContainerView);
    $.__views.bottomView = Ti.UI.createView({
        height: "10%",
        bottom: "0dp",
        right: "0dp",
        left: "0dp",
        backgroundColor: "#bcebf1",
        id: "bottomView"
    });
    $.__views.photoGalleryWin.add($.__views.bottomView);
    $.__views.homeAway = Ti.UI.createLabel({
        width: "90%",
        height: "90%",
        color: "#003978",
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        textAlign: "left",
        id: "homeAway"
    });
    $.__views.bottomView.add($.__views.homeAway);
    $.__views.bigImageViewContainer = Ti.UI.createView({
        width: "100%",
        top: "10%",
        bottom: "10%",
        backgroundColor: "#fff",
        visible: false,
        bubbleParent: false,
        id: "bigImageViewContainer"
    });
    $.__views.photoGalleryWin.add($.__views.bigImageViewContainer);
    $.__views.bigImageView = Ti.UI.createImageView({
        bubbleParent: true,
        width: "100%",
        height: "100%",
        id: "bigImageView"
    });
    $.__views.bigImageViewContainer.add($.__views.bigImageView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var isIos = false;
    var isAndroid = true;
    $.photoGalleryWin.addEventListener("androidback", function() {
        $.photoGalleryWin.close();
    });
    if (isIos) {
        $.backBtn.top = "25dp";
        $.titleLbl.top = "25dp";
    } else if (isAndroid && 2 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "16sp",
            fontWeight: "bold"
        };
        $.backBtn.width = "30dp";
        $.backBtn.height = "30dp";
    } else if (isAndroid && 3 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "20sp",
            fontWeight: "bold"
        };
        $.backBtn.width = "40dp";
        $.backBtn.height = "40dp";
    } else if (isAndroid && 4 == Titanium.Platform.Android.physicalSizeCategory) {
        $.homeAway.font = {
            fontSize: "30sp",
            fontWeight: "bold"
        };
        $.backBtn.width = "50dp";
        $.backBtn.height = "50dp";
    }
    var xhr = Ti.Network.createHTTPClient();
    xhr.open("GET", "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=595a3f483c135923383ac6476daf9d6f&user_id=125487026%40N06&content_type=4&extras=url_m%2C+url_q%2Cdescription&per_page=500&format=json&nojsoncallback=1");
    xhr.onerror = function() {
        alert("Can´t load photogallery, please try again");
    };
    var fullWidth = Math.floor(.9 * Titanium.Platform.displayCaps.platformWidth);
    var imageWidth = Math.floor(.33 * fullWidth);
    var data = [];
    var mydata = "";
    xhr.onload = function() {
        mydata = JSON.parse(this.responseText);
        Ti.API.info(this.responseText);
        var wrapper = Ti.UI.createView({
            layout: "horizontal",
            width: "100%",
            height: Ti.UI.SIZE
        });
        $.photosContainerView.add(wrapper);
        for (var i = 0; mydata.photos.photo.length > i; i++) {
            var items = mydata.photos.photo[i];
            var thumbNail = items.url_q;
            var bigImage = items.url_m;
            var bigImageWidth = items.width_m;
            var bigImageHeight = items.height_m;
            var photoDescription = items.description._content;
            var imageView = Ti.UI.createImageView({
                width: imageWidth,
                height: imageWidth,
                borderWidth: "2dp",
                borderColor: "#fff",
                image: thumbNail,
                bigImage: bigImage,
                photoDescription: photoDescription
            });
            wrapper.add(imageView);
            imageView.addEventListener("click", function(e) {
                $.bigImageView.image = e.source.bigImage;
                $.bigImageViewContainer.visible = true;
                $.backBtn.visible = false;
                $.homeAway.text = e.source.photoDescription;
                if (bigImageHeight > bigImageWidth) {
                    $.bigImageView.height = "80%";
                    $.bigImageView.width = "auto";
                } else {
                    $.bigImageView.height = "auto";
                    $.bigImageView.width = "80%";
                }
            });
            $.bigImageViewContainer.addEventListener("click", function() {
                $.bigImageViewContainer.visible = false;
                $.backBtn.visible = true;
                $.homeAway.text = "";
            });
            data.push(thumbNail);
        }
    };
    xhr.send();
    __defers["$.__views.backBtn!click!closeWin"] && $.__views.backBtn.addEventListener("click", closeWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;