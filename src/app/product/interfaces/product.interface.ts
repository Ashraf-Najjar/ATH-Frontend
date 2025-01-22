import { IUser } from "src/app/user/interfaces/user.interface"

export interface IProduct {
    _id: string,
    name: string,
    note: string,
    description: string,
    quantity: number,
    category: string,
    subCategory: string

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
