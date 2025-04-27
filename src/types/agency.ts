import { Advertiser } from "./advertiser.js";

import { Project } from "./project.js";

export interface Agency {
    id?: number;
    name: string;
    advertisers?: Advertiser[];
    projects?: Project[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    allow_mass_copy?: boolean;
}
