/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlatformProvider } from './platform.provider';
import * as i0 from "@angular/core";
import * as i1 from "./platform.provider";
var ConfigurationProvider = /** @class */ (function () {
    function ConfigurationProvider(platformProvider) {
        this.platformProvider = platformProvider;
        this.DEFAULT_CONFIG = {
            stsServer: 'https://please_set',
            redirect_url: 'https://please_set',
            client_id: 'please_set',
            response_type: 'code',
            scope: 'openid email profile',
            hd_param: '',
            post_logout_redirect_uri: 'https://please_set',
            start_checksession: false,
            silent_renew: false,
            silent_renew_url: 'https://please_set',
            silent_renew_offset_in_seconds: 0,
            use_refresh_token: false,
            ignore_nonce_after_refresh: false,
            post_login_route: '/',
            forbidden_route: '/forbidden',
            unauthorized_route: '/unauthorized',
            auto_userinfo: true,
            auto_clean_state_after_authentication: true,
            trigger_authorization_result_event: false,
            log_console_warning_active: true,
            log_console_debug_active: false,
            iss_validation_off: false,
            history_cleanup_off: false,
            max_id_token_iat_offset_allowed_in_seconds: 3,
            isauthorizedrace_timeout_in_seconds: 5,
            disable_iat_offset_validation: false,
            storage: typeof Storage !== 'undefined' ? sessionStorage : null,
        };
        this.INITIAL_AUTHWELLKNOWN = {
            issuer: '',
            jwks_uri: '',
            authorization_endpoint: '',
            token_endpoint: '',
            userinfo_endpoint: '',
            end_session_endpoint: '',
            check_session_iframe: '',
            revocation_endpoint: '',
            introspection_endpoint: '',
        };
        this.mergedOpenIdConfiguration = this.DEFAULT_CONFIG;
        this.authWellKnownEndpoints = this.INITIAL_AUTHWELLKNOWN;
        this.onConfigurationChangeInternal = new Subject();
    }
    Object.defineProperty(ConfigurationProvider.prototype, "openIDConfiguration", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mergedOpenIdConfiguration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationProvider.prototype, "wellKnownEndpoints", {
        get: /**
         * @return {?}
         */
        function () {
            return this.authWellKnownEndpoints;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationProvider.prototype, "onConfigurationChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this.onConfigurationChangeInternal.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} passedOpenIfConfiguration
     * @param {?} passedAuthWellKnownEndpoints
     * @return {?}
     */
    ConfigurationProvider.prototype.setup = /**
     * @param {?} passedOpenIfConfiguration
     * @param {?} passedAuthWellKnownEndpoints
     * @return {?}
     */
    function (passedOpenIfConfiguration, passedAuthWellKnownEndpoints) {
        this.mergedOpenIdConfiguration = tslib_1.__assign({}, this.mergedOpenIdConfiguration, passedOpenIfConfiguration);
        this.setSpecialCases(this.mergedOpenIdConfiguration);
        this.authWellKnownEndpoints = tslib_1.__assign({}, passedAuthWellKnownEndpoints);
        this.onConfigurationChangeInternal.next(tslib_1.__assign({}, this.mergedOpenIdConfiguration));
    };
    /**
     * @private
     * @param {?} currentConfig
     * @return {?}
     */
    ConfigurationProvider.prototype.setSpecialCases = /**
     * @private
     * @param {?} currentConfig
     * @return {?}
     */
    function (currentConfig) {
        if (!this.platformProvider.isBrowser) {
            currentConfig.start_checksession = false;
            currentConfig.silent_renew = false;
            currentConfig.use_refresh_token = false;
        }
    };
    ConfigurationProvider.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ConfigurationProvider.ctorParameters = function () { return [
        { type: PlatformProvider }
    ]; };
    /** @nocollapse */ ConfigurationProvider.ngInjectableDef = i0.defineInjectable({ factory: function ConfigurationProvider_Factory() { return new ConfigurationProvider(i0.inject(i1.PlatformProvider)); }, token: ConfigurationProvider, providedIn: "root" });
    return ConfigurationProvider;
}());
export { ConfigurationProvider };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConfigurationProvider.prototype.DEFAULT_CONFIG;
    /**
     * @type {?}
     * @private
     */
    ConfigurationProvider.prototype.INITIAL_AUTHWELLKNOWN;
    /**
     * @type {?}
     * @private
     */
    ConfigurationProvider.prototype.mergedOpenIdConfiguration;
    /**
     * @type {?}
     * @private
     */
    ConfigurationProvider.prototype.authWellKnownEndpoints;
    /**
     * @type {?}
     * @private
     */
    ConfigurationProvider.prototype.onConfigurationChangeInternal;
    /**
     * @type {?}
     * @private
     */
    ConfigurationProvider.prototype.platformProvider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1jb25maWd1cmF0aW9uLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLW9pZGMtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2F1dGgtY29uZmlndXJhdGlvbi5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUcvQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBRXZEO0lBNkRJLCtCQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQTNEOUMsbUJBQWMsR0FBZ0M7WUFDbEQsU0FBUyxFQUFFLG9CQUFvQjtZQUMvQixZQUFZLEVBQUUsb0JBQW9CO1lBQ2xDLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLEtBQUssRUFBRSxzQkFBc0I7WUFDN0IsUUFBUSxFQUFFLEVBQUU7WUFDWix3QkFBd0IsRUFBRSxvQkFBb0I7WUFDOUMsa0JBQWtCLEVBQUUsS0FBSztZQUN6QixZQUFZLEVBQUUsS0FBSztZQUNuQixnQkFBZ0IsRUFBRSxvQkFBb0I7WUFDdEMsOEJBQThCLEVBQUUsQ0FBQztZQUNqQyxpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLDBCQUEwQixFQUFFLEtBQUs7WUFDakMsZ0JBQWdCLEVBQUUsR0FBRztZQUNyQixlQUFlLEVBQUUsWUFBWTtZQUM3QixrQkFBa0IsRUFBRSxlQUFlO1lBQ25DLGFBQWEsRUFBRSxJQUFJO1lBQ25CLHFDQUFxQyxFQUFFLElBQUk7WUFDM0Msa0NBQWtDLEVBQUUsS0FBSztZQUN6QywwQkFBMEIsRUFBRSxJQUFJO1lBQ2hDLHdCQUF3QixFQUFFLEtBQUs7WUFDL0Isa0JBQWtCLEVBQUUsS0FBSztZQUN6QixtQkFBbUIsRUFBRSxLQUFLO1lBQzFCLDBDQUEwQyxFQUFFLENBQUM7WUFDN0MsbUNBQW1DLEVBQUUsQ0FBQztZQUN0Qyw2QkFBNkIsRUFBRSxLQUFLO1lBQ3BDLE9BQU8sRUFBRSxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUNsRSxDQUFDO1FBRU0sMEJBQXFCLEdBQTJCO1lBQ3BELE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLEVBQUU7WUFDWixzQkFBc0IsRUFBRSxFQUFFO1lBQzFCLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLGlCQUFpQixFQUFFLEVBQUU7WUFDckIsb0JBQW9CLEVBQUUsRUFBRTtZQUN4QixvQkFBb0IsRUFBRSxFQUFFO1lBQ3hCLG1CQUFtQixFQUFFLEVBQUU7WUFDdkIsc0JBQXNCLEVBQUUsRUFBRTtTQUM3QixDQUFDO1FBRU0sOEJBQXlCLEdBQWdDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0UsMkJBQXNCLEdBQTJCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUU1RSxrQ0FBNkIsR0FBRyxJQUFJLE9BQU8sRUFBdUIsQ0FBQztJQWNsQixDQUFDO0lBWjFELHNCQUFJLHNEQUFtQjs7OztRQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBRUQsc0JBQUkscURBQWtCOzs7O1FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3REFBcUI7Ozs7UUFBekI7WUFDSSxPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3RCxDQUFDOzs7T0FBQTs7Ozs7O0lBSUQscUNBQUs7Ozs7O0lBQUwsVUFDSSx5QkFBaUUsRUFDakUsNEJBQXVFO1FBRXZFLElBQUksQ0FBQyx5QkFBeUIsd0JBQVEsSUFBSSxDQUFDLHlCQUF5QixFQUFLLHlCQUF5QixDQUFFLENBQUM7UUFDckcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsc0JBQXNCLHdCQUFRLDRCQUE0QixDQUFFLENBQUM7UUFDbEUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksc0JBQU0sSUFBSSxDQUFDLHlCQUF5QixFQUFHLENBQUM7SUFDbkYsQ0FBQzs7Ozs7O0lBRU8sK0NBQWU7Ozs7O0lBQXZCLFVBQXdCLGFBQWtDO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFO1lBQ2xDLGFBQWEsQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDekMsYUFBYSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDbkMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztTQUMzQztJQUNMLENBQUM7O2dCQS9FSixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7O2dCQUZ6QixnQkFBZ0I7OztnQ0FKekI7Q0FzRkMsQUFoRkQsSUFnRkM7U0EvRVkscUJBQXFCOzs7Ozs7SUFDOUIsK0NBNEJFOzs7OztJQUVGLHNEQVVFOzs7OztJQUVGLDBEQUFxRjs7Ozs7SUFDckYsdURBQW9GOzs7OztJQUVwRiw4REFBMkU7Ozs7O0lBYy9ELGlEQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9wZW5JZENvbmZpZ3VyYXRpb24sIE9wZW5JZEludGVybmFsQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL21vZGVscy9hdXRoLmNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgQXV0aFdlbGxLbm93bkVuZHBvaW50cyB9IGZyb20gJy4uL21vZGVscy9hdXRoLndlbGwta25vd24tZW5kcG9pbnRzJztcbmltcG9ydCB7IFBsYXRmb3JtUHJvdmlkZXIgfSBmcm9tICcuL3BsYXRmb3JtLnByb3ZpZGVyJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uUHJvdmlkZXIge1xuICAgIHByaXZhdGUgREVGQVVMVF9DT05GSUc6IE9wZW5JZEludGVybmFsQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgc3RzU2VydmVyOiAnaHR0cHM6Ly9wbGVhc2Vfc2V0JyxcbiAgICAgICAgcmVkaXJlY3RfdXJsOiAnaHR0cHM6Ly9wbGVhc2Vfc2V0JyxcbiAgICAgICAgY2xpZW50X2lkOiAncGxlYXNlX3NldCcsXG4gICAgICAgIHJlc3BvbnNlX3R5cGU6ICdjb2RlJyxcbiAgICAgICAgc2NvcGU6ICdvcGVuaWQgZW1haWwgcHJvZmlsZScsXG4gICAgICAgIGhkX3BhcmFtOiAnJyxcbiAgICAgICAgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpOiAnaHR0cHM6Ly9wbGVhc2Vfc2V0JyxcbiAgICAgICAgc3RhcnRfY2hlY2tzZXNzaW9uOiBmYWxzZSxcbiAgICAgICAgc2lsZW50X3JlbmV3OiBmYWxzZSxcbiAgICAgICAgc2lsZW50X3JlbmV3X3VybDogJ2h0dHBzOi8vcGxlYXNlX3NldCcsXG4gICAgICAgIHNpbGVudF9yZW5ld19vZmZzZXRfaW5fc2Vjb25kczogMCxcbiAgICAgICAgdXNlX3JlZnJlc2hfdG9rZW46IGZhbHNlLFxuICAgICAgICBpZ25vcmVfbm9uY2VfYWZ0ZXJfcmVmcmVzaDogZmFsc2UsXG4gICAgICAgIHBvc3RfbG9naW5fcm91dGU6ICcvJyxcbiAgICAgICAgZm9yYmlkZGVuX3JvdXRlOiAnL2ZvcmJpZGRlbicsXG4gICAgICAgIHVuYXV0aG9yaXplZF9yb3V0ZTogJy91bmF1dGhvcml6ZWQnLFxuICAgICAgICBhdXRvX3VzZXJpbmZvOiB0cnVlLFxuICAgICAgICBhdXRvX2NsZWFuX3N0YXRlX2FmdGVyX2F1dGhlbnRpY2F0aW9uOiB0cnVlLFxuICAgICAgICB0cmlnZ2VyX2F1dGhvcml6YXRpb25fcmVzdWx0X2V2ZW50OiBmYWxzZSxcbiAgICAgICAgbG9nX2NvbnNvbGVfd2FybmluZ19hY3RpdmU6IHRydWUsXG4gICAgICAgIGxvZ19jb25zb2xlX2RlYnVnX2FjdGl2ZTogZmFsc2UsXG4gICAgICAgIGlzc192YWxpZGF0aW9uX29mZjogZmFsc2UsXG4gICAgICAgIGhpc3RvcnlfY2xlYW51cF9vZmY6IGZhbHNlLFxuICAgICAgICBtYXhfaWRfdG9rZW5faWF0X29mZnNldF9hbGxvd2VkX2luX3NlY29uZHM6IDMsXG4gICAgICAgIGlzYXV0aG9yaXplZHJhY2VfdGltZW91dF9pbl9zZWNvbmRzOiA1LFxuICAgICAgICBkaXNhYmxlX2lhdF9vZmZzZXRfdmFsaWRhdGlvbjogZmFsc2UsXG4gICAgICAgIHN0b3JhZ2U6IHR5cGVvZiBTdG9yYWdlICE9PSAndW5kZWZpbmVkJyA/IHNlc3Npb25TdG9yYWdlIDogbnVsbCxcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBJTklUSUFMX0FVVEhXRUxMS05PV046IEF1dGhXZWxsS25vd25FbmRwb2ludHMgPSB7XG4gICAgICAgIGlzc3VlcjogJycsXG4gICAgICAgIGp3a3NfdXJpOiAnJyxcbiAgICAgICAgYXV0aG9yaXphdGlvbl9lbmRwb2ludDogJycsXG4gICAgICAgIHRva2VuX2VuZHBvaW50OiAnJyxcbiAgICAgICAgdXNlcmluZm9fZW5kcG9pbnQ6ICcnLFxuICAgICAgICBlbmRfc2Vzc2lvbl9lbmRwb2ludDogJycsXG4gICAgICAgIGNoZWNrX3Nlc3Npb25faWZyYW1lOiAnJyxcbiAgICAgICAgcmV2b2NhdGlvbl9lbmRwb2ludDogJycsXG4gICAgICAgIGludHJvc3BlY3Rpb25fZW5kcG9pbnQ6ICcnLFxuICAgIH07XG5cbiAgICBwcml2YXRlIG1lcmdlZE9wZW5JZENvbmZpZ3VyYXRpb246IE9wZW5JZEludGVybmFsQ29uZmlndXJhdGlvbiA9IHRoaXMuREVGQVVMVF9DT05GSUc7XG4gICAgcHJpdmF0ZSBhdXRoV2VsbEtub3duRW5kcG9pbnRzOiBBdXRoV2VsbEtub3duRW5kcG9pbnRzID0gdGhpcy5JTklUSUFMX0FVVEhXRUxMS05PV047XG5cbiAgICBwcml2YXRlIG9uQ29uZmlndXJhdGlvbkNoYW5nZUludGVybmFsID0gbmV3IFN1YmplY3Q8T3BlbklkQ29uZmlndXJhdGlvbj4oKTtcblxuICAgIGdldCBvcGVuSURDb25maWd1cmF0aW9uKCk6IE9wZW5JZEludGVybmFsQ29uZmlndXJhdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lcmdlZE9wZW5JZENvbmZpZ3VyYXRpb247XG4gICAgfVxuXG4gICAgZ2V0IHdlbGxLbm93bkVuZHBvaW50cygpOiBBdXRoV2VsbEtub3duRW5kcG9pbnRzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFdlbGxLbm93bkVuZHBvaW50cztcbiAgICB9XG5cbiAgICBnZXQgb25Db25maWd1cmF0aW9uQ2hhbmdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkNvbmZpZ3VyYXRpb25DaGFuZ2VJbnRlcm5hbC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsYXRmb3JtUHJvdmlkZXI6IFBsYXRmb3JtUHJvdmlkZXIpIHt9XG5cbiAgICBzZXR1cChcbiAgICAgICAgcGFzc2VkT3BlbklmQ29uZmlndXJhdGlvbjogT3BlbklkQ29uZmlndXJhdGlvbiB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgICAgIHBhc3NlZEF1dGhXZWxsS25vd25FbmRwb2ludHM6IEF1dGhXZWxsS25vd25FbmRwb2ludHMgfCBudWxsIHwgdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICAgIHRoaXMubWVyZ2VkT3BlbklkQ29uZmlndXJhdGlvbiA9IHsgLi4udGhpcy5tZXJnZWRPcGVuSWRDb25maWd1cmF0aW9uLCAuLi5wYXNzZWRPcGVuSWZDb25maWd1cmF0aW9uIH07XG4gICAgICAgIHRoaXMuc2V0U3BlY2lhbENhc2VzKHRoaXMubWVyZ2VkT3BlbklkQ29uZmlndXJhdGlvbik7XG4gICAgICAgIHRoaXMuYXV0aFdlbGxLbm93bkVuZHBvaW50cyA9IHsgLi4ucGFzc2VkQXV0aFdlbGxLbm93bkVuZHBvaW50cyB9O1xuICAgICAgICB0aGlzLm9uQ29uZmlndXJhdGlvbkNoYW5nZUludGVybmFsLm5leHQoeyAuLi50aGlzLm1lcmdlZE9wZW5JZENvbmZpZ3VyYXRpb24gfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTcGVjaWFsQ2FzZXMoY3VycmVudENvbmZpZzogT3BlbklkQ29uZmlndXJhdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMucGxhdGZvcm1Qcm92aWRlci5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDb25maWcuc3RhcnRfY2hlY2tzZXNzaW9uID0gZmFsc2U7XG4gICAgICAgICAgICBjdXJyZW50Q29uZmlnLnNpbGVudF9yZW5ldyA9IGZhbHNlO1xuICAgICAgICAgICAgY3VycmVudENvbmZpZy51c2VfcmVmcmVzaF90b2tlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19