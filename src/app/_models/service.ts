import { Project } from "./project";
import { User } from "./user";

export class Service {
    id?: number;
    proposer!: User;
    project!: Project;
    status?: string;
    liked?: boolean | null;
    proposedAt?: Date;
    description!: string;
    skills!: string;
}