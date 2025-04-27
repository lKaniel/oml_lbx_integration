import { Commercial } from "./commercial.js";

import { Project } from "./project.js";

export interface CommercialType {
    id: number;
    name: string;
    projects?: Project[];
    commercials?: Commercial[];
}
