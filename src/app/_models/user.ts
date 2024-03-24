import { Project } from "./project";
import { Service } from "./service";

export class User {
    id?: number;
    name!: string;
    email!: string;
    hash!: string;
    createdAt?: Date;
    description?: string;
    type!: string;
    domain?: string;
    contacts?: string;
    tel?: string;
    skills?: string = '';
    projects?: Project[];
    services?: Service[];
}
