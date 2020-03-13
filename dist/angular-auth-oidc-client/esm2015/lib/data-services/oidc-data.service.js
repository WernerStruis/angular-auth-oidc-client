/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
export class OidcDataService {
    /**
     * @param {?} httpClient
     */
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * @template T
     * @param {?} url
     * @return {?}
     */
    getWellknownEndpoints(url) {
        /** @type {?} */
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return this.httpClient.get(url, {
            headers,
        });
    }
    /**
     * @template T
     * @param {?} url
     * @param {?} token
     * @return {?}
     */
    getIdentityUserData(url, token) {
        /** @type {?} */
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Authorization', 'Bearer ' + decodeURIComponent(token));
        return this.httpClient.get(url, {
            headers,
        });
    }
    /**
     * @template T
     * @param {?} url
     * @return {?}
     */
    get(url) {
        /** @type {?} */
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return this.httpClient.get(url, {
            headers,
        });
    }
}
OidcDataService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OidcDataService.ctorParameters = () => [
    { type: HttpClient }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OidcDataService.prototype.httpClient;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy1kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtb2lkYy1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zZXJ2aWNlcy9vaWRjLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE1BQU0sT0FBTyxlQUFlOzs7O0lBQ3hCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDOzs7Ozs7SUFFOUMscUJBQXFCLENBQUksR0FBVzs7WUFDNUIsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFO1FBQy9CLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXBELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUksR0FBRyxFQUFFO1lBQy9CLE9BQU87U0FDVixDQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBRUQsbUJBQW1CLENBQUksR0FBVyxFQUFFLEtBQWE7O1lBQ3pDLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRTtRQUMvQixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNwRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFOUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBSSxHQUFHLEVBQUU7WUFDL0IsT0FBTztTQUNWLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVELEdBQUcsQ0FBSSxHQUFXOztZQUNWLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRTtRQUMvQixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVwRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFJLEdBQUcsRUFBRTtZQUMvQixPQUFPO1NBQ1YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBOUJKLFVBQVU7Ozs7WUFKRixVQUFVOzs7Ozs7O0lBTUgscUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPaWRjRGF0YVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCkge31cblxuICAgIGdldFdlbGxrbm93bkVuZHBvaW50czxUPih1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5nZXQ8VD4odXJsLCB7XG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJZGVudGl0eVVzZXJEYXRhPFQ+KHVybDogc3RyaW5nLCB0b2tlbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgZGVjb2RlVVJJQ29tcG9uZW50KHRva2VuKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5nZXQ8VD4odXJsLCB7XG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQ8VD4odXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PFQ+KHVybCwge1xuICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19