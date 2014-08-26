function Controller() {
    function Client(clientId, clientSecret, callbackUrl) {
        this.INSTAGRAM_CLIENT_ID = clientId;
        this.INSTAGRAM_CLIENT_SECRET = clientSecret;
        this.INSTAGRAM_CALLBACK_URL = callbackUrl;
        this.ENDPOINT = "https://api.instagram.com/v1/";
        this.ACCESS_TOKEN = null;
        this.LOGIN_PROMISE = null;
        Ti.API.debug(JSON.stringify(this));
    }
    function showAuthorizeUI(pUrl, _that) {
        var that = _that;
        window = Ti.UI.createWindow({
            top: 0,
            fullscreen: true
        });
        webView = Ti.UI.createWebView({
            url: pUrl,
            scalesPageToFit: true,
            touchEnabled: true,
            top: 0,
            backgroundColor: "#FFF"
        });
        Ti.API.debug("Setting:[" + Ti.UI.AUTODETECT_NONE + "]");
        webView.addEventListener("beforeload", function(e) {
            if (-1 != e.url.indexOf(that.INSTAGRAM_CALLBACK_URL) || -1 != e.url.indexOf("instagram")) {
                Titanium.API.debug("in before load " + JSON.stringify(e));
                authorizeUICallback(e, that.LOGIN_PROMISE);
                webView.stopLoading = true;
            }
        });
        webView.addEventListener("load", function(e) {
            authorizeUICallback(e, that.LOGIN_PROMISE);
        });
        window.add(webView);
        window.open();
    }
    function destroyAuthorizeUI() {
        Ti.API.debug("destroyAuthorizeUI");
        if (null == window) return;
        try {
            Ti.API.debug("destroyAuthorizeUI:webView.removeEventListener");
            webView.removeEventListener("load", authorizeUICallback);
            Ti.API.debug("destroyAuthorizeUI:window.close()");
            window.close();
        } catch (ex) {
            Ti.API.debug("Cannot destroy the authorize UI. Ignoring.");
        }
    }
    function authorizeUICallback(e, _loginPromise) {
        Ti.API.debug("authorizeUILoaded " + e.url);
        Titanium.API.debug("authorizeUICallback " + JSON.stringify(e));
        Titanium.API.debug("e.url " + e.url);
        debugger;
        if (e.url && -1 != e.url.indexOf("#access_token")) {
            var token = e.url.split("=")[1];
            this.ACCESS_TOKEN = token;
            Ti.App.fireEvent("app:instagram_token", {
                data: token
            });
            void 0 !== success_callback && success_callback({
                access_token: token
            });
            _loginPromise.resolve({
                access_token: token
            });
            Titanium.API.debug("Saved Access Token " + token);
            destroyAuthorizeUI();
        } else if ("http://instagram.com/" == e.url) {
            Ti.App.fireEvent("app:instagram_logout", {});
            destroyAuthorizeUI();
            _loginPromise.resolve({
                access_token: null,
                logout: true
            });
        } else if (-1 != e.url.indexOf("#error=access_denied")) {
            Ti.App.fireEvent("app:instagram_access_denied", {});
            destroyAuthorizeUI();
            _loginPromise.resolve({
                access_token: null,
                access_denied: true
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "instagram-module";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.Client = Client;
    var window, webView, success_callback;
    var Q = require("q");
    Client.prototype.login = function(authSuccess_callback, _scope) {
        var deferred = Q.defer();
        var scope, that = this;
        scope = _scope || "likes+comments";
        that.LOGIN_PROMISE = deferred;
        if (null === Ti.App.Properties.getString("INSTAGRAM.ACCESS_TOKEN")) {
            void 0 !== authSuccess_callback && (success_callback = authSuccess_callback);
            showAuthorizeUI(String.format("https://instagram.com/oauth/authorize/?response_type=token&client_id=%s&redirect_uri=%s&scope=%s&display=touch", that.INSTAGRAM_CLIENT_ID, that.INSTAGRAM_CALLBACK_URL, scope), that);
        } else {
            Ti.API.info("login: using saved token");
            that.ACCESS_TOKEN = Ti.App.Properties.getString("INSTAGRAM.ACCESS_TOKEN");
            if (that.ACCESS_TOKEN) {
                ({
                    access_token: that.ACCESS_TOKEN
                });
                authSuccess_callback && success_callback(result);
                deferred.resolve(result);
                Titanium.App.Properties.removeProperty("INSTAGRAM.ACCESS_TOKEN");
            }
        }
        return deferred.promise;
    };
    Client.prototype.get = function(args) {
        Ti.API.debug("Client.prototype.get: started");
        var url, that = this;
        try {
            if (null == that.xhr) {
                that.xhr = Titanium.Network.createHTTPClient();
                that.xhr.autoEncodeUrl = false;
            }
            url = null != that.ACCESS_TOKEN ? that.ENDPOINT + args.path + "?access_token=" + that.ACCESS_TOKEN : that.ENDPOINT + args.path + "?client_id=" + that.CLIENT_ID;
            for (var x = 0; args.params.length > x; x++) url = url + "&" + args.params[x][0] + "=" + args.params[x][1];
            Ti.API.debug("Client.prototype.get " + url);
            that.xhr.open("GET", url);
            that.xhr.onerror = function(e) {
                Ti.API.error("InstagramMgr ERROR " + e.error);
                Ti.API.error("InstagramMgr ERROR " + that.xhr.location);
                args.error && args.error(e);
            };
            that.xhr.onload = function() {
                Ti.API.debug("InstagramMgr response: " + that.xhr.responseText);
                args.success && args.success(that.xhr.responseText);
            };
            that.xhr.send();
        } catch (err) {
            Titanium.UI.createAlertDialog({
                title: "Error",
                message: String(err),
                buttonNames: [ "OK" ]
            }).show();
        }
    };
    Client.prototype.post = function(args) {
        Ti.API.debug("Client.prototype.post: started");
        var url, that = this;
        try {
            if (null == that.xhr) {
                that.xhr = Titanium.Network.createHTTPClient();
                that.xhr.autoEncodeUrl = false;
            }
            url = null != that.ACCESS_TOKEN ? that.ENDPOINT + args.path + "?access_token=" + that.ACCESS_TOKEN : that.ENDPOINT + args.path + "?client_id=" + that.CLIENT_ID;
            Ti.API.debug("Client.prototype.post " + url);
            that.xhr.open("POST", url);
            that.xhr.onerror = function(e) {
                Ti.API.error("InstagramMgr ERROR " + e.error);
                Ti.API.error("InstagramMgr ERROR " + that.xhr.location);
                args.error && args.error(e);
            };
            that.xhr.onload = function() {
                Ti.API.debug("InstagramMgr response: " + that.xhr.responseText);
                args.success && args.success(that.xhr.responseText);
            };
            that.xhr.send(args.params);
        } catch (err) {
            Titanium.UI.createAlertDialog({
                title: "Error",
                message: String(err),
                buttonNames: [ "OK" ]
            }).show();
        }
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;