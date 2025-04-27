import { User } from "./user.js";

import { Permission } from "./permission.js";

export interface Role {
    id?: number;
    name: string;
    permissions?: Permission[];
    users?: User[];
}
