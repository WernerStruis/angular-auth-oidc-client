/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { LoggerService } from './oidc.logger.service';
var TokenHelperService = /** @class */ (function () {
    function TokenHelperService(loggerService) {
        this.loggerService = loggerService;
        this.PARTS_OF_TOKEN = 3;
    }
    /**
     * @param {?} dataIdToken
     * @return {?}
     */
    TokenHelperService.prototype.getTokenExpirationDate = /**
     * @param {?} dataIdToken
     * @return {?}
     */
    function (dataIdToken) {
        if (!dataIdToken.hasOwnProperty('exp')) {
            return new Date();
        }
        /** @type {?} */
        var date = new Date(0);
        date.setUTCSeconds(dataIdToken.exp);
        return date;
    };
    /**
     * @param {?} token
     * @param {?} encoded
     * @return {?}
     */
    TokenHelperService.prototype.getHeaderFromToken = /**
     * @param {?} token
     * @param {?} encoded
     * @return {?}
     */
    function (token, encoded) {
        if (!this.tokenIsValid(token)) {
            return {};
        }
        return this.getPartOfToken(token, 0, encoded);
    };
    /**
     * @param {?} token
     * @param {?} encoded
     * @return {?}
     */
    TokenHelperService.prototype.getPayloadFromToken = /**
     * @param {?} token
     * @param {?} encoded
     * @return {?}
     */
    function (token, encoded) {
        if (!this.tokenIsValid(token)) {
            return {};
        }
        return this.getPartOfToken(token, 1, encoded);
    };
    /**
     * @param {?} token
     * @param {?} encoded
     * @return {?}
     */
    TokenHelperService.prototype.getSignatureFromToken = /**
     * @param {?} token
     * @param {?} encoded
     * @return {?}
     */
    function (token, encoded) {
        if (!this.tokenIsValid(token)) {
            return {};
        }
        return this.getPartOfToken(token, 2, encoded);
    };
    /**
     * @private
     * @param {?} token
     * @param {?} index
     * @param {?} encoded
     * @return {?}
     */
    TokenHelperService.prototype.getPartOfToken = /**
     * @private
     * @param {?} token
     * @param {?} index
     * @param {?} encoded
     * @return {?}
     */
    function (token, index, encoded) {
        /** @type {?} */
        var partOfToken = this.extractPartOfToken(token, index);
        if (encoded) {
            return partOfToken;
        }
        /** @type {?} */
        var result = this.urlBase64Decode(partOfToken);
        return JSON.parse(result);
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    TokenHelperService.prototype.urlBase64Decode = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        /** @type {?} */
        var output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw Error('Illegal base64url string!');
        }
        /** @type {?} */
        var decoded = typeof window !== 'undefined' ? window.atob(output) : new Buffer(output, 'base64').toString('binary');
        try {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(decoded
                .split('')
                .map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }))
                .join(''));
        }
        catch (err) {
            return decoded;
        }
    };
    /**
     * @private
     * @param {?} token
     * @return {?}
     */
    TokenHelperService.prototype.tokenIsValid = /**
     * @private
     * @param {?} token
     * @return {?}
     */
    function (token) {
        if (!token) {
            this.loggerService.logError("token '" + token + "' is not valid --> token falsy");
            return false;
        }
        if (!((/** @type {?} */ (token))).includes('.')) {
            this.loggerService.logError("token '" + token + "' is not valid --> no dots included");
            return false;
        }
        /** @type {?} */
        var parts = token.split('.');
        if (parts.length !== this.PARTS_OF_TOKEN) {
            this.loggerService.logError("token '" + token + "' is not valid --> token has to have exactly " + this.PARTS_OF_TOKEN + " dots");
            return false;
        }
        return true;
    };
    /**
     * @private
     * @param {?} token
     * @param {?} index
     * @return {?}
     */
    TokenHelperService.prototype.extractPartOfToken = /**
     * @private
     * @param {?} token
     * @param {?} index
     * @return {?}
     */
    function (token, index) {
        return token.split('.')[index];
    };
    TokenHelperService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TokenHelperService.ctorParameters = function () { return [
        { type: LoggerService }
    ]; };
    return TokenHelperService;
}());
export { TokenHelperService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TokenHelperService.prototype.PARTS_OF_TOKEN;
    /**
     * @type {?}
     * @private
     */
    TokenHelperService.prototype.loggerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy10b2tlbi1oZWxwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1vaWRjLWNsaWVudC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9vaWRjLXRva2VuLWhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV0RDtJQUdJLDRCQUE2QixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQURqRCxtQkFBYyxHQUFHLENBQUMsQ0FBQztJQUNpQyxDQUFDOzs7OztJQUU3RCxtREFBc0I7Ozs7SUFBdEIsVUFBdUIsV0FBZ0I7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ3JCOztZQUVLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7O0lBRUQsK0NBQWtCOzs7OztJQUFsQixVQUFtQixLQUFVLEVBQUUsT0FBZ0I7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7OztJQUVELGdEQUFtQjs7Ozs7SUFBbkIsVUFBb0IsS0FBVSxFQUFFLE9BQWdCO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxF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QUksS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFlBQVUsS0FBSyxxREFBZ0QsSUFBSSxDQUFDLGNBQWMsVUFBTyxDQUFDLENBQUM7WUFDdkgsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7O0lBRU8sK0NBQWtCOzs7Ozs7SUFBMUIsVUFBMkIsS0FBYSxFQUFFLEtBQWE7UUFDbkQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7O2dCQXpHSixVQUFVOzs7O2dCQUZGLGFBQWE7O0lBNEd0Qix5QkFBQztDQUFBLEFBMUdELElBMEdDO1NBekdZLGtCQUFrQjs7Ozs7O0lBQzNCLDRDQUEyQjs7Ozs7SUFDZiwyQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi9vaWRjLmxvZ2dlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuSGVscGVyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBQQVJUU19PRl9UT0tFTiA9IDM7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsb2dnZXJTZXJ2aWNlOiBMb2dnZXJTZXJ2aWNlKSB7fVxuXG4gICAgZ2V0VG9rZW5FeHBpcmF0aW9uRGF0ZShkYXRhSWRUb2tlbjogYW55KTogRGF0ZSB7XG4gICAgICAgIGlmICghZGF0YUlkVG9rZW4uaGFzT3duUHJvcGVydHkoJ2V4cCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgwKTsgLy8gVGhlIDAgaGVyZSBpcyB0aGUga2V5LCB3aGljaCBzZXRzIHRoZSBkYXRlIHRvIHRoZSBlcG9jaFxuICAgICAgICBkYXRlLnNldFVUQ1NlY29uZHMoZGF0YUlkVG9rZW4uZXhwKTtcblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBnZXRIZWFkZXJGcm9tVG9rZW4odG9rZW46IGFueSwgZW5jb2RlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoIXRoaXMudG9rZW5Jc1ZhbGlkKHRva2VuKSkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFydE9mVG9rZW4odG9rZW4sIDAsIGVuY29kZWQpO1xuICAgIH1cblxuICAgIGdldFBheWxvYWRGcm9tVG9rZW4odG9rZW46IGFueSwgZW5jb2RlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoIXRoaXMudG9rZW5Jc1ZhbGlkKHRva2VuKSkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFydE9mVG9rZW4odG9rZW4sIDEsIGVuY29kZWQpO1xuICAgIH1cblxuICAgIGdldFNpZ25hdHVyZUZyb21Ub2tlbih0b2tlbjogYW55LCBlbmNvZGVkOiBib29sZWFuKSB7XG4gICAgICAgIGlmICghdGhpcy50b2tlbklzVmFsaWQodG9rZW4pKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJ0T2ZUb2tlbih0b2tlbiwgMiwgZW5jb2RlZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQYXJ0T2ZUb2tlbih0b2tlbjogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBlbmNvZGVkOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHBhcnRPZlRva2VuID0gdGhpcy5leHRyYWN0UGFydE9mVG9rZW4odG9rZW4sIGluZGV4KTtcblxuICAgICAgICBpZiAoZW5jb2RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnRPZlRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy51cmxCYXNlNjREZWNvZGUocGFydE9mVG9rZW4pO1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXJsQmFzZTY0RGVjb2RlKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIGxldCBvdXRwdXQgPSBzdHIucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcblxuICAgICAgICBzd2l0Y2ggKG91dHB1dC5sZW5ndGggJSA0KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9ICc9PSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9ICc9JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0lsbGVnYWwgYmFzZTY0dXJsIHN0cmluZyEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5hdG9iKG91dHB1dCkgOiBuZXcgQnVmZmVyKG91dHB1dCwgJ2Jhc2U2NCcpLnRvU3RyaW5nKCdiaW5hcnknKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gR29pbmcgYmFja3dhcmRzOiBmcm9tIGJ5dGVzdHJlYW0sIHRvIHBlcmNlbnQtZW5jb2RpbmcsIHRvIG9yaWdpbmFsIHN0cmluZy5cbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgICAgICAgZGVjb2RlZFxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGM6IHN0cmluZykgPT4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikpXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKCcnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdG9rZW5Jc1ZhbGlkKHRva2VuOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0Vycm9yKGB0b2tlbiAnJHt0b2tlbn0nIGlzIG5vdCB2YWxpZCAtLT4gdG9rZW4gZmFsc3lgKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKHRva2VuIGFzIHN0cmluZykuaW5jbHVkZXMoJy4nKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0Vycm9yKGB0b2tlbiAnJHt0b2tlbn0nIGlzIG5vdCB2YWxpZCAtLT4gbm8gZG90cyBpbmNsdWRlZGApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFydHMgPSB0b2tlbi5zcGxpdCgnLicpO1xuXG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IHRoaXMuUEFSVFNfT0ZfVE9LRU4pIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dFcnJvcihgdG9rZW4gJyR7dG9rZW59JyBpcyBub3QgdmFsaWQgLS0+IHRva2VuIGhhcyB0byBoYXZlIGV4YWN0bHkgJHt0aGlzLlBBUlRTX09GX1RPS0VOfSBkb3RzYCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4dHJhY3RQYXJ0T2ZUb2tlbih0b2tlbjogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0b2tlbi5zcGxpdCgnLicpW2luZGV4XTtcbiAgICB9XG59XG4iXX0=