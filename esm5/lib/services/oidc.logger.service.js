/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfigurationProvider } from './auth-configuration.provider';
var LoggerService = /** @class */ (function () {
    function LoggerService(configurationProvider) {
        this.configurationProvider = configurationProvider;
    }
    /**
     * @param {?} message
     * @param {...?} args
     * @return {?}
     */
    LoggerService.prototype.logError = /**
     * @param {?} message
     * @param {...?} args
     * @return {?}
     */
    function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.error.apply(console, tslib_1.__spread([message], args));
    };
    /**
     * @param {?} message
     * @return {?}
     */
    LoggerService.prototype.logWarning = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        if (this.configurationProvider.openIDConfiguration.log_console_warning_active) {
            console.warn(message);
        }
    };
    /**
     * @param {?} message
     * @return {?}
     */
    LoggerService.prototype.logDebug = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        if (this.configurationProvider.openIDConfiguration.log_console_debug_active) {
            console.log(message);
        }
    };
    LoggerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LoggerService.ctorParameters = function () { return [
        { type: ConfigurationProvider }
    ]; };
    return LoggerService;
}());
export { LoggerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoggerService.prototype.configurationProvider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy5sb2dnZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1vaWRjLWNsaWVudC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9vaWRjLmxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV0RTtJQUVJLHVCQUFvQixxQkFBNEM7UUFBNUMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtJQUFHLENBQUM7Ozs7OztJQUVwRSxnQ0FBUTs7Ozs7SUFBUixVQUFTLE9BQVk7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOztRQUNqQyxPQUFPLENBQUMsS0FBSyxPQUFiLE9BQU8sb0JBQU8sT0FBTyxHQUFLLElBQUksR0FBRTtJQUNwQyxDQUFDOzs7OztJQUVELGtDQUFVOzs7O0lBQVYsVUFBVyxPQUFZO1FBQ25CLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLDBCQUEwQixFQUFFO1lBQzNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDOzs7OztJQUVELGdDQUFROzs7O0lBQVIsVUFBUyxPQUFZO1FBQ2pCLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixFQUFFO1lBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDOztnQkFsQkosVUFBVTs7OztnQkFGRixxQkFBcUI7O0lBcUI5QixvQkFBQztDQUFBLEFBbkJELElBbUJDO1NBbEJZLGFBQWE7Ozs7OztJQUNWLDhDQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25Qcm92aWRlciB9IGZyb20gJy4vYXV0aC1jb25maWd1cmF0aW9uLnByb3ZpZGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2dlclNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlndXJhdGlvblByb3ZpZGVyOiBDb25maWd1cmF0aW9uUHJvdmlkZXIpIHt9XG5cbiAgICBsb2dFcnJvcihtZXNzYWdlOiBhbnksIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgbG9nV2FybmluZyhtZXNzYWdlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24ubG9nX2NvbnNvbGVfd2FybmluZ19hY3RpdmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvZ0RlYnVnKG1lc3NhZ2U6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5sb2dfY29uc29sZV9kZWJ1Z19hY3RpdmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19