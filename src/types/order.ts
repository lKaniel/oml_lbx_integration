import { CommercialType } from "./commercialType.js";
import { Mediaplan } from "./mediaplan.js";
import { OrderSetting } from "./orderSetting.js";
import { PlacementType } from "./placementType.js";
import { Project } from "./project.js";
import { Discount } from "./discount.js";

export interface Order {
    id?: number;
    project_id: number;
    placement_type_id: number;
    commercial_type_id: number;
    name: string;
    taxes?: boolean;
    is_closed?: boolean;
    estimated_budget?: number;
    date_from: string;
    date_to: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    plan_budget?: number;
    fact_budget?: number;
    plan_fact_budget?: number;
    commitment_budget?: number;
    is_calculating?: number;
    project?: Project | null;
    placement_type?: PlacementType | null;
    commercial_type?: CommercialType | null;
    order_settings?: OrderSetting[];
    mediaplans?: Mediaplan[];
    discounts?: Discount[];
    is_vip?: boolean;
    vip_dates?: string;
}
