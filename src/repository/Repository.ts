
export class Repository {
    model: any;

    constructor(model: any) {
        this.model = model
    }

    async findAll<T>(where: Partial<T>) {
        const result = await this.model.findMany({
            where: where,
            include: {
                host: {
                    select: {
                        username: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        return result
    }

    async findOne(id: number) {
        const result = await this.model.findFirst({
            where: { id }
        })
        return result
    }
    async findBySlug(slug: string) {
        const result = await this.model.findFirst({
            where: { slug },
            include: {
                host: true
            },
        })
        return result
    }
    async create<T>(body: Partial<T>) {
        const result = await this.model.create({ data: body })
        return result
    }
    async update<T>(id: number, body: Partial<T>) {
        const result = await this.model.update({ where: { id }, data: body })
        return result
    }

    async delete(id: number) {
        const result = await this.model.delete({ where: { id } })
        return result
    }
}