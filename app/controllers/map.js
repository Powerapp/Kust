	var args = arguments[0] || {};
	
	var isIos = Titanium.Platform.osname == "iphone";
	var isAndroid = Titanium.Platform.osname == "android";
	
	var mapModule = require('ti.map');
	
	function closeWin() {
		$.mapWin.close();
	}
	
	$.mapWin.addEventListener("androidback", function(e) {
		$.mapWin.close();
	});
	$.mapWin.addEventListener("open", function(e) {
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
			alert("Internet is not 100%. It may be some problems showing the map correctly.");
		} else {
	
		}
	});
	
	if (isAndroid) {
		var googleService = mapModule.isGooglePlayServicesAvailable();
		if (googleService == mapModule.SUCCESS) {
			Ti.API.info(' TEST    >    Google Play services is installed.');
		} else {
			alert("Googe Play Service is not installed on this device and can´t show the map correctly.");
		}
	
	}
	var mapView = mapModule.createView({
		top : "10%",
		bottom : "10%",
		left : 0,
		right : 0,
		mapType : mapModule.NORMAL_TYPE,
		region : {
			latitude : 55.391376,
			longitude : 12.834545,
			latitudeDelta : 0.09,
			longitudeDelta : 0.09
		},
		animate : true,
		userLocation : true,
	});
	$.mapWin.add(mapView);
	
	

	
	
	var click = 0;
	
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.open("GET", 'http://www.kustcafe.se/app/annotations.json');
	
	xhr.onerror = function(e) {
		alert("Sorry, can´t load the map correctly. Try again.");
	};
	var response = "";
	xhr.onload = function() {
		response = JSON.parse(this.responseText);
		Ti.API.info(this.responseText);
	
		for (var j = 0; j < response.length; j++) {
			var annotation = mapModule.createAnnotation({
				latitude : response[j].latitude,
				longitude : response[j].longitude,
				title:response[j].title,
				subtitle:response[j].subtitle,
				animate : true,
				id : response[j].id,
				
			});
		
			if (response[j].id == "1") {
				annotation.image = response[j].image;
			} else if (response[j].id == "2") {
				annotation.pincolor = mapModule.ANNOTATION_BLUE;
				if (isIos) {
					annotation.pincolor = mapModule.ANNOTATION_PURPLE;
				}
			} else if (response[j].id == "3") {
				annotation.pincolor = mapModule.ANNOTATION_YELLOW;
			} else if (response[j].id == "4") {
				annotation.pincolor = mapModule.ANNOTATION_GREEN;
			} else {
	
			}
	
			mapView.addAnnotations([annotation]);
			
			
			
		}
	
	};
	xhr.send();
	
	var annotation_falsterbo = mapModule.createAnnotation({
		latitude : 55.392032,
		longitude : 12.834395,
		title : "Kust Café",
		subtitle : "Storgatan 14, Falsterbo",
		image : "/images/kust_annotation.png",
	});
	
	var annotation_skanor = mapModule.createAnnotation({
		latitude : 55.4163,
		longitude : 12.830572,
		title : "Kust Café",
		subtitle : "Hamnvägen, Skanörs Hamn",
		image : "/images/kust_annotation.png"
	});
	
	var onlyKustView = mapModule.createView({
		top : 0,
		bottom : 0,
		left : 0,
		right : 0,
		mapType : mapModule.NORMAL_TYPE,
		region : {
			latitude : 55.391376,
			longitude : 12.834545,
			latitudeDelta : 0.09,
			longitudeDelta : 0.09
		},
		animate : true,
		userLocation : true,
		annotations : [annotation_falsterbo, annotation_skanor],
	});
	$.onlyKustMap.add(onlyKustView);
	
	$.homeAway.addEventListener("click", function(e) {
		if (click == 0) {
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
	
	if (isIos) {
		$.backBtn.top = "25dp";
	
	} else {
		if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 2) {
			$.homeAway.font = {
				fontSize : "20sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.backBtn.width = "30dp";
			$.backBtn.height = "30dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {
			$.homeAway.font = {
				fontSize : "28sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.backBtn.width = "40dp";
			$.backBtn.height = "40dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {
			$.homeAway.font = {
				fontSize : "40sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.backBtn.width = "50dp";
			$.backBtn.height = "50dp";
		} else {
	
		}
	}
	
	
