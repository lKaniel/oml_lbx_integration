import { Role } from "./role.js";
import { User } from "./user.js";

export interface Permission {
    id?: number;
    name: string;
    roles?: Role[];
    users?: User[];
}
