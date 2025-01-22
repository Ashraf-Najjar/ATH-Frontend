import { IFilter } from "src/app/shared/filter/filter.component";
import { UserListComponent } from "../pages/user-list/user-list.component";

export const filterConfig = (parent: UserListComponent): IFilter[] => <IFilter[]>([
    {
        key: 'name',
        label: 'Name',
        type: "text",
        placeholder: "Enter name..."
    },
    {
        key: 'email',
        label: 'Email',
        type: "text",
        placeholder: "Enter email..."
    },
    {
        key: 'phone',
        label: 'Phone',
        type: "text",
        placeholder: "Enter phone..."
    },
    {
        key: 'createdBy',
        label: 'Created By',
        type: "text",
        placeholder: "Enter user name..."
    },
    // {
    //     key: 'name',
    //     label: 'Name',
    //     type: "dropdown",
    //     options: async () => await firstValueFrom(parent.userService.getUsers(0, 100).pipe(map(res => res.users))) 
    // },
    // {
    //     key: 'email',
    //     label: 'Email',
    //     type: "text",
    //     validation: Validators.email,
    //     errorMsg: "Type write email"
    // }
])