import { User } from "./typing";

declare global {
    interface CustomJwtSessionClaims extends User { }
}