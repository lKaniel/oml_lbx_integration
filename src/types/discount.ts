import { Project } from "./project.js";
import { Order } from "./order.js";
import { Mediaplan } from "./mediaplan.js";

export interface Discount {
    id?: number;
    discount_type_id: number;
    from: string;
    to: string;
    percent?: number;
    type?: number;
    order?: number | null;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    discountable?: Project | Order | Mediaplan | null;
}
