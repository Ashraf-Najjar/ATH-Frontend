import { ICategory } from "src/app/category/interfaces/category.interface"
import { ISubCategory } from "src/app/sub-category/interfaces/sub-category.interface"
import { IUser } from "src/app/user/interfaces/user.interface"

export interface IProduct {
    _id: string,
    name: string,
    note: string,
    description: string,
    quantity: number,
    price: number,
    category: ICategory,
    subCategory: ISubCategory,
    image?: any

    // managers: managersSchema,
    // address: addressSchema,
    // role: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: "Role", 
    //     required: true 
    // },
    enabled: boolean,
    deleted: boolean,
    createdAt: Date,
    lastUpdate: Date,
    createdBy: IUser
}
