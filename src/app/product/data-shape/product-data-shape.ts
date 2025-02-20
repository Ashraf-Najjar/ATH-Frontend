export default `
      _id
      name
      description
      note
      quantity
      price
      image {
            fieldname
            originalname
            encoding
            mimetype
            destination
            filename
            path
            size
      }
      category {
            _id
            name
      }
      subCategory {
            _id
            name
      }
      deleted
      enabled
      createdAt
      lastUpdate
`;