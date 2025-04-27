// Model interfaces
import { Agency } from "./agency.js";
import { Brand } from "./brand.js";
import { Project } from "./project.js";
import { RetroBonusScale } from "./retroBonusScale.js";

export interface Advertiser {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    agencies?: Agency[];
    brands?: Brand[];
    projects?: Project[];
    retro_bonus_scales?: RetroBonusScale[] | null;
}
