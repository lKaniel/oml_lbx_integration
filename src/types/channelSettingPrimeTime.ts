export interface ChannelSettingPrimeTime {
    id?: number;
    channel_setting_id: number;
    day_of_week: number;
    time_start_at: string;
    time_end_at: string;
    start_interval?: number;
    end_interval?: number;
    duration?: number;
    created_at?: string;
    updated_at?: string;
}
