	var isIos = Titanium.Platform.osname == "iphone";
	var isAndroid = Titanium.Platform.osname == "android";
	Ti.API.info('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
	
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		Titanium.API.info('Your internet connection seems to be a bit shaky. Kust Café app depends on internet to display data correctly.');
	} else {
	
	}
	
	if (isAndroid) {
		var size = Titanium.Platform.Android.physicalSizeCategory;
		//alert(size);
	} else {
	
	}
	
	urbanairport.register({
		debug : true, 
	
		sound : true, 
		vibrate : true, 
		badge : true, 
		alert : true, 
	
		autoBadge : false,
	
		compatibility : true,
	
		alias : 'Test',
		tags : 'single', 
	
		callback : function(e) {
	
			if (e.type === 'error') {
	
			} else if (e.type === 'success') {
				//alert(e.deviceToken);
	
			} else if (e.type === 'callback') {
	
				var pushView = Ti.UI.createView({
					top : "10%",
					bottom : "10%",
					backgroundColor : "#fff",
	
				});
				$.container.add(pushView);
	
				var pushLbl = Ti.UI.createLabel({
					width : "90%",
					height : "50%",
					top : "5%",
					textAlign : "center",
					text : e.message,
					color : "#003978",
	
				});
				pushView.add(pushLbl);
	
				if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 2) {
					pushLbl.font = {
						fontSize : "16sp"
					};
				} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {
					pushLbl.font = {
						fontSize : "20sp"
					};
				} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {
					pushLbl.font = {
						fontSize : "30sp"
					};
				} else {
	
				}
	
				var closePushMsg = Ti.UI.createButton({
					width : "25%",
					height : "10%",
					bottom : "5%",
					title : "Stäng",
					font : {
						fontSize : "20sp"
					},
					color : "#fff",
					backgroundColor : "#003978"
	
				});
				pushView.add(closePushMsg);
	
				closePushMsg.addEventListener("click", function(e) {
					pushView.visible = false;
				});
	
			}
		}
	});
	
	urbanairport.enable();
	
	urbanairport.addTags('foo');
	
	urbanairport.showOnAppClick = true;
	
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.open("GET", 'http://www.kustcafe.se/app/openingHours.json');
	
	xhr.onerror = function(e) {
		alert("Can´t load openinghours, please try again");
	};
	var mydata = '';
	
	xhr.onload = function() {
		
		mydata = JSON.parse(this.responseText);
		Ti.API.info(this.responseText);
		$.hoursLbl.text = mydata.openingHours.Headline;
	
	};
	xhr.send();
	
	if (isIos) {
		$.menuBtn.top = "25dp";
		$.callKustBtn.top = "25dp";
	
	} else {
		if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 2) {
			$.homeAway.font = {
				fontSize : "20sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.headLine.font = {
				fontSize : "18sp",
				fontWeight : "bold"
			};
			$.hoursLbl.font = {
				fontSize : "12sp"
			};
			$.opDialogHeadlineLbl.font = {
				fontSize : "18sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.menuBtn.width = "30dp";
			$.menuBtn.height = "30dp";
			$.callKustBtn.width = "40dp";
			$.callKustBtn.height = "30dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {
			$.homeAway.font = {
				fontSize : "28sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
	
			$.headLine.font = {
				fontSize : "24sp",
				fontWeight : "bold"
			};
			$.hoursLbl.font = {
				fontSize : "18sp"
			};
			$.callKustBtn.visible = false;
			$.menuBtn.width = "40dp";
			$.menuBtn.height = "40dp";
			$.callKustBtn.width = "50dp";
			$.callKustBtn.height = "40dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {
			$.homeAway.font = {
				fontSize : "40sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.headLine.font = {
				fontSize : "36sp",
				fontWeight : "bold"
			};
			$.hoursLbl.font = {
				fontSize : "24sp"
			};
			$.callKustBtn.visible = false;
			$.menuBtn.width = "50dp";
			$.menuBtn.height = "50dp";
			$.callKustBtn.width = "60dp";
			$.callKustBtn.height = "50dp";
		} else {
	
		}
	}
	
	function tableViewLayout() {
		if (isIos) {
	
		} else {
			if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 1) {
				titleLbl.font = {
					fontSize : "12sp"
				};
	
			} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 2) {
				titleLbl.font = {
					fontSize : "18sp"
				};
				row.height = "60dp";
	
			} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {
				titleLbl.font = {
					fontSize : "24sp"
				};
				row.height = "80dp";
	
			} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {
				titleLbl.font = {
					fontSize : "36sp"
				};
				row.height = "120dp";
			} else {
	
			}
		}
	}
	
	var clicked = 0;
	function showMenu() {
		if (clicked == 0) {
			$.menuContainer.animate({
				left : "25%",
				duration : 100,
			});
			clicked = 1;
			$.slide.left = "40%";
	
		} else {
			hideMenu();
		}
	}
	
	$.menuContainer.addEventListener("click", function(e) {
		if (clicked == 0) {
			$.menuContainer.animate({
				left : "25%",
				duration : 100,
			});
			clicked = 1;
			$.slide.left = "40%";
	
		} else {
			hideMenu();
		}
	});
	
	function hideMenu() {
	
		$.menuContainer.animate({
			left : "0%",
			duration : 100,
		});
		clicked = 0;
		$.slide.left = "0%";
	}
	
	$.container.addEventListener("swipe", function(e) {
		hideMenu();
	});
	
	function callKust(e) {
		$.callKustView.visible = true;
		$.opDialogContainerView.visible = true;
	
	}
	
	function yesCallKust() {
		Titanium.Platform.openURL('tel:004640473830');
	}
	
	function cancelCallKust() {
		$.callKustView.visible = false;
		$.opDialogContainerView.visible = false;
	}
	
	var data = [{
		title : "MENY",
		image : "/images/arrow.png",
		url : "menu"
	}, {
		title : "KARTA",
		image : "/images/arrow.png",
		url : "map"
	}, {
		title : "KONTAKT",
		image : "/images/arrow.png",
		url : "contact"
	}, {
		title : "EVENTS",
		image : "/images/arrow.png",
		url : "events"
	}, {
		title : "FOTOGALLERI",
		image : "/images/arrow.png",
		url : "photogallery"
	}, {
		title : "FACEBOOK",
		image : "/images/arrow.png",
		url : "faceB"
	}];
	
	var rowData = [];
	
	for (var i = 0; i < data.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : "50dp",
			rowUrl : data[i].url,
		});
		var titleLbl = Ti.UI.createLabel({
			color : "#fff",
			left : "20dp",
			height : "auto",
			width : "auto",
			text : data[i].title,
			font : {
				fontSize : "12sp"
			}
		});
		row.add(titleLbl);
	
		var hasChildImg = Ti.UI.createImageView({
			right : "10dp",
			image : data[i].image,
			width : "auto",
			height : "30%",
		});
		row.add(hasChildImg);
	
		rowData.push(row);
		tableViewLayout();
	}
	
	$.menuTblView.setData(rowData);
	
	$.menuTblView.addEventListener("click", function(e) {
		var childWin = Alloy.createController(e.rowData.rowUrl, {
		}).getView();
	
		childWin.open();
	
	});
	$.container.open();

	
