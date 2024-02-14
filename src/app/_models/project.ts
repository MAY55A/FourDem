export class Project {
    id?: number;
    title!: string;
    proposerId!: number;
    proposerName!: string;
    status?: string;
    proposedAt?: Date;
    publishedAt?: Date;
    finishedAt?: Date;
    description!: string;
    categories!: string;
}
