import { ITableConfig } from "src/app/shared/table/table.component";
import { IUser } from "../interfaces/user.interface";
import { UserListComponent } from "../pages/user-list/user-list.component";

export const tableConfig = (parent: UserListComponent) : ITableConfig =>
  <ITableConfig>({
    cols: [
      {
        key:'name', 
        label: 'Name',
        value: (data: any) => data.firstName + ' ' + data.lastName
      },
      {
        key:'email', 
        label: 'Email'
      },
      {
        key:'phone', 
        label: 'Phone'
      },
      {
        key:'createdAt', 
        label: 'Create At',
        value: (data: any) => data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '-'
      }
    ],
    actions: [
      {
        key: 'update',
        icon: 'edit',
        label: 'Update',
        handler: (user: IUser) => parent.router.navigate(['user/edit/',user._id])
      },
      {
        key: 'delete',
        icon: 'delete',
        // color: '#FF4500',
        label: 'Delete',
        handler: (user: IUser) => parent.userService.deleteUser(user._id).subscribe((res: any) => parent.load()),
        visible: (user: IUser) => !user.deleted
      },
      {
        key: 'enable',
        icon: 'toggle_on',
        label: 'Enable',
        handler: (user: IUser) => parent.userService.enableUser(user._id).subscribe((res: any) => parent.load()),
        visible: (user: IUser) => !user.enabled
      },
      {
        key: 'disable',
        icon: 'toggle_off',
        label: 'Disable',
        handler: (user: IUser) => parent.userService.disableUser(user._id).subscribe((res: any) => parent.load()),
        visible: (user: IUser) => !!user.enabled
      },
    ],
    background: (user: IUser) => user.deleted ? '#FFB6C1' : ''
  })