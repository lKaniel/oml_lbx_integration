import { Channel } from "./channel.js";
import { Program } from "./program.js";

export interface ProgramRelease {
    id?: number;
    channel_id: number;
    channel?: Channel;
    program_id: number;
    program?: Program;
    name?: string;
    date_start_at?: string;
    time_start_at?: string;
    date_end_at?: string;
    time_end_at?: string;
    duration?: string;
    broadcast_day: string;
    start_interval: number;
    end_interval?: number;
    broadcast_duration: number;
    created_at?: string;
    updated_at?: string;
}
