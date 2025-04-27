export interface ChannelDiscount {
    id?: number;
    channel_id: number;
    year_id: number;
    month_id: number;
    percent: number;
    created_at?: string;
    updated_at?: string;
}
