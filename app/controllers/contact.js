	var args = arguments[0] || {};
	
	var isIos = Titanium.Platform.osname == "iphone";
	var isAndroid = Titanium.Platform.osname == "android";
	
	function closeWin() {
		$.contactWin.close();
	}
	
	$.contactWin.addEventListener("androidback", function(e) {
		$.contactWin.close();
	});
	
	if (isAndroid) {
		var first = true;
		$.messageTxtArea.addEventListener('focus', function f(e) {
			if (first) {
				first = false;
				$.messageTxtArea.blur();
	
			} else {
				$.messageTxtArea.removeEventListener('focus', f);
			}
		});
	}
	
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
	
	function sendEmail() {
		if ($.messageTxtArea.value == "") {
			alert("Skriv in ditt meddelande");
		} else {
			var emailDialog = Ti.UI.createEmailDialog();
			emailDialog.subject = "Mail från appen";
			emailDialog.toRecipients = ['info@kustcafe.se'];
			emailDialog.messageBody = $.messageTxtArea.value;
	
			if (emailDialog.isSupported()) {
				emailDialog.open();
			} else {
				alert('You need to configure your email account');
			}
			emailDialog.addEventListener('complete', function(e) {
				if (isIos) {
					if (e.result == emailDialog.SENT) {
						alert("Message sent!");
					}
					if (e.result == emailDialog.FAILED) {
						alert("Message not sent. Please try again!");
					}
				} else {
	
				}
			});
		}
	
	}
	
	if (isIos) {
		$.backBtn.top = "25dp";
		$.callKustBtn.top = "25dp";
	
	} else {
		if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 2) {
			$.homeAway.font = {
				fontSize : "13sp"
			};
			$.messageLbl.font = {
				fontSize : "12sp"
			};
			$.messageTxtArea.font = {
				fontSize : "12sp"
			};
	
			$.backBtn.width = "30dp";
			$.backBtn.height = "30dp";
			$.callKustBtn.width = "40dp";
			$.callKustBtn.height = "30dp";
			$.sendEmailBtn.width = "40dp";
			$.sendEmailBtn.height = "35dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 3) {
			$.homeAway.font = {
				fontSize : "20sp"
			};
			$.messageLbl.font = {
				fontSize : "16sp"
			};
			$.messageTxtArea.font = {
				fontSize : "18sp"
			};
			$.callKustBtn.visible = false;
			$.backBtn.width = "40dp";
			$.backBtn.height = "40dp";
			$.callKustBtn.width = "50dp";
			$.callKustBtn.height = "40dp";
			$.sendEmailBtn.height = "45dp";
			$.sendEmailBtn.width = "50dp";
	
		} else if (isAndroid && Titanium.Platform.Android.physicalSizeCategory == 4) {
			$.homeAway.font = {
				fontSize : "28sp"
			};
			$.messageLbl.font = {
				fontSize : "24sp"
			};
			$.messageTxtArea.font = {
				fontSize : "24sp"
			};
			$.callKustBtn.visible = false;
			$.backBtn.width = "50dp";
			$.backBtn.height = "50dp";
			$.callKustBtn.width = "60dp";
			$.callKustBtn.height = "50dp";
			$.sendEmailBtn.width = "60dp";
			$.sendEmailBtn.height = "55dp";
		} else {
	
		}
	}
	
