import { Advertiser } from "./advertiser.js";
import { Holding } from "./holding.js";

import { RetroBonusScaleDetail } from "./retroBonusScaleDetail.js";

export interface RetroBonusScale {
    id: number;
    year_id: number;
    advertiser_id?: number;
    holding_id: number;
    created_at?: string;
    updated_at?: string;
    advertiser?: Advertiser;
    holding?: Holding;
    retro_bonus_scale_details?: RetroBonusScaleDetail[];
}
