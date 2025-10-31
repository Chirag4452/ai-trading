

import { AccountApi, ApiKeyAuthentication, IsomorphicFetchHttpLibrary, OrderApi, ServerConfiguration } from "./lighter-sdk-ts/generated";

const BASE_URL = "https://testnet.zklighter.elliot.ai"
const API_KEY_PRIVATE_KEY = process.env['API_KEY_PRIVATE_KEY']!
const ACCOUNT_INDEX = 199

export async function main() {
    const accountApi = new AccountApi({
        baseServer: new ServerConfiguration<{  }>(BASE_URL, {  }),
        httpApi: new IsomorphicFetchHttpLibrary(),
        middleware: [],
        authMethods: {
            apiKey: new ApiKeyAuthentication(API_KEY_PRIVATE_KEY)
        }
    });

    const currentOpenOrders = await accountApi.accountWithHttpInfo(
        'index',
        ACCOUNT_INDEX.toString()
    );

    console.log(currentOpenOrders.data.accounts[0]?.positions);
}

main()