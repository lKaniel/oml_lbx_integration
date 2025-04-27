import { ChannelSettingPrimeTime } from "./channelSettingPrimeTime.js";
import { Holding } from "./holding.js";
import { Saleshouse } from "./saleshouse.js";
import { TargetAudience } from "./targetAudience.js";

export interface ChannelSetting {
    id?: number;
    year_id?: number;
    channel_id?: number;
    saleshouse_id?: number;
    saleshouse?: Saleshouse;
    holding_id?: number;
    holding?: Holding;
    base_target_audience_id?: number;
    base_target_audience?: TargetAudience;
    closing_datetimes?: {
        [key: string]: {
            start_interval: number;
            time?: string;
            days: number[];
        };
    };
    prime_time_datetimes?: Array<{
        start_at?: string;
        end_at?: string;
        start_interval: number;
        duration: number;
        end_interval: number;
        days: number[];
    }>;
    channel_setting_prime_time?: ChannelSettingPrimeTime[];
    sh_quota_percent_prime_time?: number;
    sh_quota_percent_off_prime_time?: number;
    default_plan_grp?: number;
    default_fact_grp?: number;
    saleshouse_commission?: number;
    auction_step_coeff?: number;
    start_interval?: number;
    is_tv_network?: boolean;
}
