import { Commercial } from "./commercial.js";

export interface CommercialVersionType {
    id?: number;
    name: string;
    deleted_at?: string | null;
    commercials?: Commercial[];
}
