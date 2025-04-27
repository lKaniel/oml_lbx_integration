import { Grp } from "./grp.js";

import { TargetAudience } from "./targetAudience.js";

export interface MeasurementCompany {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    targetAudiences?: TargetAudience[];
    grps?: Grp[];
}
