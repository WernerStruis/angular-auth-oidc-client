/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { OidcDataService } from '../data-services/oidc-data.service';
import { IFrameService } from '../services/existing-iframe.service';
import { EqualityHelperService } from '../services/oidc-equality-helper.service';
import { StateValidationService } from '../services/oidc-security-state-validation.service';
import { TokenHelperService } from '../services/oidc-token-helper.service';
import { LoggerService } from '../services/oidc.logger.service';
import { OidcSecurityCheckSession } from '../services/oidc.security.check-session';
import { OidcSecurityCommon } from '../services/oidc.security.common';
import { OidcConfigService } from '../services/oidc.security.config.service';
import { OidcSecurityService } from '../services/oidc.security.service';
import { OidcSecuritySilentRenew } from '../services/oidc.security.silent-renew';
import { BrowserStorage, OidcSecurityStorage } from '../services/oidc.security.storage';
import { OidcSecurityUserService } from '../services/oidc.security.user-service';
import { OidcSecurityValidation } from '../services/oidc.security.validation';
export class AuthModule {
    /**
     * @param {?=} token
     * @return {?}
     */
    static forRoot(token = {}) {
        return {
            ngModule: AuthModule,
            providers: [
                OidcConfigService,
                OidcSecurityService,
                OidcSecurityValidation,
                OidcSecurityCheckSession,
                OidcSecuritySilentRenew,
                OidcSecurityUserService,
                OidcSecurityCommon,
                TokenHelperService,
                LoggerService,
                IFrameService,
                EqualityHelperService,
                OidcDataService,
                StateValidationService,
                {
                    provide: OidcSecurityStorage,
                    useClass: token.storage || BrowserStorage,
                },
            ],
        };
    }
}
AuthModule.decorators = [
    { type: NgModule }
];
/**
 * @record
 * @template T
 */
export function Type() { }
/**
 * @record
 */
export function Token() { }
if (false) {
    /** @type {?|undefined} */
    Token.prototype.storage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtb2lkYy1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy9hdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakYsT0FBTyxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRzlFLE1BQU0sT0FBTyxVQUFVOzs7OztJQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLFFBQWUsRUFBRTtRQUM1QixPQUFPO1lBQ0gsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFO2dCQUNQLGlCQUFpQjtnQkFDakIsbUJBQW1CO2dCQUNuQixzQkFBc0I7Z0JBQ3RCLHdCQUF3QjtnQkFDeEIsdUJBQXVCO2dCQUN2Qix1QkFBdUI7Z0JBQ3ZCLGtCQUFrQjtnQkFDbEIsa0JBQWtCO2dCQUNsQixhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IscUJBQXFCO2dCQUNyQixlQUFlO2dCQUNmLHNCQUFzQjtnQkFDdEI7b0JBQ0ksT0FBTyxFQUFFLG1CQUFtQjtvQkFDNUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksY0FBYztpQkFDNUM7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDOzs7WUF6QkosUUFBUTs7Ozs7O0FBNEJULDBCQUVDOzs7O0FBRUQsMkJBRUM7OztJQURHLHdCQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPaWRjRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXNlcnZpY2VzL29pZGMtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IElGcmFtZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9leGlzdGluZy1pZnJhbWUuc2VydmljZSc7XG5pbXBvcnQgeyBFcXVhbGl0eUhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9vaWRjLWVxdWFsaXR5LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXRlVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9vaWRjLXNlY3VyaXR5LXN0YXRlLXZhbGlkYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUb2tlbkhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9vaWRjLXRva2VuLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9vaWRjLmxvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IE9pZGNTZWN1cml0eUNoZWNrU2Vzc2lvbiB9IGZyb20gJy4uL3NlcnZpY2VzL29pZGMuc2VjdXJpdHkuY2hlY2stc2Vzc2lvbic7XG5pbXBvcnQgeyBPaWRjU2VjdXJpdHlDb21tb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9vaWRjLnNlY3VyaXR5LmNvbW1vbic7XG5pbXBvcnQgeyBPaWRjQ29uZmlnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL29pZGMuc2VjdXJpdHkuY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2lkY1NlY3VyaXR5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL29pZGMuc2VjdXJpdHkuc2VydmljZSc7XG5pbXBvcnQgeyBPaWRjU2VjdXJpdHlTaWxlbnRSZW5ldyB9IGZyb20gJy4uL3NlcnZpY2VzL29pZGMuc2VjdXJpdHkuc2lsZW50LXJlbmV3JztcbmltcG9ydCB7IEJyb3dzZXJTdG9yYWdlLCBPaWRjU2VjdXJpdHlTdG9yYWdlIH0gZnJvbSAnLi4vc2VydmljZXMvb2lkYy5zZWN1cml0eS5zdG9yYWdlJztcbmltcG9ydCB7IE9pZGNTZWN1cml0eVVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvb2lkYy5zZWN1cml0eS51c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgT2lkY1NlY3VyaXR5VmFsaWRhdGlvbiB9IGZyb20gJy4uL3NlcnZpY2VzL29pZGMuc2VjdXJpdHkudmFsaWRhdGlvbic7XG5cbkBOZ01vZHVsZSgpXG5leHBvcnQgY2xhc3MgQXV0aE1vZHVsZSB7XG4gICAgc3RhdGljIGZvclJvb3QodG9rZW46IFRva2VuID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBdXRoTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgT2lkY0NvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgT2lkY1NlY3VyaXR5U2VydmljZSxcbiAgICAgICAgICAgICAgICBPaWRjU2VjdXJpdHlWYWxpZGF0aW9uLFxuICAgICAgICAgICAgICAgIE9pZGNTZWN1cml0eUNoZWNrU2Vzc2lvbixcbiAgICAgICAgICAgICAgICBPaWRjU2VjdXJpdHlTaWxlbnRSZW5ldyxcbiAgICAgICAgICAgICAgICBPaWRjU2VjdXJpdHlVc2VyU2VydmljZSxcbiAgICAgICAgICAgICAgICBPaWRjU2VjdXJpdHlDb21tb24sXG4gICAgICAgICAgICAgICAgVG9rZW5IZWxwZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIExvZ2dlclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgSUZyYW1lU2VydmljZSxcbiAgICAgICAgICAgICAgICBFcXVhbGl0eUhlbHBlclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgT2lkY0RhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIFN0YXRlVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBPaWRjU2VjdXJpdHlTdG9yYWdlLFxuICAgICAgICAgICAgICAgICAgICB1c2VDbGFzczogdG9rZW4uc3RvcmFnZSB8fCBCcm93c2VyU3RvcmFnZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZTxUPiBleHRlbmRzIEZ1bmN0aW9uIHtcbiAgICBuZXcgKC4uLmFyZ3M6IGFueVtdKTogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb2tlbiB7XG4gICAgc3RvcmFnZT86IFR5cGU8YW55Pjtcbn1cbiJdfQ==