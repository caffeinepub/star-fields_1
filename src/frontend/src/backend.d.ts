import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Nakshatra {
    rulingDeity: string;
    name: string;
    description: string;
    imageUrl: string;
    characteristics: string;
    symbol: string;
}
export interface backendInterface {
    createNakshatra(nakshatra: Nakshatra): Promise<boolean>;
    deleteNakshatra(name: string): Promise<boolean>;
    getAllNakshatras(): Promise<Array<Nakshatra>>;
    getNakshatraByNumber(number: bigint): Promise<Nakshatra | null>;
    initialize(): Promise<void>;
    readNakshatra(name: string): Promise<Nakshatra | null>;
    searchNakshatras(term: string): Promise<Array<Nakshatra>>;
    updateNakshatra(nakshatra: Nakshatra): Promise<boolean>;
}
