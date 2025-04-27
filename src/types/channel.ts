import { ChannelCompany } from "./channelCompany.js";
import { ChannelSetting } from "./channelSetting.js";
import { Commercial } from "./commercial.js";
import { Grp } from "./grp.js";
import { Saleshouse } from "./saleshouse.js";
import { ChannelDiscount } from "./channelDiscount.js";

export interface Channel {
    id?: number;
    saleshouse_id?: number;
    saleshouse?: Saleshouse;
    channel_company_id?: number;
    channel_company?: ChannelCompany;
    main_channel_id?: number;
    main_channel?: Channel;
    name: string;
    broadcasting_copy?: boolean;
    is_visible?: boolean;
    channel_settings?: {
        [year: string]: ChannelSetting;
    };
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    commercials?: Commercial[];
    grps?: Grp[];
    discounts?: ChannelDiscount[];
}
