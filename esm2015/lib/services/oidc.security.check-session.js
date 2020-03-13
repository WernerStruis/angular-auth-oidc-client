/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfigurationProvider } from './auth-configuration.provider';
import { IFrameService } from './existing-iframe.service';
import { LoggerService } from './oidc.logger.service';
import { OidcSecurityCommon } from './oidc.security.common';
/** @type {?} */
const IFRAME_FOR_CHECK_SESSION_IDENTIFIER = 'myiFrameForCheckSession';
// http://openid.net/specs/openid-connect-session-1_0-ID4.html
export class OidcSecurityCheckSession {
    /**
     * @param {?} oidcSecurityCommon
     * @param {?} loggerService
     * @param {?} iFrameService
     * @param {?} zone
     * @param {?} configurationProvider
     */
    constructor(oidcSecurityCommon, loggerService, iFrameService, zone, configurationProvider) {
        this.oidcSecurityCommon = oidcSecurityCommon;
        this.loggerService = loggerService;
        this.iFrameService = iFrameService;
        this.zone = zone;
        this.configurationProvider = configurationProvider;
        this.lastIFrameRefresh = 0;
        this.outstandingMessages = 0;
        this.heartBeatInterval = 3000;
        this.iframeRefreshInterval = 60000;
        this.checkSessionChanged = new Subject();
    }
    /**
     * @return {?}
     */
    get onCheckSessionChanged() {
        return this.checkSessionChanged.asObservable();
    }
    /**
     * @private
     * @return {?}
     */
    doesSessionExist() {
        /** @type {?} */
        const existingIFrame = this.iFrameService.getExistingIFrame(IFRAME_FOR_CHECK_SESSION_IDENTIFIER);
        if (!existingIFrame) {
            return false;
        }
        this.sessionIframe = existingIFrame;
        return true;
    }
    /**
     * @private
     * @return {?}
     */
    init() {
        if (this.lastIFrameRefresh + this.iframeRefreshInterval > Date.now()) {
            return from([this]);
        }
        if (!this.doesSessionExist()) {
            this.sessionIframe = this.iFrameService.addIFrameToWindowBody(IFRAME_FOR_CHECK_SESSION_IDENTIFIER);
            this.iframeMessageEvent = this.messageHandler.bind(this);
            window.addEventListener('message', this.iframeMessageEvent, false);
        }
        if (!this.configurationProvider.wellKnownEndpoints) {
            this.loggerService.logWarning('init check session: authWellKnownEndpoints is undefined. Returning.');
            return;
        }
        if (this.configurationProvider.wellKnownEndpoints.check_session_iframe) {
            this.sessionIframe.contentWindow.location.replace(this.configurationProvider.wellKnownEndpoints.check_session_iframe);
        }
        else {
            this.loggerService.logWarning('init check session: authWellKnownEndpoints is undefined');
        }
        return Observable.create((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            this.sessionIframe.onload = (/**
             * @return {?}
             */
            () => {
                this.lastIFrameRefresh = Date.now();
                observer.next(this);
                observer.complete();
            });
        }));
    }
    /**
     * @param {?} clientId
     * @return {?}
     */
    startCheckingSession(clientId) {
        if (this.scheduledHeartBeat) {
            return;
        }
        this.pollServerSession(clientId);
    }
    /**
     * @return {?}
     */
    stopCheckingSession() {
        if (!this.scheduledHeartBeat) {
            return;
        }
        this.clearScheduledHeartBeat();
    }
    /**
     * @private
     * @param {?} clientId
     * @return {?}
     */
    pollServerSession(clientId) {
        /** @type {?} */
        const pollServerSessionRecur = (/**
         * @return {?}
         */
        () => {
            this.init()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => {
                if (this.sessionIframe && clientId) {
                    this.loggerService.logDebug(this.sessionIframe);
                    /** @type {?} */
                    const sessionState = this.oidcSecurityCommon.sessionState;
                    if (sessionState) {
                        this.outstandingMessages++;
                        this.sessionIframe.contentWindow.postMessage(clientId + ' ' + sessionState, this.configurationProvider.openIDConfiguration.stsServer);
                    }
                    else {
                        this.loggerService.logDebug('OidcSecurityCheckSession pollServerSession session_state is blank');
                        this.checkSessionChanged.next();
                    }
                }
                else {
                    this.loggerService.logWarning('OidcSecurityCheckSession pollServerSession sessionIframe does not exist');
                    this.loggerService.logDebug(clientId);
                    this.loggerService.logDebug(this.sessionIframe);
                    // this.init();
                }
                // after sending three messages with no response, fail.
                if (this.outstandingMessages > 3) {
                    this.loggerService.logError(`OidcSecurityCheckSession not receiving check session response messages.
                            Outstanding messages: ${this.outstandingMessages}. Server unreachable?`);
                    this.checkSessionChanged.next();
                }
                this.scheduledHeartBeat = setTimeout(pollServerSessionRecur, this.heartBeatInterval);
            }));
        });
        this.outstandingMessages = 0;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.scheduledHeartBeat = setTimeout(pollServerSessionRecur, this.heartBeatInterval);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    clearScheduledHeartBeat() {
        clearTimeout(this.scheduledHeartBeat);
        this.scheduledHeartBeat = null;
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    messageHandler(e) {
        this.outstandingMessages = 0;
        if (this.sessionIframe &&
            e.origin === this.configurationProvider.openIDConfiguration.stsServer &&
            e.source === this.sessionIframe.contentWindow) {
            if (e.data === 'error') {
                this.loggerService.logWarning('error from checksession messageHandler');
            }
            else if (e.data === 'changed') {
                this.checkSessionChanged.next();
            }
            else {
                this.loggerService.logDebug(e.data + ' from checksession messageHandler');
            }
        }
    }
}
OidcSecurityCheckSession.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OidcSecurityCheckSession.ctorParameters = () => [
    { type: OidcSecurityCommon },
    { type: LoggerService },
    { type: IFrameService },
    { type: NgZone },
    { type: ConfigurationProvider }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.sessionIframe;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.iframeMessageEvent;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.scheduledHeartBeat;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.lastIFrameRefresh;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.outstandingMessages;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.heartBeatInterval;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.iframeRefreshInterval;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.checkSessionChanged;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.oidcSecurityCommon;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.loggerService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.iFrameService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityCheckSession.prototype.configurationProvider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy5zZWN1cml0eS5jaGVjay1zZXNzaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLW9pZGMtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29pZGMuc2VjdXJpdHkuY2hlY2stc2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQVksT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztNQUV0RCxtQ0FBbUMsR0FBRyx5QkFBeUI7O0FBS3JFLE1BQU0sT0FBTyx3QkFBd0I7Ozs7Ozs7O0lBY2pDLFlBQ1ksa0JBQXNDLEVBQ3RDLGFBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLElBQVksRUFDSCxxQkFBNEM7UUFKckQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ0gsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQWZ6RCxzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIsd0JB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OztJQUMzQixzREFBZ0M7Ozs7O0lBQ2hDLHNEQUFnQzs7Ozs7SUFDaEMscURBQThCOzs7OztJQUM5Qix1REFBZ0M7Ozs7O0lBQ2hDLHFEQUFpQzs7Ozs7SUFDakMseURBQXNDOzs7OztJQUN0Qyx1REFBaUQ7Ozs7O0lBTzdDLHNEQUE4Qzs7Ozs7SUFDOUMsaURBQW9DOzs7OztJQUNwQyxpREFBb0M7Ozs7O0lBQ3BDLHdDQUFvQjs7Ozs7SUFDcEIseURBQTZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25Qcm92aWRlciB9IGZyb20gJy4vYXV0aC1jb25maWd1cmF0aW9uLnByb3ZpZGVyJztcbmltcG9ydCB7IElGcmFtZVNlcnZpY2UgfSBmcm9tICcuL2V4aXN0aW5nLWlmcmFtZS5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuL29pZGMubG9nZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2lkY1NlY3VyaXR5Q29tbW9uIH0gZnJvbSAnLi9vaWRjLnNlY3VyaXR5LmNvbW1vbic7XG5cbmNvbnN0IElGUkFNRV9GT1JfQ0hFQ0tfU0VTU0lPTl9JREVOVElGSUVSID0gJ215aUZyYW1lRm9yQ2hlY2tTZXNzaW9uJztcblxuLy8gaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3Qtc2Vzc2lvbi0xXzAtSUQ0Lmh0bWxcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9pZGNTZWN1cml0eUNoZWNrU2Vzc2lvbiB7XG4gICAgcHJpdmF0ZSBzZXNzaW9uSWZyYW1lOiBhbnk7XG4gICAgcHJpdmF0ZSBpZnJhbWVNZXNzYWdlRXZlbnQ6IGFueTtcbiAgICBwcml2YXRlIHNjaGVkdWxlZEhlYXJ0QmVhdDogYW55O1xuICAgIHByaXZhdGUgbGFzdElGcmFtZVJlZnJlc2ggPSAwO1xuICAgIHByaXZhdGUgb3V0c3RhbmRpbmdNZXNzYWdlcyA9IDA7XG4gICAgcHJpdmF0ZSBoZWFydEJlYXRJbnRlcnZhbCA9IDMwMDA7XG4gICAgcHJpdmF0ZSBpZnJhbWVSZWZyZXNoSW50ZXJ2YWwgPSA2MDAwMDtcbiAgICBwcml2YXRlIGNoZWNrU2Vzc2lvbkNoYW5nZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBwdWJsaWMgZ2V0IG9uQ2hlY2tTZXNzaW9uQ2hhbmdlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja1Nlc3Npb25DaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG9pZGNTZWN1cml0eUNvbW1vbjogT2lkY1NlY3VyaXR5Q29tbW9uLFxuICAgICAgICBwcml2YXRlIGxvZ2dlclNlcnZpY2U6IExvZ2dlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgaUZyYW1lU2VydmljZTogSUZyYW1lU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY29uZmlndXJhdGlvblByb3ZpZGVyOiBDb25maWd1cmF0aW9uUHJvdmlkZXJcbiAgICApIHt9XG5cbiAgICBwcml2YXRlIGRvZXNTZXNzaW9uRXhpc3QoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSUZyYW1lID0gdGhpcy5pRnJhbWVTZXJ2aWNlLmdldEV4aXN0aW5nSUZyYW1lKElGUkFNRV9GT1JfQ0hFQ0tfU0VTU0lPTl9JREVOVElGSUVSKTtcblxuICAgICAgICBpZiAoIWV4aXN0aW5nSUZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlc3Npb25JZnJhbWUgPSBleGlzdGluZ0lGcmFtZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0KCkge1xuICAgICAgICBpZiAodGhpcy5sYXN0SUZyYW1lUmVmcmVzaCArIHRoaXMuaWZyYW1lUmVmcmVzaEludGVydmFsID4gRGF0ZS5ub3coKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb20oW3RoaXNdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kb2VzU2Vzc2lvbkV4aXN0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbklmcmFtZSA9IHRoaXMuaUZyYW1lU2VydmljZS5hZGRJRnJhbWVUb1dpbmRvd0JvZHkoSUZSQU1FX0ZPUl9DSEVDS19TRVNTSU9OX0lERU5USUZJRVIpO1xuICAgICAgICAgICAgdGhpcy5pZnJhbWVNZXNzYWdlRXZlbnQgPSB0aGlzLm1lc3NhZ2VIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuaWZyYW1lTWVzc2FnZUV2ZW50LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLndlbGxLbm93bkVuZHBvaW50cykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ1dhcm5pbmcoJ2luaXQgY2hlY2sgc2Vzc2lvbjogYXV0aFdlbGxLbm93bkVuZHBvaW50cyBpcyB1bmRlZmluZWQuIFJldHVybmluZy4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMuY2hlY2tfc2Vzc2lvbl9pZnJhbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbklmcmFtZS5jb250ZW50V2luZG93LmxvY2F0aW9uLnJlcGxhY2UodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzLmNoZWNrX3Nlc3Npb25faWZyYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdpbml0IGNoZWNrIHNlc3Npb246IGF1dGhXZWxsS25vd25FbmRwb2ludHMgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxPaWRjU2VjdXJpdHlDaGVja1Nlc3Npb24+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb25JZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdElGcmFtZVJlZnJlc2ggPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodGhpcyk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXJ0Q2hlY2tpbmdTZXNzaW9uKGNsaWVudElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2NoZWR1bGVkSGVhcnRCZWF0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvbGxTZXJ2ZXJTZXNzaW9uKGNsaWVudElkKTtcbiAgICB9XG5cbiAgICBzdG9wQ2hlY2tpbmdTZXNzaW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2NoZWR1bGVkSGVhcnRCZWF0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFyU2NoZWR1bGVkSGVhcnRCZWF0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb2xsU2VydmVyU2Vzc2lvbihjbGllbnRJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBvbGxTZXJ2ZXJTZXNzaW9uUmVjdXIgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXQoKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlc3Npb25JZnJhbWUgJiYgY2xpZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1Zyh0aGlzLnNlc3Npb25JZnJhbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblN0YXRlID0gdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uc2Vzc2lvblN0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb25TdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3V0c3RhbmRpbmdNZXNzYWdlcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbklmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRJZCArICcgJyArIHNlc3Npb25TdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5zdHNTZXJ2ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ09pZGNTZWN1cml0eUNoZWNrU2Vzc2lvbiBwb2xsU2VydmVyU2Vzc2lvbiBzZXNzaW9uX3N0YXRlIGlzIGJsYW5rJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1Nlc3Npb25DaGFuZ2VkLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdPaWRjU2VjdXJpdHlDaGVja1Nlc3Npb24gcG9sbFNlcnZlclNlc3Npb24gc2Vzc2lvbklmcmFtZSBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKGNsaWVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1Zyh0aGlzLnNlc3Npb25JZnJhbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pbml0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBhZnRlciBzZW5kaW5nIHRocmVlIG1lc3NhZ2VzIHdpdGggbm8gcmVzcG9uc2UsIGZhaWwuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm91dHN0YW5kaW5nTWVzc2FnZXMgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYE9pZGNTZWN1cml0eUNoZWNrU2Vzc2lvbiBub3QgcmVjZWl2aW5nIGNoZWNrIHNlc3Npb24gcmVzcG9uc2UgbWVzc2FnZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3V0c3RhbmRpbmcgbWVzc2FnZXM6ICR7dGhpcy5vdXRzdGFuZGluZ01lc3NhZ2VzfS4gU2VydmVyIHVucmVhY2hhYmxlP2BcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU2Vzc2lvbkNoYW5nZWQubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZWRIZWFydEJlYXQgPSBzZXRUaW1lb3V0KHBvbGxTZXJ2ZXJTZXNzaW9uUmVjdXIsIHRoaXMuaGVhcnRCZWF0SW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMub3V0c3RhbmRpbmdNZXNzYWdlcyA9IDA7XG5cbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVkSGVhcnRCZWF0ID0gc2V0VGltZW91dChwb2xsU2VydmVyU2Vzc2lvblJlY3VyLCB0aGlzLmhlYXJ0QmVhdEludGVydmFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgY2xlYXJTY2hlZHVsZWRIZWFydEJlYXQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNjaGVkdWxlZEhlYXJ0QmVhdCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVkSGVhcnRCZWF0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1lc3NhZ2VIYW5kbGVyKGU6IGFueSkge1xuICAgICAgICB0aGlzLm91dHN0YW5kaW5nTWVzc2FnZXMgPSAwO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnNlc3Npb25JZnJhbWUgJiZcbiAgICAgICAgICAgIGUub3JpZ2luID09PSB0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnN0c1NlcnZlciAmJlxuICAgICAgICAgICAgZS5zb3VyY2UgPT09IHRoaXMuc2Vzc2lvbklmcmFtZS5jb250ZW50V2luZG93XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGUuZGF0YSA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdlcnJvciBmcm9tIGNoZWNrc2Vzc2lvbiBtZXNzYWdlSGFuZGxlcicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmRhdGEgPT09ICdjaGFuZ2VkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tTZXNzaW9uQ2hhbmdlZC5uZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZyhlLmRhdGEgKyAnIGZyb20gY2hlY2tzZXNzaW9uIG1lc3NhZ2VIYW5kbGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=