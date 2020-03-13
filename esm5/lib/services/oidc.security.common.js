/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { OidcSecurityStorage } from './oidc.security.storage';
var OidcSecurityCommon = /** @class */ (function () {
    function OidcSecurityCommon(oidcSecurityStorage) {
        this.oidcSecurityStorage = oidcSecurityStorage;
        this.storageAuthResult = 'authorizationResult';
        this.storageAccessToken = 'authorizationData';
        this.storageIdToken = 'authorizationDataIdToken';
        this.storageIsAuthorized = '_isAuthorized';
        this.storageUserData = 'userData';
        this.storageAuthNonce = 'authNonce';
        this.storageCodeVerifier = 'code_verifier';
        this.storageAuthStateControl = 'authStateControl';
        this.storageSessionState = 'session_state';
        this.storageSilentRenewRunning = 'storage_silent_renew_running';
        this.storageCustomRequestParams = 'storage_custom_request_params';
    }
    Object.defineProperty(OidcSecurityCommon.prototype, "authResult", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageAuthResult);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageAuthResult, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, "accessToken", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageAccessToken) || '';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageAccessToken, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, "idToken", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageIdToken) || '';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageIdToken, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, "isAuthorized", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageIsAuthorized);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageIsAuthorized, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, "userData", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageUserData);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageUserData, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, "authNonce", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageAuthNonce) || '';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageAuthNonce, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, "code_verifier", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageCodeVerifier) || '';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageCodeVerifier, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, "authStateControl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageAuthStateControl) || '';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageAuthStateControl, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, "sessionState", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageSessionState);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageSessionState, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, "silentRenewRunning", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageSilentRenewRunning) || '';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageSilentRenewRunning, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityCommon.prototype, "customRequestParams", {
        get: /**
         * @return {?}
         */
        function () {
            return this.retrieve(this.storageCustomRequestParams);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.store(this.storageCustomRequestParams, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    OidcSecurityCommon.prototype.retrieve = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.oidcSecurityStorage.read(key);
    };
    /**
     * @private
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    OidcSecurityCommon.prototype.store = /**
     * @private
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.oidcSecurityStorage.write(key, value);
    };
    /**
     * @param {?} isRenewProcess
     * @return {?}
     */
    OidcSecurityCommon.prototype.resetStorageData = /**
     * @param {?} isRenewProcess
     * @return {?}
     */
    function (isRenewProcess) {
        if (!isRenewProcess) {
            this.store(this.storageAuthResult, '');
            this.store(this.storageSessionState, '');
            this.store(this.storageSilentRenewRunning, '');
            this.store(this.storageIsAuthorized, false);
            this.store(this.storageAccessToken, '');
            this.store(this.storageIdToken, '');
            this.store(this.storageUserData, '');
            this.store(this.storageCodeVerifier, '');
        }
    };
    /**
     * @return {?}
     */
    OidcSecurityCommon.prototype.getAccessToken = /**
     * @return {?}
     */
    function () {
        return this.retrieve(this.storageAccessToken);
    };
    /**
     * @return {?}
     */
    OidcSecurityCommon.prototype.getIdToken = /**
     * @return {?}
     */
    function () {
        return this.retrieve(this.storageIdToken);
    };
    /**
     * @return {?}
     */
    OidcSecurityCommon.prototype.getRefreshToken = /**
     * @return {?}
     */
    function () {
        return this.authResult.refresh_token;
    };
    OidcSecurityCommon.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OidcSecurityCommon.ctorParameters = function () { return [
        { type: OidcSecurityStorage }
    ]; };
    return OidcSecurityCommon;
}());
export { OidcSecurityCommon };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageAuthResult;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageAccessToken;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageIdToken;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageIsAuthorized;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageUserData;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageAuthNonce;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageCodeVerifier;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageAuthStateControl;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageSessionState;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageSilentRenewRunning;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.storageCustomRequestParams;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCommon.prototype.oidcSecurityStorage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy5zZWN1cml0eS5jb21tb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtb2lkYy1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvb2lkYy5zZWN1cml0eS5jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFJOUQ7SUFrSEksNEJBQW9CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBaEhwRCxzQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQztRQVUxQyx1QkFBa0IsR0FBRyxtQkFBbUIsQ0FBQztRQVV6QyxtQkFBYyxHQUFHLDBCQUEwQixDQUFDO1FBVTVDLHdCQUFtQixHQUFHLGVBQWUsQ0FBQztRQVV0QyxvQkFBZSxHQUFHLFVBQVUsQ0FBQztRQVU3QixxQkFBZ0IsR0FBRyxXQUFXLENBQUM7UUFVL0Isd0JBQW1CLEdBQUcsZUFBZSxDQUFDO1FBVXRDLDRCQUF1QixHQUFHLGtCQUFrQixDQUFDO1FBVTdDLHdCQUFtQixHQUFHLGVBQWUsQ0FBQztRQVV0Qyw4QkFBeUIsR0FBRyw4QkFBOEIsQ0FBQztRQVUzRCwrQkFBMEIsR0FBRywrQkFBK0IsQ0FBQztJQVlOLENBQUM7SUE5R2hFLHNCQUFXLDBDQUFVOzs7O1FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pELENBQUM7Ozs7O1FBRUQsVUFBc0IsS0FBVTtZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDOzs7T0FKQTtJQVFELHNCQUFXLDJDQUFXOzs7O1FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUks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SUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQzs7OztJQUVELDJDQUFjOzs7SUFBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsdUNBQVU7OztJQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7O0lBRUQsNENBQWU7OztJQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUN6QyxDQUFDOztnQkFuSkosVUFBVTs7OztnQkFKRixtQkFBbUI7O0lBd0o1Qix5QkFBQztDQUFBLEFBcEpELElBb0pDO1NBbkpZLGtCQUFrQjs7Ozs7O0lBQzNCLCtDQUFrRDs7Ozs7SUFVbEQsZ0RBQWlEOzs7OztJQVVqRCw0Q0FBb0Q7Ozs7O0lBVXBELGlEQUE4Qzs7Ozs7SUFVOUMsNkNBQXFDOzs7OztJQVVyQyw4Q0FBdUM7Ozs7O0lBVXZDLGlEQUE4Qzs7Ozs7SUFVOUMscURBQXFEOzs7OztJQVVyRCxpREFBOEM7Ozs7O0lBVTlDLHVEQUFtRTs7Ozs7SUFVbkUsd0RBQXFFOzs7OztJQVl6RCxpREFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPaWRjU2VjdXJpdHlTdG9yYWdlIH0gZnJvbSAnLi9vaWRjLnNlY3VyaXR5LnN0b3JhZ2UnO1xuXG5leHBvcnQgdHlwZSBTaWxlbnRSZW5ld1N0YXRlID0gJ3J1bm5pbmcnIHwgJyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPaWRjU2VjdXJpdHlDb21tb24ge1xuICAgIHByaXZhdGUgc3RvcmFnZUF1dGhSZXN1bHQgPSAnYXV0aG9yaXphdGlvblJlc3VsdCc7XG5cbiAgICBwdWJsaWMgZ2V0IGF1dGhSZXN1bHQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0cmlldmUodGhpcy5zdG9yYWdlQXV0aFJlc3VsdCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBhdXRoUmVzdWx0KHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdG9yZSh0aGlzLnN0b3JhZ2VBdXRoUmVzdWx0LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9yYWdlQWNjZXNzVG9rZW4gPSAnYXV0aG9yaXphdGlvbkRhdGEnO1xuXG4gICAgcHVibGljIGdldCBhY2Nlc3NUb2tlbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXRyaWV2ZSh0aGlzLnN0b3JhZ2VBY2Nlc3NUb2tlbikgfHwgJyc7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBhY2Nlc3NUb2tlbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc3RvcmUodGhpcy5zdG9yYWdlQWNjZXNzVG9rZW4sIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3JhZ2VJZFRva2VuID0gJ2F1dGhvcml6YXRpb25EYXRhSWRUb2tlbic7XG5cbiAgICBwdWJsaWMgZ2V0IGlkVG9rZW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0cmlldmUodGhpcy5zdG9yYWdlSWRUb2tlbikgfHwgJyc7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpZFRva2VuKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zdG9yZSh0aGlzLnN0b3JhZ2VJZFRva2VuLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9yYWdlSXNBdXRob3JpemVkID0gJ19pc0F1dGhvcml6ZWQnO1xuXG4gICAgcHVibGljIGdldCBpc0F1dGhvcml6ZWQoKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHJpZXZlKHRoaXMuc3RvcmFnZUlzQXV0aG9yaXplZCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpc0F1dGhvcml6ZWQodmFsdWU6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zdG9yZSh0aGlzLnN0b3JhZ2VJc0F1dGhvcml6ZWQsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3JhZ2VVc2VyRGF0YSA9ICd1c2VyRGF0YSc7XG5cbiAgICBwdWJsaWMgZ2V0IHVzZXJEYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHJpZXZlKHRoaXMuc3RvcmFnZVVzZXJEYXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHVzZXJEYXRhKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdG9yZSh0aGlzLnN0b3JhZ2VVc2VyRGF0YSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcmFnZUF1dGhOb25jZSA9ICdhdXRoTm9uY2UnO1xuXG4gICAgcHVibGljIGdldCBhdXRoTm9uY2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0cmlldmUodGhpcy5zdG9yYWdlQXV0aE5vbmNlKSB8fCAnJztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGF1dGhOb25jZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc3RvcmUodGhpcy5zdG9yYWdlQXV0aE5vbmNlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9yYWdlQ29kZVZlcmlmaWVyID0gJ2NvZGVfdmVyaWZpZXInO1xuXG4gICAgcHVibGljIGdldCBjb2RlX3ZlcmlmaWVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHJpZXZlKHRoaXMuc3RvcmFnZUNvZGVWZXJpZmllcikgfHwgJyc7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBjb2RlX3ZlcmlmaWVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zdG9yZSh0aGlzLnN0b3JhZ2VDb2RlVmVyaWZpZXIsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3JhZ2VBdXRoU3RhdGVDb250cm9sID0gJ2F1dGhTdGF0ZUNvbnRyb2wnO1xuXG4gICAgcHVibGljIGdldCBhdXRoU3RhdGVDb250cm9sKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHJpZXZlKHRoaXMuc3RvcmFnZUF1dGhTdGF0ZUNvbnRyb2wpIHx8ICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYXV0aFN0YXRlQ29udHJvbCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc3RvcmUodGhpcy5zdG9yYWdlQXV0aFN0YXRlQ29udHJvbCwgdmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcmFnZVNlc3Npb25TdGF0ZSA9ICdzZXNzaW9uX3N0YXRlJztcblxuICAgIHB1YmxpYyBnZXQgc2Vzc2lvblN0YXRlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHJpZXZlKHRoaXMuc3RvcmFnZVNlc3Npb25TdGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzZXNzaW9uU3RhdGUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnN0b3JlKHRoaXMuc3RvcmFnZVNlc3Npb25TdGF0ZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcmFnZVNpbGVudFJlbmV3UnVubmluZyA9ICdzdG9yYWdlX3NpbGVudF9yZW5ld19ydW5uaW5nJztcblxuICAgIHB1YmxpYyBnZXQgc2lsZW50UmVuZXdSdW5uaW5nKCk6IFNpbGVudFJlbmV3U3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXRyaWV2ZSh0aGlzLnN0b3JhZ2VTaWxlbnRSZW5ld1J1bm5pbmcpIHx8ICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc2lsZW50UmVuZXdSdW5uaW5nKHZhbHVlOiBTaWxlbnRSZW5ld1N0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RvcmUodGhpcy5zdG9yYWdlU2lsZW50UmVuZXdSdW5uaW5nLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9yYWdlQ3VzdG9tUmVxdWVzdFBhcmFtcyA9ICdzdG9yYWdlX2N1c3RvbV9yZXF1ZXN0X3BhcmFtcyc7XG5cbiAgICBwdWJsaWMgZ2V0IGN1c3RvbVJlcXVlc3RQYXJhbXMoKToge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xuICAgIH0ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXRyaWV2ZSh0aGlzLnN0b3JhZ2VDdXN0b21SZXF1ZXN0UGFyYW1zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGN1c3RvbVJlcXVlc3RQYXJhbXModmFsdWU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB9KSB7XG4gICAgICAgIHRoaXMuc3RvcmUodGhpcy5zdG9yYWdlQ3VzdG9tUmVxdWVzdFBhcmFtcywgdmFsdWUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgb2lkY1NlY3VyaXR5U3RvcmFnZTogT2lkY1NlY3VyaXR5U3RvcmFnZSkge31cblxuICAgIHByaXZhdGUgcmV0cmlldmUoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5vaWRjU2VjdXJpdHlTdG9yYWdlLnJlYWQoa2V5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3JlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMub2lkY1NlY3VyaXR5U3RvcmFnZS53cml0ZShrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXNldFN0b3JhZ2VEYXRhKGlzUmVuZXdQcm9jZXNzOiBib29sZWFuKSB7XG4gICAgICAgIGlmICghaXNSZW5ld1Byb2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUodGhpcy5zdG9yYWdlQXV0aFJlc3VsdCwgJycpO1xuICAgICAgICAgICAgdGhpcy5zdG9yZSh0aGlzLnN0b3JhZ2VTZXNzaW9uU3RhdGUsICcnKTtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUodGhpcy5zdG9yYWdlU2lsZW50UmVuZXdSdW5uaW5nLCAnJyk7XG4gICAgICAgICAgICB0aGlzLnN0b3JlKHRoaXMuc3RvcmFnZUlzQXV0aG9yaXplZCwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zdG9yZSh0aGlzLnN0b3JhZ2VBY2Nlc3NUb2tlbiwgJycpO1xuICAgICAgICAgICAgdGhpcy5zdG9yZSh0aGlzLnN0b3JhZ2VJZFRva2VuLCAnJyk7XG4gICAgICAgICAgICB0aGlzLnN0b3JlKHRoaXMuc3RvcmFnZVVzZXJEYXRhLCAnJyk7XG4gICAgICAgICAgICB0aGlzLnN0b3JlKHRoaXMuc3RvcmFnZUNvZGVWZXJpZmllciwgJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QWNjZXNzVG9rZW4oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0cmlldmUodGhpcy5zdG9yYWdlQWNjZXNzVG9rZW4pO1xuICAgIH1cblxuICAgIGdldElkVG9rZW4oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0cmlldmUodGhpcy5zdG9yYWdlSWRUb2tlbik7XG4gICAgfVxuXG4gICAgZ2V0UmVmcmVzaFRva2VuKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhSZXN1bHQucmVmcmVzaF90b2tlbjtcbiAgICB9XG59XG4iXX0=