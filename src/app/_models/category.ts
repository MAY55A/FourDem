import { Project } from "./project";

export class Category {
    id!: number;
    name!: string;
    description?: string;
    domain!: string;
    addedAt?: Date;
    projects: Project[] = [];
}
