'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var HealthKit = /** @class */ (function (_super) {
    tslib.__extends(HealthKit, _super);
    function HealthKit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HealthKit.prototype.available = function () { return core.cordova(this, "available", {}, arguments); };
    HealthKit.prototype.checkAuthStatus = function (options) { return core.cordova(this, "checkAuthStatus", {}, arguments); };
    HealthKit.prototype.requestAuthorization = function (options) { return core.cordova(this, "requestAuthorization", {}, arguments); };
    HealthKit.prototype.readDateOfBirth = function () { return core.cordova(this, "readDateOfBirth", {}, arguments); };
    HealthKit.prototype.readGender = function () { return core.cordova(this, "readGender", {}, arguments); };
    HealthKit.prototype.readBloodType = function () { return core.cordova(this, "readBloodType", {}, arguments); };
    HealthKit.prototype.readFitzpatrickSkinType = function () { return core.cordova(this, "readFitzpatrickSkinType", {}, arguments); };
    HealthKit.prototype.saveWeight = function (options) { return core.cordova(this, "saveWeight", {}, arguments); };
    HealthKit.prototype.readWeight = function (options) { return core.cordova(this, "readWeight", {}, arguments); };
    HealthKit.prototype.saveHeight = function (options) { return core.cordova(this, "saveHeight", {}, arguments); };
    HealthKit.prototype.readHeight = function (options) { return core.cordova(this, "readHeight", {}, arguments); };
    HealthKit.prototype.findWorkouts = function () { return core.cordova(this, "findWorkouts", {}, arguments); };
    HealthKit.prototype.saveWorkout = function (options) { return core.cordova(this, "saveWorkout", {}, arguments); };
    HealthKit.prototype.querySampleType = function (options) { return core.cordova(this, "querySampleType", {}, arguments); };
    HealthKit.prototype.querySampleTypeAggregated = function (options) { return core.cordova(this, "querySampleTypeAggregated", {}, arguments); };
    HealthKit.prototype.deleteSamples = function (options) { return core.cordova(this, "deleteSamples", {}, arguments); };
    HealthKit.prototype.monitorSampleType = function (options) { return core.cordova(this, "monitorSampleType", {}, arguments); };
    HealthKit.prototype.sumQuantityType = function (options) { return core.cordova(this, "sumQuantityType", {}, arguments); };
    HealthKit.prototype.saveQuantitySample = function (options) { return core.cordova(this, "saveQuantitySample", {}, arguments); };
    HealthKit.prototype.saveCorrelation = function (options) { return core.cordova(this, "saveCorrelation", {}, arguments); };
    HealthKit.prototype.queryCorrelationType = function (options) { return core.cordova(this, "queryCorrelationType", {}, arguments); };
    HealthKit.pluginName = "HealthKit";
    HealthKit.plugin = "com.telerik.plugins.healthkit";
    HealthKit.pluginRef = "window.plugins.healthkit";
    HealthKit.repo = "https://github.com/Telerik-Verified-Plugins/HealthKit";
    HealthKit.platforms = ["iOS"];
    HealthKit.decorators = [
        { type: core$1.Injectable }
    ];
    return HealthKit;
}(core.IonicNativePlugin));

exports.HealthKit = HealthKit;
