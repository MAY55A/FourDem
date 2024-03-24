import { User } from "./user";

export class Notification {
    id?: number;
    type?: string;
    content!: string;
    seen?: boolean;
    sentAt?: Date;
    userId?: number;
}
