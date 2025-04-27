import { Grp } from "./grp.js";

export interface TargetAudience {
    id?: number;
    measurement_company_id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    grps?: Grp[];
}
