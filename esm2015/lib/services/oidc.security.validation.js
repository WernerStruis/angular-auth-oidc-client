/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { hextob64u, KEYUTIL, KJUR } from 'jsrsasign-reduced';
import { EqualityHelperService } from './oidc-equality-helper.service';
import { TokenHelperService } from './oidc-token-helper.service';
import { LoggerService } from './oidc.logger.service';
// http://openid.net/specs/openid-connect-implicit-1_0.html
// id_token
// id_token C1: The Issuer Identifier for the OpenID Provider (which is typically obtained during Discovery)
// MUST exactly match the value of the iss (issuer) Claim.
//
// id_token C2: The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer identified
// by the iss (issuer) Claim as an audience.The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience,
// or if it contains additional audiences not trusted by the Client.
//
// id_token C3: If the ID Token contains multiple audiences, the Client SHOULD verify that an azp Claim is present.
//
// id_token C4: If an azp (authorized party) Claim is present, the Client SHOULD verify that its client_id is the Claim Value.
//
// id_token C5: The Client MUST validate the signature of the ID Token according to JWS [JWS] using the algorithm specified in the
// alg Header Parameter of the JOSE Header.The Client MUST use the keys provided by the Issuer.
//
// id_token C6: The alg value SHOULD be RS256. Validation of tokens using other signing algorithms is described in the OpenID Connect Core 1.0
// [OpenID.Core] specification.
//
// id_token C7: The current time MUST be before the time represented by the exp Claim (possibly allowing for some small leeway to account
// for clock skew).
//
// id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
// limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
//
// id_token C9: The value of the nonce Claim MUST be checked to verify that it is the same value as the one that was sent
// in the Authentication Request.The Client SHOULD check the nonce value for replay attacks.The precise method for detecting replay attacks
// is Client specific.
//
// id_token C10: If the acr Claim was requested, the Client SHOULD check that the asserted Claim Value is appropriate.
// The meaning and processing of acr Claim Values is out of scope for this document.
//
// id_token C11: When a max_age request is made, the Client SHOULD check the auth_time Claim value and request re- authentication
// if it determines too much time has elapsed since the last End- User authentication.
// Access Token Validation
// access_token C1: Hash the octets of the ASCII representation of the access_token with the hash algorithm specified in JWA[JWA]
// for the alg Header Parameter of the ID Token's JOSE Header. For instance, if the alg is RS256, the hash algorithm used is SHA-256.
// access_token C2: Take the left- most half of the hash and base64url- encode it.
// access_token C3: The value of at_hash in the ID Token MUST match the value produced in the previous step if at_hash is present in the ID Token.
export class OidcSecurityValidation {
    /**
     * @param {?} arrayHelperService
     * @param {?} tokenHelperService
     * @param {?} loggerService
     */
    constructor(arrayHelperService, tokenHelperService, loggerService) {
        this.arrayHelperService = arrayHelperService;
        this.tokenHelperService = tokenHelperService;
        this.loggerService = loggerService;
    }
    // id_token C7: The current time MUST be before the time represented by the exp Claim
    // (possibly allowing for some small leeway to account for clock skew).
    /**
     * @param {?} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    isTokenExpired(token, offsetSeconds) {
        /** @type {?} */
        let decoded;
        decoded = this.tokenHelperService.getPayloadFromToken(token, false);
        return !this.validate_id_token_exp_not_expired(decoded, offsetSeconds);
    }
    // id_token C7: The current time MUST be before the time represented by the exp Claim
    // (possibly allowing for some small leeway to account for clock skew).
    // tslint:disable-next-line: variable-name
    /**
     * @param {?} decoded_id_token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    validate_id_token_exp_not_expired(decoded_id_token, offsetSeconds) {
        /** @type {?} */
        const tokenExpirationDate = this.tokenHelperService.getTokenExpirationDate(decoded_id_token);
        offsetSeconds = offsetSeconds || 0;
        if (!tokenExpirationDate) {
            return false;
        }
        /** @type {?} */
        const tokenExpirationValue = tokenExpirationDate.valueOf();
        /** @type {?} */
        const nowWithOffset = new Date().valueOf() + offsetSeconds * 1000;
        /** @type {?} */
        const tokenNotExpired = tokenExpirationValue > nowWithOffset;
        this.loggerService.logDebug(`Token not expired?: ${tokenExpirationValue} > ${nowWithOffset}  (${tokenNotExpired})`);
        // Token not expired?
        return tokenNotExpired;
    }
    // iss
    // REQUIRED. Issuer Identifier for the Issuer of the response.The iss value is a case-sensitive URL using the
    // https scheme that contains scheme, host,
    // and optionally, port number and path components and no query or fragment components.
    //
    // sub
    // REQUIRED. Subject Identifier.Locally unique and never reassigned identifier within the Issuer for the End- User,
    // which is intended to be consumed by the Client, e.g., 24400320 or AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4.
    // It MUST NOT exceed 255 ASCII characters in length.The sub value is a case-sensitive string.
    //
    // aud
    // REQUIRED. Audience(s) that this ID Token is intended for. It MUST contain the OAuth 2.0 client_id of the Relying Party as an audience value.
    // It MAY also contain identifiers for other audiences.In the general case, the aud value is an array of case-sensitive strings.
    // In the common special case when there is one audience, the aud value MAY be a single case-sensitive string.
    //
    // exp
    // REQUIRED. Expiration time on or after which the ID Token MUST NOT be accepted for processing.
    // The processing of this parameter requires that the current date/ time MUST be before the expiration date/ time listed in the value.
    // Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew.
    // Its value is a JSON [RFC7159] number representing the number of seconds from 1970- 01 - 01T00: 00:00Z as measured in UTC until the date/ time.
    // See RFC 3339 [RFC3339] for details regarding date/ times in general and UTC in particular.
    //
    // iat
    // REQUIRED. Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from
    // 1970- 01 - 01T00: 00: 00Z as measured
    // in UTC until the date/ time.
    /**
     * @param {?} dataIdToken
     * @return {?}
     */
    validate_required_id_token(dataIdToken) {
        /** @type {?} */
        let validated = true;
        if (!dataIdToken.hasOwnProperty('iss')) {
            validated = false;
            this.loggerService.logWarning('iss is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('sub')) {
            validated = false;
            this.loggerService.logWarning('sub is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('aud')) {
            validated = false;
            this.loggerService.logWarning('aud is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('exp')) {
            validated = false;
            this.loggerService.logWarning('exp is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('iat')) {
            validated = false;
            this.loggerService.logWarning('iat is missing, this is required in the id_token');
        }
        return validated;
    }
    // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
    // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
    /**
     * @param {?} dataIdToken
     * @param {?} maxOffsetAllowedInSeconds
     * @param {?} disableIatOffsetValidation
     * @return {?}
     */
    validate_id_token_iat_max_offset(dataIdToken, maxOffsetAllowedInSeconds, disableIatOffsetValidation) {
        if (disableIatOffsetValidation) {
            return true;
        }
        if (!dataIdToken.hasOwnProperty('iat')) {
            return false;
        }
        /** @type {?} */
        const dateTimeIatIdToken = new Date(0);
        dateTimeIatIdToken.setUTCSeconds(dataIdToken.iat);
        maxOffsetAllowedInSeconds = maxOffsetAllowedInSeconds || 0;
        if (dateTimeIatIdToken == null) {
            return false;
        }
        this.loggerService.logDebug('validate_id_token_iat_max_offset: ' + (new Date().valueOf() - dateTimeIatIdToken.valueOf()) + ' < ' + maxOffsetAllowedInSeconds * 1000);
        return new Date().valueOf() - dateTimeIatIdToken.valueOf() < maxOffsetAllowedInSeconds * 1000;
    }
    // id_token C9: The value of the nonce Claim MUST be checked to verify that it is the same value as the one
    // that was sent in the Authentication Request.The Client SHOULD check the nonce value for replay attacks.
    // The precise method for detecting replay attacks is Client specific.
    // However the nonce claim SHOULD not be present for the refesh_token grant type
    // https://bitbucket.org/openid/connect/issues/1025/ambiguity-with-how-nonce-is-handled-on
    // The current spec is ambiguous and Keycloak does send it.
    /**
     * @param {?} dataIdToken
     * @param {?} localNonce
     * @param {?} ignoreNonceAfterRefresh
     * @return {?}
     */
    validate_id_token_nonce(dataIdToken, localNonce, ignoreNonceAfterRefresh) {
        /** @type {?} */
        const isFromRefreshToken = (dataIdToken.nonce === undefined || ignoreNonceAfterRefresh) && localNonce === OidcSecurityValidation.RefreshTokenNoncePlaceholder;
        if (!isFromRefreshToken && dataIdToken.nonce !== localNonce) {
            this.loggerService.logDebug('Validate_id_token_nonce failed, dataIdToken.nonce: ' + dataIdToken.nonce + ' local_nonce:' + localNonce);
            return false;
        }
        return true;
    }
    // id_token C1: The Issuer Identifier for the OpenID Provider (which is typically obtained during Discovery)
    // MUST exactly match the value of the iss (issuer) Claim.
    // tslint:disable-next-line: variable-name
    /**
     * @param {?} dataIdToken
     * @param {?} authWellKnownEndpoints_issuer
     * @return {?}
     */
    validate_id_token_iss(dataIdToken, authWellKnownEndpoints_issuer) {
        if (((/** @type {?} */ (dataIdToken.iss))) !== ((/** @type {?} */ (authWellKnownEndpoints_issuer)))) {
            this.loggerService.logDebug('Validate_id_token_iss failed, dataIdToken.iss: ' +
                dataIdToken.iss +
                ' authWellKnownEndpoints issuer:' +
                authWellKnownEndpoints_issuer);
            return false;
        }
        return true;
    }
    // id_token C2: The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer identified
    // by the iss (issuer) Claim as an audience.
    // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience, or if it contains additional audiences
    // not trusted by the Client.
    /**
     * @param {?} dataIdToken
     * @param {?} aud
     * @return {?}
     */
    validate_id_token_aud(dataIdToken, aud) {
        if (dataIdToken.aud instanceof Array) {
            /** @type {?} */
            const result = this.arrayHelperService.areEqual(dataIdToken.aud, aud);
            if (!result) {
                this.loggerService.logDebug('Validate_id_token_aud  array failed, dataIdToken.aud: ' + dataIdToken.aud + ' client_id:' + aud);
                return false;
            }
            return true;
        }
        else if (dataIdToken.aud !== aud) {
            this.loggerService.logDebug('Validate_id_token_aud failed, dataIdToken.aud: ' + dataIdToken.aud + ' client_id:' + aud);
            return false;
        }
        return true;
    }
    /**
     * @param {?} state
     * @param {?} localState
     * @return {?}
     */
    validateStateFromHashCallback(state, localState) {
        if (((/** @type {?} */ (state))) !== ((/** @type {?} */ (localState)))) {
            this.loggerService.logDebug('ValidateStateFromHashCallback failed, state: ' + state + ' local_state:' + localState);
            return false;
        }
        return true;
    }
    /**
     * @param {?} idTokenSub
     * @param {?} userdataSub
     * @return {?}
     */
    validate_userdata_sub_id_token(idTokenSub, userdataSub) {
        if (((/** @type {?} */ (idTokenSub))) !== ((/** @type {?} */ (userdataSub)))) {
            this.loggerService.logDebug('validate_userdata_sub_id_token failed, id_token_sub: ' + idTokenSub + ' userdata_sub:' + userdataSub);
            return false;
        }
        return true;
    }
    // id_token C5: The Client MUST validate the signature of the ID Token according to JWS [JWS] using the algorithm specified in the alg
    // Header Parameter of the JOSE Header.The Client MUST use the keys provided by the Issuer.
    // id_token C6: The alg value SHOULD be RS256. Validation of tokens using other signing algorithms is described in the
    // OpenID Connect Core 1.0 [OpenID.Core] specification.
    /**
     * @param {?} idToken
     * @param {?} jwtkeys
     * @return {?}
     */
    validate_signature_id_token(idToken, jwtkeys) {
        if (!jwtkeys || !jwtkeys.keys) {
            return false;
        }
        /** @type {?} */
        const headerData = this.tokenHelperService.getHeaderFromToken(idToken, false);
        if (Object.keys(headerData).length === 0 && headerData.constructor === Object) {
            this.loggerService.logWarning('id token has no header data');
            return false;
        }
        /** @type {?} */
        const kid = headerData.kid;
        /** @type {?} */
        const alg = headerData.alg;
        if ('RS256' !== ((/** @type {?} */ (alg)))) {
            this.loggerService.logWarning('Only RS256 supported');
            return false;
        }
        /** @type {?} */
        let isValid = false;
        if (!headerData.hasOwnProperty('kid')) {
            // exactly 1 key in the jwtkeys and no kid in the Jose header
            // kty	"RSA" use "sig"
            /** @type {?} */
            let amountOfMatchingKeys = 0;
            for (const key of jwtkeys.keys) {
                if (((/** @type {?} */ (key.kty))) === 'RSA' && ((/** @type {?} */ (key.use))) === 'sig') {
                    amountOfMatchingKeys = amountOfMatchingKeys + 1;
                }
            }
            if (amountOfMatchingKeys === 0) {
                this.loggerService.logWarning('no keys found, incorrect Signature, validation failed for id_token');
                return false;
            }
            else if (amountOfMatchingKeys > 1) {
                this.loggerService.logWarning('no ID Token kid claim in JOSE header and multiple supplied in jwks_uri');
                return false;
            }
            else {
                for (const key of jwtkeys.keys) {
                    if (((/** @type {?} */ (key.kty))) === 'RSA' && ((/** @type {?} */ (key.use))) === 'sig') {
                        /** @type {?} */
                        const publickey = KEYUTIL.getKey(key);
                        isValid = KJUR.jws.JWS.verify(idToken, publickey, ['RS256']);
                        if (!isValid) {
                            this.loggerService.logWarning('incorrect Signature, validation failed for id_token');
                        }
                        return isValid;
                    }
                }
            }
        }
        else {
            // kid in the Jose header of id_token
            for (const key of jwtkeys.keys) {
                if (((/** @type {?} */ (key.kid))) === ((/** @type {?} */ (kid)))) {
                    /** @type {?} */
                    const publickey = KEYUTIL.getKey(key);
                    isValid = KJUR.jws.JWS.verify(idToken, publickey, ['RS256']);
                    if (!isValid) {
                        this.loggerService.logWarning('incorrect Signature, validation failed for id_token');
                    }
                    return isValid;
                }
            }
        }
        return isValid;
    }
    /**
     * @param {?} responseType
     * @return {?}
     */
    config_validate_response_type(responseType) {
        if (responseType === 'id_token token' || responseType === 'id_token') {
            return true;
        }
        if (responseType === 'code') {
            return true;
        }
        this.loggerService.logWarning('module configure incorrect, invalid response_type:' + responseType);
        return false;
    }
    // Accepts ID Token without 'kid' claim in JOSE header if only one JWK supplied in 'jwks_url'
    //// private validate_no_kid_in_header_only_one_allowed_in_jwtkeys(header_data: any, jwtkeys: any): boolean {
    ////    this.oidcSecurityCommon.logDebug('amount of jwtkeys.keys: ' + jwtkeys.keys.length);
    ////    if (!header_data.hasOwnProperty('kid')) {
    ////        // no kid defined in Jose header
    ////        if (jwtkeys.keys.length != 1) {
    ////            this.oidcSecurityCommon.logDebug('jwtkeys.keys.length != 1 and no kid in header');
    ////            return false;
    ////        }
    ////    }
    ////    return true;
    //// }
    // Access Token Validation
    // access_token C1: Hash the octets of the ASCII representation of the access_token with the hash algorithm specified in JWA[JWA]
    // for the alg Header Parameter of the ID Token's JOSE Header. For instance, if the alg is RS256, the hash algorithm used is SHA-256.
    // access_token C2: Take the left- most half of the hash and base64url- encode it.
    // access_token C3: The value of at_hash in the ID Token MUST match the value produced in the previous step if at_hash
    // is present in the ID Token.
    /**
     * @param {?} accessToken
     * @param {?} atHash
     * @param {?} isCodeFlow
     * @return {?}
     */
    validate_id_token_at_hash(accessToken, atHash, isCodeFlow) {
        this.loggerService.logDebug('at_hash from the server:' + atHash);
        // The at_hash is optional for the code flow
        if (isCodeFlow) {
            if (!((/** @type {?} */ (atHash)))) {
                this.loggerService.logDebug('Code Flow active, and no at_hash in the id_token, skipping check!');
                return true;
            }
        }
        /** @type {?} */
        const testdata = this.generate_at_hash('' + accessToken);
        this.loggerService.logDebug('at_hash client validation not decoded:' + testdata);
        if (testdata === ((/** @type {?} */ (atHash)))) {
            return true; // isValid;
        }
        else {
            /** @type {?} */
            const testValue = this.generate_at_hash('' + decodeURIComponent(accessToken));
            this.loggerService.logDebug('-gen access--' + testValue);
            if (testValue === ((/** @type {?} */ (atHash)))) {
                return true; // isValid
            }
        }
        return false;
    }
    /**
     * @private
     * @param {?} accessToken
     * @return {?}
     */
    generate_at_hash(accessToken) {
        /** @type {?} */
        const hash = KJUR.crypto.Util.hashString(accessToken, 'sha256');
        /** @type {?} */
        const first128bits = hash.substr(0, hash.length / 2);
        /** @type {?} */
        const testdata = hextob64u(first128bits);
        return testdata;
    }
    /**
     * @param {?} codeChallenge
     * @return {?}
     */
    generate_code_verifier(codeChallenge) {
        /** @type {?} */
        const hash = KJUR.crypto.Util.hashString(codeChallenge, 'sha256');
        /** @type {?} */
        const testdata = hextob64u(hash);
        return testdata;
    }
}
OidcSecurityValidation.RefreshTokenNoncePlaceholder = '--RefreshToken--';
OidcSecurityValidation.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OidcSecurityValidation.ctorParameters = () => [
    { type: EqualityHelperService },
    { type: TokenHelperService },
    { type: LoggerService }
];
if (false) {
    /** @type {?} */
    OidcSecurityValidation.RefreshTokenNoncePlaceholder;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityValidation.prototype.arrayHelperService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityValidation.prototype.tokenHelperService;
    /**
     * @type {?}
     * @private
     */
    OidcSecurityValidation.prototype.loggerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2lkYy5zZWN1cml0eS52YWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLW9pZGMtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29pZGMuc2VjdXJpdHkudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2Q3RELE1BQU0sT0FBTyxzQkFBc0I7Ozs7OztJQUcvQixZQUNZLGtCQUF5QyxFQUN6QyxrQkFBc0MsRUFDdEMsYUFBNEI7UUFGNUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtRQUN6Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ3JDLENBQUM7Ozs7Ozs7O0lBSUosY0FBYyxDQUFDLEtBQWEsRUFBRSxhQUFzQjs7WUFDNUMsT0FBWTtRQUNoQixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVwRSxPQUFPLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7Ozs7Ozs7SUFLRCxpQ0FBaUMsQ0FBQyxnQkFBd0IsRUFBRSxhQUFzQjs7Y0FDeEUsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGtC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QUMsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUN6RCxJQUFJLFNBQVMsS0FBSyxDQUFDLG1CQUFBLE1BQU0sRUFBVSxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFDLENBQUMsVUFBVTthQUMxQjtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsV0FBZ0I7O2NBQy9CLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQzs7Y0FDekQsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOztjQUM5QyxRQUFRLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztRQUV4QyxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDOzs7OztJQUVELHNCQUFzQixDQUFDLGFBQWtCOztjQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7O2NBQzNELFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBRWhDLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7O0FBblZNLG1EQUE0QixHQUFHLGtCQUFrQixDQUFDOztZQUY1RCxVQUFVOzs7O1lBOUNGLHFCQUFxQjtZQUNyQixrQkFBa0I7WUFDbEIsYUFBYTs7OztJQThDbEIsb0RBQXlEOzs7OztJQUdyRCxvREFBaUQ7Ozs7O0lBQ2pELG9EQUE4Qzs7Ozs7SUFDOUMsK0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaGV4dG9iNjR1LCBLRVlVVElMLCBLSlVSIH0gZnJvbSAnanNyc2FzaWduLXJlZHVjZWQnO1xuaW1wb3J0IHsgRXF1YWxpdHlIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9vaWRjLWVxdWFsaXR5LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IFRva2VuSGVscGVyU2VydmljZSB9IGZyb20gJy4vb2lkYy10b2tlbi1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi9vaWRjLmxvZ2dlci5zZXJ2aWNlJztcblxuLy8gaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtaW1wbGljaXQtMV8wLmh0bWxcblxuLy8gaWRfdG9rZW5cbi8vIGlkX3Rva2VuIEMxOiBUaGUgSXNzdWVyIElkZW50aWZpZXIgZm9yIHRoZSBPcGVuSUQgUHJvdmlkZXIgKHdoaWNoIGlzIHR5cGljYWxseSBvYnRhaW5lZCBkdXJpbmcgRGlzY292ZXJ5KVxuLy8gTVVTVCBleGFjdGx5IG1hdGNoIHRoZSB2YWx1ZSBvZiB0aGUgaXNzIChpc3N1ZXIpIENsYWltLlxuLy9cbi8vIGlkX3Rva2VuIEMyOiBUaGUgQ2xpZW50IE1VU1QgdmFsaWRhdGUgdGhhdCB0aGUgYXVkIChhdWRpZW5jZSkgQ2xhaW0gY29udGFpbnMgaXRzIGNsaWVudF9pZCB2YWx1ZSByZWdpc3RlcmVkIGF0IHRoZSBJc3N1ZXIgaWRlbnRpZmllZFxuLy8gYnkgdGhlIGlzcyAoaXNzdWVyKSBDbGFpbSBhcyBhbiBhdWRpZW5jZS5UaGUgSUQgVG9rZW4gTVVTVCBiZSByZWplY3RlZCBpZiB0aGUgSUQgVG9rZW4gZG9lcyBub3QgbGlzdCB0aGUgQ2xpZW50IGFzIGEgdmFsaWQgYXVkaWVuY2UsXG4vLyBvciBpZiBpdCBjb250YWlucyBhZGRpdGlvbmFsIGF1ZGllbmNlcyBub3QgdHJ1c3RlZCBieSB0aGUgQ2xpZW50LlxuLy9cbi8vIGlkX3Rva2VuIEMzOiBJZiB0aGUgSUQgVG9rZW4gY29udGFpbnMgbXVsdGlwbGUgYXVkaWVuY2VzLCB0aGUgQ2xpZW50IFNIT1VMRCB2ZXJpZnkgdGhhdCBhbiBhenAgQ2xhaW0gaXMgcHJlc2VudC5cbi8vXG4vLyBpZF90b2tlbiBDNDogSWYgYW4gYXpwIChhdXRob3JpemVkIHBhcnR5KSBDbGFpbSBpcyBwcmVzZW50LCB0aGUgQ2xpZW50IFNIT1VMRCB2ZXJpZnkgdGhhdCBpdHMgY2xpZW50X2lkIGlzIHRoZSBDbGFpbSBWYWx1ZS5cbi8vXG4vLyBpZF90b2tlbiBDNTogVGhlIENsaWVudCBNVVNUIHZhbGlkYXRlIHRoZSBzaWduYXR1cmUgb2YgdGhlIElEIFRva2VuIGFjY29yZGluZyB0byBKV1MgW0pXU10gdXNpbmcgdGhlIGFsZ29yaXRobSBzcGVjaWZpZWQgaW4gdGhlXG4vLyBhbGcgSGVhZGVyIFBhcmFtZXRlciBvZiB0aGUgSk9TRSBIZWFkZXIuVGhlIENsaWVudCBNVVNUIHVzZSB0aGUga2V5cyBwcm92aWRlZCBieSB0aGUgSXNzdWVyLlxuLy9cbi8vIGlkX3Rva2VuIEM2OiBUaGUgYWxnIHZhbHVlIFNIT1VMRCBiZSBSUzI1Ni4gVmFsaWRhdGlvbiBvZiB0b2tlbnMgdXNpbmcgb3RoZXIgc2lnbmluZyBhbGdvcml0aG1zIGlzIGRlc2NyaWJlZCBpbiB0aGUgT3BlbklEIENvbm5lY3QgQ29yZSAxLjBcbi8vIFtPcGVuSUQuQ29yZV0gc3BlY2lmaWNhdGlvbi5cbi8vXG4vLyBpZF90b2tlbiBDNzogVGhlIGN1cnJlbnQgdGltZSBNVVNUIGJlIGJlZm9yZSB0aGUgdGltZSByZXByZXNlbnRlZCBieSB0aGUgZXhwIENsYWltIChwb3NzaWJseSBhbGxvd2luZyBmb3Igc29tZSBzbWFsbCBsZWV3YXkgdG8gYWNjb3VudFxuLy8gZm9yIGNsb2NrIHNrZXcpLlxuLy9cbi8vIGlkX3Rva2VuIEM4OiBUaGUgaWF0IENsYWltIGNhbiBiZSB1c2VkIHRvIHJlamVjdCB0b2tlbnMgdGhhdCB3ZXJlIGlzc3VlZCB0b28gZmFyIGF3YXkgZnJvbSB0aGUgY3VycmVudCB0aW1lLFxuLy8gbGltaXRpbmcgdGhlIGFtb3VudCBvZiB0aW1lIHRoYXQgbm9uY2VzIG5lZWQgdG8gYmUgc3RvcmVkIHRvIHByZXZlbnQgYXR0YWNrcy5UaGUgYWNjZXB0YWJsZSByYW5nZSBpcyBDbGllbnQgc3BlY2lmaWMuXG4vL1xuLy8gaWRfdG9rZW4gQzk6IFRoZSB2YWx1ZSBvZiB0aGUgbm9uY2UgQ2xhaW0gTVVTVCBiZSBjaGVja2VkIHRvIHZlcmlmeSB0aGF0IGl0IGlzIHRoZSBzYW1lIHZhbHVlIGFzIHRoZSBvbmUgdGhhdCB3YXMgc2VudFxuLy8gaW4gdGhlIEF1dGhlbnRpY2F0aW9uIFJlcXVlc3QuVGhlIENsaWVudCBTSE9VTEQgY2hlY2sgdGhlIG5vbmNlIHZhbHVlIGZvciByZXBsYXkgYXR0YWNrcy5UaGUgcHJlY2lzZSBtZXRob2QgZm9yIGRldGVjdGluZyByZXBsYXkgYXR0YWNrc1xuLy8gaXMgQ2xpZW50IHNwZWNpZmljLlxuLy9cbi8vIGlkX3Rva2VuIEMxMDogSWYgdGhlIGFjciBDbGFpbSB3YXMgcmVxdWVzdGVkLCB0aGUgQ2xpZW50IFNIT1VMRCBjaGVjayB0aGF0IHRoZSBhc3NlcnRlZCBDbGFpbSBWYWx1ZSBpcyBhcHByb3ByaWF0ZS5cbi8vIFRoZSBtZWFuaW5nIGFuZCBwcm9jZXNzaW5nIG9mIGFjciBDbGFpbSBWYWx1ZXMgaXMgb3V0IG9mIHNjb3BlIGZvciB0aGlzIGRvY3VtZW50LlxuLy9cbi8vIGlkX3Rva2VuIEMxMTogV2hlbiBhIG1heF9hZ2UgcmVxdWVzdCBpcyBtYWRlLCB0aGUgQ2xpZW50IFNIT1VMRCBjaGVjayB0aGUgYXV0aF90aW1lIENsYWltIHZhbHVlIGFuZCByZXF1ZXN0IHJlLSBhdXRoZW50aWNhdGlvblxuLy8gaWYgaXQgZGV0ZXJtaW5lcyB0b28gbXVjaCB0aW1lIGhhcyBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IEVuZC0gVXNlciBhdXRoZW50aWNhdGlvbi5cblxuLy8gQWNjZXNzIFRva2VuIFZhbGlkYXRpb25cbi8vIGFjY2Vzc190b2tlbiBDMTogSGFzaCB0aGUgb2N0ZXRzIG9mIHRoZSBBU0NJSSByZXByZXNlbnRhdGlvbiBvZiB0aGUgYWNjZXNzX3Rva2VuIHdpdGggdGhlIGhhc2ggYWxnb3JpdGhtIHNwZWNpZmllZCBpbiBKV0FbSldBXVxuLy8gZm9yIHRoZSBhbGcgSGVhZGVyIFBhcmFtZXRlciBvZiB0aGUgSUQgVG9rZW4ncyBKT1NFIEhlYWRlci4gRm9yIGluc3RhbmNlLCBpZiB0aGUgYWxnIGlzIFJTMjU2LCB0aGUgaGFzaCBhbGdvcml0aG0gdXNlZCBpcyBTSEEtMjU2LlxuLy8gYWNjZXNzX3Rva2VuIEMyOiBUYWtlIHRoZSBsZWZ0LSBtb3N0IGhhbGYgb2YgdGhlIGhhc2ggYW5kIGJhc2U2NHVybC0gZW5jb2RlIGl0LlxuLy8gYWNjZXNzX3Rva2VuIEMzOiBUaGUgdmFsdWUgb2YgYXRfaGFzaCBpbiB0aGUgSUQgVG9rZW4gTVVTVCBtYXRjaCB0aGUgdmFsdWUgcHJvZHVjZWQgaW4gdGhlIHByZXZpb3VzIHN0ZXAgaWYgYXRfaGFzaCBpcyBwcmVzZW50IGluIHRoZSBJRCBUb2tlbi5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9pZGNTZWN1cml0eVZhbGlkYXRpb24ge1xuICAgIHN0YXRpYyBSZWZyZXNoVG9rZW5Ob25jZVBsYWNlaG9sZGVyID0gJy0tUmVmcmVzaFRva2VuLS0nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYXJyYXlIZWxwZXJTZXJ2aWNlOiBFcXVhbGl0eUhlbHBlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdG9rZW5IZWxwZXJTZXJ2aWNlOiBUb2tlbkhlbHBlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbG9nZ2VyU2VydmljZTogTG9nZ2VyU2VydmljZVxuICAgICkge31cblxuICAgIC8vIGlkX3Rva2VuIEM3OiBUaGUgY3VycmVudCB0aW1lIE1VU1QgYmUgYmVmb3JlIHRoZSB0aW1lIHJlcHJlc2VudGVkIGJ5IHRoZSBleHAgQ2xhaW1cbiAgICAvLyAocG9zc2libHkgYWxsb3dpbmcgZm9yIHNvbWUgc21hbGwgbGVld2F5IHRvIGFjY291bnQgZm9yIGNsb2NrIHNrZXcpLlxuICAgIGlzVG9rZW5FeHBpcmVkKHRva2VuOiBzdHJpbmcsIG9mZnNldFNlY29uZHM/OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGRlY29kZWQ6IGFueTtcbiAgICAgICAgZGVjb2RlZCA9IHRoaXMudG9rZW5IZWxwZXJTZXJ2aWNlLmdldFBheWxvYWRGcm9tVG9rZW4odG9rZW4sIGZhbHNlKTtcblxuICAgICAgICByZXR1cm4gIXRoaXMudmFsaWRhdGVfaWRfdG9rZW5fZXhwX25vdF9leHBpcmVkKGRlY29kZWQsIG9mZnNldFNlY29uZHMpO1xuICAgIH1cblxuICAgIC8vIGlkX3Rva2VuIEM3OiBUaGUgY3VycmVudCB0aW1lIE1VU1QgYmUgYmVmb3JlIHRoZSB0aW1lIHJlcHJlc2VudGVkIGJ5IHRoZSBleHAgQ2xhaW1cbiAgICAvLyAocG9zc2libHkgYWxsb3dpbmcgZm9yIHNvbWUgc21hbGwgbGVld2F5IHRvIGFjY291bnQgZm9yIGNsb2NrIHNrZXcpLlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgIHZhbGlkYXRlX2lkX3Rva2VuX2V4cF9ub3RfZXhwaXJlZChkZWNvZGVkX2lkX3Rva2VuOiBzdHJpbmcsIG9mZnNldFNlY29uZHM/OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdG9rZW5FeHBpcmF0aW9uRGF0ZSA9IHRoaXMudG9rZW5IZWxwZXJTZXJ2aWNlLmdldFRva2VuRXhwaXJhdGlvbkRhdGUoZGVjb2RlZF9pZF90b2tlbik7XG4gICAgICAgIG9mZnNldFNlY29uZHMgPSBvZmZzZXRTZWNvbmRzIHx8IDA7XG5cbiAgICAgICAgaWYgKCF0b2tlbkV4cGlyYXRpb25EYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0b2tlbkV4cGlyYXRpb25WYWx1ZSA9IHRva2VuRXhwaXJhdGlvbkRhdGUudmFsdWVPZigpO1xuICAgICAgICBjb25zdCBub3dXaXRoT2Zmc2V0ID0gbmV3IERhdGUoKS52YWx1ZU9mKCkgKyBvZmZzZXRTZWNvbmRzICogMTAwMDtcbiAgICAgICAgY29uc3QgdG9rZW5Ob3RFeHBpcmVkID0gdG9rZW5FeHBpcmF0aW9uVmFsdWUgPiBub3dXaXRoT2Zmc2V0O1xuXG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZyhgVG9rZW4gbm90IGV4cGlyZWQ/OiAke3Rva2VuRXhwaXJhdGlvblZhbHVlfSA+ICR7bm93V2l0aE9mZnNldH0gICgke3Rva2VuTm90RXhwaXJlZH0pYCk7XG5cbiAgICAgICAgLy8gVG9rZW4gbm90IGV4cGlyZWQ/XG4gICAgICAgIHJldHVybiB0b2tlbk5vdEV4cGlyZWQ7XG4gICAgfVxuXG4gICAgLy8gaXNzXG4gICAgLy8gUkVRVUlSRUQuIElzc3VlciBJZGVudGlmaWVyIGZvciB0aGUgSXNzdWVyIG9mIHRoZSByZXNwb25zZS5UaGUgaXNzIHZhbHVlIGlzIGEgY2FzZS1zZW5zaXRpdmUgVVJMIHVzaW5nIHRoZVxuICAgIC8vIGh0dHBzIHNjaGVtZSB0aGF0IGNvbnRhaW5zIHNjaGVtZSwgaG9zdCxcbiAgICAvLyBhbmQgb3B0aW9uYWxseSwgcG9ydCBudW1iZXIgYW5kIHBhdGggY29tcG9uZW50cyBhbmQgbm8gcXVlcnkgb3IgZnJhZ21lbnQgY29tcG9uZW50cy5cbiAgICAvL1xuICAgIC8vIHN1YlxuICAgIC8vIFJFUVVJUkVELiBTdWJqZWN0IElkZW50aWZpZXIuTG9jYWxseSB1bmlxdWUgYW5kIG5ldmVyIHJlYXNzaWduZWQgaWRlbnRpZmllciB3aXRoaW4gdGhlIElzc3VlciBmb3IgdGhlIEVuZC0gVXNlcixcbiAgICAvLyB3aGljaCBpcyBpbnRlbmRlZCB0byBiZSBjb25zdW1lZCBieSB0aGUgQ2xpZW50LCBlLmcuLCAyNDQwMDMyMCBvciBBSXRPYXdtd3RXd2NUMGs1MUJheWV3TnZ1dHJKVXFzdmw2cXM3QTQuXG4gICAgLy8gSXQgTVVTVCBOT1QgZXhjZWVkIDI1NSBBU0NJSSBjaGFyYWN0ZXJzIGluIGxlbmd0aC5UaGUgc3ViIHZhbHVlIGlzIGEgY2FzZS1zZW5zaXRpdmUgc3RyaW5nLlxuICAgIC8vXG4gICAgLy8gYXVkXG4gICAgLy8gUkVRVUlSRUQuIEF1ZGllbmNlKHMpIHRoYXQgdGhpcyBJRCBUb2tlbiBpcyBpbnRlbmRlZCBmb3IuIEl0IE1VU1QgY29udGFpbiB0aGUgT0F1dGggMi4wIGNsaWVudF9pZCBvZiB0aGUgUmVseWluZyBQYXJ0eSBhcyBhbiBhdWRpZW5jZSB2YWx1ZS5cbiAgICAvLyBJdCBNQVkgYWxzbyBjb250YWluIGlkZW50aWZpZXJzIGZvciBvdGhlciBhdWRpZW5jZXMuSW4gdGhlIGdlbmVyYWwgY2FzZSwgdGhlIGF1ZCB2YWx1ZSBpcyBhbiBhcnJheSBvZiBjYXNlLXNlbnNpdGl2ZSBzdHJpbmdzLlxuICAgIC8vIEluIHRoZSBjb21tb24gc3BlY2lhbCBjYXNlIHdoZW4gdGhlcmUgaXMgb25lIGF1ZGllbmNlLCB0aGUgYXVkIHZhbHVlIE1BWSBiZSBhIHNpbmdsZSBjYXNlLXNlbnNpdGl2ZSBzdHJpbmcuXG4gICAgLy9cbiAgICAvLyBleHBcbiAgICAvLyBSRVFVSVJFRC4gRXhwaXJhdGlvbiB0aW1lIG9uIG9yIGFmdGVyIHdoaWNoIHRoZSBJRCBUb2tlbiBNVVNUIE5PVCBiZSBhY2NlcHRlZCBmb3IgcHJvY2Vzc2luZy5cbiAgICAvLyBUaGUgcHJvY2Vzc2luZyBvZiB0aGlzIHBhcmFtZXRlciByZXF1aXJlcyB0aGF0IHRoZSBjdXJyZW50IGRhdGUvIHRpbWUgTVVTVCBiZSBiZWZvcmUgdGhlIGV4cGlyYXRpb24gZGF0ZS8gdGltZSBsaXN0ZWQgaW4gdGhlIHZhbHVlLlxuICAgIC8vIEltcGxlbWVudGVycyBNQVkgcHJvdmlkZSBmb3Igc29tZSBzbWFsbCBsZWV3YXksIHVzdWFsbHkgbm8gbW9yZSB0aGFuIGEgZmV3IG1pbnV0ZXMsIHRvIGFjY291bnQgZm9yIGNsb2NrIHNrZXcuXG4gICAgLy8gSXRzIHZhbHVlIGlzIGEgSlNPTiBbUkZDNzE1OV0gbnVtYmVyIHJlcHJlc2VudGluZyB0aGUgbnVtYmVyIG9mIHNlY29uZHMgZnJvbSAxOTcwLSAwMSAtIDAxVDAwOiAwMDowMFogYXMgbWVhc3VyZWQgaW4gVVRDIHVudGlsIHRoZSBkYXRlLyB0aW1lLlxuICAgIC8vIFNlZSBSRkMgMzMzOSBbUkZDMzMzOV0gZm9yIGRldGFpbHMgcmVnYXJkaW5nIGRhdGUvIHRpbWVzIGluIGdlbmVyYWwgYW5kIFVUQyBpbiBwYXJ0aWN1bGFyLlxuICAgIC8vXG4gICAgLy8gaWF0XG4gICAgLy8gUkVRVUlSRUQuIFRpbWUgYXQgd2hpY2ggdGhlIEpXVCB3YXMgaXNzdWVkLiBJdHMgdmFsdWUgaXMgYSBKU09OIG51bWJlciByZXByZXNlbnRpbmcgdGhlIG51bWJlciBvZiBzZWNvbmRzIGZyb21cbiAgICAvLyAxOTcwLSAwMSAtIDAxVDAwOiAwMDogMDBaIGFzIG1lYXN1cmVkXG4gICAgLy8gaW4gVVRDIHVudGlsIHRoZSBkYXRlLyB0aW1lLlxuICAgIHZhbGlkYXRlX3JlcXVpcmVkX2lkX3Rva2VuKGRhdGFJZFRva2VuOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgIGlmICghZGF0YUlkVG9rZW4uaGFzT3duUHJvcGVydHkoJ2lzcycpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdpc3MgaXMgbWlzc2luZywgdGhpcyBpcyByZXF1aXJlZCBpbiB0aGUgaWRfdG9rZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YUlkVG9rZW4uaGFzT3duUHJvcGVydHkoJ3N1YicpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdzdWIgaXMgbWlzc2luZywgdGhpcyBpcyByZXF1aXJlZCBpbiB0aGUgaWRfdG9rZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YUlkVG9rZW4uaGFzT3duUHJvcGVydHkoJ2F1ZCcpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdhdWQgaXMgbWlzc2luZywgdGhpcyBpcyByZXF1aXJlZCBpbiB0aGUgaWRfdG9rZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YUlkVG9rZW4uaGFzT3duUHJvcGVydHkoJ2V4cCcpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdleHAgaXMgbWlzc2luZywgdGhpcyBpcyByZXF1aXJlZCBpbiB0aGUgaWRfdG9rZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YUlkVG9rZW4uaGFzT3duUHJvcGVydHkoJ2lhdCcpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdpYXQgaXMgbWlzc2luZywgdGhpcyBpcyByZXF1aXJlZCBpbiB0aGUgaWRfdG9rZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWQ7XG4gICAgfVxuXG4gICAgLy8gaWRfdG9rZW4gQzg6IFRoZSBpYXQgQ2xhaW0gY2FuIGJlIHVzZWQgdG8gcmVqZWN0IHRva2VucyB0aGF0IHdlcmUgaXNzdWVkIHRvbyBmYXIgYXdheSBmcm9tIHRoZSBjdXJyZW50IHRpbWUsXG4gICAgLy8gbGltaXRpbmcgdGhlIGFtb3VudCBvZiB0aW1lIHRoYXQgbm9uY2VzIG5lZWQgdG8gYmUgc3RvcmVkIHRvIHByZXZlbnQgYXR0YWNrcy5UaGUgYWNjZXB0YWJsZSByYW5nZSBpcyBDbGllbnQgc3BlY2lmaWMuXG4gICAgdmFsaWRhdGVfaWRfdG9rZW5faWF0X21heF9vZmZzZXQoZGF0YUlkVG9rZW46IGFueSwgbWF4T2Zmc2V0QWxsb3dlZEluU2Vjb25kczogbnVtYmVyLCBkaXNhYmxlSWF0T2Zmc2V0VmFsaWRhdGlvbjogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZGlzYWJsZUlhdE9mZnNldFZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkYXRhSWRUb2tlbi5oYXNPd25Qcm9wZXJ0eSgnaWF0JykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGVUaW1lSWF0SWRUb2tlbiA9IG5ldyBEYXRlKDApOyAvLyBUaGUgMCBoZXJlIGlzIHRoZSBrZXksIHdoaWNoIHNldHMgdGhlIGRhdGUgdG8gdGhlIGVwb2NoXG4gICAgICAgIGRhdGVUaW1lSWF0SWRUb2tlbi5zZXRVVENTZWNvbmRzKGRhdGFJZFRva2VuLmlhdCk7XG5cbiAgICAgICAgbWF4T2Zmc2V0QWxsb3dlZEluU2Vjb25kcyA9IG1heE9mZnNldEFsbG93ZWRJblNlY29uZHMgfHwgMDtcblxuICAgICAgICBpZiAoZGF0ZVRpbWVJYXRJZFRva2VuID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dEZWJ1ZyhcbiAgICAgICAgICAgICd2YWxpZGF0ZV9pZF90b2tlbl9pYXRfbWF4X29mZnNldDogJyArIChuZXcgRGF0ZSgpLnZhbHVlT2YoKSAtIGRhdGVUaW1lSWF0SWRUb2tlbi52YWx1ZU9mKCkpICsgJyA8ICcgKyBtYXhPZmZzZXRBbGxvd2VkSW5TZWNvbmRzICogMTAwMFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS52YWx1ZU9mKCkgLSBkYXRlVGltZUlhdElkVG9rZW4udmFsdWVPZigpIDwgbWF4T2Zmc2V0QWxsb3dlZEluU2Vjb25kcyAqIDEwMDA7XG4gICAgfVxuXG4gICAgLy8gaWRfdG9rZW4gQzk6IFRoZSB2YWx1ZSBvZiB0aGUgbm9uY2UgQ2xhaW0gTVVTVCBiZSBjaGVja2VkIHRvIHZlcmlmeSB0aGF0IGl0IGlzIHRoZSBzYW1lIHZhbHVlIGFzIHRoZSBvbmVcbiAgICAvLyB0aGF0IHdhcyBzZW50IGluIHRoZSBBdXRoZW50aWNhdGlvbiBSZXF1ZXN0LlRoZSBDbGllbnQgU0hPVUxEIGNoZWNrIHRoZSBub25jZSB2YWx1ZSBmb3IgcmVwbGF5IGF0dGFja3MuXG4gICAgLy8gVGhlIHByZWNpc2UgbWV0aG9kIGZvciBkZXRlY3RpbmcgcmVwbGF5IGF0dGFja3MgaXMgQ2xpZW50IHNwZWNpZmljLlxuXG4gICAgLy8gSG93ZXZlciB0aGUgbm9uY2UgY2xhaW0gU0hPVUxEIG5vdCBiZSBwcmVzZW50IGZvciB0aGUgcmVmZXNoX3Rva2VuIGdyYW50IHR5cGVcbiAgICAvLyBodHRwczovL2JpdGJ1Y2tldC5vcmcvb3BlbmlkL2Nvbm5lY3QvaXNzdWVzLzEwMjUvYW1iaWd1aXR5LXdpdGgtaG93LW5vbmNlLWlzLWhhbmRsZWQtb25cbiAgICAvLyBUaGUgY3VycmVudCBzcGVjIGlzIGFtYmlndW91cyBhbmQgS2V5Y2xvYWsgZG9lcyBzZW5kIGl0LlxuICAgIHZhbGlkYXRlX2lkX3Rva2VuX25vbmNlKGRhdGFJZFRva2VuOiBhbnksIGxvY2FsTm9uY2U6IGFueSwgaWdub3JlTm9uY2VBZnRlclJlZnJlc2g6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgaXNGcm9tUmVmcmVzaFRva2VuID1cbiAgICAgICAgICAgIChkYXRhSWRUb2tlbi5ub25jZSA9PT0gdW5kZWZpbmVkIHx8IGlnbm9yZU5vbmNlQWZ0ZXJSZWZyZXNoKSAmJiBsb2NhbE5vbmNlID09PSBPaWRjU2VjdXJpdHlWYWxpZGF0aW9uLlJlZnJlc2hUb2tlbk5vbmNlUGxhY2Vob2xkZXI7XG4gICAgICAgIGlmICghaXNGcm9tUmVmcmVzaFRva2VuICYmIGRhdGFJZFRva2VuLm5vbmNlICE9PSBsb2NhbE5vbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ1ZhbGlkYXRlX2lkX3Rva2VuX25vbmNlIGZhaWxlZCwgZGF0YUlkVG9rZW4ubm9uY2U6ICcgKyBkYXRhSWRUb2tlbi5ub25jZSArICcgbG9jYWxfbm9uY2U6JyArIGxvY2FsTm9uY2UpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gaWRfdG9rZW4gQzE6IFRoZSBJc3N1ZXIgSWRlbnRpZmllciBmb3IgdGhlIE9wZW5JRCBQcm92aWRlciAod2hpY2ggaXMgdHlwaWNhbGx5IG9idGFpbmVkIGR1cmluZyBEaXNjb3ZlcnkpXG4gICAgLy8gTVVTVCBleGFjdGx5IG1hdGNoIHRoZSB2YWx1ZSBvZiB0aGUgaXNzIChpc3N1ZXIpIENsYWltLlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgIHZhbGlkYXRlX2lkX3Rva2VuX2lzcyhkYXRhSWRUb2tlbjogYW55LCBhdXRoV2VsbEtub3duRW5kcG9pbnRzX2lzc3VlcjogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICgoZGF0YUlkVG9rZW4uaXNzIGFzIHN0cmluZykgIT09IChhdXRoV2VsbEtub3duRW5kcG9pbnRzX2lzc3VlciBhcyBzdHJpbmcpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoXG4gICAgICAgICAgICAgICAgJ1ZhbGlkYXRlX2lkX3Rva2VuX2lzcyBmYWlsZWQsIGRhdGFJZFRva2VuLmlzczogJyArXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJZFRva2VuLmlzcyArXG4gICAgICAgICAgICAgICAgICAgICcgYXV0aFdlbGxLbm93bkVuZHBvaW50cyBpc3N1ZXI6JyArXG4gICAgICAgICAgICAgICAgICAgIGF1dGhXZWxsS25vd25FbmRwb2ludHNfaXNzdWVyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gaWRfdG9rZW4gQzI6IFRoZSBDbGllbnQgTVVTVCB2YWxpZGF0ZSB0aGF0IHRoZSBhdWQgKGF1ZGllbmNlKSBDbGFpbSBjb250YWlucyBpdHMgY2xpZW50X2lkIHZhbHVlIHJlZ2lzdGVyZWQgYXQgdGhlIElzc3VlciBpZGVudGlmaWVkXG4gICAgLy8gYnkgdGhlIGlzcyAoaXNzdWVyKSBDbGFpbSBhcyBhbiBhdWRpZW5jZS5cbiAgICAvLyBUaGUgSUQgVG9rZW4gTVVTVCBiZSByZWplY3RlZCBpZiB0aGUgSUQgVG9rZW4gZG9lcyBub3QgbGlzdCB0aGUgQ2xpZW50IGFzIGEgdmFsaWQgYXVkaWVuY2UsIG9yIGlmIGl0IGNvbnRhaW5zIGFkZGl0aW9uYWwgYXVkaWVuY2VzXG4gICAgLy8gbm90IHRydXN0ZWQgYnkgdGhlIENsaWVudC5cbiAgICB2YWxpZGF0ZV9pZF90b2tlbl9hdWQoZGF0YUlkVG9rZW46IGFueSwgYXVkOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGRhdGFJZFRva2VuLmF1ZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmFycmF5SGVscGVyU2VydmljZS5hcmVFcXVhbChkYXRhSWRUb2tlbi5hdWQsIGF1ZCk7XG5cbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdWYWxpZGF0ZV9pZF90b2tlbl9hdWQgIGFycmF5IGZhaWxlZCwgZGF0YUlkVG9rZW4uYXVkOiAnICsgZGF0YUlkVG9rZW4uYXVkICsgJyBjbGllbnRfaWQ6JyArIGF1ZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhSWRUb2tlbi5hdWQgIT09IGF1ZCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdWYWxpZGF0ZV9pZF90b2tlbl9hdWQgZmFpbGVkLCBkYXRhSWRUb2tlbi5hdWQ6ICcgKyBkYXRhSWRUb2tlbi5hdWQgKyAnIGNsaWVudF9pZDonICsgYXVkKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVTdGF0ZUZyb21IYXNoQ2FsbGJhY2soc3RhdGU6IGFueSwgbG9jYWxTdGF0ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICgoc3RhdGUgYXMgc3RyaW5nKSAhPT0gKGxvY2FsU3RhdGUgYXMgc3RyaW5nKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdWYWxpZGF0ZVN0YXRlRnJvbUhhc2hDYWxsYmFjayBmYWlsZWQsIHN0YXRlOiAnICsgc3RhdGUgKyAnIGxvY2FsX3N0YXRlOicgKyBsb2NhbFN0YXRlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlX3VzZXJkYXRhX3N1Yl9pZF90b2tlbihpZFRva2VuU3ViOiBhbnksIHVzZXJkYXRhU3ViOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKChpZFRva2VuU3ViIGFzIHN0cmluZykgIT09ICh1c2VyZGF0YVN1YiBhcyBzdHJpbmcpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ3ZhbGlkYXRlX3VzZXJkYXRhX3N1Yl9pZF90b2tlbiBmYWlsZWQsIGlkX3Rva2VuX3N1YjogJyArIGlkVG9rZW5TdWIgKyAnIHVzZXJkYXRhX3N1YjonICsgdXNlcmRhdGFTdWIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gaWRfdG9rZW4gQzU6IFRoZSBDbGllbnQgTVVTVCB2YWxpZGF0ZSB0aGUgc2lnbmF0dXJlIG9mIHRoZSBJRCBUb2tlbiBhY2NvcmRpbmcgdG8gSldTIFtKV1NdIHVzaW5nIHRoZSBhbGdvcml0aG0gc3BlY2lmaWVkIGluIHRoZSBhbGdcbiAgICAvLyBIZWFkZXIgUGFyYW1ldGVyIG9mIHRoZSBKT1NFIEhlYWRlci5UaGUgQ2xpZW50IE1VU1QgdXNlIHRoZSBrZXlzIHByb3ZpZGVkIGJ5IHRoZSBJc3N1ZXIuXG4gICAgLy8gaWRfdG9rZW4gQzY6IFRoZSBhbGcgdmFsdWUgU0hPVUxEIGJlIFJTMjU2LiBWYWxpZGF0aW9uIG9mIHRva2VucyB1c2luZyBvdGhlciBzaWduaW5nIGFsZ29yaXRobXMgaXMgZGVzY3JpYmVkIGluIHRoZVxuICAgIC8vIE9wZW5JRCBDb25uZWN0IENvcmUgMS4wIFtPcGVuSUQuQ29yZV0gc3BlY2lmaWNhdGlvbi5cbiAgICB2YWxpZGF0ZV9zaWduYXR1cmVfaWRfdG9rZW4oaWRUb2tlbjogYW55LCBqd3RrZXlzOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFqd3RrZXlzIHx8ICFqd3RrZXlzLmtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhlYWRlckRhdGEgPSB0aGlzLnRva2VuSGVscGVyU2VydmljZS5nZXRIZWFkZXJGcm9tVG9rZW4oaWRUb2tlbiwgZmFsc2UpO1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhoZWFkZXJEYXRhKS5sZW5ndGggPT09IDAgJiYgaGVhZGVyRGF0YS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nV2FybmluZygnaWQgdG9rZW4gaGFzIG5vIGhlYWRlciBkYXRhJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBraWQgPSBoZWFkZXJEYXRhLmtpZDtcbiAgICAgICAgY29uc3QgYWxnID0gaGVhZGVyRGF0YS5hbGc7XG5cbiAgICAgICAgaWYgKCdSUzI1NicgIT09IChhbGcgYXMgc3RyaW5nKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ1dhcm5pbmcoJ09ubHkgUlMyNTYgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXNWYWxpZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghaGVhZGVyRGF0YS5oYXNPd25Qcm9wZXJ0eSgna2lkJykpIHtcbiAgICAgICAgICAgIC8vIGV4YWN0bHkgMSBrZXkgaW4gdGhlIGp3dGtleXMgYW5kIG5vIGtpZCBpbiB0aGUgSm9zZSBoZWFkZXJcbiAgICAgICAgICAgIC8vIGt0eVx0XCJSU0FcIiB1c2UgXCJzaWdcIlxuICAgICAgICAgICAgbGV0IGFtb3VudE9mTWF0Y2hpbmdLZXlzID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGp3dGtleXMua2V5cykge1xuICAgICAgICAgICAgICAgIGlmICgoa2V5Lmt0eSBhcyBzdHJpbmcpID09PSAnUlNBJyAmJiAoa2V5LnVzZSBhcyBzdHJpbmcpID09PSAnc2lnJykge1xuICAgICAgICAgICAgICAgICAgICBhbW91bnRPZk1hdGNoaW5nS2V5cyA9IGFtb3VudE9mTWF0Y2hpbmdLZXlzICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbW91bnRPZk1hdGNoaW5nS2V5cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdubyBrZXlzIGZvdW5kLCBpbmNvcnJlY3QgU2lnbmF0dXJlLCB2YWxpZGF0aW9uIGZhaWxlZCBmb3IgaWRfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFtb3VudE9mTWF0Y2hpbmdLZXlzID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdubyBJRCBUb2tlbiBraWQgY2xhaW0gaW4gSk9TRSBoZWFkZXIgYW5kIG11bHRpcGxlIHN1cHBsaWVkIGluIGp3a3NfdXJpJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBqd3RrZXlzLmtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChrZXkua3R5IGFzIHN0cmluZykgPT09ICdSU0EnICYmIChrZXkudXNlIGFzIHN0cmluZykgPT09ICdzaWcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwdWJsaWNrZXkgPSBLRVlVVElMLmdldEtleShrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IEtKVVIuandzLkpXUy52ZXJpZnkoaWRUb2tlbiwgcHVibGlja2V5LCBbJ1JTMjU2J10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ1dhcm5pbmcoJ2luY29ycmVjdCBTaWduYXR1cmUsIHZhbGlkYXRpb24gZmFpbGVkIGZvciBpZF90b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBraWQgaW4gdGhlIEpvc2UgaGVhZGVyIG9mIGlkX3Rva2VuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBqd3RrZXlzLmtleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoKGtleS5raWQgYXMgc3RyaW5nKSA9PT0gKGtpZCBhcyBzdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHB1YmxpY2tleSA9IEtFWVVUSUwuZ2V0S2V5KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBLSlVSLmp3cy5KV1MudmVyaWZ5KGlkVG9rZW4sIHB1YmxpY2tleSwgWydSUzI1NiddKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nV2FybmluZygnaW5jb3JyZWN0IFNpZ25hdHVyZSwgdmFsaWRhdGlvbiBmYWlsZWQgZm9yIGlkX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XG4gICAgfVxuXG4gICAgY29uZmlnX3ZhbGlkYXRlX3Jlc3BvbnNlX3R5cGUocmVzcG9uc2VUeXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2lkX3Rva2VuIHRva2VuJyB8fCByZXNwb25zZVR5cGUgPT09ICdpZF90b2tlbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5sb2dXYXJuaW5nKCdtb2R1bGUgY29uZmlndXJlIGluY29ycmVjdCwgaW52YWxpZCByZXNwb25zZV90eXBlOicgKyByZXNwb25zZVR5cGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWNjZXB0cyBJRCBUb2tlbiB3aXRob3V0ICdraWQnIGNsYWltIGluIEpPU0UgaGVhZGVyIGlmIG9ubHkgb25lIEpXSyBzdXBwbGllZCBpbiAnandrc191cmwnXG4gICAgLy8vLyBwcml2YXRlIHZhbGlkYXRlX25vX2tpZF9pbl9oZWFkZXJfb25seV9vbmVfYWxsb3dlZF9pbl9qd3RrZXlzKGhlYWRlcl9kYXRhOiBhbnksIGp3dGtleXM6IGFueSk6IGJvb2xlYW4ge1xuICAgIC8vLy8gICAgdGhpcy5vaWRjU2VjdXJpdHlDb21tb24ubG9nRGVidWcoJ2Ftb3VudCBvZiBqd3RrZXlzLmtleXM6ICcgKyBqd3RrZXlzLmtleXMubGVuZ3RoKTtcbiAgICAvLy8vICAgIGlmICghaGVhZGVyX2RhdGEuaGFzT3duUHJvcGVydHkoJ2tpZCcpKSB7XG4gICAgLy8vLyAgICAgICAgLy8gbm8ga2lkIGRlZmluZWQgaW4gSm9zZSBoZWFkZXJcbiAgICAvLy8vICAgICAgICBpZiAoand0a2V5cy5rZXlzLmxlbmd0aCAhPSAxKSB7XG4gICAgLy8vLyAgICAgICAgICAgIHRoaXMub2lkY1NlY3VyaXR5Q29tbW9uLmxvZ0RlYnVnKCdqd3RrZXlzLmtleXMubGVuZ3RoICE9IDEgYW5kIG5vIGtpZCBpbiBoZWFkZXInKTtcbiAgICAvLy8vICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vLy8gICAgICAgIH1cbiAgICAvLy8vICAgIH1cblxuICAgIC8vLy8gICAgcmV0dXJuIHRydWU7XG4gICAgLy8vLyB9XG5cbiAgICAvLyBBY2Nlc3MgVG9rZW4gVmFsaWRhdGlvblxuICAgIC8vIGFjY2Vzc190b2tlbiBDMTogSGFzaCB0aGUgb2N0ZXRzIG9mIHRoZSBBU0NJSSByZXByZXNlbnRhdGlvbiBvZiB0aGUgYWNjZXNzX3Rva2VuIHdpdGggdGhlIGhhc2ggYWxnb3JpdGhtIHNwZWNpZmllZCBpbiBKV0FbSldBXVxuICAgIC8vIGZvciB0aGUgYWxnIEhlYWRlciBQYXJhbWV0ZXIgb2YgdGhlIElEIFRva2VuJ3MgSk9TRSBIZWFkZXIuIEZvciBpbnN0YW5jZSwgaWYgdGhlIGFsZyBpcyBSUzI1NiwgdGhlIGhhc2ggYWxnb3JpdGhtIHVzZWQgaXMgU0hBLTI1Ni5cbiAgICAvLyBhY2Nlc3NfdG9rZW4gQzI6IFRha2UgdGhlIGxlZnQtIG1vc3QgaGFsZiBvZiB0aGUgaGFzaCBhbmQgYmFzZTY0dXJsLSBlbmNvZGUgaXQuXG4gICAgLy8gYWNjZXNzX3Rva2VuIEMzOiBUaGUgdmFsdWUgb2YgYXRfaGFzaCBpbiB0aGUgSUQgVG9rZW4gTVVTVCBtYXRjaCB0aGUgdmFsdWUgcHJvZHVjZWQgaW4gdGhlIHByZXZpb3VzIHN0ZXAgaWYgYXRfaGFzaFxuICAgIC8vIGlzIHByZXNlbnQgaW4gdGhlIElEIFRva2VuLlxuICAgIHZhbGlkYXRlX2lkX3Rva2VuX2F0X2hhc2goYWNjZXNzVG9rZW46IGFueSwgYXRIYXNoOiBhbnksIGlzQ29kZUZsb3c6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdhdF9oYXNoIGZyb20gdGhlIHNlcnZlcjonICsgYXRIYXNoKTtcblxuICAgICAgICAvLyBUaGUgYXRfaGFzaCBpcyBvcHRpb25hbCBmb3IgdGhlIGNvZGUgZmxvd1xuICAgICAgICBpZiAoaXNDb2RlRmxvdykge1xuICAgICAgICAgICAgaWYgKCEoYXRIYXNoIGFzIHN0cmluZykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UubG9nRGVidWcoJ0NvZGUgRmxvdyBhY3RpdmUsIGFuZCBubyBhdF9oYXNoIGluIHRoZSBpZF90b2tlbiwgc2tpcHBpbmcgY2hlY2shJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0ZXN0ZGF0YSA9IHRoaXMuZ2VuZXJhdGVfYXRfaGFzaCgnJyArIGFjY2Vzc1Rva2VuKTtcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCdhdF9oYXNoIGNsaWVudCB2YWxpZGF0aW9uIG5vdCBkZWNvZGVkOicgKyB0ZXN0ZGF0YSk7XG4gICAgICAgIGlmICh0ZXN0ZGF0YSA9PT0gKGF0SGFzaCBhcyBzdHJpbmcpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gaXNWYWxpZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHRoaXMuZ2VuZXJhdGVfYXRfaGFzaCgnJyArIGRlY29kZVVSSUNvbXBvbmVudChhY2Nlc3NUb2tlbikpO1xuICAgICAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmxvZ0RlYnVnKCctZ2VuIGFjY2Vzcy0tJyArIHRlc3RWYWx1ZSk7XG4gICAgICAgICAgICBpZiAodGVzdFZhbHVlID09PSAoYXRIYXNoIGFzIHN0cmluZykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gaXNWYWxpZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVfYXRfaGFzaChhY2Nlc3NUb2tlbjogYW55KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaGFzaCA9IEtKVVIuY3J5cHRvLlV0aWwuaGFzaFN0cmluZyhhY2Nlc3NUb2tlbiwgJ3NoYTI1NicpO1xuICAgICAgICBjb25zdCBmaXJzdDEyOGJpdHMgPSBoYXNoLnN1YnN0cigwLCBoYXNoLmxlbmd0aCAvIDIpO1xuICAgICAgICBjb25zdCB0ZXN0ZGF0YSA9IGhleHRvYjY0dShmaXJzdDEyOGJpdHMpO1xuXG4gICAgICAgIHJldHVybiB0ZXN0ZGF0YTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZV9jb2RlX3ZlcmlmaWVyKGNvZGVDaGFsbGVuZ2U6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBLSlVSLmNyeXB0by5VdGlsLmhhc2hTdHJpbmcoY29kZUNoYWxsZW5nZSwgJ3NoYTI1NicpO1xuICAgICAgICBjb25zdCB0ZXN0ZGF0YSA9IGhleHRvYjY0dShoYXNoKTtcblxuICAgICAgICByZXR1cm4gdGVzdGRhdGE7XG4gICAgfVxufVxuIl19