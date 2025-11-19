import React, { type ReactNode, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import axios from 'axios'

import type {
  AddToCart,
  AddToLocalCart,
  Cart,
  CartContextProps,
  CartItem,
  DeleteFromCart,
  DeleteFromLocalCart,
  FindCartItemByProductId,
  GetLocalCartItems,
} from './types'
import { requestUrl } from '../../env'
import { local } from '../../App'
import { useAuth } from '../auth/AuthContext'
import { useErrorHandler } from '../../hooks/useErrorHandler'

const CartContext = React.createContext<CartContextProps>({} as CartContextProps)

export const useCart = () => useContext(CartContext)

type Props = {
  children: ReactNode
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalPrice: 0,
    totalProductsCount: 0,
  })

  const { isUserExist, setUser, user } = useAuth()
  const handleError = useErrorHandler({ showAlert: false })

  const findCartItemByProductId: FindCartItemByProductId = useCallback((product_id) => {
    return cart.items?.find(cartItem => cartItem.product.id === product_id)
  }, [cart.items])

  const getCartItems = useCallback((user_id: number) => {
    setLoading(true)
    return axios.get<Cart>(`${requestUrl}/cart/${user_id}`)
      .then((response) => {
        setCart(response.data)
      })
      .catch((error) => {
        handleError(error, 'Не удалось загрузить корзину')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [handleError])

  const addToCart: AddToCart = useCallback(({ user_id, ...payload }) => {
    return axios.put(`${requestUrl}/cart/${user_id}`, payload)
      .then(({ data }) => {
      setCart(data)
    })
      .catch((error) => {
        handleError(error, 'Не удалось добавить товар в корзину')
        throw error
      })
  }, [handleError])

  const deleteFromCart: DeleteFromCart = useCallback((id) => {
    return axios.delete(`${requestUrl}/cart/${id}`)
      .then(() => {
        setCart(prevCart => ({
          ...prevCart,
          items: prevCart.items.filter(item => item.id !== id),
          totalPrice: prevCart.items
            .filter(item => item.id !== id)
            .reduce((sum, item) => sum + item.price, 0),
          totalProductsCount: prevCart.items
            .filter(item => item.id !== id)
            .reduce((sum, item) => sum + item.count, 0),
        }))
      })
      .catch((error) => {
        handleError(error, 'Не удалось удалить товар из корзины')
        throw error
      })
  }, [handleError])

  const getLocalCartItems: GetLocalCartItems = useCallback(() => {
    const localCartStr = local.getItem('cart')

    if (!localCartStr) {
      setCart({
        items: [],
        totalPrice: 0,
        totalProductsCount: 0,
      })
      return
    }

    try {
      const parsedCart: Cart = JSON.parse(localCartStr)

      if (!parsedCart.items || !Array.isArray(parsedCart.items) || parsedCart.items.length === 0) {
        local.removeItem('cart')
        setUser(prevUser => ({
          ...prevUser,
          cart: [],
        }))
        setCart({
          items: [],
          totalPrice: 0,
          totalProductsCount: 0,
        })
        return
      }

      const validItems = parsedCart.items.filter(item => 
        item && item.product && item.id && item.count > 0
      )

      if (validItems.length === 0) {
        local.removeItem('cart')
        setCart({
          items: [],
          totalPrice: 0,
          totalProductsCount: 0,
        })
        return
      }

      setUser(prevUser => ({
        ...prevUser,
        cart: validItems,
      }))

      setCart({
        items: validItems,
        totalPrice: validItems.reduce((sum, item) => sum + item.price, 0),
        totalProductsCount: validItems.reduce((sum, item) => sum + item.count, 0),
      })
    } catch (error) {
      local.removeItem('cart')
      setCart({
        items: [],
        totalPrice: 0,
        totalProductsCount: 0,
      })
    }
  }, [setUser])

  const addToLocalCart: AddToLocalCart = useCallback(({ count, product }) => {
    if (count > product.count || count < 0) {
      return
    }

    setCart(prevCart => {
      const currentItems = prevCart.items || []
      const duplicatedCartItem = currentItems.find(item => item.product.id === product.id)

    if (duplicatedCartItem) {
      if (count === 0) {
          const updatedItems = currentItems.filter(item => item.id !== duplicatedCartItem.id)
          const updatedCart = {
            items: updatedItems,
            totalPrice: updatedItems.reduce((sum, item) => sum + item.price, 0),
            totalProductsCount: updatedItems.reduce((sum, item) => sum + item.count, 0),
          }
          local.setItem('cart', JSON.stringify(updatedCart))
          return updatedCart
      }

      if (count === duplicatedCartItem.count) {
          return prevCart
      }

        const updatedItems = currentItems.map(item => {
          if (item.id === duplicatedCartItem.id) {
            return {
              ...item,
              count,
              price: product.price * count,
            }
          }
          return item
        })

        const updatedCart = {
          items: updatedItems,
          totalPrice: updatedItems.reduce((sum, item) => sum + item.price, 0),
          totalProductsCount: updatedItems.reduce((sum, item) => sum + item.count, 0),
        }
        local.setItem('cart', JSON.stringify(updatedCart))
        return updatedCart
      }

      const id = Date.now() + Math.random()
      const cartItem: CartItem = {
        id,
        count,
        product,
        price: product.price * count,
      }

      const updatedItems = [cartItem, ...currentItems]
      const updatedCart = {
        items: updatedItems,
        totalPrice: updatedItems.reduce((sum, item) => sum + item.price, 0),
        totalProductsCount: updatedItems.reduce((sum, item) => sum + item.count, 0),
      }
      local.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart
    })
  }, [])

  const deleteFromLocalCart: DeleteFromLocalCart = useCallback((id) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.id !== id)
      const updatedCart = {
        items: updatedItems,
        totalPrice: updatedItems.reduce((sum, item) => sum + item.price, 0),
        totalProductsCount: updatedItems.reduce((sum, item) => sum + item.count, 0),
      }
      local.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart
    })
  }, [])

  useEffect(() => {
    if (!isUserExist) {
      getLocalCartItems()
    } else if (user.id) {
      getCartItems(user.id)
    }
  }, [isUserExist, user.id, getLocalCartItems, getCartItems])

  const value = useMemo<CartContextProps>(() => ({
    cart,
    getCartItems,
    addToCart,
    deleteFromCart,
    getLocalCartItems,
    addToLocalCart,
    deleteFromLocalCart,
    findCartItemByProductId,
    loading,
  }), [
    cart,
    getCartItems,
    addToCart,
    deleteFromCart,
    getLocalCartItems,
    addToLocalCart,
    deleteFromLocalCart,
    findCartItemByProductId,
    loading,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
