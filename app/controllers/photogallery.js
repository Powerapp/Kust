var args = arguments[0] || {};

var isIos = Titanium.Platform.osname == "iphone";
var isAndroid = Titanium.Platform.osname == "android";

function closeWin() {
	$.photoGalleryWin.close();
}



$.photoGalleryWin.addEventListener("androidback", function(e) {
	$.photoGalleryWin.close();
});

//Layouttjafs
if (isIos) {
	$.backBtn.top = "25dp";
	$.titleLbl.top = "25dp";

} else {

	if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 2) {
		$.homeAway.font = {
			fontSize : "16sp",
			fontWeight : "bold",
		};
		
		$.backBtn.width = "30dp";
		$.backBtn.height = "30dp";

	} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {
		$.homeAway.font = {
			fontSize : "20sp",
			fontWeight : "bold",
		};
		
		$.backBtn.width = "40dp";
		$.backBtn.height = "40dp";

	} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {
		$.homeAway.font = {
			fontSize : "30sp",
			fontWeight : "bold",
		};
		
		$.backBtn.width = "50dp";
		$.backBtn.height = "50dp";
	} else {

	}
}
//595a3f483c135923383ac6476daf9d6f
//17a6e5eb783552b5
var xhr = Ti.Network.createHTTPClient();

xhr.open("GET", 'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=595a3f483c135923383ac6476daf9d6f&user_id=125487026%40N06&content_type=4&extras=url_m%2C+url_q%2Cdescription&per_page=500&format=json&nojsoncallback=1');

xhr.onerror = function(e) {
	alert("Can´t load photogallery, please try again");
};
var fullWidth = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.9);
var imageWidth = Math.floor(fullWidth * 0.33);
var data = [];
var mydata = '';


	xhr.onload = function() {
		//parse response
		mydata = JSON.parse(this.responseText);
		Ti.API.info(this.responseText);
		
		var wrapper = Ti.UI.createView({
			layout:"horizontal",
			width:"100%",
			height: Ti.UI.SIZE,
			
		});
		$.photosContainerView.add(wrapper);
	
		for (var i = 0; i < mydata.photos.photo.length; i++) {
			var items = mydata.photos.photo[i];
			var thumbNail = items.url_q;
			var bigImage = items.url_m;
			var bigImageWidth = items.width_m;
			var bigImageHeight = items.height_m;
			var photoDescription = items.description._content;

			/*var contView = Ti.UI.createView({
				width : imageWidth,
				height : imageWidth,
				borderWidth : "2dp",
				borderColor : "#fff",
				right : 0,
				left : 0,
			});
			wrapper2.add(contView);*/

			var imageView = Ti.UI.createImageView({
				width : imageWidth,
				height : imageWidth,
				//height : "100%",
				//width : "100%",
				borderWidth : "2dp",
				borderColor : "#fff",
				image : thumbNail,
				bigImage : bigImage,
				photoDescription:photoDescription,
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
			

			$.bigImageViewContainer.addEventListener("click", function(e) {
				$.bigImageViewContainer.visible = false;
				$.backBtn.visible = true;
				$.homeAway.text = "";
			});

			data.push(thumbNail);
		}

	};
	xhr.send();

