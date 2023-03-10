import { Roles } from './enums';

export type Session =
    | {
          listKey: string;
          itemId: string;
          data: {
              name: string;
              role: Roles;
              createdAt: string;
              status: 'disabled' | 'enable';
          };
      }
    | undefined;

export type GeneralApiResponse = {
    ok: boolean;
    message: string;
    dontshow?: boolean;
    paylod?: Record<string, any>;
    type?: 'success' | 'error' | 'warning' | 'info';
};

export type ZibalPaymentResponse = {
    trackId: number;
    result: 100 | 102 | 103 | 104 | 105 | 106;
    message: string;
    statusMessage: string;
};

export type ZibalConfig = {
    merchant: string; // 'YOUR-MERCHANT-ID'
    callbackUrl: string; //'https://some-callback-url.tld',
    logLevel: 0 | 1 | 2;
    // 0: none (default in production)
    // 1: error
    // 2: error + info (default)
};

export type WSMsg =
    | {
          action: 'logout' | 'request-login';
      }
    | {
          action: 'message';
          message: string;
      };
