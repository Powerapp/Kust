	var args = arguments[0] || {};
	
	var isIos = Titanium.Platform.osname == "iphone";
	var isAndroid = Titanium.Platform.osname == "android";
	
	$.faceBWin.addEventListener("open", function(e) {
		$.activityIndicator.show();
	});
	
	$.fbView.addEventListener('load', function(e) {
		$.activityIndicator.hide();
	});
	
	function closeWin() {
		$.faceBWin.close();
	}
	
	$.faceBWin.addEventListener("androidback", function(e) {
		$.faceBWin.close();
	});
	
	if (isAndroid) {
		$.fbView.softKeyboardOnFocus = Titanium.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
	} else {
	
	}
	
	if (isIos) {
		$.backBtn.top = "25dp";
	
	} else {
		if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 2) {

			$.backBtn.width = "30dp";
			$.backBtn.height = "30dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {

			$.backBtn.width = "40dp";
			$.backBtn.height = "40dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {

			$.backBtn.width = "50dp";
			$.backBtn.height = "50dp";
		} else {
	
		}
	}
	
