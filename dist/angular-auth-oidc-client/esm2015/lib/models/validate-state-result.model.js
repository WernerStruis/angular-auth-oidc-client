/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ValidationResult } from './validation-result.enum';
// tslint:disable: variable-name
export class ValidateStateResult {
    /**
     * @param {?=} access_token
     * @param {?=} id_token
     * @param {?=} authResponseIsValid
     * @param {?=} decoded_id_token
     * @param {?=} state
     */
    constructor(access_token = '', id_token = '', authResponseIsValid = false, decoded_id_token = {}, state = ValidationResult.NotSet) {
        this.access_token = access_token;
        this.id_token = id_token;
        this.authResponseIsValid = authResponseIsValid;
        this.decoded_id_token = decoded_id_token;
        this.state = state;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtc3RhdGUtcmVzdWx0Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLW9pZGMtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL21vZGVscy92YWxpZGF0ZS1zdGF0ZS1yZXN1bHQubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUc1RCxNQUFNLE9BQU8sbUJBQW1COzs7Ozs7OztJQUM1QixZQUNXLGVBQWUsRUFBRSxFQUNqQixXQUFXLEVBQUUsRUFDYixzQkFBc0IsS0FBSyxFQUMzQixtQkFBd0IsRUFBRSxFQUMxQixRQUEwQixnQkFBZ0IsQ0FBQyxNQUFNO1FBSmpELGlCQUFZLEdBQVosWUFBWSxDQUFLO1FBQ2pCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDYix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQVE7UUFDM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFVO1FBQzFCLFVBQUssR0FBTCxLQUFLLENBQTRDO0lBQ3pELENBQUM7Q0FDUDs7O0lBTk8sMkNBQXdCOztJQUN4Qix1Q0FBb0I7O0lBQ3BCLGtEQUFrQzs7SUFDbEMsK0NBQWlDOztJQUNqQyxvQ0FBd0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0aW9uUmVzdWx0IH0gZnJvbSAnLi92YWxpZGF0aW9uLXJlc3VsdC5lbnVtJztcblxuLy8gdHNsaW50OmRpc2FibGU6IHZhcmlhYmxlLW5hbWVcbmV4cG9ydCBjbGFzcyBWYWxpZGF0ZVN0YXRlUmVzdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGFjY2Vzc190b2tlbiA9ICcnLFxuICAgICAgICBwdWJsaWMgaWRfdG9rZW4gPSAnJyxcbiAgICAgICAgcHVibGljIGF1dGhSZXNwb25zZUlzVmFsaWQgPSBmYWxzZSxcbiAgICAgICAgcHVibGljIGRlY29kZWRfaWRfdG9rZW46IGFueSA9IHt9LFxuICAgICAgICBwdWJsaWMgc3RhdGU6IFZhbGlkYXRpb25SZXN1bHQgPSBWYWxpZGF0aW9uUmVzdWx0Lk5vdFNldFxuICAgICkge31cbn1cbiJdfQ==