import { BlockType } from "./blockType.js";
import { BlockPrice } from "./blockPrice.js";
import { Channel } from "./channel.js";
import { CommercialType } from "./commercialType.js";
import { ProgramRelease } from "./programRelease.js";
import { Spot } from "./spot.js";

export interface Block {
    id?: number;
    channel_id: number;
    program_release_id?: number | null;
    commercial_type_id: number;
    block_type_id?: number;
    date_start_at: string;
    time_start_at: string;
    date_end_at: string;
    time_end_at: string;
    duration: number;
    actual_duration?: number;
    pullable_duration?: number;
    low_priority_duration?: number;
    broadcast_day?: string;
    start_interval?: number;
    end_interval?: number;
    auction_step_coeff?: number;
    is_fixed_price?: boolean;
    created_at?: string;
    updated_at?: string;
    is_calculating?: number;
    channel?: Channel;
    program_release?: ProgramRelease;
    commercial_type?: CommercialType;
    block_type?: BlockType;
    spots?: Spot[] | null;
    block_prices?: BlockPrice[] | null;
}
