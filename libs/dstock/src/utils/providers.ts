import { HttpService } from '@nestjs/axios';
import { FactoryProvider } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { Configuration } from '../client/generated';

export function injectApiProvider<T>(
  ApiClass: new (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance,
  ) => T,
): FactoryProvider<T> {
  return {
    provide: ApiClass,
    inject: [HttpService],
    useFactory: (httpService: HttpService) => {
      const config = new Configuration({
        basePath: 'https://finfo-api.ipas.com.vn',
      });

      return new ApiClass(config, config.basePath, httpService.axiosRef);
    },
  };
}

// export function injectApiProvider<T>(
//   ApiClass: new (
//     configuration?: Configuration,
//     basePath?: string,
//     axios?: AxiosInstance,
//   ) => T,
// ): FactoryProvider<T> {
//   return {
//     provide: ApiClass,
//     inject: [
//       HttpService,
//       SalesforceAuthService,
//       SALESFORCE_CLIENT_MODULE_OPTIONS,
//     ],
//     useFactory: async (
//       httpService: HttpService,
//       authService: SalesforceAuthService,
//       options: SalesforceClientModuleOptions,
//     ) => {
//       const config = new Configuration({
//         basePath: options.baseUrl,
//       });

//       return new ApiClass(
//         config,
//         config.basePath,
//         httpService.axiosRef as AxiosInstance,
//       );
//     },
//   };
// }

// với cái có authentication thì sẽ cần thêm options để truyền vào
// export function injectAuthenticationApiProvider<T>(
//   ApiClass: new (
//     configuration?: Configuration,
//     basePath?: string,
//     axios?: AxiosInstance,
//   ) => T,
// ): FactoryProvider<T> {
//   return {
//     provide: ApiClass,
//     inject: [HttpService, SALESFORCE_CLIENT_MODULE_OPTIONS],
//     useFactory: (
//       httpService: HttpService,
//       options: SalesforceClientModuleOptions,
//     ) => {
//       const config = new Configuration({
//         basePath: options.baseUrl,
//       });
//       return new ApiClass(
//         config,
//         config.basePath,
//         httpService.axiosRef as AxiosInstance,
//       );
//     },
//   };
// }
