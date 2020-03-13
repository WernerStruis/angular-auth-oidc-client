/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
var OidcDataService = /** @class */ (function () {
    function OidcDataService(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * @template T
     * @param {?} url
     * @return {?}
     */
    OidcDataService.prototype.getWellknownEndpoints = /**
     * @template T
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return this.httpClient.get(url, {
            headers: headers,
        });
    };
    /**
     * @template T
     * @param {?} url
     * @param {?} token
     * @return {?}
     */
    OidcDataService.prototype.getIdentityUserData = /**
     * @template T
     * @param {?} url
     * @param {?} token
     * @return {?}
     */
    function (url, token) {
        /** @type {?} */
        var headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Authorization', 'Bearer ' + decodeURIComponent(token));
        return this.httpClient.get(url, {
            headers: headers,
        });
    };
    /**
     * @template T
     * @param {?} url
     * @return {?}
     */
    OidcDataService.prototype.get = /**
     * @template T
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return this.httpClient.get(url, {
            headers: headers,
        });
    };
    OidcDataService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OidcDataService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return OidcDataService;
}());
export { OidcDataService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OidcDataService.prototype.httpClient;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy1kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtb2lkYy1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zZXJ2aWNlcy9vaWRjLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDO0lBRUkseUJBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDOzs7Ozs7SUFFOUMsK0NBQXFCOzs7OztJQUFyQixVQUF5QixHQUFXOztZQUM1QixPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7UUFDL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFcEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBSSxHQUFHLEVBQUU7WUFDL0IsT0FBTyxTQUFBO1NBQ1YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7OztJQUVELDZDQUFtQjs7Ozs7O0lBQW5CLFVBQXVCLEdBQVcsRUFBRSxLQUFhOztZQUN6QyxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7UUFDL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDcEQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTlFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUksR0FBRyxFQUFFO1lBQy9CLE9BQU8sU0FBQTtTQUNWLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVELDZCQUFHOzs7OztJQUFILFVBQU8sR0FBVzs7WUFDVixPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7UUFDL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFcEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBSSxHQUFHLEVBQUU7WUFDL0IsT0FBTyxTQUFBO1NBQ1YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBOUJKLFVBQVU7Ozs7Z0JBSkYsVUFBVTs7SUFtQ25CLHNCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0E5QlksZUFBZTs7Ozs7O0lBQ1oscUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPaWRjRGF0YVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCkge31cblxuICAgIGdldFdlbGxrbm93bkVuZHBvaW50czxUPih1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5nZXQ8VD4odXJsLCB7XG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJZGVudGl0eVVzZXJEYXRhPFQ+KHVybDogc3RyaW5nLCB0b2tlbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgZGVjb2RlVVJJQ29tcG9uZW50KHRva2VuKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5nZXQ8VD4odXJsLCB7XG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQ8VD4odXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PFQ+KHVybCwge1xuICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19