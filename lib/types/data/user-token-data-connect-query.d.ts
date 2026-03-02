export function userTokenDataConnectQuery({ authenticatedEthosFetch, queryKeys, queryParameters, signal }: {
    authenticatedEthosFetch: any;
    queryKeys: any;
    queryParameters: any;
    signal: any;
}): Promise<{
    data: any;
    error?: undefined;
} | {
    error: {
        message: string;
        statusCode: any;
    };
    data?: undefined;
}>;
//# sourceMappingURL=user-token-data-connect-query.d.ts.map