/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of, Subject, throwError, timer } from 'rxjs';
import { catchError, filter, map, race, shareReplay, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { OidcDataService } from '../data-services/oidc-data.service';
import { AuthorizationResult } from '../models/authorization-result';
import { AuthorizationState } from '../models/authorization-state.enum';
import { ValidateStateResult } from '../models/validate-state-result.model';
import { ValidationResult } from '../models/validation-result.enum';
import { ConfigurationProvider } from './auth-configuration.provider';
import { StateValidationService } from './oidc-security-state-validation.service';
import { TokenHelperService } from './oidc-token-helper.service';
import { LoggerService } from './oidc.logger.service';
import { OidcSecurityCheckSession } from './oidc.security.check-session';
import { OidcSecurityCommon } from './oidc.security.common';
import { OidcSecuritySilentRenew } from './oidc.security.silent-renew';
import { OidcSecurityUserService } from './oidc.security.user-service';
import { OidcSecurityValidation } from './oidc.security.validation';
import { UriEncoder } from './uri-encoder';
import { UrlParserService } from './url-parser.service';
import { oneLineTrim } from 'common-tags';
// tslint:disable: variable-name
var OidcSecurityService = /** @class */ (function () {
    function OidcSecurityService(oidcDataService, stateValidationService, router, oidcSecurityCheckSession, oidcSecuritySilentRenew, oidcSecurityUserService, oidcSecurityCommon, oidcSecurityValidation, tokenHelperService, loggerService, zone, httpClient, configurationProvider, urlParserService) {
        var _this = this;
        this.oidcDataService = oidcDataService;
        this.stateValidationService = stateValidationService;
        this.router = router;
        this.oidcSecurityCheckSession = oidcSecurityCheckSession;
        this.oidcSecuritySilentRenew = oidcSecuritySilentRenew;
        this.oidcSecurityUserService = oidcSecurityUserService;
        this.oidcSecurityCommon = oidcSecurityCommon;
        this.oidcSecurityValidation = oidcSecurityValidation;
        this.tokenHelperService = tokenHelperService;
        this.loggerService = loggerService;
        this.zone = zone;
        this.httpClient = httpClient;
        this.configurationProvider = configurationProvider;
        this.urlParserService = urlParserService;
        this._onModuleSetup = new Subject();
        this._onCheckSessionChanged = new Subject();
        this._onAuthorizationResult = new Subject();
        this.checkSessionChanged = false;
        this.moduleSetup = false;
        this._isModuleSetup = new BehaviorSubject(false);
        this._isAuthorized = new BehaviorSubject(false);
        this._userData = new BehaviorSubject('');
        this.authWellKnownEndpointsLoaded = false;
        this.runTokenValidationRunning = false;
        this.onModuleSetup.pipe(take(1)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.moduleSetup = true;
            _this._isModuleSetup.next(true);
        }));
        this._isSetupAndAuthorized = this._isModuleSetup.pipe(filter((/**
         * @param {?} isModuleSetup
         * @return {?}
         */
        function (isModuleSetup) { return isModuleSetup; })), switchMap((/**
         * @return {?}
         */
        function () {
            if (!_this.configurationProvider.openIDConfiguration.silent_renew) {
                _this.loggerService.logDebug("IsAuthorizedRace: Silent Renew Not Active. Emitting.");
                return from([true]);
            }
            /** @type {?} */
            var race$ = _this._isAuthorized.asObservable().pipe(filter((/**
             * @param {?} isAuthorized
             * @return {?}
             */
            function (isAuthorized) { return isAuthorized; })), take(1), tap((/**
             * @return {?}
             */
            function () { return _this.loggerService.logDebug('IsAuthorizedRace: Existing token is still authorized.'); })), 
            // tslint:disable-next-line: deprecation
            race(_this._onAuthorizationResult.pipe(take(1), tap((/**
             * @return {?}
             */
            function () { return _this.loggerService.logDebug('IsAuthorizedRace: Silent Renew Refresh Session Complete'); })), map((/**
             * @return {?}
             */
            function () { return true; }))), timer(_this.configurationProvider.openIDConfiguration.isauthorizedrace_timeout_in_seconds * 1000).pipe(
            // backup, if nothing happens after X seconds stop waiting and emit (5s Default)
            tap((/**
             * @return {?}
             */
            function () {
                _this.resetAuthorizationData(false);
                _this.oidcSecurityCommon.authNonce = '';
                _this.loggerService.logWarning('IsAuthorizedRace: Timeout reached. Emitting.');
            })), map((/**
             * @return {?}
             */
            function () { return true; })))));
            _this.loggerService.logDebug('Silent Renew is active, check if token in storage is active');
            if (_this.oidcSecurityCommon.authNonce === '' || _this.oidcSecurityCommon.authNonce === undefined) {
                // login not running, or a second silent renew, user must login first before this will work.
                _this.loggerService.logDebug('Silent Renew or login not running, try to refresh the session');
                _this.refreshSession().subscribe();
            }
            return race$;
        })), tap((/**
         * @return {?}
         */
        function () { return _this.loggerService.logDebug('IsAuthorizedRace: Completed'); })), switchMapTo(this._isAuthorized.asObservable()), tap((/**
         * @param {?} isAuthorized
         * @return {?}
         */
        function (isAuthorized) { return _this.loggerService.logDebug("getIsAuthorized: " + isAuthorized); })), shareReplay(1));
        this._isSetupAndAuthorized
            .pipe(filter((/**
         * @return {?}
         */
        function () { return _this.configurationProvider.openIDConfiguration.start_checksession; })))
            .subscribe((/**
         * @param {?} isSetupAndAuthorized
         * @return {?}
         */
        function (isSetupAndAuthorized) {
            if (isSetupAndAuthorized) {
                _this.oidcSecurityCheckSession.startCheckingSession(_this.configurationProvider.openIDConfiguration.client_id);
            }
            else {
                _this.oidcSecurityCheckSession.stopCheckingSession();
            }
        }));
    }
    Object.defineProperty(OidcSecurityService.prototype, "onModuleSetup", {
        get: /**
         * @return {?}
         */
        function () {
            return this._onModuleSetup.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityService.prototype, "onAuthorizationResult", {
        get: /**
         * @return {?}
         */
        function () {
            return this._onAuthorizationResult.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityService.prototype, "onCheckSessionChanged", {
        get: /**
         * @return {?}
         */
        function () {
            return this._onCheckSessionChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OidcSecurityService.prototype, "onConfigurationChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this.configurationProvider.onConfigurationChange;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} openIdConfiguration
     * @param {?} authWellKnownEndpoints
     * @return {?}
     */
    OidcSecurityService.prototype.setupModule = /**
     * @param {?} openIdConfiguration
     * @param {?} authWellKnownEndpoints
     * @return {?}
     */
    function (openIdConfiguration, authWellKnownEndpoints) {
        var _this = this;
        this.configurationProvider.setup(openIdConfiguration, authWellKnownEndpoints);
        this.oidcSecurityCheckSession.onCheckSessionChanged.subscribe((/**
         * @return {?}
         */
        function () {
            _this.loggerService.logDebug('onCheckSessionChanged');
            _this.checkSessionChanged = true;
            _this._onCheckSessionChanged.next(_this.checkSessionChanged);
        }));
        /** @type {?} */
        var userData = this.oidcSecurityCommon.userData;
        if (userData) {
            this.setUserData(userData);
        }
        /** @type {?} */
        var isAuthorized = this.oidcSecurityCommon.isAuthorized;
        if (isAuthorized) {
            this.loggerService.logDebug('IsAuthorized setup module');
            this.loggerService.logDebug(this.oidcSecurityCommon.idToken);
            if (this.oidcSecurityValidation.isTokenExpired(this.oidcSecurityCommon.idToken || this.oidcSecurityCommon.accessToken, this.configurationProvider.openIDConfiguration.silent_renew_offset_in_seconds)) {
                this.loggerService.logDebug('IsAuthorized setup module; id_token isTokenExpired');
            }
            else {
                this.loggerService.logDebug('IsAuthorized setup module; id_token is valid');
                this.setIsAuthorized(isAuthorized);
            }
            this.runTokenValidation();
        }
        this.loggerService.logDebug('STS server: ' + this.configurationProvider.openIDConfiguration.stsServer);
        this._onModuleSetup.next();
        if (this.configurationProvider.openIDConfiguration.silent_renew) {
            this.oidcSecuritySilentRenew.initRenew();
            // Support authorization via DOM events.
            // Deregister if OidcSecurityService.setupModule is called again by any instance.
            //      We only ever want the latest setup service to be reacting to this event.
            this.boundSilentRenewEvent = this.silentRenewEventHandler.bind(this);
            /** @type {?} */
            var instanceId_1 = Math.random();
            /** @type {?} */
            var boundSilentRenewInitEvent_1 = ((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (e.detail !== instanceId_1) {
                    window.removeEventListener('oidc-silent-renew-message', _this.boundSilentRenewEvent);
                    window.removeEventListener('oidc-silent-renew-init', boundSilentRenewInitEvent_1);
                }
            })).bind(this);
            window.addEventListener('oidc-silent-renew-init', boundSilentRenewInitEvent_1, false);
            window.addEventListener('oidc-silent-renew-message', this.boundSilentRenewEvent, false);
            window.dispatchEvent(new CustomEvent('oidc-silent-renew-init', {
                detail: instanceId_1,
            }));
        }
    };
    /**
     * @template T
     * @return {?}
     */
    OidcSecurityService.prototype.getUserData = /**
     * @template T
     * @return {?}
     */
    function () {
        return this._userData.asObservable();
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getIsModuleSetup = /**
     * @return {?}
     */
    function () {
        return this._isModuleSetup.asObservable();
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getIsAuthorized = /**
     * @return {?}
     */
    function () {
        return this._isSetupAndAuthorized;
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getToken = /**
     * @return {?}
     */
    function () {
        if (!this._isAuthorized.getValue()) {
            return '';
        }
        /** @type {?} */
        var token = this.oidcSecurityCommon.getAccessToken();
        return decodeURIComponent(token);
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getIdToken = /**
     * @return {?}
     */
    function () {
        if (!this._isAuthorized.getValue()) {
            return '';
        }
        /** @type {?} */
        var token = this.oidcSecurityCommon.getIdToken();
        return decodeURIComponent(token);
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getRefreshToken = /**
     * @return {?}
     */
    function () {
        if (!this._isAuthorized.getValue()) {
            return '';
        }
        /** @type {?} */
        var token = this.oidcSecurityCommon.getRefreshToken();
        return decodeURIComponent(token);
    };
    /**
     * @param {?=} encode
     * @return {?}
     */
    OidcSecurityService.prototype.getPayloadFromIdToken = /**
     * @param {?=} encode
     * @return {?}
     */
    function (encode) {
        if (encode === void 0) { encode = false; }
        /** @type {?} */
        var token = this.getIdToken();
        return this.tokenHelperService.getPayloadFromToken(token, encode);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    OidcSecurityService.prototype.setState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this.oidcSecurityCommon.authStateControl = state;
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getState = /**
     * @return {?}
     */
    function () {
        return this.oidcSecurityCommon.authStateControl;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    OidcSecurityService.prototype.setCustomRequestParameters = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        this.oidcSecurityCommon.customRequestParams = params;
    };
    // Code Flow with PCKE or Implicit Flow
    // Code Flow with PCKE or Implicit Flow
    /**
     * @param {?=} urlHandler
     * @return {?}
     */
    OidcSecurityService.prototype.authorize = 
    // Code Flow with PCKE or Implicit Flow
    /**
     * @param {?=} urlHandler
     * @return {?}
     */
    function (urlHandler) {
        if (this.configurationProvider.wellKnownEndpoints) {
            this.authWellKnownEndpointsLoaded = true;
        }
        if (!this.authWellKnownEndpointsLoaded) {
            this.loggerService.logError('Well known endpoints must be loaded before user can login!');
            return;
        }
        if (!this.oidcSecurityValidation.config_validate_response_type(this.configurationProvider.openIDConfiguration.response_type)) {
            // invalid response_type
            return;
        }
        this.resetAuthorizationData(false);
        this.loggerService.logDebug('BEGIN Authorize Code Flow, no auth data');
        /** @type {?} */
        var state = this.oidcSecurityCommon.authStateControl;
        if (!state) {
            state = Date.now() + '' + Math.random() + Math.random();
            this.oidcSecurityCommon.authStateControl = state;
        }
        /** @type {?} */
        var nonce = 'N' + Math.random() + '' + Date.now();
        this.oidcSecurityCommon.authNonce = nonce;
        this.loggerService.logDebug('AuthorizedController created. local state: ' + this.oidcSecurityCommon.authStateControl);
        /** @type {?} */
        var url = '';
        // Code Flow
        if (this.configurationProvider.openIDConfiguration.response_type === 'code') {
            // code_challenge with "S256"
            /** @type {?} */
            var code_verifier = 'C' + Math.random() + '' + Date.now() + '' + Date.now() + Math.random();
            /** @type {?} */
            var code_challenge = this.oidcSecurityValidation.generate_code_verifier(code_verifier);
            this.oidcSecurityCommon.code_verifier = code_verifier;
            if (this.configurationProvider.wellKnownEndpoints) {
                url = this.createAuthorizeUrl(true, code_challenge, this.configurationProvider.openIDConfiguration.redirect_url, nonce, state, this.configurationProvider.wellKnownEndpoints.authorization_endpoint || '');
            }
            else {
                this.loggerService.logError('authWellKnownEndpoints is undefined');
            }
        }
        else {
            // Implicit Flow
            if (this.configurationProvider.wellKnownEndpoints) {
                url = this.createAuthorizeUrl(false, '', this.configurationProvider.openIDConfiguration.redirect_url, nonce, state, this.configurationProvider.wellKnownEndpoints.authorization_endpoint || '');
            }
            else {
                this.loggerService.logError('authWellKnownEndpoints is undefined');
            }
        }
        if (urlHandler) {
            urlHandler(url);
        }
        else {
            this.redirectTo(url);
        }
    };
    // Code Flow
    // Code Flow
    /**
     * @param {?} urlToCheck
     * @return {?}
     */
    OidcSecurityService.prototype.authorizedCallbackWithCode = 
    // Code Flow
    /**
     * @param {?} urlToCheck
     * @return {?}
     */
    function (urlToCheck) {
        this.authorizedCallbackWithCode$(urlToCheck).subscribe();
    };
    /**
     * @param {?} urlToCheck
     * @return {?}
     */
    OidcSecurityService.prototype.authorizedCallbackWithCode$ = /**
     * @param {?} urlToCheck
     * @return {?}
     */
    function (urlToCheck) {
        /** @type {?} */
        var code = this.urlParserService.getUrlParameter(urlToCheck, 'code');
        /** @type {?} */
        var state = this.urlParserService.getUrlParameter(urlToCheck, 'state');
        /** @type {?} */
        var sessionState = this.urlParserService.getUrlParameter(urlToCheck, 'session_state') || null;
        if (!state) {
            this.loggerService.logDebug('no state in url');
            return of();
        }
        if (!code) {
            this.loggerService.logDebug('no code in url');
            return of();
        }
        this.loggerService.logDebug('running validation for callback' + urlToCheck);
        return this.requestTokensWithCode$(code, state, sessionState);
    };
    // Code Flow
    // Code Flow
    /**
     * @param {?} code
     * @param {?} state
     * @param {?} sessionState
     * @return {?}
     */
    OidcSecurityService.prototype.requestTokensWithCode = 
    // Code Flow
    /**
     * @param {?} code
     * @param {?} state
     * @param {?} sessionState
     * @return {?}
     */
    function (code, state, sessionState) {
        this.requestTokensWithCode$(code, state, sessionState).subscribe();
    };
    /**
     * @param {?} code
     * @param {?} state
     * @param {?} sessionState
     * @return {?}
     */
    OidcSecurityService.prototype.requestTokensWithCode$ = /**
     * @param {?} code
     * @param {?} state
     * @param {?} sessionState
     * @return {?}
     */
    function (code, state, sessionState) {
        var _this = this;
        return this._isModuleSetup.pipe(filter((/**
         * @param {?} isModuleSetup
         * @return {?}
         */
        function (isModuleSetup) { return !!isModuleSetup; })), take(1), switchMap((/**
         * @return {?}
         */
        function () {
            return _this.requestTokensWithCodeProcedure$(code, state, sessionState);
        })));
    };
    // Refresh Token
    // Refresh Token
    /**
     * @param {?} code
     * @param {?} state
     * @return {?}
     */
    OidcSecurityService.prototype.refreshTokensWithCodeProcedure = 
    // Refresh Token
    /**
     * @param {?} code
     * @param {?} state
     * @return {?}
     */
    function (code, state) {
        var _this = this;
        /** @type {?} */
        var tokenRequestUrl = '';
        if (this.configurationProvider.wellKnownEndpoints && this.configurationProvider.wellKnownEndpoints.token_endpoint) {
            tokenRequestUrl = "" + this.configurationProvider.wellKnownEndpoints.token_endpoint;
        }
        /** @type {?} */
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
        /** @type {?} */
        var data = "grant_type=refresh_token&client_id=" + this.configurationProvider.openIDConfiguration.client_id + "&refresh_token=" + code;
        return this.httpClient.post(tokenRequestUrl, data, { headers: headers }).pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            _this.loggerService.logDebug('token refresh response: ' + JSON.stringify(response));
            /** @type {?} */
            var obj = new Object();
            obj = response;
            obj.state = state;
            _this.authorizedCodeFlowCallbackProcedure(obj);
        })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.loggerService.logDebug('token refresh failure response: ' + JSON.stringify(error));
            /** @type {?} */
            var obj = new Object();
            obj = error;
            obj.state = state;
            _this.authorizedCodeFlowCallbackProcedure(obj);
            return of(false);
        })));
    };
    /**
     * @param {?} code
     * @param {?} state
     * @param {?} session_state
     * @return {?}
     */
    OidcSecurityService.prototype.requestTokensWithCodeProcedure = /**
     * @param {?} code
     * @param {?} state
     * @param {?} session_state
     * @return {?}
     */
    function (code, state, session_state) {
        this.requestTokensWithCodeProcedure$(code, state, session_state).subscribe();
    };
    // Code Flow with PCKE
    // Code Flow with PCKE
    /**
     * @param {?} code
     * @param {?} state
     * @param {?} session_state
     * @return {?}
     */
    OidcSecurityService.prototype.requestTokensWithCodeProcedure$ = 
    // Code Flow with PCKE
    /**
     * @param {?} code
     * @param {?} state
     * @param {?} session_state
     * @return {?}
     */
    function (code, state, session_state) {
        var _this = this;
        /** @type {?} */
        var tokenRequestUrl = '';
        if (this.configurationProvider.wellKnownEndpoints && this.configurationProvider.wellKnownEndpoints.token_endpoint) {
            tokenRequestUrl = "" + this.configurationProvider.wellKnownEndpoints.token_endpoint;
        }
        if (!this.oidcSecurityValidation.validateStateFromHashCallback(state, this.oidcSecurityCommon.authStateControl)) {
            this.loggerService.logWarning('authorizedCallback incorrect state');
            // ValidationResult.StatesDoNotMatch;
            return throwError(new Error('incorrect state'));
        }
        /** @type {?} */
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
        /** @type {?} */
        var data = oneLineTrim(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["grant_type=authorization_code&client_id=", "\n            &code_verifier=", "\n            &code=", "&redirect_uri=", ""], ["grant_type=authorization_code&client_id=", "\n            &code_verifier=", "\n            &code=", "&redirect_uri=", ""])), this.configurationProvider.openIDConfiguration.client_id, this.oidcSecurityCommon.code_verifier, code, this.configurationProvider.openIDConfiguration.redirect_url);
        if (this.oidcSecurityCommon.silentRenewRunning === 'running') {
            data = oneLineTrim(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["grant_type=authorization_code&client_id=", "\n                &code_verifier=", "\n                &code=", "\n                &redirect_uri=", ""], ["grant_type=authorization_code&client_id=", "\n                &code_verifier=", "\n                &code=", "\n                &redirect_uri=", ""])), this.configurationProvider.openIDConfiguration.client_id, this.oidcSecurityCommon.code_verifier, code, this.configurationProvider.openIDConfiguration.silent_renew_url);
        }
        return this.httpClient.post(tokenRequestUrl, data, { headers: headers }).pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            /** @type {?} */
            var obj = new Object();
            obj = response;
            obj.state = state;
            obj.session_state = session_state;
            _this.authorizedCodeFlowCallbackProcedure(obj);
            return undefined;
        })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.loggerService.logError(error);
            _this.loggerService.logError("OidcService code request " + _this.configurationProvider.openIDConfiguration.stsServer);
            return throwError(error);
        })));
    };
    // Code Flow
    // Code Flow
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    OidcSecurityService.prototype.authorizedCodeFlowCallbackProcedure = 
    // Code Flow
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    function (result) {
        /** @type {?} */
        var silentRenew = this.oidcSecurityCommon.silentRenewRunning;
        /** @type {?} */
        var isRenewProcess = silentRenew === 'running';
        this.loggerService.logDebug('BEGIN authorized Code Flow Callback, no auth data');
        this.resetAuthorizationData(isRenewProcess);
        this.authorizedCallbackProcedure(result, isRenewProcess);
    };
    // Implicit Flow
    // Implicit Flow
    /**
     * @private
     * @param {?=} hash
     * @return {?}
     */
    OidcSecurityService.prototype.authorizedImplicitFlowCallbackProcedure = 
    // Implicit Flow
    /**
     * @private
     * @param {?=} hash
     * @return {?}
     */
    function (hash) {
        /** @type {?} */
        var silentRenew = this.oidcSecurityCommon.silentRenewRunning;
        /** @type {?} */
        var isRenewProcess = silentRenew === 'running';
        this.loggerService.logDebug('BEGIN authorizedCallback, no auth data');
        this.resetAuthorizationData(isRenewProcess);
        hash = hash || window.location.hash.substr(1);
        /** @type {?} */
        var result = hash.split('&').reduce((/**
         * @param {?} resultData
         * @param {?} item
         * @return {?}
         */
        function (resultData, item) {
            /** @type {?} */
            var parts = item.split('=');
            resultData[(/** @type {?} */ (parts.shift()))] = parts.join('=');
            return resultData;
        }), {});
        this.authorizedCallbackProcedure(result, isRenewProcess);
    };
    // Implicit Flow
    // Implicit Flow
    /**
     * @param {?=} hash
     * @return {?}
     */
    OidcSecurityService.prototype.authorizedImplicitFlowCallback = 
    // Implicit Flow
    /**
     * @param {?=} hash
     * @return {?}
     */
    function (hash) {
        var _this = this;
        this._isModuleSetup
            .pipe(filter((/**
         * @param {?} isModuleSetup
         * @return {?}
         */
        function (isModuleSetup) { return isModuleSetup; })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.authorizedImplicitFlowCallbackProcedure(hash);
        }));
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    OidcSecurityService.prototype.redirectTo = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        window.location.href = url;
    };
    // Implicit Flow
    // Implicit Flow
    /**
     * @private
     * @param {?} result
     * @param {?} isRenewProcess
     * @return {?}
     */
    OidcSecurityService.prototype.authorizedCallbackProcedure = 
    // Implicit Flow
    /**
     * @private
     * @param {?} result
     * @param {?} isRenewProcess
     * @return {?}
     */
    function (result, isRenewProcess) {
        var _this = this;
        this.oidcSecurityCommon.authResult = result;
        if (!this.configurationProvider.openIDConfiguration.history_cleanup_off && !isRenewProcess) {
            // reset the history to remove the tokens
            window.history.replaceState({}, window.document.title, window.location.origin + window.location.pathname);
        }
        else {
            this.loggerService.logDebug('history clean up inactive');
        }
        if (result.error) {
            if (isRenewProcess) {
                this.loggerService.logDebug(result);
            }
            else {
                this.loggerService.logWarning(result);
            }
            if (((/** @type {?} */ (result.error))) === 'login_required') {
                this._onAuthorizationResult.next(new AuthorizationResult(AuthorizationState.unauthorized, ValidationResult.LoginRequired, isRenewProcess));
            }
            else {
                this._onAuthorizationResult.next(new AuthorizationResult(AuthorizationState.unauthorized, ValidationResult.SecureTokenServerError, isRenewProcess));
            }
            this.resetAuthorizationData(false);
            this.oidcSecurityCommon.authNonce = '';
            if (!this.configurationProvider.openIDConfiguration.trigger_authorization_result_event && !isRenewProcess) {
                this.router.navigate([this.configurationProvider.openIDConfiguration.unauthorized_route]);
            }
        }
        else {
            this.loggerService.logDebug(result);
            this.loggerService.logDebug('authorizedCallback created, begin token validation');
            this.getSigningKeys().subscribe((/**
             * @param {?} jwtKeys
             * @return {?}
             */
            function (jwtKeys) {
                /** @type {?} */
                var validationResult = _this.getValidatedStateResult(result, jwtKeys);
                if (validationResult.authResponseIsValid) {
                    _this.setAuthorizationData(validationResult.access_token, validationResult.id_token);
                    _this.oidcSecurityCommon.silentRenewRunning = '';
                    if (_this.configurationProvider.openIDConfiguration.auto_userinfo) {
                        _this.getUserinfo(isRenewProcess, result, validationResult.id_token, validationResult.decoded_id_token).subscribe((/**
                         * @param {?} response
                         * @return {?}
                         */
                        function (response) {
                            if (response) {
                                _this._onAuthorizationResult.next(new AuthorizationResult(AuthorizationState.authorized, validationResult.state, isRenewProcess));
                                if (!_this.configurationProvider.openIDConfiguration.trigger_authorization_result_event && !isRenewProcess) {
                                    _this.router.navigate([_this.configurationProvider.openIDConfiguration.post_login_route]);
                                }
                            }
                            else {
                                _this._onAuthorizationResult.next(new AuthorizationResult(AuthorizationState.unauthorized, validationResult.state, isRenewProcess));
                                if (!_this.configurationProvider.openIDConfiguration.trigger_authorization_result_event && !isRenewProcess) {
                                    _this.router.navigate([_this.configurationProvider.openIDConfiguration.unauthorized_route]);
                                }
                            }
                        }), (/**
                         * @param {?} err
                         * @return {?}
                         */
                        function (err) {
                            /* Something went wrong while getting signing key */
                            _this.loggerService.logWarning('Failed to retreive user info with error: ' + JSON.stringify(err));
                        }));
                    }
                    else {
                        if (!isRenewProcess) {
                            // userData is set to the id_token decoded, auto get user data set to false
                            _this.oidcSecurityUserService.setUserData(validationResult.decoded_id_token);
                            _this.setUserData(_this.oidcSecurityUserService.getUserData());
                        }
                        _this.runTokenValidation();
                        _this._onAuthorizationResult.next(new AuthorizationResult(AuthorizationState.authorized, validationResult.state, isRenewProcess));
                        if (!_this.configurationProvider.openIDConfiguration.trigger_authorization_result_event && !isRenewProcess) {
                            _this.router.navigate([_this.configurationProvider.openIDConfiguration.post_login_route]);
                        }
                    }
                }
                else {
                    // something went wrong
                    _this.loggerService.logWarning('authorizedCallback, token(s) validation failed, resetting');
                    _this.loggerService.logWarning(window.location.hash);
                    _this.resetAuthorizationData(false);
                    _this.oidcSecurityCommon.silentRenewRunning = '';
                    _this._onAuthorizationResult.next(new AuthorizationResult(AuthorizationState.unauthorized, validationResult.state, isRenewProcess));
                    if (!_this.configurationProvider.openIDConfiguration.trigger_authorization_result_event && !isRenewProcess) {
                        _this.router.navigate([_this.configurationProvider.openIDConfiguration.unauthorized_route]);
                    }
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                /* Something went wrong while getting signing key */
                _this.loggerService.logWarning('Failed to retreive siging key with error: ' + JSON.stringify(err));
                _this.oidcSecurityCommon.silentRenewRunning = '';
            }));
        }
    };
    /**
     * @param {?=} isRenewProcess
     * @param {?=} result
     * @param {?=} id_token
     * @param {?=} decoded_id_token
     * @return {?}
     */
    OidcSecurityService.prototype.getUserinfo = /**
     * @param {?=} isRenewProcess
     * @param {?=} result
     * @param {?=} id_token
     * @param {?=} decoded_id_token
     * @return {?}
     */
    function (isRenewProcess, result, id_token, decoded_id_token) {
        var _this = this;
        if (isRenewProcess === void 0) { isRenewProcess = false; }
        result = result ? result : this.oidcSecurityCommon.authResult;
        id_token = id_token ? id_token : this.oidcSecurityCommon.idToken;
        decoded_id_token = decoded_id_token ? decoded_id_token : this.tokenHelperService.getPayloadFromToken(id_token, false);
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            // flow id_token token
            if (_this.configurationProvider.openIDConfiguration.response_type === 'id_token token' ||
                _this.configurationProvider.openIDConfiguration.response_type === 'code') {
                if (isRenewProcess && _this._userData.value) {
                    _this.oidcSecurityCommon.sessionState = result.session_state;
                    observer.next(true);
                    observer.complete();
                }
                else {
                    _this.oidcSecurityUserService.initUserData().subscribe((/**
                     * @return {?}
                     */
                    function () {
                        _this.loggerService.logDebug('authorizedCallback (id_token token || code) flow');
                        /** @type {?} */
                        var userData = _this.oidcSecurityUserService.getUserData();
                        if (_this.oidcSecurityValidation.validate_userdata_sub_id_token(decoded_id_token.sub, userData.sub)) {
                            _this.setUserData(userData);
                            _this.loggerService.logDebug(_this.oidcSecurityCommon.accessToken);
                            _this.loggerService.logDebug(_this.oidcSecurityUserService.getUserData());
                            _this.oidcSecurityCommon.sessionState = result.session_state;
                            _this.runTokenValidation();
                            observer.next(true);
                        }
                        else {
                            // something went wrong, userdata sub does not match that from id_token
                            _this.loggerService.logWarning('authorizedCallback, User data sub does not match sub in id_token');
                            _this.loggerService.logDebug('authorizedCallback, token(s) validation failed, resetting');
                            _this.resetAuthorizationData(false);
                            observer.next(false);
                        }
                        observer.complete();
                    }));
                }
            }
            else {
                // flow id_token
                _this.loggerService.logDebug('authorizedCallback id_token flow');
                _this.loggerService.logDebug(_this.oidcSecurityCommon.accessToken);
                // userData is set to the id_token decoded. No access_token.
                _this.oidcSecurityUserService.setUserData(decoded_id_token);
                _this.setUserData(_this.oidcSecurityUserService.getUserData());
                _this.oidcSecurityCommon.sessionState = result.session_state;
                _this.runTokenValidation();
                observer.next(true);
                observer.complete();
            }
        }));
    };
    /**
     * @param {?=} urlHandler
     * @return {?}
     */
    OidcSecurityService.prototype.logoff = /**
     * @param {?=} urlHandler
     * @return {?}
     */
    function (urlHandler) {
        // /connect/endsession?id_token_hint=...&post_logout_redirect_uri=https://myapp.com
        this.loggerService.logDebug('BEGIN Authorize, no auth data');
        if (this.configurationProvider.wellKnownEndpoints) {
            if (this.configurationProvider.wellKnownEndpoints.end_session_endpoint) {
                /** @type {?} */
                var end_session_endpoint = this.configurationProvider.wellKnownEndpoints.end_session_endpoint;
                /** @type {?} */
                var id_token_hint = this.oidcSecurityCommon.idToken;
                /** @type {?} */
                var url = this.createEndSessionUrl(end_session_endpoint, id_token_hint);
                this.resetAuthorizationData(false);
                if (this.configurationProvider.openIDConfiguration.start_checksession && this.checkSessionChanged) {
                    this.loggerService.logDebug('only local login cleaned up, server session has changed');
                }
                else if (urlHandler) {
                    urlHandler(url);
                }
                else {
                    this.redirectTo(url);
                }
            }
            else {
                this.resetAuthorizationData(false);
                this.loggerService.logDebug('only local login cleaned up, no end_session_endpoint');
            }
        }
        else {
            this.loggerService.logWarning('authWellKnownEndpoints is undefined');
        }
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.refreshSession = /**
     * @return {?}
     */
    function () {
        if (!this.configurationProvider.openIDConfiguration.silent_renew) {
            return of(false);
        }
        this.loggerService.logDebug('BEGIN refresh session Authorize');
        this.oidcSecurityCommon.silentRenewRunning = 'running';
        /** @type {?} */
        var state = this.oidcSecurityCommon.authStateControl;
        if (state === '' || state === null) {
            state = Date.now() + '' + Math.random() + Math.random();
            this.oidcSecurityCommon.authStateControl = state;
        }
        /** @type {?} */
        var nonce = 'N' + Math.random() + '' + Date.now();
        this.oidcSecurityCommon.authNonce = nonce;
        this.loggerService.logDebug('RefreshSession created. adding myautostate: ' + this.oidcSecurityCommon.authStateControl);
        /** @type {?} */
        var url = '';
        // Code Flow
        if (this.configurationProvider.openIDConfiguration.response_type === 'code') {
            if (this.configurationProvider.openIDConfiguration.use_refresh_token) {
                // try using refresh token
                /** @type {?} */
                var refresh_token = this.oidcSecurityCommon.getRefreshToken();
                if (refresh_token) {
                    this.loggerService.logDebug('found refresh code, obtaining new credentials with refresh code');
                    // Nonce is not used with refresh tokens; but Keycloak may send it anyway
                    this.oidcSecurityCommon.authNonce = OidcSecurityValidation.RefreshTokenNoncePlaceholder;
                    return this.refreshTokensWithCodeProcedure(refresh_token, state);
                }
                else {
                    this.loggerService.logDebug('no refresh token found, using silent renew');
                }
            }
            // code_challenge with "S256"
            /** @type {?} */
            var code_verifier = 'C' + Math.random() + '' + Date.now() + '' + Date.now() + Math.random();
            /** @type {?} */
            var code_challenge = this.oidcSecurityValidation.generate_code_verifier(code_verifier);
            this.oidcSecurityCommon.code_verifier = code_verifier;
            if (this.configurationProvider.wellKnownEndpoints) {
                url = this.createAuthorizeUrl(true, code_challenge, this.configurationProvider.openIDConfiguration.silent_renew_url, nonce, state, this.configurationProvider.wellKnownEndpoints.authorization_endpoint || '', 'none');
            }
            else {
                this.loggerService.logWarning('authWellKnownEndpoints is undefined');
            }
        }
        else {
            if (this.configurationProvider.wellKnownEndpoints) {
                url = this.createAuthorizeUrl(false, '', this.configurationProvider.openIDConfiguration.silent_renew_url, nonce, state, this.configurationProvider.wellKnownEndpoints.authorization_endpoint || '', 'none');
            }
            else {
                this.loggerService.logWarning('authWellKnownEndpoints is undefined');
            }
        }
        return this.oidcSecuritySilentRenew.startRenew(url).pipe(map((/**
         * @return {?}
         */
        function () { return true; })));
    };
    /**
     * @param {?} error
     * @return {?}
     */
    OidcSecurityService.prototype.handleError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        /** @type {?} */
        var silentRenew = this.oidcSecurityCommon.silentRenewRunning;
        /** @type {?} */
        var isRenewProcess = silentRenew === 'running';
        this.loggerService.logError(error);
        if (error.status === 403 || error.status === '403') {
            if (this.configurationProvider.openIDConfiguration.trigger_authorization_result_event) {
                this._onAuthorizationResult.next(new AuthorizationResult(AuthorizationState.unauthorized, ValidationResult.NotSet, isRenewProcess));
            }
            else {
                this.router.navigate([this.configurationProvider.openIDConfiguration.forbidden_route]);
            }
        }
        else if (error.status === 401 || error.status === '401') {
            /** @type {?} */
            var silentRenewRunning = this.oidcSecurityCommon.silentRenewRunning;
            this.resetAuthorizationData(!!silentRenewRunning);
            if (this.configurationProvider.openIDConfiguration.trigger_authorization_result_event) {
                this._onAuthorizationResult.next(new AuthorizationResult(AuthorizationState.unauthorized, ValidationResult.NotSet, isRenewProcess));
            }
            else {
                this.router.navigate([this.configurationProvider.openIDConfiguration.unauthorized_route]);
            }
        }
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.startCheckingSilentRenew = /**
     * @return {?}
     */
    function () {
        this.runTokenValidation();
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.stopCheckingSilentRenew = /**
     * @return {?}
     */
    function () {
        if (this._scheduledHeartBeat) {
            clearTimeout(this._scheduledHeartBeat);
            this._scheduledHeartBeat = null;
            this.runTokenValidationRunning = false;
        }
    };
    /**
     * @param {?} isRenewProcess
     * @return {?}
     */
    OidcSecurityService.prototype.resetAuthorizationData = /**
     * @param {?} isRenewProcess
     * @return {?}
     */
    function (isRenewProcess) {
        if (!isRenewProcess) {
            if (this.configurationProvider.openIDConfiguration.auto_userinfo) {
                // Clear user data. Fixes #97.
                this.setUserData('');
            }
            this.oidcSecurityCommon.resetStorageData(isRenewProcess);
            this.checkSessionChanged = false;
            this.setIsAuthorized(false);
        }
    };
    /**
     * @return {?}
     */
    OidcSecurityService.prototype.getEndSessionUrl = /**
     * @return {?}
     */
    function () {
        if (this.configurationProvider.wellKnownEndpoints) {
            if (this.configurationProvider.wellKnownEndpoints.end_session_endpoint) {
                /** @type {?} */
                var end_session_endpoint = this.configurationProvider.wellKnownEndpoints.end_session_endpoint;
                /** @type {?} */
                var id_token_hint = this.oidcSecurityCommon.idToken;
                return this.createEndSessionUrl(end_session_endpoint, id_token_hint);
            }
        }
    };
    /**
     * @private
     * @param {?} result
     * @param {?} jwtKeys
     * @return {?}
     */
    OidcSecurityService.prototype.getValidatedStateResult = /**
     * @private
     * @param {?} result
     * @param {?} jwtKeys
     * @return {?}
     */
    function (result, jwtKeys) {
        if (result.error) {
            return new ValidateStateResult('', '', false, {});
        }
        return this.stateValidationService.validateState(result, jwtKeys);
    };
    /**
     * @private
     * @param {?} userData
     * @return {?}
     */
    OidcSecurityService.prototype.setUserData = /**
     * @private
     * @param {?} userData
     * @return {?}
     */
    function (userData) {
        this.oidcSecurityCommon.userData = userData;
        this._userData.next(userData);
    };
    /**
     * @private
     * @param {?} isAuthorized
     * @return {?}
     */
    OidcSecurityService.prototype.setIsAuthorized = /**
     * @private
     * @param {?} isAuthorized
     * @return {?}
     */
    function (isAuthorized) {
        this._isAuthorized.next(isAuthorized);
    };
    /**
     * @private
     * @param {?} access_token
     * @param {?} id_token
     * @return {?}
     */
    OidcSecurityService.prototype.setAuthorizationData = /**
     * @private
     * @param {?} access_token
     * @param {?} id_token
     * @return {?}
     */
    function (access_token, id_token) {
        if (this.oidcSecurityCommon.accessToken !== '') {
            this.oidcSecurityCommon.accessToken = '';
        }
        this.loggerService.logDebug(access_token);
        this.loggerService.logDebug(id_token);
        this.loggerService.logDebug('storing to storage, getting the roles');
        this.oidcSecurityCommon.accessToken = access_token;
        this.oidcSecurityCommon.idToken = id_token;
        this.setIsAuthorized(true);
        this.oidcSecurityCommon.isAuthorized = true;
    };
    /**
     * @private
     * @param {?} isCodeFlow
     * @param {?} code_challenge
     * @param {?} redirect_url
     * @param {?} nonce
     * @param {?} state
     * @param {?} authorization_endpoint
     * @param {?=} prompt
     * @return {?}
     */
    OidcSecurityService.prototype.createAuthorizeUrl = /**
     * @private
     * @param {?} isCodeFlow
     * @param {?} code_challenge
     * @param {?} redirect_url
     * @param {?} nonce
     * @param {?} state
     * @param {?} authorization_endpoint
     * @param {?=} prompt
     * @return {?}
     */
    function (isCodeFlow, code_challenge, redirect_url, nonce, state, authorization_endpoint, prompt) {
        /** @type {?} */
        var urlParts = authorization_endpoint.split('?');
        /** @type {?} */
        var authorizationUrl = urlParts[0];
        /** @type {?} */
        var params = new HttpParams({
            fromString: urlParts[1],
            encoder: new UriEncoder(),
        });
        params = params.set('client_id', this.configurationProvider.openIDConfiguration.client_id);
        params = params.append('redirect_uri', redirect_url);
        params = params.append('response_type', this.configurationProvider.openIDConfiguration.response_type);
        params = params.append('scope', this.configurationProvider.openIDConfiguration.scope);
        params = params.append('nonce', nonce);
        params = params.append('state', state);
        if (isCodeFlow) {
            params = params.append('code_challenge', code_challenge);
            params = params.append('code_challenge_method', 'S256');
        }
        if (prompt) {
            params = params.append('prompt', prompt);
        }
        if (this.configurationProvider.openIDConfiguration.hd_param) {
            params = params.append('hd', this.configurationProvider.openIDConfiguration.hd_param);
        }
        /** @type {?} */
        var customParams = Object.assign({}, this.oidcSecurityCommon.customRequestParams);
        Object.keys(customParams).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            params = params.append(key, customParams[key].toString());
        }));
        return authorizationUrl + "?" + params;
    };
    /**
     * @private
     * @param {?} end_session_endpoint
     * @param {?} id_token_hint
     * @return {?}
     */
    OidcSecurityService.prototype.createEndSessionUrl = /**
     * @private
     * @param {?} end_session_endpoint
     * @param {?} id_token_hint
     * @return {?}
     */
    function (end_session_endpoint, id_token_hint) {
        /** @type {?} */
        var urlParts = end_session_endpoint.split('?');
        /** @type {?} */
        var authorizationEndsessionUrl = urlParts[0];
        /** @type {?} */
        var params = new HttpParams({
            fromString: urlParts[1],
            encoder: new UriEncoder(),
        });
        params = params.set('id_token_hint', id_token_hint);
        params = params.append('post_logout_redirect_uri', this.configurationProvider.openIDConfiguration.post_logout_redirect_uri);
        return authorizationEndsessionUrl + "?" + params;
    };
    /**
     * @private
     * @return {?}
     */
    OidcSecurityService.prototype.getSigningKeys = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.configurationProvider.wellKnownEndpoints) {
            this.loggerService.logDebug('jwks_uri: ' + this.configurationProvider.wellKnownEndpoints.jwks_uri);
            return this.oidcDataService
                .get(this.configurationProvider.wellKnownEndpoints.jwks_uri || '')
                .pipe(catchError(this.handleErrorGetSigningKeys));
        }
        else {
            this.loggerService.logWarning('getSigningKeys: authWellKnownEndpoints is undefined');
        }
        return this.oidcDataService.get('undefined').pipe(catchError(this.handleErrorGetSigningKeys));
    };
    /**
     * @private
     * @param {?} error
     * @return {?}
     */
    OidcSecurityService.prototype.handleErrorGetSigningKeys = /**
     * @private
     * @param {?} error
     * @return {?}
     */
    function (error) {
        /** @type {?} */
        var errMsg;
        if (error instanceof Response) {
            /** @type {?} */
            var body = error.json() || {};
            /** @type {?} */
            var err = JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.loggerService.logError(errMsg);
        return throwError(errMsg);
    };
    /**
     * @private
     * @return {?}
     */
    OidcSecurityService.prototype.runTokenValidation = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.runTokenValidationRunning || !this.configurationProvider.openIDConfiguration.silent_renew) {
            return;
        }
        this.runTokenValidationRunning = true;
        this.loggerService.logDebug('runTokenValidation silent-renew running');
        /**
         *   First time: delay 10 seconds to call silentRenewHeartBeatCheck
         *   Afterwards: Run this check in a 5 second interval only AFTER the previous operation ends.
         * @type {?}
         */
        var silentRenewHeartBeatCheck = (/**
         * @return {?}
         */
        function () {
            _this.loggerService.logDebug('silentRenewHeartBeatCheck\r\n' +
                ("\tsilentRenewRunning: " + (_this.oidcSecurityCommon.silentRenewRunning === 'running') + "\r\n") +
                ("\tidToken: " + !!_this.getIdToken() + "\r\n") +
                ("\t_userData.value: " + !!_this._userData.value));
            if (_this._userData.value && _this.oidcSecurityCommon.silentRenewRunning !== 'running' && _this.getIdToken()) {
                if (_this.oidcSecurityValidation.isTokenExpired(_this.oidcSecurityCommon.idToken, _this.configurationProvider.openIDConfiguration.silent_renew_offset_in_seconds)) {
                    _this.loggerService.logDebug('IsAuthorized: id_token isTokenExpired, start silent renew if active');
                    if (_this.configurationProvider.openIDConfiguration.silent_renew) {
                        _this.refreshSession().subscribe((/**
                         * @return {?}
                         */
                        function () {
                            _this._scheduledHeartBeat = setTimeout(silentRenewHeartBeatCheck, 3000);
                        }), (/**
                         * @param {?} err
                         * @return {?}
                         */
                        function (err) {
                            _this.loggerService.logError('Error: ' + err);
                            _this._scheduledHeartBeat = setTimeout(silentRenewHeartBeatCheck, 3000);
                        }));
                        /* In this situation, we schedule a heartbeat check only when silentRenew is finished.
                        We don't want to schedule another check so we have to return here */
                        return;
                    }
                    else {
                        _this.resetAuthorizationData(false);
                    }
                }
            }
            /* Delay 3 seconds and do the next check */
            _this._scheduledHeartBeat = setTimeout(silentRenewHeartBeatCheck, 3000);
        });
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            /* Initial heartbeat check */
            _this._scheduledHeartBeat = setTimeout(silentRenewHeartBeatCheck, 10000);
        }));
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    OidcSecurityService.prototype.silentRenewEventHandler = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.loggerService.logDebug('silentRenewEventHandler');
        if (this.configurationProvider.openIDConfiguration.response_type === 'code') {
            /** @type {?} */
            var urlParts = e.detail.toString().split('?');
            /** @type {?} */
            var params = new HttpParams({
                fromString: urlParts[1],
            });
            /** @type {?} */
            var code = params.get('code');
            /** @type {?} */
            var state = params.get('state');
            /** @type {?} */
            var session_state = params.get('session_state');
            /** @type {?} */
            var error = params.get('error');
            if (code && state) {
                this.requestTokensWithCodeProcedure(code, state, session_state);
            }
            if (error) {
                this._onAuthorizationResult.next(new AuthorizationResult(AuthorizationState.unauthorized, ValidationResult.LoginRequired, true));
                this.resetAuthorizationData(false);
                this.oidcSecurityCommon.authNonce = '';
                this.loggerService.logDebug(e.detail.toString());
            }
        }
        else {
            // ImplicitFlow
            this.authorizedImplicitFlowCallback(e.detail);
        }
    };
    OidcSecurityService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OidcSecurityService.ctorParameters = function () { return [
        { type: OidcDataService },
        { type: StateValidationService },
        { type: Router },
        { type: OidcSecurityCheckSession },
        { type: OidcSecuritySilentRenew },
        { type: OidcSecurityUserService },
        { type: OidcSecurityCommon },
        { type: OidcSecurityValidation },
        { type: TokenHelperService },
        { type: LoggerService },
        { type: NgZone },
        { type: HttpClient },
        { type: ConfigurationProvider },
        { type: UrlParserService }
    ]; };
    return OidcSecurityService;
}());
export { OidcSecurityService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype._onModuleSetup;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype._onCheckSessionChanged;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype._onAuthorizationResult;
    /** @type {?} */
    OidcSecurityService.prototype.checkSessionChanged;
    /** @type {?} */
    OidcSecurityService.prototype.moduleSetup;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype._isModuleSetup;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype._isAuthorized;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype._isSetupAndAuthorized;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype._userData;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.authWellKnownEndpointsLoaded;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.runTokenValidationRunning;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype._scheduledHeartBeat;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.boundSilentRenewEvent;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.oidcDataService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.stateValidationService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.router;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.oidcSecurityCheckSession;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.oidcSecuritySilentRenew;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.oidcSecurityUserService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.oidcSecurityCommon;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.oidcSecurityValidation;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.tokenHelperService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.loggerService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.httpClient;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.configurationProvider;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityService.prototype.urlParserService;
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy5zZWN1cml0eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLW9pZGMtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29pZGMuc2VjdXJpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9HLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUdyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2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aUM7Ozs7O0lBQ2pDLG9EQUFtQzs7Ozs7SUFHL0IsOENBQXdDOzs7OztJQUN4QyxxREFBc0Q7Ozs7O0lBQ3RELHFDQUFzQjs7Ozs7SUFDdEIsdURBQTBEOzs7OztJQUMxRCxzREFBd0Q7Ozs7O0lBQ3hELHNEQUF3RDs7Ozs7SUFDeEQsaURBQThDOzs7OztJQUM5QyxxREFBc0Q7Ozs7O0lBQ3RELGlEQUE4Qzs7Ozs7SUFDOUMsNENBQW9DOzs7OztJQUNwQyxtQ0FBb0I7Ozs7O0lBQ3BCLHlDQUF1Qzs7Ozs7SUFDdkMsb0RBQTZEOzs7OztJQUM3RCwrQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgZnJvbSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIHRocm93RXJyb3IsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBmaWx0ZXIsIG1hcCwgcmFjZSwgc2hhcmVSZXBsYXksIHN3aXRjaE1hcCwgc3dpdGNoTWFwVG8sIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9pZGNEYXRhU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc2VydmljZXMvb2lkYy1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3BlbklkQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL21vZGVscy9hdXRoLmNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgQXV0aFdlbGxLbm93bkVuZHBvaW50cyB9IGZyb20gJy4uL21vZGVscy9hdXRoLndlbGwta25vd24tZW5kcG9pbnRzJztcbmltcG9ydCB7IEF1dGhvcml6YXRpb25SZXN1bHQgfSBmcm9tICcuLi9tb2RlbHMvYXV0aG9yaXphdGlvbi1yZXN1bHQnO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvblN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2F1dGhvcml6YXRpb24tc3RhdGUuZW51bSc7XG5pbXBvcnQgeyBKd3RLZXlzIH0gZnJvbSAnLi4vbW9kZWxzL2p3dGtleXMnO1xuaW1wb3J0IHsgVmFsaWRhdGVTdGF0ZVJlc3VsdCB9IGZyb20gJy4uL21vZGVscy92YWxpZGF0ZS1zdGF0ZS1yZXN1bHQubW9kZWwnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblJlc3VsdCB9IGZyb20gJy4uL21vZGVscy92YWxpZGF0aW9uLXJlc3VsdC5lbnVtJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25Qcm92aWRlciB9IGZyb20gJy4vYXV0aC1jb25maWd1cmF0aW9uLnByb3ZpZGVyJztcbmltcG9ydCB7IFN0YXRlVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL29pZGMtc2VjdXJpdHktc3RhdGUtdmFsaWRhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRva2VuSGVscGVyU2VydmljZSB9IGZyb20gJy4vb2lkYy10b2tlbi1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi9vaWRjLmxvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IE9pZGNTZWN1cml0eUNoZWNrU2Vzc2lvbiB9IGZyb20gJy4vb2lkYy5zZWN1cml0eS5jaGVjay1zZXNzaW9uJztcbmltcG9ydCB7IE9pZGNTZWN1cml0eUNvbW1vbiB9IGZyb20gJy4vb2lkYy5zZWN1cml0eS5jb21tb24nO1xuaW1wb3J0IHsgT2lkY1NlY3VyaXR5U2lsZW50UmVuZXcgfSBmcm9tICcuL29pZGMuc2VjdXJpdHkuc2lsZW50LXJlbmV3JztcbmltcG9ydCB7IE9pZGNTZWN1cml0eVVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9vaWRjLnNlY3VyaXR5LnVzZXItc2VydmljZSc7XG5pbXBvcnQgeyBPaWRjU2VjdXJpdHlWYWxpZGF0aW9uIH0gZnJvbSAnLi9vaWRjLnNlY3VyaXR5LnZhbGlkYXRpb24nO1xuaW1wb3J0IHsgVXJpRW5jb2RlciB9IGZyb20gJy4vdXJpLWVuY29kZXInO1xuaW1wb3J0IHsgVXJsUGFyc2VyU2VydmljZSB9IGZyb20gJy4vdXJsLXBhcnNlci5zZXJ2aWNlJztcbmltcG9ydCB7IG9uZUxpbmVUcmltIH0gZnJvbSAnY29tbW9uLXRhZ3MnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogdmFyaWFibGUtbmFtZVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9pZGNTZWN1cml0eVNlcnZpY2Uge1xuICAgIHByaXZhdGUgX29uTW9kdWxlU2V0dXAgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIHByaXZhdGUgX29uQ2hlY2tTZXNzaW9uQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgcHJpdmF0ZSBfb25BdXRob3JpemF0aW9uUmVzdWx0ID0gbmV3IFN1YmplY3Q8QXV0aG9yaXphdGlvblJlc3VsdD4oKTtcblxuICAgIHB1YmxpYyBnZXQgb25Nb2R1bGVTZXR1cCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uTW9kdWxlU2V0dXAuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBvbkF1dGhvcml6YXRpb25SZXN1bHQoKTogT2JzZXJ2YWJsZTxBdXRob3JpemF0aW9uUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbkF1dGhvcml6YXRpb25SZXN1bHQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBvbkNoZWNrU2Vzc2lvbkNoYW5nZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbkNoZWNrU2Vzc2lvbkNoYW5nZWQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBvbkNvbmZpZ3VyYXRpb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTxPcGVuSWRDb25maWd1cmF0aW9uPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vbkNvbmZpZ3VyYXRpb25DaGFuZ2U7XG4gICAgfVxuXG4gICAgY2hlY2tTZXNzaW9uQ2hhbmdlZCA9IGZhbHNlO1xuICAgIG1vZHVsZVNldHVwID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9pc01vZHVsZVNldHVwID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgICBwcml2YXRlIF9pc0F1dGhvcml6ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBwcml2YXRlIF9pc1NldHVwQW5kQXV0aG9yaXplZDogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAgIHByaXZhdGUgX3VzZXJEYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KCcnKTtcbiAgICBwcml2YXRlIGF1dGhXZWxsS25vd25FbmRwb2ludHNMb2FkZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIHJ1blRva2VuVmFsaWRhdGlvblJ1bm5pbmcgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9zY2hlZHVsZWRIZWFydEJlYXQ6IGFueTtcbiAgICBwcml2YXRlIGJvdW5kU2lsZW50UmVuZXdFdmVudDogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb2lkY0RhdGFTZXJ2aWNlOiBPaWRjRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc3RhdGVWYWxpZGF0aW9uU2VydmljZTogU3RhdGVWYWxpZGF0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBvaWRjU2VjdXJpdHlDaGVja1Nlc3Npb246IE9pZGNTZWN1cml0eUNoZWNrU2Vzc2lvbixcbiAgICAgICAgcHJpdmF0ZSBvaWRjU2VjdXJpdHlTaWxlbnRSZW5ldzogT2lkY1NlY3VyaXR5U2lsZW50UmVuZXcsXG4gICAgICAgIHByaXZhdGUgb2lkY1NlY3VyaXR5VXNlclNlcnZpY2U6IE9pZGNTZWN1cml0eVVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG9pZGNTZWN1cml0eUNvbW1vbjogT2lkY1NlY3VyaXR5Q29tbW9uLFxuICAgICAgICBwcml2YXRlIG9pZGNTZWN1cml0eVZhbGlkYXRpb246IE9pZGNTZWN1cml0eVZhbGlkYXRpb24sXG4gICAgICAgIHByaXZhdGUgdG9rZW5IZWxwZXJTZXJ2aWNlOiBUb2tlbkhlbHBlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbG9nZ2VyU2VydmljZTogTG9nZ2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjb25maWd1cmF0aW9uUHJvdmlkZXI6IENvbmZpZ3VyYXRpb25Qcm92aWRlcixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1cmxQYXJzZXJTZXJ2aWNlOiBVcmxQYXJzZXJTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMub25Nb2R1bGVTZXR1cC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZVNldHVwID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2lzTW9kdWxlU2V0dXAubmV4dCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5faXNTZXR1cEFuZEF1dGhvcml6ZWQgPSB0aGlzLl9pc01vZHVsZVNldHVwLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKGlzTW9kdWxlU2V0dXA6IGJvb2xlYW4pID0+IGlzTW9kdWxlU2V0dXApLFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uc2lsZW50X3JlbmV3KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZyhgSXNBdXRob3JpemVkUmFjZTogU2lsZW50IFJlbmV3IE5vdCBBY3RpdmUuIEVtaXR0aW5nLmApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShbdHJ1ZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHJhY2UkID0gdGhpcy5faXNBdXRob3JpemVkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcigoaXNBdXRob3JpemVkOiBib29sZWFuKSA9PiBpc0F1dGhvcml6ZWQpLFxuICAgICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdJc0F1dGhvcml6ZWRSYWNlOiBFeGlzdGluZyB0b2tlbiBpcyBzdGlsbCBhdXRob3JpemVkLicpKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICAgICAgICAgICAgICByYWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25BdXRob3JpemF0aW9uUmVzdWx0LnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdJc0F1dGhvcml6ZWRSYWNlOiBTaWxlbnQgUmVuZXcgUmVmcmVzaCBTZXNzaW9uIENvbXBsZXRlJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyKHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uaXNhdXRob3JpemVkcmFjZV90aW1lb3V0X2luX3NlY29uZHMgKiAxMDAwKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJhY2t1cCwgaWYgbm90aGluZyBoYXBwZW5zIGFmdGVyIFggc2Vjb25kcyBzdG9wIHdhaXRpbmcgYW5kIGVtaXQgKDVzIERlZmF1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEF1dGhvcml6YXRpb25EYXRhKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uYXV0aE5vbmNlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdJc0F1dGhvcml6ZWRSYWNlOiBUaW1lb3V0IHJlYWNoZWQuIEVtaXR0aW5nLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZygnU2lsZW50IFJlbmV3IGlzIGFjdGl2ZSwgY2hlY2sgaWYgdG9rZW4gaW4gc3RvcmFnZSBpcyBhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vaWRjU2VjdXJpdHlDb21tb24uYXV0aE5vbmNlID09PSAnJyB8fCB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hdXRoTm9uY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsb2dpbiBub3QgcnVubmluZywgb3IgYSBzZWNvbmQgc2lsZW50IHJlbmV3LCB1c2VyIG11c3QgbG9naW4gZmlyc3QgYmVmb3JlIHRoaXMgd2lsbCB3b3JrLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ1NpbGVudCBSZW5ldyBvciBsb2dpbiBub3QgcnVubmluZywgdHJ5IHRvIHJlZnJlc2ggdGhlIHNlc3Npb24nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2Vzc2lvbigpLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByYWNlJDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZygnSXNBdXRob3JpemVkUmFjZTogQ29tcGxldGVkJykpLFxuICAgICAgICAgICAgc3dpdGNoTWFwVG8odGhpcy5faXNBdXRob3JpemVkLmFzT2JzZXJ2YWJsZSgpKSxcbiAgICAgICAgICAgIHRhcCgoaXNBdXRob3JpemVkOiBib29sZWFuKSA9PiB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoYGdldElzQXV0aG9yaXplZDogJHtpc0F1dGhvcml6ZWR9YCkpLFxuICAgICAgICAgICAgc2hhcmVSZXBsYXkoMSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLl9pc1NldHVwQW5kQXV0aG9yaXplZFxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uc3RhcnRfY2hlY2tzZXNzaW9uKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoaXNTZXR1cEFuZEF1dGhvcml6ZWQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc1NldHVwQW5kQXV0aG9yaXplZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNoZWNrU2Vzc2lvbi5zdGFydENoZWNraW5nU2Vzc2lvbih0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLmNsaWVudF9pZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDaGVja1Nlc3Npb24uc3RvcENoZWNraW5nU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldHVwTW9kdWxlKG9wZW5JZENvbmZpZ3VyYXRpb246IE9wZW5JZENvbmZpZ3VyYXRpb24sIGF1dGhXZWxsS25vd25FbmRwb2ludHM6IEF1dGhXZWxsS25vd25FbmRwb2ludHMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIuc2V0dXAob3BlbklkQ29uZmlndXJhdGlvbiwgYXV0aFdlbGxLbm93bkVuZHBvaW50cyk7XG5cbiAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDaGVja1Nlc3Npb24ub25DaGVja1Nlc3Npb25DaGFuZ2VkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ29uQ2hlY2tTZXNzaW9uQ2hhbmdlZCcpO1xuICAgICAgICAgICAgdGhpcy5jaGVja1Nlc3Npb25DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hlY2tTZXNzaW9uQ2hhbmdlZC5uZXh0KHRoaXMuY2hlY2tTZXNzaW9uQ2hhbmdlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0gdGhpcy5vaWRjU2VjdXJpdHlDb21tb24udXNlckRhdGE7XG4gICAgICAgIGlmICh1c2VyRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zZXRVc2VyRGF0YSh1c2VyRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc0F1dGhvcml6ZWQgPSB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5pc0F1dGhvcml6ZWQ7XG4gICAgICAgIGlmIChpc0F1dGhvcml6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZygnSXNBdXRob3JpemVkIHNldHVwIG1vZHVsZScpO1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLmlkVG9rZW4pO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMub2lkY1NlY3VyaXR5VmFsaWRhdGlvbi5pc1Rva2VuRXhwaXJlZChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uaWRUb2tlbiB8fCB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hY2Nlc3NUb2tlbixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5zaWxlbnRfcmVuZXdfb2Zmc2V0X2luX3NlY29uZHNcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ0lzQXV0aG9yaXplZCBzZXR1cCBtb2R1bGU7IGlkX3Rva2VuIGlzVG9rZW5FeHBpcmVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZygnSXNBdXRob3JpemVkIHNldHVwIG1vZHVsZTsgaWRfdG9rZW4gaXMgdmFsaWQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldElzQXV0aG9yaXplZChpc0F1dGhvcml6ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ydW5Ub2tlblZhbGlkYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZygnU1RTIHNlcnZlcjogJyArIHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uc3RzU2VydmVyKTtcblxuICAgICAgICB0aGlzLl9vbk1vZHVsZVNldHVwLm5leHQoKTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5zaWxlbnRfcmVuZXcpIHtcbiAgICAgICAgICAgIHRoaXMub2lkY1NlY3VyaXR5U2lsZW50UmVuZXcuaW5pdFJlbmV3KCk7XG5cbiAgICAgICAgICAgIC8vIFN1cHBvcnQgYXV0aG9yaXphdGlvbiB2aWEgRE9NIGV2ZW50cy5cbiAgICAgICAgICAgIC8vIERlcmVnaXN0ZXIgaWYgT2lkY1NlY3VyaXR5U2VydmljZS5zZXR1cE1vZHVsZSBpcyBjYWxsZWQgYWdhaW4gYnkgYW55IGluc3RhbmNlLlxuICAgICAgICAgICAgLy8gICAgICBXZSBvbmx5IGV2ZXIgd2FudCB0aGUgbGF0ZXN0IHNldHVwIHNlcnZpY2UgdG8gYmUgcmVhY3RpbmcgdG8gdGhpcyBldmVudC5cbiAgICAgICAgICAgIHRoaXMuYm91bmRTaWxlbnRSZW5ld0V2ZW50ID0gdGhpcy5zaWxlbnRSZW5ld0V2ZW50SGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZUlkID0gTWF0aC5yYW5kb20oKTtcblxuICAgICAgICAgICAgY29uc3QgYm91bmRTaWxlbnRSZW5ld0luaXRFdmVudDogYW55ID0gKChlOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLmRldGFpbCAhPT0gaW5zdGFuY2VJZCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb2lkYy1zaWxlbnQtcmVuZXctbWVzc2FnZScsIHRoaXMuYm91bmRTaWxlbnRSZW5ld0V2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29pZGMtc2lsZW50LXJlbmV3LWluaXQnLCBib3VuZFNpbGVudFJlbmV3SW5pdEV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb2lkYy1zaWxlbnQtcmVuZXctaW5pdCcsIGJvdW5kU2lsZW50UmVuZXdJbml0RXZlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvaWRjLXNpbGVudC1yZW5ldy1tZXNzYWdlJywgdGhpcy5ib3VuZFNpbGVudFJlbmV3RXZlbnQsIGZhbHNlKTtcblxuICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdvaWRjLXNpbGVudC1yZW5ldy1pbml0Jywge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGluc3RhbmNlSWQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRVc2VyRGF0YTxUID0gYW55PigpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJEYXRhLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGdldElzTW9kdWxlU2V0dXAoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc01vZHVsZVNldHVwLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGdldElzQXV0aG9yaXplZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2V0dXBBbmRBdXRob3JpemVkO1xuICAgIH1cblxuICAgIGdldFRva2VuKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5faXNBdXRob3JpemVkLmdldFZhbHVlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh0b2tlbik7XG4gICAgfVxuXG4gICAgZ2V0SWRUb2tlbigpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuX2lzQXV0aG9yaXplZC5nZXRWYWx1ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLmdldElkVG9rZW4oKTtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh0b2tlbik7XG4gICAgfVxuXG4gICAgZ2V0UmVmcmVzaFRva2VuKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5faXNBdXRob3JpemVkLmdldFZhbHVlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uZ2V0UmVmcmVzaFRva2VuKCk7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodG9rZW4pO1xuICAgIH1cblxuICAgIGdldFBheWxvYWRGcm9tSWRUb2tlbihlbmNvZGUgPSBmYWxzZSk6IGFueSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRJZFRva2VuKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuSGVscGVyU2VydmljZS5nZXRQYXlsb2FkRnJvbVRva2VuKHRva2VuLCBlbmNvZGUpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uYXV0aFN0YXRlQ29udHJvbCA9IHN0YXRlO1xuICAgIH1cblxuICAgIGdldFN0YXRlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hdXRoU3RhdGVDb250cm9sO1xuICAgIH1cblxuICAgIHNldEN1c3RvbVJlcXVlc3RQYXJhbWV0ZXJzKHBhcmFtczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIH0pIHtcbiAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uY3VzdG9tUmVxdWVzdFBhcmFtcyA9IHBhcmFtcztcbiAgICB9XG5cbiAgICAvLyBDb2RlIEZsb3cgd2l0aCBQQ0tFIG9yIEltcGxpY2l0IEZsb3dcbiAgICBhdXRob3JpemUodXJsSGFuZGxlcj86ICh1cmw6IHN0cmluZykgPT4gYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aFdlbGxLbm93bkVuZHBvaW50c0xvYWRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuYXV0aFdlbGxLbm93bkVuZHBvaW50c0xvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0Vycm9yKCdXZWxsIGtub3duIGVuZHBvaW50cyBtdXN0IGJlIGxvYWRlZCBiZWZvcmUgdXNlciBjYW4gbG9naW4hJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMub2lkY1NlY3VyaXR5VmFsaWRhdGlvbi5jb25maWdfdmFsaWRhdGVfcmVzcG9uc2VfdHlwZSh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnJlc3BvbnNlX3R5cGUpKSB7XG4gICAgICAgICAgICAvLyBpbnZhbGlkIHJlc3BvbnNlX3R5cGVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzZXRBdXRob3JpemF0aW9uRGF0YShmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdCRUdJTiBBdXRob3JpemUgQ29kZSBGbG93LCBubyBhdXRoIGRhdGEnKTtcblxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hdXRoU3RhdGVDb250cm9sO1xuICAgICAgICBpZiAoIXN0YXRlKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IERhdGUubm93KCkgKyAnJyArIE1hdGgucmFuZG9tKCkgKyBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uYXV0aFN0YXRlQ29udHJvbCA9IHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9uY2UgPSAnTicgKyBNYXRoLnJhbmRvbSgpICsgJycgKyBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hdXRoTm9uY2UgPSBub25jZTtcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdBdXRob3JpemVkQ29udHJvbGxlciBjcmVhdGVkLiBsb2NhbCBzdGF0ZTogJyArIHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLmF1dGhTdGF0ZUNvbnRyb2wpO1xuXG4gICAgICAgIGxldCB1cmwgPSAnJztcbiAgICAgICAgLy8gQ29kZSBGbG93XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnJlc3BvbnNlX3R5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgLy8gY29kZV9jaGFsbGVuZ2Ugd2l0aCBcIlMyNTZcIlxuICAgICAgICAgICAgY29uc3QgY29kZV92ZXJpZmllciA9ICdDJyArIE1hdGgucmFuZG9tKCkgKyAnJyArIERhdGUubm93KCkgKyAnJyArIERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgY29uc3QgY29kZV9jaGFsbGVuZ2UgPSB0aGlzLm9pZGNTZWN1cml0eVZhbGlkYXRpb24uZ2VuZXJhdGVfY29kZV92ZXJpZmllcihjb2RlX3ZlcmlmaWVyKTtcblxuICAgICAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uY29kZV92ZXJpZmllciA9IGNvZGVfdmVyaWZpZXI7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmNyZWF0ZUF1dGhvcml6ZVVybChcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2UsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24ucmVkaXJlY3RfdXJsLFxuICAgICAgICAgICAgICAgICAgICBub25jZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLndlbGxLbm93bkVuZHBvaW50cy5hdXRob3JpemF0aW9uX2VuZHBvaW50IHx8ICcnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0Vycm9yKCdhdXRoV2VsbEtub3duRW5kcG9pbnRzIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSW1wbGljaXQgRmxvd1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5jcmVhdGVBdXRob3JpemVVcmwoXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5yZWRpcmVjdF91cmwsXG4gICAgICAgICAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzLmF1dGhvcml6YXRpb25fZW5kcG9pbnQgfHwgJydcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRXJyb3IoJ2F1dGhXZWxsS25vd25FbmRwb2ludHMgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJsSGFuZGxlcikge1xuICAgICAgICAgICAgdXJsSGFuZGxlcih1cmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvKHVybCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb2RlIEZsb3dcbiAgICBhdXRob3JpemVkQ2FsbGJhY2tXaXRoQ29kZSh1cmxUb0NoZWNrOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hdXRob3JpemVkQ2FsbGJhY2tXaXRoQ29kZSQodXJsVG9DaGVjaykuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGF1dGhvcml6ZWRDYWxsYmFja1dpdGhDb2RlJCh1cmxUb0NoZWNrOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IHRoaXMudXJsUGFyc2VyU2VydmljZS5nZXRVcmxQYXJhbWV0ZXIodXJsVG9DaGVjaywgJ2NvZGUnKTtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnVybFBhcnNlclNlcnZpY2UuZ2V0VXJsUGFyYW1ldGVyKHVybFRvQ2hlY2ssICdzdGF0ZScpO1xuICAgICAgICBjb25zdCBzZXNzaW9uU3RhdGUgPSB0aGlzLnVybFBhcnNlclNlcnZpY2UuZ2V0VXJsUGFyYW1ldGVyKHVybFRvQ2hlY2ssICdzZXNzaW9uX3N0YXRlJykgfHwgbnVsbDtcblxuICAgICAgICBpZiAoIXN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ25vIHN0YXRlIGluIHVybCcpO1xuICAgICAgICAgICAgcmV0dXJuIG9mKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ25vIGNvZGUgaW4gdXJsJyk7XG4gICAgICAgICAgICByZXR1cm4gb2YoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ3J1bm5pbmcgdmFsaWRhdGlvbiBmb3IgY2FsbGJhY2snICsgdXJsVG9DaGVjayk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RUb2tlbnNXaXRoQ29kZSQoY29kZSwgc3RhdGUsIHNlc3Npb25TdGF0ZSk7XG4gICAgfVxuXG4gICAgLy8gQ29kZSBGbG93XG4gICAgcmVxdWVzdFRva2Vuc1dpdGhDb2RlKGNvZGU6IHN0cmluZywgc3RhdGU6IHN0cmluZywgc2Vzc2lvblN0YXRlOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVxdWVzdFRva2Vuc1dpdGhDb2RlJChjb2RlLCBzdGF0ZSwgc2Vzc2lvblN0YXRlKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0VG9rZW5zV2l0aENvZGUkKGNvZGU6IHN0cmluZywgc3RhdGU6IHN0cmluZywgc2Vzc2lvblN0YXRlOiBzdHJpbmcgfCBudWxsKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc01vZHVsZVNldHVwLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXNNb2R1bGVTZXR1cCA9PiAhIWlzTW9kdWxlU2V0dXApLFxuICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFRva2Vuc1dpdGhDb2RlUHJvY2VkdXJlJChjb2RlLCBzdGF0ZSwgc2Vzc2lvblN0YXRlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVmcmVzaCBUb2tlblxuICAgIHJlZnJlc2hUb2tlbnNXaXRoQ29kZVByb2NlZHVyZShjb2RlOiBzdHJpbmcsIHN0YXRlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBsZXQgdG9rZW5SZXF1ZXN0VXJsID0gJyc7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMgJiYgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzLnRva2VuX2VuZHBvaW50KSB7XG4gICAgICAgICAgICB0b2tlblJlcXVlc3RVcmwgPSBgJHt0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMudG9rZW5fZW5kcG9pbnR9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcblxuICAgICAgICBjb25zdCBkYXRhID0gYGdyYW50X3R5cGU9cmVmcmVzaF90b2tlbiZjbGllbnRfaWQ9JHt0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLmNsaWVudF9pZH0mcmVmcmVzaF90b2tlbj0ke2NvZGV9YDtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QodG9rZW5SZXF1ZXN0VXJsLCBkYXRhLCB7IGhlYWRlcnMgfSkucGlwZShcbiAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCd0b2tlbiByZWZyZXNoIHJlc3BvbnNlOiAnICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICBsZXQgb2JqOiBhbnkgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgICAgICAgICAgb2JqID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgb2JqLnN0YXRlID0gc3RhdGU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhvcml6ZWRDb2RlRmxvd0NhbGxiYWNrUHJvY2VkdXJlKG9iaik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZygndG9rZW4gcmVmcmVzaCBmYWlsdXJlIHJlc3BvbnNlOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICBsZXQgb2JqOiBhbnkgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgICAgICAgICAgb2JqID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgb2JqLnN0YXRlID0gc3RhdGU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhvcml6ZWRDb2RlRmxvd0NhbGxiYWNrUHJvY2VkdXJlKG9iaik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVxdWVzdFRva2Vuc1dpdGhDb2RlUHJvY2VkdXJlKGNvZGU6IHN0cmluZywgc3RhdGU6IHN0cmluZywgc2Vzc2lvbl9zdGF0ZTogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbnNXaXRoQ29kZVByb2NlZHVyZSQoY29kZSwgc3RhdGUsIHNlc3Npb25fc3RhdGUpLnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8vIENvZGUgRmxvdyB3aXRoIFBDS0VcbiAgICByZXF1ZXN0VG9rZW5zV2l0aENvZGVQcm9jZWR1cmUkKGNvZGU6IHN0cmluZywgc3RhdGU6IHN0cmluZywgc2Vzc2lvbl9zdGF0ZTogc3RyaW5nIHwgbnVsbCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICBsZXQgdG9rZW5SZXF1ZXN0VXJsID0gJyc7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMgJiYgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzLnRva2VuX2VuZHBvaW50KSB7XG4gICAgICAgICAgICB0b2tlblJlcXVlc3RVcmwgPSBgJHt0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMudG9rZW5fZW5kcG9pbnR9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5vaWRjU2VjdXJpdHlWYWxpZGF0aW9uLnZhbGlkYXRlU3RhdGVGcm9tSGFzaENhbGxiYWNrKHN0YXRlLCB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hdXRoU3RhdGVDb250cm9sKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ1dhcm5pbmcoJ2F1dGhvcml6ZWRDYWxsYmFjayBpbmNvcnJlY3Qgc3RhdGUnKTtcbiAgICAgICAgICAgIC8vIFZhbGlkYXRpb25SZXN1bHQuU3RhdGVzRG9Ob3RNYXRjaDtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignaW5jb3JyZWN0IHN0YXRlJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGhlYWRlcnM6IEh0dHBIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuXG4gICAgICAgIGxldCBkYXRhID0gb25lTGluZVRyaW1gZ3JhbnRfdHlwZT1hdXRob3JpemF0aW9uX2NvZGUmY2xpZW50X2lkPSR7dGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5jbGllbnRfaWR9XG4gICAgICAgICAgICAmY29kZV92ZXJpZmllcj0ke3RoaXMub2lkY1NlY3VyaXR5Q29tbW9uLmNvZGVfdmVyaWZpZXJ9XG4gICAgICAgICAgICAmY29kZT0ke2NvZGV9JnJlZGlyZWN0X3VyaT0ke3RoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24ucmVkaXJlY3RfdXJsfWA7XG5cbiAgICAgICAgaWYgKHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLnNpbGVudFJlbmV3UnVubmluZyA9PT0gJ3J1bm5pbmcnKSB7XG4gICAgICAgICAgICBkYXRhID0gb25lTGluZVRyaW1gZ3JhbnRfdHlwZT1hdXRob3JpemF0aW9uX2NvZGUmY2xpZW50X2lkPSR7dGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5jbGllbnRfaWR9XG4gICAgICAgICAgICAgICAgJmNvZGVfdmVyaWZpZXI9JHt0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5jb2RlX3ZlcmlmaWVyfVxuICAgICAgICAgICAgICAgICZjb2RlPSR7Y29kZX1cbiAgICAgICAgICAgICAgICAmcmVkaXJlY3RfdXJpPSR7dGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5zaWxlbnRfcmVuZXdfdXJsfWA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QodG9rZW5SZXF1ZXN0VXJsLCBkYXRhLCB7IGhlYWRlcnMgfSkucGlwZShcbiAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG9iajogYW55ID0gbmV3IE9iamVjdCgpO1xuICAgICAgICAgICAgICAgIG9iaiA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIG9iai5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgICAgIG9iai5zZXNzaW9uX3N0YXRlID0gc2Vzc2lvbl9zdGF0ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aG9yaXplZENvZGVGbG93Q2FsbGJhY2tQcm9jZWR1cmUob2JqKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0Vycm9yKGBPaWRjU2VydmljZSBjb2RlIHJlcXVlc3QgJHt0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnN0c1NlcnZlcn1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIENvZGUgRmxvd1xuICAgIHByaXZhdGUgYXV0aG9yaXplZENvZGVGbG93Q2FsbGJhY2tQcm9jZWR1cmUocmVzdWx0OiBhbnkpIHtcbiAgICAgICAgY29uc3Qgc2lsZW50UmVuZXcgPSB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5zaWxlbnRSZW5ld1J1bm5pbmc7XG4gICAgICAgIGNvbnN0IGlzUmVuZXdQcm9jZXNzID0gc2lsZW50UmVuZXcgPT09ICdydW5uaW5nJztcblxuICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ0JFR0lOIGF1dGhvcml6ZWQgQ29kZSBGbG93IENhbGxiYWNrLCBubyBhdXRoIGRhdGEnKTtcbiAgICAgICAgdGhpcy5yZXNldEF1dGhvcml6YXRpb25EYXRhKGlzUmVuZXdQcm9jZXNzKTtcbiAgICAgICAgdGhpcy5hdXRob3JpemVkQ2FsbGJhY2tQcm9jZWR1cmUocmVzdWx0LCBpc1JlbmV3UHJvY2Vzcyk7XG4gICAgfVxuXG4gICAgLy8gSW1wbGljaXQgRmxvd1xuICAgIHByaXZhdGUgYXV0aG9yaXplZEltcGxpY2l0Rmxvd0NhbGxiYWNrUHJvY2VkdXJlKGhhc2g/OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2lsZW50UmVuZXcgPSB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5zaWxlbnRSZW5ld1J1bm5pbmc7XG4gICAgICAgIGNvbnN0IGlzUmVuZXdQcm9jZXNzID0gc2lsZW50UmVuZXcgPT09ICdydW5uaW5nJztcblxuICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ0JFR0lOIGF1dGhvcml6ZWRDYWxsYmFjaywgbm8gYXV0aCBkYXRhJyk7XG4gICAgICAgIHRoaXMucmVzZXRBdXRob3JpemF0aW9uRGF0YShpc1JlbmV3UHJvY2Vzcyk7XG5cbiAgICAgICAgaGFzaCA9IGhhc2ggfHwgd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdDogYW55ID0gaGFzaC5zcGxpdCgnJicpLnJlZHVjZSgocmVzdWx0RGF0YTogYW55LCBpdGVtOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICAgICAgcmVzdWx0RGF0YVtwYXJ0cy5zaGlmdCgpIGFzIHN0cmluZ10gPSBwYXJ0cy5qb2luKCc9Jyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0RGF0YTtcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIHRoaXMuYXV0aG9yaXplZENhbGxiYWNrUHJvY2VkdXJlKHJlc3VsdCwgaXNSZW5ld1Byb2Nlc3MpO1xuICAgIH1cblxuICAgIC8vIEltcGxpY2l0IEZsb3dcbiAgICBhdXRob3JpemVkSW1wbGljaXRGbG93Q2FsbGJhY2soaGFzaD86IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pc01vZHVsZVNldHVwXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKGlzTW9kdWxlU2V0dXA6IGJvb2xlYW4pID0+IGlzTW9kdWxlU2V0dXApLFxuICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0aG9yaXplZEltcGxpY2l0Rmxvd0NhbGxiYWNrUHJvY2VkdXJlKGhhc2gpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWRpcmVjdFRvKHVybDogc3RyaW5nKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgIH1cblxuICAgIC8vIEltcGxpY2l0IEZsb3dcbiAgICBwcml2YXRlIGF1dGhvcml6ZWRDYWxsYmFja1Byb2NlZHVyZShyZXN1bHQ6IGFueSwgaXNSZW5ld1Byb2Nlc3M6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uYXV0aFJlc3VsdCA9IHJlc3VsdDtcblxuICAgICAgICBpZiAoIXRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uaGlzdG9yeV9jbGVhbnVwX29mZiAmJiAhaXNSZW5ld1Byb2Nlc3MpIHtcbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBoaXN0b3J5IHRvIHJlbW92ZSB0aGUgdG9rZW5zXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIHdpbmRvdy5kb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ2hpc3RvcnkgY2xlYW4gdXAgaW5hY3RpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc1JlbmV3UHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZyhyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nV2FybmluZyhyZXN1bHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHJlc3VsdC5lcnJvciBhcyBzdHJpbmcpID09PSAnbG9naW5fcmVxdWlyZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25BdXRob3JpemF0aW9uUmVzdWx0Lm5leHQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBBdXRob3JpemF0aW9uUmVzdWx0KEF1dGhvcml6YXRpb25TdGF0ZS51bmF1dGhvcml6ZWQsIFZhbGlkYXRpb25SZXN1bHQuTG9naW5SZXF1aXJlZCwgaXNSZW5ld1Byb2Nlc3MpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25BdXRob3JpemF0aW9uUmVzdWx0Lm5leHQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBBdXRob3JpemF0aW9uUmVzdWx0KEF1dGhvcml6YXRpb25TdGF0ZS51bmF1dGhvcml6ZWQsIFZhbGlkYXRpb25SZXN1bHQuU2VjdXJlVG9rZW5TZXJ2ZXJFcnJvciwgaXNSZW5ld1Byb2Nlc3MpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZXNldEF1dGhvcml6YXRpb25EYXRhKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLmF1dGhOb25jZSA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24udHJpZ2dlcl9hdXRob3JpemF0aW9uX3Jlc3VsdF9ldmVudCAmJiAhaXNSZW5ld1Byb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi51bmF1dGhvcml6ZWRfcm91dGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZyhyZXN1bHQpO1xuXG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ2F1dGhvcml6ZWRDYWxsYmFjayBjcmVhdGVkLCBiZWdpbiB0b2tlbiB2YWxpZGF0aW9uJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0U2lnbmluZ0tleXMoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgand0S2V5cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSB0aGlzLmdldFZhbGlkYXRlZFN0YXRlUmVzdWx0KHJlc3VsdCwgand0S2V5cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb25SZXN1bHQuYXV0aFJlc3BvbnNlSXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRob3JpemF0aW9uRGF0YSh2YWxpZGF0aW9uUmVzdWx0LmFjY2Vzc190b2tlbiwgdmFsaWRhdGlvblJlc3VsdC5pZF90b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5zaWxlbnRSZW5ld1J1bm5pbmcgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uYXV0b191c2VyaW5mbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VXNlcmluZm8oaXNSZW5ld1Byb2Nlc3MsIHJlc3VsdCwgdmFsaWRhdGlvblJlc3VsdC5pZF90b2tlbiwgdmFsaWRhdGlvblJlc3VsdC5kZWNvZGVkX2lkX3Rva2VuKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29uQXV0aG9yaXphdGlvblJlc3VsdC5uZXh0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQXV0aG9yaXphdGlvblJlc3VsdChBdXRob3JpemF0aW9uU3RhdGUuYXV0aG9yaXplZCwgdmFsaWRhdGlvblJlc3VsdC5zdGF0ZSwgaXNSZW5ld1Byb2Nlc3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24udHJpZ2dlcl9hdXRob3JpemF0aW9uX3Jlc3VsdF9ldmVudCAmJiAhaXNSZW5ld1Byb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24ucG9zdF9sb2dpbl9yb3V0ZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25BdXRob3JpemF0aW9uUmVzdWx0Lm5leHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBBdXRob3JpemF0aW9uUmVzdWx0KEF1dGhvcml6YXRpb25TdGF0ZS51bmF1dGhvcml6ZWQsIHZhbGlkYXRpb25SZXN1bHQuc3RhdGUsIGlzUmVuZXdQcm9jZXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnRyaWdnZXJfYXV0aG9yaXphdGlvbl9yZXN1bHRfZXZlbnQgJiYgIWlzUmVuZXdQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnVuYXV0aG9yaXplZF9yb3V0ZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFNvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIGdldHRpbmcgc2lnbmluZyBrZXkgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdGYWlsZWQgdG8gcmV0cmVpdmUgdXNlciBpbmZvIHdpdGggZXJyb3I6ICcgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNSZW5ld1Byb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlckRhdGEgaXMgc2V0IHRvIHRoZSBpZF90b2tlbiBkZWNvZGVkLCBhdXRvIGdldCB1c2VyIGRhdGEgc2V0IHRvIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2lkY1NlY3VyaXR5VXNlclNlcnZpY2Uuc2V0VXNlckRhdGEodmFsaWRhdGlvblJlc3VsdC5kZWNvZGVkX2lkX3Rva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRVc2VyRGF0YSh0aGlzLm9pZGNTZWN1cml0eVVzZXJTZXJ2aWNlLmdldFVzZXJEYXRhKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVuVG9rZW5WYWxpZGF0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkF1dGhvcml6YXRpb25SZXN1bHQubmV4dChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEF1dGhvcml6YXRpb25SZXN1bHQoQXV0aG9yaXphdGlvblN0YXRlLmF1dGhvcml6ZWQsIHZhbGlkYXRpb25SZXN1bHQuc3RhdGUsIGlzUmVuZXdQcm9jZXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnRyaWdnZXJfYXV0aG9yaXphdGlvbl9yZXN1bHRfZXZlbnQgJiYgIWlzUmVuZXdQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnBvc3RfbG9naW5fcm91dGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ1dhcm5pbmcoJ2F1dGhvcml6ZWRDYWxsYmFjaywgdG9rZW4ocykgdmFsaWRhdGlvbiBmYWlsZWQsIHJlc2V0dGluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ1dhcm5pbmcod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEF1dGhvcml6YXRpb25EYXRhKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLnNpbGVudFJlbmV3UnVubmluZyA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkF1dGhvcml6YXRpb25SZXN1bHQubmV4dChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQXV0aG9yaXphdGlvblJlc3VsdChBdXRob3JpemF0aW9uU3RhdGUudW5hdXRob3JpemVkLCB2YWxpZGF0aW9uUmVzdWx0LnN0YXRlLCBpc1JlbmV3UHJvY2VzcylcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24udHJpZ2dlcl9hdXRob3JpemF0aW9uX3Jlc3VsdF9ldmVudCAmJiAhaXNSZW5ld1Byb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi51bmF1dGhvcml6ZWRfcm91dGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLyogU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgZ2V0dGluZyBzaWduaW5nIGtleSAqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nV2FybmluZygnRmFpbGVkIHRvIHJldHJlaXZlIHNpZ2luZyBrZXkgd2l0aCBlcnJvcjogJyArIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5zaWxlbnRSZW5ld1J1bm5pbmcgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VXNlcmluZm8oaXNSZW5ld1Byb2Nlc3MgPSBmYWxzZSwgcmVzdWx0PzogYW55LCBpZF90b2tlbj86IGFueSwgZGVjb2RlZF9pZF90b2tlbj86IGFueSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQgPyByZXN1bHQgOiB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hdXRoUmVzdWx0O1xuICAgICAgICBpZF90b2tlbiA9IGlkX3Rva2VuID8gaWRfdG9rZW4gOiB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5pZFRva2VuO1xuICAgICAgICBkZWNvZGVkX2lkX3Rva2VuID0gZGVjb2RlZF9pZF90b2tlbiA/IGRlY29kZWRfaWRfdG9rZW4gOiB0aGlzLnRva2VuSGVscGVyU2VydmljZS5nZXRQYXlsb2FkRnJvbVRva2VuKGlkX3Rva2VuLCBmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KG9ic2VydmVyID0+IHtcbiAgICAgICAgICAgIC8vIGZsb3cgaWRfdG9rZW4gdG9rZW5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnJlc3BvbnNlX3R5cGUgPT09ICdpZF90b2tlbiB0b2tlbicgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnJlc3BvbnNlX3R5cGUgPT09ICdjb2RlJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUmVuZXdQcm9jZXNzICYmIHRoaXMuX3VzZXJEYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLnNlc3Npb25TdGF0ZSA9IHJlc3VsdC5zZXNzaW9uX3N0YXRlO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2lkY1NlY3VyaXR5VXNlclNlcnZpY2UuaW5pdFVzZXJEYXRhKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZygnYXV0aG9yaXplZENhbGxiYWNrIChpZF90b2tlbiB0b2tlbiB8fCBjb2RlKSBmbG93Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJEYXRhID0gdGhpcy5vaWRjU2VjdXJpdHlVc2VyU2VydmljZS5nZXRVc2VyRGF0YSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vaWRjU2VjdXJpdHlWYWxpZGF0aW9uLnZhbGlkYXRlX3VzZXJkYXRhX3N1Yl9pZF90b2tlbihkZWNvZGVkX2lkX3Rva2VuLnN1YiwgdXNlckRhdGEuc3ViKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VXNlckRhdGEodXNlckRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1Zyh0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKHRoaXMub2lkY1NlY3VyaXR5VXNlclNlcnZpY2UuZ2V0VXNlckRhdGEoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5zZXNzaW9uU3RhdGUgPSByZXN1bHQuc2Vzc2lvbl9zdGF0ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVuVG9rZW5WYWxpZGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmcsIHVzZXJkYXRhIHN1YiBkb2VzIG5vdCBtYXRjaCB0aGF0IGZyb20gaWRfdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nV2FybmluZygnYXV0aG9yaXplZENhbGxiYWNrLCBVc2VyIGRhdGEgc3ViIGRvZXMgbm90IG1hdGNoIHN1YiBpbiBpZF90b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZygnYXV0aG9yaXplZENhbGxiYWNrLCB0b2tlbihzKSB2YWxpZGF0aW9uIGZhaWxlZCwgcmVzZXR0aW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEF1dGhvcml6YXRpb25EYXRhKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZmxvdyBpZF90b2tlblxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZygnYXV0aG9yaXplZENhbGxiYWNrIGlkX3Rva2VuIGZsb3cnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcodGhpcy5vaWRjU2VjdXJpdHlDb21tb24uYWNjZXNzVG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgLy8gdXNlckRhdGEgaXMgc2V0IHRvIHRoZSBpZF90b2tlbiBkZWNvZGVkLiBObyBhY2Nlc3NfdG9rZW4uXG4gICAgICAgICAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlVc2VyU2VydmljZS5zZXRVc2VyRGF0YShkZWNvZGVkX2lkX3Rva2VuKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFVzZXJEYXRhKHRoaXMub2lkY1NlY3VyaXR5VXNlclNlcnZpY2UuZ2V0VXNlckRhdGEoKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5zZXNzaW9uU3RhdGUgPSByZXN1bHQuc2Vzc2lvbl9zdGF0ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucnVuVG9rZW5WYWxpZGF0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRydWUpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ29mZih1cmxIYW5kbGVyPzogKHVybDogc3RyaW5nKSA9PiBhbnkpIHtcbiAgICAgICAgLy8gL2Nvbm5lY3QvZW5kc2Vzc2lvbj9pZF90b2tlbl9oaW50PS4uLiZwb3N0X2xvZ291dF9yZWRpcmVjdF91cmk9aHR0cHM6Ly9teWFwcC5jb21cbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdCRUdJTiBBdXRob3JpemUsIG5vIGF1dGggZGF0YScpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMuZW5kX3Nlc3Npb25fZW5kcG9pbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmRfc2Vzc2lvbl9lbmRwb2ludCA9IHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLndlbGxLbm93bkVuZHBvaW50cy5lbmRfc2Vzc2lvbl9lbmRwb2ludDtcbiAgICAgICAgICAgICAgICBjb25zdCBpZF90b2tlbl9oaW50ID0gdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uaWRUb2tlbjtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUVuZFNlc3Npb25VcmwoZW5kX3Nlc3Npb25fZW5kcG9pbnQsIGlkX3Rva2VuX2hpbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldEF1dGhvcml6YXRpb25EYXRhKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnN0YXJ0X2NoZWNrc2Vzc2lvbiAmJiB0aGlzLmNoZWNrU2Vzc2lvbkNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdvbmx5IGxvY2FsIGxvZ2luIGNsZWFuZWQgdXAsIHNlcnZlciBzZXNzaW9uIGhhcyBjaGFuZ2VkJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1cmxIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybEhhbmRsZXIodXJsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZGlyZWN0VG8odXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRBdXRob3JpemF0aW9uRGF0YShmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdvbmx5IGxvY2FsIGxvZ2luIGNsZWFuZWQgdXAsIG5vIGVuZF9zZXNzaW9uX2VuZHBvaW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nV2FybmluZygnYXV0aFdlbGxLbm93bkVuZHBvaW50cyBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hTZXNzaW9uKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uc2lsZW50X3JlbmV3KSB7XG4gICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdCRUdJTiByZWZyZXNoIHNlc3Npb24gQXV0aG9yaXplJyk7XG4gICAgICAgIHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLnNpbGVudFJlbmV3UnVubmluZyA9ICdydW5uaW5nJztcblxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hdXRoU3RhdGVDb250cm9sO1xuICAgICAgICBpZiAoc3RhdGUgPT09ICcnIHx8IHN0YXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IERhdGUubm93KCkgKyAnJyArIE1hdGgucmFuZG9tKCkgKyBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uYXV0aFN0YXRlQ29udHJvbCA9IHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9uY2UgPSAnTicgKyBNYXRoLnJhbmRvbSgpICsgJycgKyBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hdXRoTm9uY2UgPSBub25jZTtcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdSZWZyZXNoU2Vzc2lvbiBjcmVhdGVkLiBhZGRpbmcgbXlhdXRvc3RhdGU6ICcgKyB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hdXRoU3RhdGVDb250cm9sKTtcblxuICAgICAgICBsZXQgdXJsID0gJyc7XG5cbiAgICAgICAgLy8gQ29kZSBGbG93XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnJlc3BvbnNlX3R5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24udXNlX3JlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAvLyB0cnkgdXNpbmcgcmVmcmVzaCB0b2tlblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZnJlc2hfdG9rZW4gPSB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5nZXRSZWZyZXNoVG9rZW4oKTtcbiAgICAgICAgICAgICAgICBpZiAocmVmcmVzaF90b2tlbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ2ZvdW5kIHJlZnJlc2ggY29kZSwgb2J0YWluaW5nIG5ldyBjcmVkZW50aWFscyB3aXRoIHJlZnJlc2ggY29kZScpO1xuICAgICAgICAgICAgICAgICAgICAvLyBOb25jZSBpcyBub3QgdXNlZCB3aXRoIHJlZnJlc2ggdG9rZW5zOyBidXQgS2V5Y2xvYWsgbWF5IHNlbmQgaXQgYW55d2F5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLmF1dGhOb25jZSA9IE9pZGNTZWN1cml0eVZhbGlkYXRpb24uUmVmcmVzaFRva2VuTm9uY2VQbGFjZWhvbGRlcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaFRva2Vuc1dpdGhDb2RlUHJvY2VkdXJlKHJlZnJlc2hfdG9rZW4sIHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ25vIHJlZnJlc2ggdG9rZW4gZm91bmQsIHVzaW5nIHNpbGVudCByZW5ldycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvZGVfY2hhbGxlbmdlIHdpdGggXCJTMjU2XCJcbiAgICAgICAgICAgIGNvbnN0IGNvZGVfdmVyaWZpZXIgPSAnQycgKyBNYXRoLnJhbmRvbSgpICsgJycgKyBEYXRlLm5vdygpICsgJycgKyBEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIGNvbnN0IGNvZGVfY2hhbGxlbmdlID0gdGhpcy5vaWRjU2VjdXJpdHlWYWxpZGF0aW9uLmdlbmVyYXRlX2NvZGVfdmVyaWZpZXIoY29kZV92ZXJpZmllcik7XG5cbiAgICAgICAgICAgIHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLmNvZGVfdmVyaWZpZXIgPSBjb2RlX3ZlcmlmaWVyO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5jcmVhdGVBdXRob3JpemVVcmwoXG4gICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnNpbGVudF9yZW5ld191cmwsXG4gICAgICAgICAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzLmF1dGhvcml6YXRpb25fZW5kcG9pbnQgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICdub25lJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdhdXRoV2VsbEtub3duRW5kcG9pbnRzIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLndlbGxLbm93bkVuZHBvaW50cykge1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuY3JlYXRlQXV0aG9yaXplVXJsKFxuICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uc2lsZW50X3JlbmV3X3VybCxcbiAgICAgICAgICAgICAgICAgICAgbm9uY2UsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMuYXV0aG9yaXphdGlvbl9lbmRwb2ludCB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ25vbmUnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ1dhcm5pbmcoJ2F1dGhXZWxsS25vd25FbmRwb2ludHMgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vaWRjU2VjdXJpdHlTaWxlbnRSZW5ldy5zdGFydFJlbmV3KHVybCkucGlwZShtYXAoKCkgPT4gdHJ1ZSkpO1xuICAgIH1cblxuICAgIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc3Qgc2lsZW50UmVuZXcgPSB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5zaWxlbnRSZW5ld1J1bm5pbmc7XG4gICAgICAgIGNvbnN0IGlzUmVuZXdQcm9jZXNzID0gc2lsZW50UmVuZXcgPT09ICdydW5uaW5nJztcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0Vycm9yKGVycm9yKTtcbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAzIHx8IGVycm9yLnN0YXR1cyA9PT0gJzQwMycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnRyaWdnZXJfYXV0aG9yaXphdGlvbl9yZXN1bHRfZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkF1dGhvcml6YXRpb25SZXN1bHQubmV4dChuZXcgQXV0aG9yaXphdGlvblJlc3VsdChBdXRob3JpemF0aW9uU3RhdGUudW5hdXRob3JpemVkLCBWYWxpZGF0aW9uUmVzdWx0Lk5vdFNldCwgaXNSZW5ld1Byb2Nlc3MpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uZm9yYmlkZGVuX3JvdXRlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDEgfHwgZXJyb3Iuc3RhdHVzID09PSAnNDAxJykge1xuICAgICAgICAgICAgY29uc3Qgc2lsZW50UmVuZXdSdW5uaW5nID0gdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uc2lsZW50UmVuZXdSdW5uaW5nO1xuXG4gICAgICAgICAgICB0aGlzLnJlc2V0QXV0aG9yaXphdGlvbkRhdGEoISFzaWxlbnRSZW5ld1J1bm5pbmcpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi50cmlnZ2VyX2F1dGhvcml6YXRpb25fcmVzdWx0X2V2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25BdXRob3JpemF0aW9uUmVzdWx0Lm5leHQobmV3IEF1dGhvcml6YXRpb25SZXN1bHQoQXV0aG9yaXphdGlvblN0YXRlLnVuYXV0aG9yaXplZCwgVmFsaWRhdGlvblJlc3VsdC5Ob3RTZXQsIGlzUmVuZXdQcm9jZXNzKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLnVuYXV0aG9yaXplZF9yb3V0ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRDaGVja2luZ1NpbGVudFJlbmV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJ1blRva2VuVmFsaWRhdGlvbigpO1xuICAgIH1cblxuICAgIHN0b3BDaGVja2luZ1NpbGVudFJlbmV3KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2NoZWR1bGVkSGVhcnRCZWF0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2NoZWR1bGVkSGVhcnRCZWF0KTtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlZEhlYXJ0QmVhdCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnJ1blRva2VuVmFsaWRhdGlvblJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0QXV0aG9yaXphdGlvbkRhdGEoaXNSZW5ld1Byb2Nlc3M6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFpc1JlbmV3UHJvY2Vzcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uYXV0b191c2VyaW5mbykge1xuICAgICAgICAgICAgICAgIC8vIENsZWFyIHVzZXIgZGF0YS4gRml4ZXMgIzk3LlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VXNlckRhdGEoJycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5yZXNldFN0b3JhZ2VEYXRhKGlzUmVuZXdQcm9jZXNzKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTZXNzaW9uQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZXRJc0F1dGhvcml6ZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RW5kU2Vzc2lvblVybCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzLmVuZF9zZXNzaW9uX2VuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kX3Nlc3Npb25fZW5kcG9pbnQgPSB0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMuZW5kX3Nlc3Npb25fZW5kcG9pbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgaWRfdG9rZW5faGludCA9IHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLmlkVG9rZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRW5kU2Vzc2lvblVybChlbmRfc2Vzc2lvbl9lbmRwb2ludCwgaWRfdG9rZW5faGludCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFZhbGlkYXRlZFN0YXRlUmVzdWx0KHJlc3VsdDogYW55LCBqd3RLZXlzOiBKd3RLZXlzKTogVmFsaWRhdGVTdGF0ZVJlc3VsdCB7XG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmFsaWRhdGVTdGF0ZVJlc3VsdCgnJywgJycsIGZhbHNlLCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZVZhbGlkYXRpb25TZXJ2aWNlLnZhbGlkYXRlU3RhdGUocmVzdWx0LCBqd3RLZXlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFVzZXJEYXRhKHVzZXJEYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24udXNlckRhdGEgPSB1c2VyRGF0YTtcbiAgICAgICAgdGhpcy5fdXNlckRhdGEubmV4dCh1c2VyRGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJc0F1dGhvcml6ZWQoaXNBdXRob3JpemVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2lzQXV0aG9yaXplZC5uZXh0KGlzQXV0aG9yaXplZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRBdXRob3JpemF0aW9uRGF0YShhY2Nlc3NfdG9rZW46IGFueSwgaWRfdG9rZW46IGFueSkge1xuICAgICAgICBpZiAodGhpcy5vaWRjU2VjdXJpdHlDb21tb24uYWNjZXNzVG9rZW4gIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hY2Nlc3NUb2tlbiA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKGFjY2Vzc190b2tlbik7XG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZyhpZF90b2tlbik7XG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1Zygnc3RvcmluZyB0byBzdG9yYWdlLCBnZXR0aW5nIHRoZSByb2xlcycpO1xuICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5hY2Nlc3NUb2tlbiA9IGFjY2Vzc190b2tlbjtcbiAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uaWRUb2tlbiA9IGlkX3Rva2VuO1xuICAgICAgICB0aGlzLnNldElzQXV0aG9yaXplZCh0cnVlKTtcbiAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uaXNBdXRob3JpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUF1dGhvcml6ZVVybChcbiAgICAgICAgaXNDb2RlRmxvdzogYm9vbGVhbixcbiAgICAgICAgY29kZV9jaGFsbGVuZ2U6IHN0cmluZyxcbiAgICAgICAgcmVkaXJlY3RfdXJsOiBzdHJpbmcsXG4gICAgICAgIG5vbmNlOiBzdHJpbmcsXG4gICAgICAgIHN0YXRlOiBzdHJpbmcsXG4gICAgICAgIGF1dGhvcml6YXRpb25fZW5kcG9pbnQ6IHN0cmluZyxcbiAgICAgICAgcHJvbXB0Pzogc3RyaW5nXG4gICAgKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdXJsUGFydHMgPSBhdXRob3JpemF0aW9uX2VuZHBvaW50LnNwbGl0KCc/Jyk7XG4gICAgICAgIGNvbnN0IGF1dGhvcml6YXRpb25VcmwgPSB1cmxQYXJ0c1swXTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtcbiAgICAgICAgICAgIGZyb21TdHJpbmc6IHVybFBhcnRzWzFdLFxuICAgICAgICAgICAgZW5jb2RlcjogbmV3IFVyaUVuY29kZXIoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2NsaWVudF9pZCcsIHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uY2xpZW50X2lkKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgncmVkaXJlY3RfdXJpJywgcmVkaXJlY3RfdXJsKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgncmVzcG9uc2VfdHlwZScsIHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24ucmVzcG9uc2VfdHlwZSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ3Njb3BlJywgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5zY29wZSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ25vbmNlJywgbm9uY2UpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdzdGF0ZScsIHN0YXRlKTtcblxuICAgICAgICBpZiAoaXNDb2RlRmxvdykge1xuICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgnY29kZV9jaGFsbGVuZ2UnLCBjb2RlX2NoYWxsZW5nZSk7XG4gICAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdjb2RlX2NoYWxsZW5nZV9tZXRob2QnLCAnUzI1NicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb21wdCkge1xuICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgncHJvbXB0JywgcHJvbXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci5vcGVuSURDb25maWd1cmF0aW9uLmhkX3BhcmFtKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdoZCcsIHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uaGRfcGFyYW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VzdG9tUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uY3VzdG9tUmVxdWVzdFBhcmFtcyk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoY3VzdG9tUGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKGtleSwgY3VzdG9tUGFyYW1zW2tleV0udG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBgJHthdXRob3JpemF0aW9uVXJsfT8ke3BhcmFtc31gO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRW5kU2Vzc2lvblVybChlbmRfc2Vzc2lvbl9lbmRwb2ludDogc3RyaW5nLCBpZF90b2tlbl9oaW50OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdXJsUGFydHMgPSBlbmRfc2Vzc2lvbl9lbmRwb2ludC5zcGxpdCgnPycpO1xuXG4gICAgICAgIGNvbnN0IGF1dGhvcml6YXRpb25FbmRzZXNzaW9uVXJsID0gdXJsUGFydHNbMF07XG5cbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtcbiAgICAgICAgICAgIGZyb21TdHJpbmc6IHVybFBhcnRzWzFdLFxuICAgICAgICAgICAgZW5jb2RlcjogbmV3IFVyaUVuY29kZXIoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2lkX3Rva2VuX2hpbnQnLCBpZF90b2tlbl9oaW50KTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgncG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpJywgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkpO1xuXG4gICAgICAgIHJldHVybiBgJHthdXRob3JpemF0aW9uRW5kc2Vzc2lvblVybH0/JHtwYXJhbXN9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNpZ25pbmdLZXlzKCk6IE9ic2VydmFibGU8Snd0S2V5cz4ge1xuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ2p3a3NfdXJpOiAnICsgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIud2VsbEtub3duRW5kcG9pbnRzLmp3a3NfdXJpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2lkY0RhdGFTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmdldDxKd3RLZXlzPih0aGlzLmNvbmZpZ3VyYXRpb25Qcm92aWRlci53ZWxsS25vd25FbmRwb2ludHMuandrc191cmkgfHwgJycpXG4gICAgICAgICAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yR2V0U2lnbmluZ0tleXMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdnZXRTaWduaW5nS2V5czogYXV0aFdlbGxLbm93bkVuZHBvaW50cyBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9pZGNEYXRhU2VydmljZS5nZXQ8Snd0S2V5cz4oJ3VuZGVmaW5lZCcpLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yR2V0U2lnbmluZ0tleXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUVycm9yR2V0U2lnbmluZ0tleXMoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGxldCBlcnJNc2c6IHN0cmluZztcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwge307XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJNc2cgPSBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0Vycm9yKGVyck1zZyk7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVyck1zZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBydW5Ub2tlblZhbGlkYXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnJ1blRva2VuVmFsaWRhdGlvblJ1bm5pbmcgfHwgIXRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24uc2lsZW50X3JlbmV3KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ydW5Ub2tlblZhbGlkYXRpb25SdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdydW5Ub2tlblZhbGlkYXRpb24gc2lsZW50LXJlbmV3IHJ1bm5pbmcnKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogICBGaXJzdCB0aW1lOiBkZWxheSAxMCBzZWNvbmRzIHRvIGNhbGwgc2lsZW50UmVuZXdIZWFydEJlYXRDaGVja1xuICAgICAgICAgKiAgIEFmdGVyd2FyZHM6IFJ1biB0aGlzIGNoZWNrIGluIGEgNSBzZWNvbmQgaW50ZXJ2YWwgb25seSBBRlRFUiB0aGUgcHJldmlvdXMgb3BlcmF0aW9uIGVuZHMuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBzaWxlbnRSZW5ld0hlYXJ0QmVhdENoZWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKFxuICAgICAgICAgICAgICAgICdzaWxlbnRSZW5ld0hlYXJ0QmVhdENoZWNrXFxyXFxuJyArXG4gICAgICAgICAgICAgICAgICAgIGBcXHRzaWxlbnRSZW5ld1J1bm5pbmc6ICR7dGhpcy5vaWRjU2VjdXJpdHlDb21tb24uc2lsZW50UmVuZXdSdW5uaW5nID09PSAncnVubmluZyd9XFxyXFxuYCArXG4gICAgICAgICAgICAgICAgICAgIGBcXHRpZFRva2VuOiAkeyEhdGhpcy5nZXRJZFRva2VuKCl9XFxyXFxuYCArXG4gICAgICAgICAgICAgICAgICAgIGBcXHRfdXNlckRhdGEudmFsdWU6ICR7ISF0aGlzLl91c2VyRGF0YS52YWx1ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLnZhbHVlICYmIHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLnNpbGVudFJlbmV3UnVubmluZyAhPT0gJ3J1bm5pbmcnICYmIHRoaXMuZ2V0SWRUb2tlbigpKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9pZGNTZWN1cml0eVZhbGlkYXRpb24uaXNUb2tlbkV4cGlyZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9pZGNTZWN1cml0eUNvbW1vbi5pZFRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5zaWxlbnRfcmVuZXdfb2Zmc2V0X2luX3NlY29uZHNcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ0lzQXV0aG9yaXplZDogaWRfdG9rZW4gaXNUb2tlbkV4cGlyZWQsIHN0YXJ0IHNpbGVudCByZW5ldyBpZiBhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uUHJvdmlkZXIub3BlbklEQ29uZmlndXJhdGlvbi5zaWxlbnRfcmVuZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFNlc3Npb24oKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZWRIZWFydEJlYXQgPSBzZXRUaW1lb3V0KHNpbGVudFJlbmV3SGVhcnRCZWF0Q2hlY2ssIDMwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dFcnJvcignRXJyb3I6ICcgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZWRIZWFydEJlYXQgPSBzZXRUaW1lb3V0KHNpbGVudFJlbmV3SGVhcnRCZWF0Q2hlY2ssIDMwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBJbiB0aGlzIHNpdHVhdGlvbiwgd2Ugc2NoZWR1bGUgYSBoZWFydGJlYXQgY2hlY2sgb25seSB3aGVuIHNpbGVudFJlbmV3IGlzIGZpbmlzaGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZG9uJ3Qgd2FudCB0byBzY2hlZHVsZSBhbm90aGVyIGNoZWNrIHNvIHdlIGhhdmUgdG8gcmV0dXJuIGhlcmUgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRBdXRob3JpemF0aW9uRGF0YShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIERlbGF5IDMgc2Vjb25kcyBhbmQgZG8gdGhlIG5leHQgY2hlY2sgKi9cbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlZEhlYXJ0QmVhdCA9IHNldFRpbWVvdXQoc2lsZW50UmVuZXdIZWFydEJlYXRDaGVjaywgMzAwMCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIC8qIEluaXRpYWwgaGVhcnRiZWF0IGNoZWNrICovXG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZWRIZWFydEJlYXQgPSBzZXRUaW1lb3V0KHNpbGVudFJlbmV3SGVhcnRCZWF0Q2hlY2ssIDEwMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaWxlbnRSZW5ld0V2ZW50SGFuZGxlcihlOiBDdXN0b21FdmVudCkge1xuICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ3NpbGVudFJlbmV3RXZlbnRIYW5kbGVyJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvblByb3ZpZGVyLm9wZW5JRENvbmZpZ3VyYXRpb24ucmVzcG9uc2VfdHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICBjb25zdCB1cmxQYXJ0cyA9IGUuZGV0YWlsLnRvU3RyaW5nKCkuc3BsaXQoJz8nKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtcbiAgICAgICAgICAgICAgICBmcm9tU3RyaW5nOiB1cmxQYXJ0c1sxXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgY29kZSA9IHBhcmFtcy5nZXQoJ2NvZGUnKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gcGFyYW1zLmdldCgnc3RhdGUnKTtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb25fc3RhdGUgPSBwYXJhbXMuZ2V0KCdzZXNzaW9uX3N0YXRlJyk7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IHBhcmFtcy5nZXQoJ2Vycm9yJyk7XG4gICAgICAgICAgICBpZiAoY29kZSAmJiBzdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdFRva2Vuc1dpdGhDb2RlUHJvY2VkdXJlKGNvZGUsIHN0YXRlLCBzZXNzaW9uX3N0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQXV0aG9yaXphdGlvblJlc3VsdC5uZXh0KG5ldyBBdXRob3JpemF0aW9uUmVzdWx0KEF1dGhvcml6YXRpb25TdGF0ZS51bmF1dGhvcml6ZWQsIFZhbGlkYXRpb25SZXN1bHQuTG9naW5SZXF1aXJlZCwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRBdXRob3JpemF0aW9uRGF0YShmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24uYXV0aE5vbmNlID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKGUuZGV0YWlsLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSW1wbGljaXRGbG93XG4gICAgICAgICAgICB0aGlzLmF1dGhvcml6ZWRJbXBsaWNpdEZsb3dDYWxsYmFjayhlLmRldGFpbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=