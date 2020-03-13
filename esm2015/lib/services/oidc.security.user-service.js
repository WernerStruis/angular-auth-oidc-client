/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OidcDataService } from '../data-services/oidc-data.service';
import { ConfigurationProvider } from './auth-configuration.provider';
import { LoggerService } from './oidc.logger.service';
import { OidcSecurityCommon } from './oidc.security.common';
export class OidcSecurityUserService {
    /**
     * @param {?} oidcDataService
     * @param {?} oidcSecurityCommon
     * @param {?} loggerService
     * @param {?} configurationProvider
     */
    constructor(oidcDataService, oidcSecurityCommon, loggerService, configurationProvider) {
        this.oidcDataService = oidcDataService;
        this.oidcSecurityCommon = oidcSecurityCommon;
        this.loggerService = loggerService;
        this.configurationProvider = configurationProvider;
        this.userData = '';
    }
    /**
     * @return {?}
     */
    initUserData() {
        return this.getIdentityUserData().pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => (this.userData = data))));
    }
    /**
     * @return {?}
     */
    getUserData() {
        if (!this.userData) {
            throw Error('UserData is not set!');
        }
        return this.userData;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setUserData(value) {
        this.userData = value;
    }
    /**
     * @private
     * @return {?}
     */
    getIdentityUserData() {
        /** @type {?} */
        const token = this.oidcSecurityCommon.getAccessToken();
        if (!this.configurationProvider.wellKnownEndpoints) {
            this.loggerService.logWarning('init check session: authWellKnownEndpoints is undefined');
            throw Error('authWellKnownEndpoints is undefined');
        }
        /** @type {?} */
        const canGetUserData = this.configurationProvider.wellKnownEndpoints && this.configurationProvider.wellKnownEndpoints.userinfo_endpoint;
        if (!canGetUserData) {
            this.loggerService.logError('init check session: authWellKnownEndpoints.userinfo_endpoint is undefined; set auto_userinfo = false in config');
            throw Error('authWellKnownEndpoints.userinfo_endpoint is undefined');
        }
        return this.oidcDataService.getIdentityUserData(this.configurationProvider.wellKnownEndpoints.userinfo_endpoint || '', token);
    }
}
OidcSecurityUserService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OidcSecurityUserService.ctorParameters = () => [
    { type: OidcDataService },
    { type: OidcSecurityCommon },
    { type: LoggerService },
    { type: ConfigurationProvider }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OidcSecurityUserService.prototype.userData;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityUserService.prototype.oidcDataService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityUserService.prototype.oidcSecurityCommon;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityUserService.prototype.loggerService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityUserService.prototype.configurationProvider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy5zZWN1cml0eS51c2VyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtb2lkYy1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvb2lkYy5zZWN1cml0eS51c2VyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHNUQsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7OztJQUdoQyxZQUNZLGVBQWdDLEVBQ2hDLGtCQUFzQyxFQUN0QyxhQUE0QixFQUNuQixxQkFBNEM7UUFIckQsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDbkIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQU56RCxhQUFRLEdBQVEsRUFBRSxDQUFDO0lBT3hCLENBQUM7Ozs7SUFFSixZQUFZO1FBQ1IsT0FBTyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsTUFBTSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUN2QztRQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxLQUFVO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRU8sbUJBQW1COztjQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRTtRQUV0RCxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFO1lBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLHlEQUF5RCxDQUFDLENBQUM7WUFFekYsTUFBTSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUN0RDs7Y0FFSyxjQUFjLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUI7UUFFdkksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FDdkIsZ0hBQWdILENBQ25ILENBQUM7WUFDRixNQUFNLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEksQ0FBQzs7O1lBOUNKLFVBQVU7Ozs7WUFMRixlQUFlO1lBR2Ysa0JBQWtCO1lBRGxCLGFBQWE7WUFEYixxQkFBcUI7Ozs7Ozs7SUFNMUIsMkNBQTJCOzs7OztJQUd2QixrREFBd0M7Ozs7O0lBQ3hDLHFEQUE4Qzs7Ozs7SUFDOUMsZ0RBQW9DOzs7OztJQUNwQyx3REFBNkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPaWRjRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXNlcnZpY2VzL29pZGMtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25Qcm92aWRlciB9IGZyb20gJy4vYXV0aC1jb25maWd1cmF0aW9uLnByb3ZpZGVyJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuL29pZGMubG9nZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2lkY1NlY3VyaXR5Q29tbW9uIH0gZnJvbSAnLi9vaWRjLnNlY3VyaXR5LmNvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPaWRjU2VjdXJpdHlVc2VyU2VydmljZSB7XG4gICAgcHJpdmF0ZSB1c2VyRGF0YTogYW55ID0gJyc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvaWRjRGF0YVNlcnZpY2U6IE9pZGNEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBvaWRjU2VjdXJpdHlDb21tb246IE9pZGNTZWN1cml0eUNvbW1vbixcbiAgICAgICAgcHJpdmF0ZSBsb2dnZXJTZXJ2aWNlOiBMb2dnZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ3VyYXRpb25Qcm92aWRlcjogQ29uZmlndXJhdGlvblByb3ZpZGVyXG4gICAgKSB7fVxuXG4gICAgaW5pdFVzZXJEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJZGVudGl0eVVzZXJEYXRhKCkucGlwZShtYXAoKGRhdGE6IGFueSkgPT4gKHRoaXMudXNlckRhdGEgPSBkYXRhKSkpO1xuICAgIH1cblxuICAgIGdldFVzZXJEYXRhKCk6IGFueSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyRGF0YSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1VzZXJEYXRhIGlzIG5vdCBzZXQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YTtcbiAgICB9XG5cbiAgICBzZXRVc2VyRGF0YSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudXNlckRhdGEgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldElkZW50aXR5VXNlckRhdGEoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5nZXRBY2Nlc3NUb2tlbigpO1xuXG4gICAgICAgIGlmICghdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nV2FybmluZygnaW5pdCBjaGVjayBzZXNzaW9uOiBhdXRoV2VsbEtub3duRW5kcG9pbnRzIGlzIHVuZGVmaW5lZCcpO1xuXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignYXV0aFdlbGxLbm93bkVuZHBvaW50cyBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNhbkdldFVzZXJEYXRhID0gdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzICYmIHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLndlbGxLbm93bkVuZHBvaW50cy51c2VyaW5mb19lbmRwb2ludDtcblxuICAgICAgICBpZiAoIWNhbkdldFVzZXJEYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRXJyb3IoXG4gICAgICAgICAgICAgICAgJ2luaXQgY2hlY2sgc2Vzc2lvbjogYXV0aFdlbGxLbm93bkVuZHBvaW50cy51c2VyaW5mb19lbmRwb2ludCBpcyB1bmRlZmluZWQ7IHNldCBhdXRvX3VzZXJpbmZvID0gZmFsc2UgaW4gY29uZmlnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdhdXRoV2VsbEtub3duRW5kcG9pbnRzLnVzZXJpbmZvX2VuZHBvaW50IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub2lkY0RhdGFTZXJ2aWNlLmdldElkZW50aXR5VXNlckRhdGEodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzLnVzZXJpbmZvX2VuZHBvaW50IHx8ICcnLCB0b2tlbik7XG4gICAgfVxufVxuIl19