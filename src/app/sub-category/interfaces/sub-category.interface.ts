import { ICategory } from "src/app/category/interfaces/category.interface"

export interface ISubCategory {
    _id: string,
    name: string,
    category: ICategory,
    note: string,
    description: string,
    createdAt: Date,
    lastUpdate: Date,
    deleted: boolean,
    enabled: boolean
}
