import { PrismaClient } from "@prisma/client";

export class Prisma {
    private static instance: PrismaClient;

    private constructor() { }

    public static getInstance(): PrismaClient {
        if (!this.instance) {
            this.instance = new PrismaClient();
        }
        return this.instance;
    }
}