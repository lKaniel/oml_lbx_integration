import { Role } from "./role.js";
import { Permission } from "./permission.js";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    login: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    roles?: Role[];
    permissions?: Permission[];
    access_permissions?: {
        access?: {
            saleshouse_ids?: number[];
            agency_ids?: number[];
            channel_ids?: number[];
            project_ids?: number[];
            advertiser_ids?: number[];
            brand_ids?: number[];
        };
        deny?: {
            project_ids?: number[];
            advertiser_ids?: number[];
            brand_ids?: number[];
        };
    };
}
