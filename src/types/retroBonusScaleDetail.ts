import { RetroBonusScale } from "./retroBonusScale.js";

export interface RetroBonusScaleDetail {
    id?: number;
    retro_bonus_scale_id: number;
    budget: number;
    percent: number;
    retroBonusScale?: RetroBonusScale;
}
