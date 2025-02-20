import { EUserType } from "src/app/core/enums/EUserType";

export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    role: EUserType,

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