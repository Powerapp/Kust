var args = arguments[0] || {};

var winUrl = args.winUrl;
$.childUrlWin.url = winUrl;

var isIos = Titanium.Platform.osname=="iphone";
var isAndroid = Titanium.Platform.osname=="android";

$.eventsChildWin.addEventListener("open", function(e){
	$.activityIndicator.show();
});

$.childUrlWin.addEventListener('load',function(e){
	$.activityIndicator.hide();
});

function closeWin(){
	$.eventsChildWin.close();
}

$.eventsChildWin.addEventListener("androidback", function(e){
	$.eventsChildWin.close();
});

if(isAndroid){
	$.childUrlWin.softKeyboardOnFocus = Titanium.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
}else{
	
}


if(isIos){
	$.backBtn.top="25dp";

}else{
	if(isAndroid && Titanium.Platform.Android.physicalSizeCategory==2){
		$.homeAway.font={fontSize:"20dp", fontWeight:"bold", fontFamily:"RockwellBold"};
		$.backBtn.width="30dp";
		$.backBtn.height="30dp";
		
	}else if(isAndroid && Titanium.Platform.Android.physicalSizeCategory==3){
		$.homeAway.font={fontSize:"28dp", fontWeight:"bold", fontFamily:"RockwellBold"};
		$.backBtn.width="40dp";
		$.backBtn.height="40dp";
	
	}else if(isAndroid && Titanium.Platform.Android.physicalSizeCategory==4){
		$.homeAway.font={fontSize:"40dp", fontWeight:"bold", fontFamily:"RockwellBold"};
		$.backBtn.width="50dp";
		$.backBtn.height="50dp";
	}else{
		
	}
}