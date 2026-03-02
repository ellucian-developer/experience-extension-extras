export function fetchJsonData({ url, options, getJwt, token }: {
    url: any;
    options: any;
    getJwt: any;
    token: any;
}): Promise<{
    error: string;
}>;
export function postJsonData({ url, data, options, getJwt, token }: {
    url: any;
    data: any;
    options: any;
    getJwt: any;
    token: any;
}): Promise<{
    error: string;
}>;
export function deleteJsonData({ url, options, getExtensionJwt }: {
    url: any;
    options: any;
    getExtensionJwt: any;
}): Promise<{
    error: string;
}>;
//# sourceMappingURL=json-data.d.ts.map