/* tslint:disable */
/* eslint-disable */
/**
 * VNDIRECT Stocks API
 * API for retrieving stock information from VNDIRECT
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// URLSearchParams not necessarily used
// @ts-ignore
import { URL, URLSearchParams } from 'url';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface GetStocks200Response
 */
export interface GetStocks200Response {
    /**
     * 
     * @type {number}
     * @memberof GetStocks200Response
     */
    'currentPage'?: number;
    /**
     * 
     * @type {Array<GetStocks200ResponseDataInner>}
     * @memberof GetStocks200Response
     */
    'data'?: Array<GetStocks200ResponseDataInner>;
    /**
     * 
     * @type {number}
     * @memberof GetStocks200Response
     */
    'size'?: number;
    /**
     * 
     * @type {number}
     * @memberof GetStocks200Response
     */
    'totalElements'?: number;
    /**
     * 
     * @type {number}
     * @memberof GetStocks200Response
     */
    'totalPages'?: number;
}
/**
 * 
 * @export
 * @interface GetStocks200ResponseDataInner
 */
export interface GetStocks200ResponseDataInner {
    /**
     * 
     * @type {string}
     * @memberof GetStocks200ResponseDataInner
     */
    'code'?: string;
    /**
     * 
     * @type {string}
     * @memberof GetStocks200ResponseDataInner
     */
    'companyId'?: string;
    /**
     * 
     * @type {string}
     * @memberof GetStocks200ResponseDataInner
     */
    'companyName'?: string;
    /**
     * 
     * @type {string}
     * @memberof GetStocks200ResponseDataInner
     */
    'companyNameEng'?: string;
    /**
     * 
     * @type {string}
     * @memberof GetStocks200ResponseDataInner
     */
    'delistedDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof GetStocks200ResponseDataInner
     */
    'floor'?: string;
    /**
     * 
     * @type {string}
     * @memberof GetStocks200ResponseDataInner
     */
    'listedDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof GetStocks200ResponseDataInner
     */
    'shortName'?: string;
    /**
     * 
     * @type {string}
     * @memberof GetStocks200ResponseDataInner
     */
    'status'?: string;
    /**
     * 
     * @type {string}
     * @memberof GetStocks200ResponseDataInner
     */
    'type'?: string;
}

/**
 * StockApi - axios parameter creator
 * @export
 */
export const StockApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get list of stocks
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getStocks: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/v4/stocks`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * StockApi - functional programming interface
 * @export
 */
export const StockApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = StockApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get list of stocks
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getStocks(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetStocks200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getStocks(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['StockApi.getStocks']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * StockApi - factory interface
 * @export
 */
export const StockApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = StockApiFp(configuration)
    return {
        /**
         * 
         * @summary Get list of stocks
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getStocks(options?: RawAxiosRequestConfig): AxiosPromise<GetStocks200Response> {
            return localVarFp.getStocks(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * StockApi - object-oriented interface
 * @export
 * @class StockApi
 * @extends {BaseAPI}
 */
export class StockApi extends BaseAPI {
    /**
     * 
     * @summary Get list of stocks
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StockApi
     */
    public getStocks(options?: RawAxiosRequestConfig) {
        return StockApiFp(this.configuration).getStocks(options).then((request) => request(this.axios, this.basePath));
    }
}



