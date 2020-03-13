/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ValidationResult } from './validation-result.enum';
// tslint:disable: variable-name
var 
// tslint:disable: variable-name
ValidateStateResult = /** @class */ (function () {
    function ValidateStateResult(access_token, id_token, authResponseIsValid, decoded_id_token, state) {
        if (access_token === void 0) { access_token = ''; }
        if (id_token === void 0) { id_token = ''; }
        if (authResponseIsValid === void 0) { authResponseIsValid = false; }
        if (decoded_id_token === void 0) { decoded_id_token = {}; }
        if (state === void 0) { state = ValidationResult.NotSet; }
        this.access_token = access_token;
        this.id_token = id_token;
        this.authResponseIsValid = authResponseIsValid;
        this.decoded_id_token = decoded_id_token;
        this.state = state;
    }
    return ValidateStateResult;
}());
// tslint:disable: variable-name
export { ValidateStateResult };
if (false) {
    /** @type {?} */
    ValidateStateResult.prototype.access_token;
    /** @type {?} */
    ValidateStateResult.prototype.id_token;
    /** @type {?} */
    ValidateStateResult.prototype.authResponseIsValid;
    /** @type {?} */
    ValidateStateResult.prototype.decoded_id_token;
    /** @type {?} */
    ValidateStateResult.prototype.state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtc3RhdGUtcmVzdWx0Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLW9pZGMtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL21vZGVscy92YWxpZGF0ZS1zdGF0ZS1yZXN1bHQubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUc1RDs7O0lBQ0ksNkJBQ1csWUFBaUIsRUFDakIsUUFBYSxFQUNiLG1CQUEyQixFQUMzQixnQkFBMEIsRUFDMUIsS0FBaUQ7UUFKakQsNkJBQUEsRUFBQSxpQkFBaUI7UUFDakIseUJBQUEsRUFBQSxhQUFhO1FBQ2Isb0NBQUEsRUFBQSwyQkFBMkI7UUFDM0IsaUNBQUEsRUFBQSxxQkFBMEI7UUFDMUIsc0JBQUEsRUFBQSxRQUEwQixnQkFBZ0IsQ0FBQyxNQUFNO1FBSmpELGlCQUFZLEdBQVosWUFBWSxDQUFLO1FBQ2pCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDYix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQVE7UUFDM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFVO1FBQzFCLFVBQUssR0FBTCxLQUFLLENBQTRDO0lBQ3pELENBQUM7SUFDUiwwQkFBQztBQUFELENBQUMsQUFSRCxJQVFDOzs7OztJQU5PLDJDQUF3Qjs7SUFDeEIsdUNBQW9COztJQUNwQixrREFBa0M7O0lBQ2xDLCtDQUFpQzs7SUFDakMsb0NBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFsaWRhdGlvblJlc3VsdCB9IGZyb20gJy4vdmFsaWRhdGlvbi1yZXN1bHQuZW51bSc7XG5cbi8vIHRzbGludDpkaXNhYmxlOiB2YXJpYWJsZS1uYW1lXG5leHBvcnQgY2xhc3MgVmFsaWRhdGVTdGF0ZVJlc3VsdCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBhY2Nlc3NfdG9rZW4gPSAnJyxcbiAgICAgICAgcHVibGljIGlkX3Rva2VuID0gJycsXG4gICAgICAgIHB1YmxpYyBhdXRoUmVzcG9uc2VJc1ZhbGlkID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyBkZWNvZGVkX2lkX3Rva2VuOiBhbnkgPSB7fSxcbiAgICAgICAgcHVibGljIHN0YXRlOiBWYWxpZGF0aW9uUmVzdWx0ID0gVmFsaWRhdGlvblJlc3VsdC5Ob3RTZXRcbiAgICApIHt9XG59XG4iXX0=