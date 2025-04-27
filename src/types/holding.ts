import { ChannelSetting } from "./channelSetting.js";

import { RetroBonusScale } from "./retroBonusScale.js";

export interface Holding {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    channel_settings?: ChannelSetting[];
    retro_bonus_scales?: RetroBonusScale[];
}
