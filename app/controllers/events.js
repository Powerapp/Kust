	var args = arguments[0] || {};
	
	var isIos = Titanium.Platform.osname == "iphone";
	var isAndroid = Titanium.Platform.osname == "android";
	
	function closeWin() {
		$.eventsWin.close();
	}
	
	$.eventsWin.addEventListener("androidback", function(e) {
		$.eventsWin.close();
	});
	
	$.eventsWin.addEventListener("open", function(e) {
		$.activityIndicator.show();
	});
	
	$.eventTblView.addEventListener('load', function(e) {
		$.activityIndicator.hide();
	});
	
	if (isIos) {
		$.backBtn.top = "25dp";
	
	} else {
		if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 2) {
			$.homeAway.font = {
				fontSize : "20sp",
				fontFamily : "RockwellBold"
			};
			$.backBtn.width = "30dp";
			$.backBtn.height = "30dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {
			$.homeAway.font = {
				fontSize : "28sp",
				fontFamily : "RockwellBold"
			};
			$.backBtn.width = "40dp";
			$.backBtn.height = "40dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {
			$.homeAway.font = {
				fontSize : "40sp",
				fontFamily : "RockwellBold"
			};
			$.backBtn.width = "50dp";
			$.backBtn.height = "50dp";
		} else {
	
		}
	}
	
	var data = [];
	var json = '';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onerror = function() {
		alert("Sorry, can´t load events at the moment. Please try again.");
	};
	
	xhr.onload = function() {
		json = JSON.parse(this.responseText);
	
		for (var i = 0; i < json.length; i++) {
			var row = Ti.UI.createTableViewRow({
				height : Ti.UI.SIZE,
				backgroundColor : "#F9F9F9",
				rowUrl : json[i].url,
				rowChild : json[i].hasChild,
			});
	
			var eventLbl = Ti.UI.createLabel({
				width : "100%",
				height : "auto",
				left : "0dp",
				text : json[i].event,
				font : {
					fontSize : '12sp',
					fontWeight : "bold",
				},
				color : '#000'
			});
	
			var descriptionLbl = Ti.UI.createLabel({
				width : "100%",
				height : "auto",
				left : "0dp",
				top : "5%",
				text : json[i].description,
				font : {
					fontSize : '12sp',
				},
				color : '#000'
			});
	
			var extraLbl = Ti.UI.createLabel({
				top : "5%",
				width : "100%",
				left : "0dp",
				text : "",
				font : {
					fontSize : '12sp',
				},
				color : '#000'
			});
	
			var lblContainerView = Ti.UI.createView({
				width : "65%",
				left : "25%",
				height : Ti.UI.SIZE,
				top : 0,
				layout : "vertical",
			});
	
			var wrapperView = Ti.UI.createView({
				width : "100%",
				height : Ti.UI.SIZE,
				top : "5%",
	
			});
			lblContainerView.add(eventLbl);
			lblContainerView.add(descriptionLbl);
			lblContainerView.add(extraLbl);
			wrapperView.add(lblContainerView);
			row.add(wrapperView);
	
			var dayLbl = Ti.UI.createLabel({
				backgroundColor : "#003978",
				height : "auto",
				width : "20%",
				left : 0,
				top : "5%",
				text : json[i].day + "\n" + json[i].month,
				textAlign : "center",
				color : "#fff",
				font : {
					fontSize : '20sp',
					fontWeight : "bold"
				},
			});
			wrapperView.add(dayLbl);
	
			if (json[i].hasChild == "true") {
				var hasChildImg = Ti.UI.createImageView({
					image : "/images/arrow_blue.png",
					right : "0dp",
					width : "5%",
					height : "auto",
	
				});
				wrapperView.add(hasChildImg);
			}
	
			if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {
				eventLbl.font = {
					fontSize : "16sp",
					fontWeight : "bold"
				};
				descriptionLbl.font = {
					fontSize : "16sp",
	
				};
				dayLbl.font = {
					fontSize : "26sp",
					fontWeight : "bold"
				};
	
			} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {
				eventLbl.font = {
					fontSize : "20sp",
					fontWeight : "bold"
				};
				descriptionLbl.font = {
					fontSize : "20sp",
	
				};
				dayLbl.font = {
					fontSize : "34sp",
					fontWeight : "bold"
				};
			} else {
	
			}
	
			data.push(row);
		}
		$.eventTblView.setData(data);
	
		$.eventTblView.addEventListener("click", function(e) {
	
			if (e.rowData.rowChild == "true") {
				var childWin = Alloy.createController('eventChildWin', {
					winUrl : e.rowData.rowUrl
				}).getView();
				childWin.open();
	
			} else {
				if (isIos) {
					row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
				} else {
					$.eventTblView.touchEnabled = false;
				}
	
			}
		});
	
	};
	xhr.open('GET', 'http://www.kustcafe.se/app/events.json');
	xhr.send();
	
