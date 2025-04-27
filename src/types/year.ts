import { ChannelSetting } from "./channelSetting.js";
import { Project } from "./project.js";

export interface Year {
    id: number;
    channel_settings?: ChannelSetting[];
    projects?: Project[];
}
