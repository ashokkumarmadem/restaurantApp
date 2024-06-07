import React from 'react'

const DishContext = React.createContext({
  cartList: [],
  updateCartList: () => {},
})

export default DishContext
