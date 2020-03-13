/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigurationProvider } from './auth-configuration.provider';
/**
 * Implement this class-interface to create a custom storage.
 * @abstract
 */
export class OidcSecurityStorage {
}
OidcSecurityStorage.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * This method must contain the logic to read the storage.
     * @abstract
     * @param {?} key
     * @return {?} The value of the given key
     */
    OidcSecurityStorage.prototype.read = function (key) { };
    /**
     * This method must contain the logic to write the storage.
     * @abstract
     * @param {?} key
     * @param {?} value The value for the given key
     * @return {?}
     */
    OidcSecurityStorage.prototype.write = function (key, value) { };
}
export class BrowserStorage {
    /**
     * @param {?} configProvider
     */
    constructor(configProvider) {
        this.configProvider = configProvider;
        this.hasStorage = typeof Storage !== 'undefined';
    }
    /**
     * @param {?} key
     * @return {?}
     */
    read(key) {
        if (this.hasStorage) {
            return JSON.parse(this.configProvider.openIDConfiguration.storage.getItem(key + '_' + this.configProvider.openIDConfiguration.client_id));
        }
        return;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    write(key, value) {
        if (this.hasStorage) {
            value = value === undefined ? null : value;
            this.configProvider.openIDConfiguration.storage.setItem(key + '_' + this.configProvider.openIDConfiguration.client_id, JSON.stringify(value));
        }
    }
}
BrowserStorage.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BrowserStorage.ctorParameters = () => [
    { type: ConfigurationProvider }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    BrowserStorage.prototype.hasStorage;
    /**
     * @type {?}
     * @private
     */
    BrowserStorage.prototype.configProvider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy5zZWN1cml0eS5zdG9yYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLW9pZGMtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29pZGMuc2VjdXJpdHkuc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7QUFNdEUsTUFBTSxPQUFnQixtQkFBbUI7OztZQUR4QyxVQUFVOzs7Ozs7Ozs7SUFNUCx3REFBdUM7Ozs7Ozs7O0lBTXZDLGdFQUFxRDs7QUFJekQsTUFBTSxPQUFPLGNBQWM7Ozs7SUFHdkIsWUFBb0IsY0FBcUM7UUFBckMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBQ3JELElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDO0lBQ3JELENBQUM7Ozs7O0lBRU0sSUFBSSxDQUFDLEdBQVc7UUFDbkIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDN0k7UUFFRCxPQUFPO0lBQ1gsQ0FBQzs7Ozs7O0lBRU0sS0FBSyxDQUFDLEdBQVcsRUFBRSxLQUFVO1FBQ2hDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUNuRCxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUN4QixDQUFDO1NBQ0w7SUFDTCxDQUFDOzs7WUF4QkosVUFBVTs7OztZQXBCRixxQkFBcUI7Ozs7Ozs7SUFzQjFCLG9DQUE0Qjs7Ozs7SUFFaEIsd0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvblByb3ZpZGVyIH0gZnJvbSAnLi9hdXRoLWNvbmZpZ3VyYXRpb24ucHJvdmlkZXInO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGlzIGNsYXNzLWludGVyZmFjZSB0byBjcmVhdGUgYSBjdXN0b20gc3RvcmFnZS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9pZGNTZWN1cml0eVN0b3JhZ2Uge1xuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIG11c3QgY29udGFpbiB0aGUgbG9naWMgdG8gcmVhZCB0aGUgc3RvcmFnZS5cbiAgICAgKiBAcmV0dXJuIFRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4ga2V5XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IHJlYWQoa2V5OiBzdHJpbmcpOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBtdXN0IGNvbnRhaW4gdGhlIGxvZ2ljIHRvIHdyaXRlIHRoZSBzdG9yYWdlLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgZm9yIHRoZSBnaXZlbiBrZXlcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3Qgd3JpdGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJvd3NlclN0b3JhZ2UgaW1wbGVtZW50cyBPaWRjU2VjdXJpdHlTdG9yYWdlIHtcbiAgICBwcml2YXRlIGhhc1N0b3JhZ2U6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1Byb3ZpZGVyOiBDb25maWd1cmF0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgdGhpcy5oYXNTdG9yYWdlID0gdHlwZW9mIFN0b3JhZ2UgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWFkKGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMuaGFzU3RvcmFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5jb25maWdQcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnN0b3JhZ2UuZ2V0SXRlbShrZXkgKyAnXycgKyB0aGlzLmNvbmZpZ1Byb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uY2xpZW50X2lkKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmhhc1N0b3JhZ2UpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5zdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgICAga2V5ICsgJ18nICsgdGhpcy5jb25maWdQcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLmNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=