export const  tableConfig = [
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
      value: (data: any) => new Date(data.createdAt)
    }
  ]