import { Channel } from "./channel.js";

export interface Saleshouse {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    channels?: Channel[];
    saleshouse_settings?: Channel[];
}
