import { UserListComponent } from "../pages/user-list/user-list.component";

export const  tableConfig = (parent: UserListComponent) =>  [
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
    },
    {
      key:'actions', 
      label: 'Actions',
      actions: [
        {
          key: 'update',
          icon: 'edit',
          label: 'Update',
          handler: (data: any) => parent.router.navigate(['user/edit/',data._id ])
        },
        {
          key: 'delete',
          icon: 'delete',
          // color: '#FF4500',
          label: 'Delete',
          handler: () => parent.router.navigate(['category/list'])
        },
        {
          key: 'enable',
          icon: 'toggle_off',
          label: 'Enable',
          handler: () => parent.router.navigate(['category/list'])
        },
      ]
    }
  ]