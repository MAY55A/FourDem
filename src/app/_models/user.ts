export class User {
    id?: number;
    name!: string;
    email!: string;
    hash!: string;
    createdAt?: Date;
    description?: string;
    type!: string;
    domain?: string;
    contacts?: string[];
    skills?: string[];
}
