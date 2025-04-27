import { Channel } from "./channel.js";
import { Block } from "./block.js";
import { MeasurementCompany } from "./measurementCompany.js";
import { TargetAudience } from "./targetAudience.js";

export interface Grp {
    id?: number;
    channel_id: number;
    measurement_company_id: number;
    target_audience_id: number;
    day: string;
    time_from: string;
    price: number;
    channel?: Channel;
    measurementCompany?: MeasurementCompany;
    targetAudience?: TargetAudience;
    blocks?: Block[];
}
