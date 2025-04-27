import { Advertiser } from "./advertiser.js";
import { BrandGroup } from "./brandGroup.js";
import { Commercial } from "./commercial.js";

export interface Brand {
    id?: number;
    advertiser_id: number;
    advertiser?: Advertiser;
    brand_group_id?: number;
    brand_group?: BrandGroup;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    commercials?: Commercial[];
}
