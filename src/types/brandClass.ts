import { BrandGroup } from "./brandGroup.js";

export interface BrandClass {
    id?: number;
    name: string;
    brand_groups?: BrandGroup[];
}
