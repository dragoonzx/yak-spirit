export declare const tokenList: ({
    value: string;
    label: string;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    permitSupported: boolean;
    logoURI: string;
    chainId?: undefined;
} | {
    value: string;
    label: string;
    chainId: number;
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    logoURI: string;
    permitSupported?: undefined;
} | {
    value: string;
    label: string;
    chainId: number;
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    permitSupported?: undefined;
    logoURI?: undefined;
})[];
export declare type TokenType = typeof tokenList[number];
export declare type TokenListType = typeof tokenList;
