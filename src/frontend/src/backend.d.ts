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
    karmicLesson: string;
    rulingDeity: string;
    name: string;
    description: string;
    lunarClimate: string;
    pada1: PadaInfo;
    pada2: PadaInfo;
    pada3: PadaInfo;
    pada4: PadaInfo;
    imageId?: string;
    characteristics: string;
    symbol: string;
}
export interface PadaInfo {
    title: string;
    description: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createNakshatra(nakshatra: Nakshatra): Promise<boolean>;
    deleteImage(imageId: string): Promise<boolean>;
    deleteNakshatra(name: string): Promise<boolean>;
    getAllNakshatras(): Promise<Array<Nakshatra>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getImage(imageId: string): Promise<Uint8Array | null>;
    getNakshatraByNumber(number: bigint): Promise<Nakshatra | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    readNakshatra(name: string): Promise<Nakshatra | null>;
    replaceNakshatraImage(nakshatraName: string, imageData: Uint8Array): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchNakshatras(term: string): Promise<Array<Nakshatra>>;
    updateNakshatra(nakshatra: Nakshatra): Promise<boolean>;
    uploadImage(imageData: Uint8Array): Promise<string>;
}
