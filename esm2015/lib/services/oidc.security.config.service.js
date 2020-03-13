/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LoggerService } from './oidc.logger.service';
/**
 * @record
 */
export function ConfigResult() { }
if (false) {
    /** @type {?} */
    ConfigResult.prototype.authWellknownEndpoints;
    /** @type {?} */
    ConfigResult.prototype.customConfig;
}
export class OidcConfigService {
    /**
     * @param {?} loggerService
     * @param {?} httpClient
     */
    constructor(loggerService, httpClient) {
        this.loggerService = loggerService;
        this.httpClient = httpClient;
        this.configurationLoadedInternal = new ReplaySubject(1);
    }
    /**
     * @return {?}
     */
    get onConfigurationLoaded() {
        return this.configurationLoadedInternal.asObservable();
    }
    /**
     * @param {?} configUrl
     * @return {?}
     */
    load(configUrl) {
        return this.httpClient
            .get(configUrl)
            .pipe(switchMap((/**
         * @param {?} clientConfiguration
         * @return {?}
         */
        clientConfiguration => {
            return this.loadUsingConfiguration(clientConfiguration);
        })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => {
            this.loggerService.logError(`OidcConfigService 'load' threw an error on calling ${configUrl}`, error);
            this.configurationLoadedInternal.next(undefined);
            return of(false);
        })))
            .toPromise();
    }
    /**
     * @param {?} stsServer
     * @return {?}
     */
    load_using_stsServer(stsServer) {
        return this.loadUsingConfiguration({ stsServer }).toPromise();
    }
    /**
     * @param {?} url
     * @return {?}
     */
    load_using_custom_stsServer(url) {
        return this.httpClient
            .get(url)
            .pipe(switchMap((/**
         * @param {?} wellKnownEndpoints
         * @return {?}
         */
        wellKnownEndpoints => {
            this.configurationLoadedInternal.next({
                authWellknownEndpoints: wellKnownEndpoints,
                customConfig: { stsServer: url },
            });
            return of(true);
        })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => {
            this.loggerService.logError(`OidcConfigService 'load_using_custom_stsServer' threw an error on calling ${url}`, error);
            this.configurationLoadedInternal.next(undefined);
            return of(false);
        })))
            .toPromise();
    }
    /**
     * @private
     * @param {?} clientConfig
     * @return {?}
     */
    loadUsingConfiguration(clientConfig) {
        if (!clientConfig.stsServer) {
            this.loggerService.logError(`Property 'stsServer' is not present of passed config ${JSON.stringify(clientConfig)}`, clientConfig);
            throw new Error(`Property 'stsServer' is not present of passed config ${JSON.stringify(clientConfig)}`);
        }
        /** @type {?} */
        const url = `${clientConfig.stsServer}/.well-known/openid-configuration`;
        return this.httpClient.get(url).pipe(switchMap((/**
         * @param {?} wellKnownEndpoints
         * @return {?}
         */
        wellKnownEndpoints => {
            this.configurationLoadedInternal.next({
                authWellknownEndpoints: wellKnownEndpoints,
                customConfig: clientConfig,
            });
            return of(true);
        })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => {
            this.loggerService.logError(`OidcConfigService 'load_using_stsServer' threw an error on calling ${url}`, error);
            this.configurationLoadedInternal.next(undefined);
            return of(false);
        })));
    }
}
OidcConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OidcConfigService.ctorParameters = () => [
    { type: LoggerService },
    { type: HttpClient }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OidcConfigService.prototype.configurationLoadedInternal;
    /**
     * @type {?}
     * @private
     */
    OidcConfigService.prototype.loggerService;
    /**
     * @type {?}
     * @private
     */
    OidcConfigService.prototype.httpClient;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy5zZWN1cml0eS5jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1vaWRjLWNsaWVudC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9vaWRjLnNlY3VyaXR5LmNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUV0RCxrQ0FHQzs7O0lBRkcsOENBQTRCOztJQUM1QixvQ0FBa0I7O0FBSXRCLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBTzFCLFlBQTZCLGFBQTRCLEVBQW1CLFVBQXNCO1FBQXJFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQW1CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFOMUYsZ0NBQTJCLEdBQUcsSUFBSSxhQUFhLENBQWUsQ0FBQyxDQUFDLENBQUM7SUFNNEIsQ0FBQzs7OztJQUp0RyxJQUFXLHFCQUFxQjtRQUM1QixPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzRCxDQUFDOzs7OztJQUlELElBQUksQ0FBQyxTQUFpQjtRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVO2FBQ2pCLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDZCxJQUFJLENBQ0QsU0FBUzs7OztRQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM1RCxDQUFDLEVBQUMsRUFD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QGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuL29pZGMubG9nZ2VyLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ1Jlc3VsdCB7XG4gICAgYXV0aFdlbGxrbm93bkVuZHBvaW50czogYW55O1xuICAgIGN1c3RvbUNvbmZpZzogYW55O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2lkY0NvbmZpZ1NlcnZpY2Uge1xuICAgIHByaXZhdGUgY29uZmlndXJhdGlvbkxvYWRlZEludGVybmFsID0gbmV3IFJlcGxheVN1YmplY3Q8Q29uZmlnUmVzdWx0PigxKTtcblxuICAgIHB1YmxpYyBnZXQgb25Db25maWd1cmF0aW9uTG9hZGVkKCk6IE9ic2VydmFibGU8Q29uZmlnUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25Mb2FkZWRJbnRlcm5hbC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxvZ2dlclNlcnZpY2U6IExvZ2dlclNlcnZpY2UsIHByaXZhdGUgcmVhZG9ubHkgaHR0cENsaWVudDogSHR0cENsaWVudCkge31cblxuICAgIGxvYWQoY29uZmlnVXJsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgICAgICAgLmdldChjb25maWdVcmwpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoY2xpZW50Q29uZmlndXJhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRVc2luZ0NvbmZpZ3VyYXRpb24oY2xpZW50Q29uZmlndXJhdGlvbik7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dFcnJvcihgT2lkY0NvbmZpZ1NlcnZpY2UgJ2xvYWQnIHRocmV3IGFuIGVycm9yIG9uIGNhbGxpbmcgJHtjb25maWdVcmx9YCwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25Mb2FkZWRJbnRlcm5hbC5uZXh0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBsb2FkX3VzaW5nX3N0c1NlcnZlcihzdHNTZXJ2ZXI6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkVXNpbmdDb25maWd1cmF0aW9uKHsgc3RzU2VydmVyIH0pLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIGxvYWRfdXNpbmdfY3VzdG9tX3N0c1NlcnZlcih1cmw6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCh3ZWxsS25vd25FbmRwb2ludHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25Mb2FkZWRJbnRlcm5hbC5uZXh0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhXZWxsa25vd25FbmRwb2ludHM6IHdlbGxLbm93bkVuZHBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNvbmZpZzogeyBzdHNTZXJ2ZXI6IHVybCB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHRydWUpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRXJyb3IoYE9pZGNDb25maWdTZXJ2aWNlICdsb2FkX3VzaW5nX2N1c3RvbV9zdHNTZXJ2ZXInIHRocmV3IGFuIGVycm9yIG9uIGNhbGxpbmcgJHt1cmx9YCwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25Mb2FkZWRJbnRlcm5hbC5uZXh0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRVc2luZ0NvbmZpZ3VyYXRpb24oY2xpZW50Q29uZmlnOiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCFjbGllbnRDb25maWcuc3RzU2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRXJyb3IoYFByb3BlcnR5ICdzdHNTZXJ2ZXInIGlzIG5vdCBwcmVzZW50IG9mIHBhc3NlZCBjb25maWcgJHtKU09OLnN0cmluZ2lmeShjbGllbnRDb25maWcpfWAsIGNsaWVudENvbmZpZyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3BlcnR5ICdzdHNTZXJ2ZXInIGlzIG5vdCBwcmVzZW50IG9mIHBhc3NlZCBjb25maWcgJHtKU09OLnN0cmluZ2lmeShjbGllbnRDb25maWcpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXJsID0gYCR7Y2xpZW50Q29uZmlnLnN0c1NlcnZlcn0vLndlbGwta25vd24vb3BlbmlkLWNvbmZpZ3VyYXRpb25gO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0KHVybCkucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCh3ZWxsS25vd25FbmRwb2ludHMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbkxvYWRlZEludGVybmFsLm5leHQoe1xuICAgICAgICAgICAgICAgICAgICBhdXRoV2VsbGtub3duRW5kcG9pbnRzOiB3ZWxsS25vd25FbmRwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNvbmZpZzogY2xpZW50Q29uZmlnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBvZih0cnVlKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0Vycm9yKGBPaWRjQ29uZmlnU2VydmljZSAnbG9hZF91c2luZ19zdHNTZXJ2ZXInIHRocmV3IGFuIGVycm9yIG9uIGNhbGxpbmcgJHt1cmx9YCwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbkxvYWRlZEludGVybmFsLm5leHQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=