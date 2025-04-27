import { Order } from "./order.js";
import { Channel } from "./channel.js";

import { TargetAudience } from "./targetAudience.js";

export interface OrderSetting {
    order_id: number;
    channel_id: number;
    target_audience_id: number;
    order?: Order;
    channel?: Channel;
    target_audience?: TargetAudience;
}
