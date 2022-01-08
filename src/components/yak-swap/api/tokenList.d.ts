export declare const tokenList: ({
    value: string;
    label: string | undefined;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    permitSupported: boolean;
    logoURI: string;
    chainId?: undefined;
} | {
    value: string;
    label: string | undefined;
    chainId: number;
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    logoURI: string;
    permitSupported?: undefined;
} | {
    value: string;
    label: string | undefined;
    chainId: number;
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    permitSupported: boolean;
    logoURI: string;
} | {
    value: string;
    label: string | undefined;
    address: string;
    symbol: string;
    decimals: number;
    permitSupported: boolean;
    name?: undefined;
    logoURI?: undefined;
    chainId?: undefined;
} | {
    value: string;
    label: string | undefined;
    chainId: number;
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    permitSupported?: undefined;
    logoURI?: undefined;
} | {
    value: string;
    label: string | undefined;
    address: string;
    symbol: string;
    decimals: number;
    name?: undefined;
    permitSupported?: undefined;
    logoURI?: undefined;
    chainId?: undefined;
})[];
export declare type TokenType = typeof tokenList[number];
export declare type TokenListType = typeof tokenList;
