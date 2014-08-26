function logger(label, data, level) {
    level || (level = "debug");
    "debug" === level ? Ti.API.debug("[URBANAIRPORT] " + label + (data ? ": " + JSON.stringify(data, null, "	") : "")) : Ti.API.error("[URBANAIRPORT] " + label + (data ? ": " + JSON.stringify(data, null, "	") : ""));
}

function caller(e) {
    _.isFunction(callback) && callback(e);
}

var _ = _ || require("alloy")._, OS_IOS = true, OS_ANDROID = !OS_IOS && false;

var urbanairship = require("ti.urbanairship");

var callback, sound = true, debug = false;

if (OS_ANDROID) var pendingTags = null, pendingAlias = null, compatibility = false, compatibilityStack = [], vibrate = true;

if (OS_IOS) var alert = true, badge = true;

urbanairship.register = function(config) {
    config && this.config(config);
    this.enable();
    return this;
};

urbanairship.config = function(config) {
    (debug || false !== config.debug) && logger("INIT", config);
    var that = this;
    _.each(config, function(val, key) {
        switch (key) {
          case "callback":
            callback = val;
            break;

          case "debug":
            debug = !!val;
            break;

          case "compatibility":
            if (OS_ANDROID) {
                compatibility = !!val;
                "undefined" == typeof config.showOnAppClick && (that.showOnAppClick = compatibility);
            }
            break;

          case "options":
            OS_IOS && (that.options = val);
            break;

          case "tags":
            that.resetTags(val);
            break;

          case "alias":
            that.resetAlias(val);
            break;

          case "sound":
            sound = !!val;
            break;

          case "vibrate":
            OS_ANDROID && (vibrate = !!val);
            break;

          case "badge":
            OS_IOS && (badge = !!val);
            break;

          case "alert":
            OS_IOS && (alert = !!val);
            break;

          default:
            if ("undefined" != typeof that[key]) if (_.isFunction(that[key])) {
                that[key](val);
                logger("calling " + key, val);
            } else {
                that[key] = val;
                logger("setting " + key, val);
            }
        }
    });
};

urbanairship.resetTags = function(tags) {
    "string" == typeof tags && (tags = [ tags ]);
    if (OS_ANDROID && !this.isFlying) {
        pendingTags = tags;
        return;
    }
    this.tags = tags;
    return this;
};

urbanairship.addTags = function(tags) {
    "string" == typeof tags && (tags = [ tags ]);
    if (OS_ANDROID && !this.isFlying) {
        pendingTags = _.union(pendingTags || [], tags);
        return;
    }
    this.tags = _.union(this.tags || [], tags);
    return this;
};

urbanairship.removeTags = function(tags) {
    "string" == typeof tags && (tags = [ tags ]);
    if (OS_ANDROID && !this.isFlying) {
        pendingTags = _.difference(pendingTags || [], tags);
        return;
    }
    this.tags = _.difference(this.tags || [], tags);
    return this;
};

urbanairship.resetAlias = function(alias) {
    if (OS_ANDROID && !this.isFlying) {
        pendingAlias = alias;
        return;
    }
    this.alias = alias;
    return this;
};

urbanairship.enable = function() {
    var that = this;
    if (OS_IOS) {
        var types = [];
        badge && types.push(Ti.Network.NOTIFICATION_TYPE_BADGE);
        alert && types.push(Ti.Network.NOTIFICATION_TYPE_ALERT);
        sound && types.push(Ti.Network.NOTIFICATION_TYPE_SOUND);
        Ti.Network.registerForPushNotifications({
            types: types,
            success: function(e) {
                logger("SUCCESS", e);
                that.registerDevice(e.deviceToken);
                e.type = "success";
                e.valid = e.success;
                caller(e);
            },
            error: function(e) {
                logger("ERROR", e);
                e.type = "error";
                e.valid = e.success;
                caller(e);
            },
            callback: function(e) {
                logger("CALLBACK", e);
                that.handleNotification(e.data);
                e.type = "callback";
                e.clicked = e.inBackground;
                e.message = e.data.aps.alert;
                e.payload = e.data.aps;
                caller(e);
            }
        });
    }
    OS_ANDROID && (that.pushEnabled = true);
    return this;
};

urbanairship.disable = function() {
    OS_IOS && this.unregisterDevice();
    OS_ANDROID && (this.pushEnabled = false);
    return this;
};

if (OS_ANDROID) {
    urbanairship.addEventListener(urbanairship.EVENT_URBAN_AIRSHIP_SUCCESS, function(e) {
        logger("SUCCESS", e);
        if (null !== pendingAlias) {
            urbanairship.alias = pendingAlias;
            pendingAlias = null;
        }
        if (null !== pendingTags) {
            urbanairship.tags = pendingTags;
            pendingTags = null;
        }
        e.type = "success";
        e.success = e.valid;
        caller(e);
    });
    urbanairship.addEventListener(urbanairship.EVENT_URBAN_AIRSHIP_ERROR, function(e) {
        logger("ERROR", e);
        e.type = "error";
        e.success = e.valid;
        caller(e);
    });
    urbanairship.addEventListener(urbanairship.EVENT_URBAN_AIRSHIP_CALLBACK, function(e) {
        logger("CALLBACK", e);
        if (compatibility) {
            var hash = Ti.Utils.sha1(JSON.stringify([ e.payload, e.message ]));
            if (-1 !== compatibilityStack.indexOf(hash)) return;
            compatibilityStack.push(hash);
        }
        e.type = "callback";
        if (e.payload) try {
            var json = e.payload.replace(/\{/g, '{"').replace(/=/g, '":"').replace(/, /g, '","').replace(/\}/g, '"}');
            e.payload = JSON.parse(json);
        } catch (err) {
            logger("CALLBACK PAYLOAD", err, "error");
            e.payload = {};
        }
        e.inBackground = null;
        e.data = e.payload || {};
        e.data.alert = e.message;
        e.data.aps = e.data;
        caller(e);
    });
}

module.exports = urbanairship;