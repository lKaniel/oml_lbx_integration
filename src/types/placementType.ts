import { Project } from "./project.js";

export interface PlacementType {
    id: number;
    name: string;
    projects?: Project[];
}
