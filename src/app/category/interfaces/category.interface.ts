export interface ICategory {
    _id: string,
    name: string,
    note: string,
    description: string,
    createdAt: Date,
    lastUpdate: Date,
    deleted: boolean,
    enabled: boolean
}
