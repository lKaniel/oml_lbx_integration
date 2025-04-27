import { Brand } from "./brand.js";
import { Channel } from "./channel.js";
import { CommercialType } from "./commercialType.js";
import { CommercialVersionType } from "./commercialVersionType.js";
import { Mediaplan } from "./mediaplan.js";

export interface Commercial {
    id?: number;
    commercial_version_type_id: number;
    commercial_type_id: number;
    brand_id: number;
    co_brand_id?: number;
    co_branding_discount?: number;
    external_id?: number | null;
    name: string;
    duration: number;
    legal_before_at: string;
    url: string | null;
    status?: number;
    is_visible?: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    commercial_version_type?: CommercialVersionType | null;
    commercial_type?: CommercialType | null;
    Brand?: Brand | null;
    co_brand?: Brand | null;
    mediaplans?: Mediaplan[];
    channels?: Channel[];
    is_approved?: boolean | null;
    approve_comment?: string | null;
}
