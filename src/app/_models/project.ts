import { Category } from "./category";
import { User } from "./user";

export class Project {
    id?: number;
    title!: string;
    proposer!: User;
    status?: string;
    proposedAt?: Date;
    publishedAt?: Date;
    finishedAt?: Date;
    description!: string;
    categories!: Category[];
}
