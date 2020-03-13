/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { LoggerService } from './oidc.logger.service';
var IFrameService = /** @class */ (function () {
    function IFrameService(loggerService) {
        this.loggerService = loggerService;
    }
    /**
     * @param {?} identifier
     * @return {?}
     */
    IFrameService.prototype.getExistingIFrame = /**
     * @param {?} identifier
     * @return {?}
     */
    function (identifier) {
        /** @type {?} */
        var iFrameOnParent = this.getIFrameFromParentWindow(identifier);
        if (this.isIFrameElement(iFrameOnParent)) {
            return iFrameOnParent;
        }
        /** @type {?} */
        var iFrameOnSelf = this.getIFrameFromWindow(identifier);
        if (this.isIFrameElement(iFrameOnSelf)) {
            return iFrameOnSelf;
        }
        return null;
    };
    /**
     * @param {?} identifier
     * @return {?}
     */
    IFrameService.prototype.addIFrameToWindowBody = /**
     * @param {?} identifier
     * @return {?}
     */
    function (identifier) {
        /** @type {?} */
        var sessionIframe = window.document.createElement('iframe');
        sessionIframe.id = identifier;
        this.loggerService.logDebug(sessionIframe);
        sessionIframe.style.display = 'none';
        window.document.body.appendChild(sessionIframe);
        return sessionIframe;
    };
    /**
     * @private
     * @param {?} identifier
     * @return {?}
     */
    IFrameService.prototype.getIFrameFromParentWindow = /**
     * @private
     * @param {?} identifier
     * @return {?}
     */
    function (identifier) {
        try {
            /** @type {?} */
            var iFrameElement = window.parent.document.getElementById(identifier);
            if (this.isIFrameElement(iFrameElement)) {
                return iFrameElement;
            }
            return null;
        }
        catch (e) {
            return null;
        }
    };
    /**
     * @private
     * @param {?} identifier
     * @return {?}
     */
    IFrameService.prototype.getIFrameFromWindow = /**
     * @private
     * @param {?} identifier
     * @return {?}
     */
    function (identifier) {
        /** @type {?} */
        var iFrameElement = window.document.getElementById(identifier);
        if (this.isIFrameElement(iFrameElement)) {
            return iFrameElement;
        }
        return null;
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    IFrameService.prototype.isIFrameElement = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return !!element && element instanceof HTMLIFrameElement;
    };
    IFrameService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IFrameService.ctorParameters = function () { return [
        { type: LoggerService }
    ]; };
    return IFrameService;
}());
export { IFrameService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    IFrameService.prototype.loggerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RpbmctaWZyYW1lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtb2lkYy1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZXhpc3RpbmctaWZyYW1lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXREO0lBRUksdUJBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUcsQ0FBQzs7Ozs7SUFFcEQseUNBQWlCOzs7O0lBQWpCLFVBQWtCLFVBQWtCOztZQUMxQixjQUFjLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQztRQUNqRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxjQUFjLENBQUM7U0FDekI7O1lBQ0ssWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7UUFDekQsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sWUFBWSxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFRCw2Q0FBcUI7Ozs7SUFBckIsVUFBc0IsVUFBa0I7O1lBQzlCLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDN0QsYUFBYSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0MsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFFTyxpREFBeUI7Ozs7O0lBQWpDLFVBQWtDLFVBQWtCO1FBQ2hELElBQUk7O2dCQUNNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO1lBQ3ZFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDckMsT0FBTyxhQUFhLENBQUM7YUFDeEI7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sMkNBQW1COzs7OztJQUEzQixVQUE0QixVQUFrQjs7WUFDcEMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUNoRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDckMsT0FBTyxhQUFhLENBQUM7U0FDeEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFFTyx1Q0FBZTs7Ozs7SUFBdkIsVUFBd0IsT0FBMkI7UUFDL0MsT0FBTyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sWUFBWSxpQkFBaUIsQ0FBQztJQUM3RCxDQUFDOztnQkEvQ0osVUFBVTs7OztnQkFGRixhQUFhOztJQWtEdEIsb0JBQUM7Q0FBQSxBQWhERCxJQWdEQztTQS9DWSxhQUFhOzs7Ozs7SUFDVixzQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi9vaWRjLmxvZ2dlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElGcmFtZVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9nZ2VyU2VydmljZTogTG9nZ2VyU2VydmljZSkge31cblxuICAgIGdldEV4aXN0aW5nSUZyYW1lKGlkZW50aWZpZXI6IHN0cmluZyk6IEhUTUxJRnJhbWVFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGlGcmFtZU9uUGFyZW50ID0gdGhpcy5nZXRJRnJhbWVGcm9tUGFyZW50V2luZG93KGlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodGhpcy5pc0lGcmFtZUVsZW1lbnQoaUZyYW1lT25QYXJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gaUZyYW1lT25QYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaUZyYW1lT25TZWxmID0gdGhpcy5nZXRJRnJhbWVGcm9tV2luZG93KGlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodGhpcy5pc0lGcmFtZUVsZW1lbnQoaUZyYW1lT25TZWxmKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlGcmFtZU9uU2VsZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBhZGRJRnJhbWVUb1dpbmRvd0JvZHkoaWRlbnRpZmllcjogc3RyaW5nKTogSFRNTElGcmFtZUVsZW1lbnQge1xuICAgICAgICBjb25zdCBzZXNzaW9uSWZyYW1lID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBzZXNzaW9uSWZyYW1lLmlkID0gaWRlbnRpZmllcjtcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKHNlc3Npb25JZnJhbWUpO1xuICAgICAgICBzZXNzaW9uSWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlc3Npb25JZnJhbWUpO1xuICAgICAgICByZXR1cm4gc2Vzc2lvbklmcmFtZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldElGcmFtZUZyb21QYXJlbnRXaW5kb3coaWRlbnRpZmllcjogc3RyaW5nKTogSFRNTElGcmFtZUVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGlGcmFtZUVsZW1lbnQgPSB3aW5kb3cucGFyZW50LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkZW50aWZpZXIpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNJRnJhbWVFbGVtZW50KGlGcmFtZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlGcmFtZUVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldElGcmFtZUZyb21XaW5kb3coaWRlbnRpZmllcjogc3RyaW5nKTogSFRNTElGcmFtZUVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgY29uc3QgaUZyYW1lRWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHRoaXMuaXNJRnJhbWVFbGVtZW50KGlGcmFtZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gaUZyYW1lRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSUZyYW1lRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwpOiBlbGVtZW50IGlzIEhUTUxJRnJhbWVFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuICEhZWxlbWVudCAmJiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgfVxufVxuIl19