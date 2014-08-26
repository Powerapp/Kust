	var args = arguments[0] || {};
	var isIos = Titanium.Platform.osname == "iphone";
	var isAndroid = Titanium.Platform.osname == "android";
	
	function closeWin() {
		$.menuWin.close();
	}
	
	$.menuWin.addEventListener("androidback", function(e) {
		$.menuWin.close();
	});
	
	if (isIos) {
		$.backBtn.top = "25dp";
	
	} else {
		if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 2) {
			$.homeAway.font = {
				fontSize : "18sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.cateringLbl.font = {
				fontSize : "13sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.backBtn.width = "30dp";
			$.backBtn.height = "30dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {
			$.homeAway.font = {
				fontSize : "26sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.cateringLbl.font = {
				fontSize : "20sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.backBtn.width = "40dp";
			$.backBtn.height = "40dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {
			$.homeAway.font = {
				fontSize : "38sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.cateringLbl.font = {
				fontSize : "30sp",
				fontWeight : "bold",
				fontFamily : "RockwellBold"
			};
			$.backBtn.width = "50dp";
			$.backBtn.height = "50dp";
		} else {
	
		}
	}
	var data = [{
		title : "MENY",
		id : "1",
	
	}, {
		title : "DAGENS",
		id : "2",
	}];
	
	var menu = [];
	
	for (var i = 0; i < 2; i++) {
		var menuBtn = Ti.UI.createButton({
			color : "#fff",
			left : "0dp",
			height : "100%",
			width : "50%",
			borderWidth : "2dp",
			borderColor : "#bcebf1",
			title : data[i].title,
			backgroundColor : "#003978",
			font : {
				fontSize : "12sp",
				fontWeight : "bold"
			},
			id : data[i].id,
			bottomViewtxt : data[i].text,
	
		});
		$.btnContainerView.add(menuBtn);
	
		if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 1) {
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 2) {
			menuBtn.font = {
				fontSize : "14sp",
				fontWeight : "bold"
			};
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {
			menuBtn.font = {
				fontSize : "22sp",
				fontWeight : "bold"
			};
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {
			menuBtn.font = {
				fontSize : "36sp",
				fontWeight : "bold"
			};
	
		} else {
	
		}
	
		menuBtn.addEventListener("click", function(e) {
	
			if (e.source.id == "1") {
				$.backgroundView.visible = false;
				$.menuTblView.visible = true;
				getCafeMenu();
				$.homeAway.text = "FEST PÅ GÅNG? VI HJÄLPER ER GÄRNA MED MATEN";
	
			} else if (e.source.id == "2") {
				$.backgroundView.visible = false;
				$.menuTblView.visible = true;
				$.homeAway.text = "DAGENS MENY 85 KR\nINKL KAFFE ELLER THÉ";
				getTodaySpecial();
			} else {
	
			}
			$.menuTblView.scrollToTop(0, {
				animated : true
			});
		});
	
	}
	
	function getCafeMenu() {
		var data = [];
		var json = '';
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function() {
			alert("Sorry! Can´t load the menu. Please try again.");
		};
	
		xhr.onload = function() {
			json = JSON.parse(this.responseText);
	
			for (var i = 0; i < json.length; i++) {
				var row = Ti.UI.createTableViewRow({
					height : "auto",
					backgroundColor : json[i].Color,
					backgroundSelectedColor : "transparent"
				});
	
				if (json[i].id == "1") {
					var headLineLbl = Ti.UI.createLabel({
						height : "auto",
						width : "90%",
						left : "5%",
						text : json[i].Headline,
						font : {
							fontSize : '12sp',
							fontWeight : "bold"
						},
						color : '#000'
					});
					row.add(headLineLbl);
				} else if (json[i].id == "2") {
					var wrapperView = Ti.UI.createView({
						width : "100%",
						left : "5%",
						top : "5%",
						left : "5%",
						height : Ti.UI.SIZE,
						layout : "vertical",
					});
					row.add(wrapperView);
	
					var dishLbl = Ti.UI.createLabel({
						width : "70%",
						height : "auto",
						left : "0dp",
						top : "5%",
						text : json[i].Dish,
						font : {
							fontSize : '12sp',
						},
						color : '#000'
					});
					wrapperView.add(dishLbl);
	
					var priceLbl = Ti.UI.createLabel({
						width : "15%",
						height : "auto",
						right : "0dp",
						top : "5%",
						text : json[i].Price,
						font : {
							fontSize : '12sp',
						},
						color : '#000'
					});
					row.add(priceLbl);
	
				} else {
	
				}
	
				data.push(row);
			}
			$.menuTblView.setData(data);
	
		};
		xhr.open('GET', 'http://www.kustcafe.se/app/cafeMenu.json');
		xhr.send();
	}
	
	function getTodaySpecial() {
		var data = [];
		var json = '';
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function() {
			alert("Sorry! Can´t load the menu. Please try again.");
		};
		xhr.onload = function() {
			json = JSON.parse(this.responseText);
			Ti.API.info(json.length);
			for (var i = 0; i < json.length; i++) {
				var row = Ti.UI.createTableViewRow({
					height : "auto",
					backgroundColor : json[i].Color,
					backgroundSelectedColor : "transparent",
				});
	
				if (json[i].id == "1") {
					var headLineLbl = Ti.UI.createLabel({
						height : "auto",
						width : "90%",
						left : "5%",
						text : json[i].Headline,
						font : {
							fontSize : '12sp',
							fontWeight : "bold"
						},
						color : '#000'
					});
					row.add(headLineLbl);
				} else if (json[i].id == "2") {
					var wrapperView = Ti.UI.createView({
						width : "100%",
						height : Ti.UI.SIZE,
						layout : "vertical",
					});
					row.add(wrapperView);
					var dayLbl = Ti.UI.createLabel({
						width : "95%",
						left : "5%",
						top : "5%",
						height : "auto",
						text : json[i].Headline,
						font : {
							fontSize : '12sp',
							fontWeight : "bold",
						},
						color : '#000'
					});
					wrapperView.add(dayLbl);
	
					var dishLbl = Ti.UI.createLabel({
						top : "5%",
						left : "5%",
						right : "5%",
						height : "auto",
						text : json[i].Dish,
						font : {
							fontSize : '12sp',
	
						},
						color : '#000'
					});
					wrapperView.add(dishLbl);
	
					var extraLbl = Ti.UI.createLabel({
						width : "95%",
						left : "5%",
						top : "5%",
						height : "auto",
						text : "",
						font : {
							fontSize : '12sp',
						},
						color : '#000',
					});
					wrapperView.add(extraLbl);
				} else {
	
				}
	
				data.push(row);
			}
			$.menuTblView.setData(data);
		};
		xhr.open('GET', 'http://www.kustcafe.se/app/todaySpecialMenu.json');
		xhr.send();
	}
	
