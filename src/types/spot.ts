export interface Spot {
    id?: number;
    block_id: number;
    mediaplan_id?: number;
    commercial_id: number;
    double_spot_id?: string;
    distance?: number;
    priorities?: number;
    position?: string;
    actual_position?: string;
    order?: number;
    plan_wgrp?: number;
    fact_wgrp?: number;
    plan_fact_wgrp?: number;
    pure_plan_wgrp?: number;
    pure_fact_wgrp?: number;
    pure_plan_fact_wgrp?: number;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    fact_grp_upload_details_id?: number;
    channel_project_price_project_id?: number;
    auction_coeff?: number | null;
    is_vip?: boolean;
}
