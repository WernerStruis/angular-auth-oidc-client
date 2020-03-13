/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { LoggerService } from './oidc.logger.service';
export class IFrameService {
    /**
     * @param {?} loggerService
     */
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    /**
     * @param {?} identifier
     * @return {?}
     */
    getExistingIFrame(identifier) {
        /** @type {?} */
        const iFrameOnParent = this.getIFrameFromParentWindow(identifier);
        if (this.isIFrameElement(iFrameOnParent)) {
            return iFrameOnParent;
        }
        /** @type {?} */
        const iFrameOnSelf = this.getIFrameFromWindow(identifier);
        if (this.isIFrameElement(iFrameOnSelf)) {
            return iFrameOnSelf;
        }
        return null;
    }
    /**
     * @param {?} identifier
     * @return {?}
     */
    addIFrameToWindowBody(identifier) {
        /** @type {?} */
        const sessionIframe = window.document.createElement('iframe');
        sessionIframe.id = identifier;
        this.loggerService.logDebug(sessionIframe);
        sessionIframe.style.display = 'none';
        window.document.body.appendChild(sessionIframe);
        return sessionIframe;
    }
    /**
     * @private
     * @param {?} identifier
     * @return {?}
     */
    getIFrameFromParentWindow(identifier) {
        try {
            /** @type {?} */
            const iFrameElement = window.parent.document.getElementById(identifier);
            if (this.isIFrameElement(iFrameElement)) {
                return iFrameElement;
            }
            return null;
        }
        catch (e) {
            return null;
        }
    }
    /**
     * @private
     * @param {?} identifier
     * @return {?}
     */
    getIFrameFromWindow(identifier) {
        /** @type {?} */
        const iFrameElement = window.document.getElementById(identifier);
        if (this.isIFrameElement(iFrameElement)) {
            return iFrameElement;
        }
        return null;
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    isIFrameElement(element) {
        return !!element && element instanceof HTMLIFrameElement;
    }
}
IFrameService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IFrameService.ctorParameters = () => [
    { type: LoggerService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    IFrameService.prototype.loggerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RpbmctaWZyYW1lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtb2lkYy1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZXhpc3RpbmctaWZyYW1lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3RELE1BQU0sT0FBTyxhQUFhOzs7O0lBQ3RCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUcsQ0FBQzs7Ozs7SUFFcEQsaUJBQWlCLENBQUMsVUFBa0I7O2NBQzFCLGNBQWMsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDO1FBQ2pFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUN0QyxPQUFPLGNBQWMsQ0FBQztTQUN6Qjs7Y0FDSyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDcEMsT0FBTyxZQUFZLENBQUM7U0FDdkI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELHFCQUFxQixDQUFDLFVBQWtCOztjQUM5QixhQUFhLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzdELGFBQWEsQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNyQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBRU8seUJBQXlCLENBQUMsVUFBa0I7UUFDaEQsSUFBSTs7a0JBQ00sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7WUFDdkUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNyQyxPQUFPLGFBQWEsQ0FBQzthQUN4QjtZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7Ozs7SUFFTyxtQkFBbUIsQ0FBQyxVQUFrQjs7Y0FDcEMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUNoRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDckMsT0FBTyxhQUFhLENBQUM7U0FDeEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsT0FBMkI7UUFDL0MsT0FBTyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sWUFBWSxpQkFBaUIsQ0FBQztJQUM3RCxDQUFDOzs7WUEvQ0osVUFBVTs7OztZQUZGLGFBQWE7Ozs7Ozs7SUFJTixzQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi9vaWRjLmxvZ2dlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElGcmFtZVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9nZ2VyU2VydmljZTogTG9nZ2VyU2VydmljZSkge31cblxuICAgIGdldEV4aXN0aW5nSUZyYW1lKGlkZW50aWZpZXI6IHN0cmluZyk6IEhUTUxJRnJhbWVFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGlGcmFtZU9uUGFyZW50ID0gdGhpcy5nZXRJRnJhbWVGcm9tUGFyZW50V2luZG93KGlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodGhpcy5pc0lGcmFtZUVsZW1lbnQoaUZyYW1lT25QYXJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gaUZyYW1lT25QYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaUZyYW1lT25TZWxmID0gdGhpcy5nZXRJRnJhbWVGcm9tV2luZG93KGlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodGhpcy5pc0lGcmFtZUVsZW1lbnQoaUZyYW1lT25TZWxmKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlGcmFtZU9uU2VsZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBhZGRJRnJhbWVUb1dpbmRvd0JvZHkoaWRlbnRpZmllcjogc3RyaW5nKTogSFRNTElGcmFtZUVsZW1lbnQge1xuICAgICAgICBjb25zdCBzZXNzaW9uSWZyYW1lID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBzZXNzaW9uSWZyYW1lLmlkID0gaWRlbnRpZmllcjtcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKHNlc3Npb25JZnJhbWUpO1xuICAgICAgICBzZXNzaW9uSWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlc3Npb25JZnJhbWUpO1xuICAgICAgICByZXR1cm4gc2Vzc2lvbklmcmFtZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldElGcmFtZUZyb21QYXJlbnRXaW5kb3coaWRlbnRpZmllcjogc3RyaW5nKTogSFRNTElGcmFtZUVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGlGcmFtZUVsZW1lbnQgPSB3aW5kb3cucGFyZW50LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkZW50aWZpZXIpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNJRnJhbWVFbGVtZW50KGlGcmFtZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlGcmFtZUVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldElGcmFtZUZyb21XaW5kb3coaWRlbnRpZmllcjogc3RyaW5nKTogSFRNTElGcmFtZUVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgY29uc3QgaUZyYW1lRWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHRoaXMuaXNJRnJhbWVFbGVtZW50KGlGcmFtZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gaUZyYW1lRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSUZyYW1lRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwpOiBlbGVtZW50IGlzIEhUTUxJRnJhbWVFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuICEhZWxlbWVudCAmJiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgfVxufVxuIl19