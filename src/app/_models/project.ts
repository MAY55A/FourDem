export class Project {
    id?: number;
    title!: string;
    proposer!: number;
    status?: string;
    proposedAt?: Date;
    publishedAt?: Date;
    finishedAt?: Date;
    description!: string;
    categories!: string;
}
