import { Block } from "./block.js";

import { TargetAudience } from "./targetAudience.js";

export interface BlockPrice {
    block_id?: number | null;
    target_audience_id?: number | null;
    price: number;
    Block?: Block | null;
    target_audience?: TargetAudience | null;
}
