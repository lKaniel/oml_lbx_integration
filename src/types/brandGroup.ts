import { BrandClass } from "./brandClass.js";

export interface BrandGroup {
    id?: number;
    name: string;
    brand_class_id: number;
    brand_class?: BrandClass;
}
