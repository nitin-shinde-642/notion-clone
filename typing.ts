import { DocumentData } from "firebase/firestore";

export type User = {
    "email": string;
    "image": string;
    "fullName": string;
    "lastName": string;
    "firstName": string;
}


export interface RoomDocument extends DocumentData {
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
}

export type GroupedData = {
    owner: RoomDocument[];
    editor: RoomDocument[];
};

export type Language =
    | 'english'
    | 'hindi'
    | 'spanish'
    | 'portuguese'
    | 'french'
    | 'german'
    | 'chinese'
    | 'arabic'
    | 'russian'
    | 'japanese';