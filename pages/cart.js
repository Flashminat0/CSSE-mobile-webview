import React, { useEffect, useState } from "react"
import Header from "../components/header"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { removeAllFromCart, setCartItemCount } from "../store/cartSlice"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

const Cart = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart)

  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    setCartItems([])
  }, [])

  useEffect(() => {
    if (items) {
      items.map((item) => {
        fetchSingleProduct(item.id, item.amount)
      })
    }
  }, [items])

  const fetchSingleProduct = async (id, amount) => {
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get-by-id`, {
      params: {
        id: id,
      },
    })
      .then((response) => {
        setCartItems((prevState) => [...prevState, {
          ...response.data,
          amount: amount,
        }])
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const removeStoreItemHandler = (id) => {
    dispatch(removeAllFromCart(id))
    dispatch(setCartItemCount())
    setCartItems([])
    toast.success("Item removed from cart")
  }


  const [total, setTotal] = useState(0)
  useEffect(() => {
    let total = 0
    cartItems.map((item) => {
      total += item.price * item.amount
    })
    setTotal(total)
  }, [cartItems])

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

          <div className="mt-12">
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                {cartItems.map((product) => (
                  <li key={product._id} className="flex py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </a>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">LKR {product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                        <p className="mt-1 text-sm text-gray-500">{product.amount} items</p>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <div className="">
                          <button
                            onClick={() => removeStoreItemHandler(product._id)}
                            type="button" className="text-sm font-medium text-yellow-600 hover:text-yellow-500">
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            {cartItems.length > 0 ? <section aria-labelledby="summary-heading" className="mt-10">
                <h2 id="summary-heading" className="sr-only">
                  Order summary
                </h2>

                <div>
                  <dl className="space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                      <dd className="ml-4 text-base font-medium text-gray-900">LKR {total}</dd>
                    </div>
                  </dl>
                  <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
                </div>

                <div className="mt-10">
                  <button
                    onClick={() => router.push({
                      pathname: "/checkout",
                    })}
                    type="button"
                    className="w-full rounded-md border border-transparent bg-yellow-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Checkout
                  </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    or {" "}
                    <a onClick={() => router.push({
                      pathname: "/view-all-products",
                    })} className="font-medium text-yellow-600 hover:text-yellow-500">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </p>
                </div>
              </section> :
              <section>
                <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
                  <main
                    className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="py-16">
                      <div className="text-center">
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Cart is
                          empty</h1>
                        <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t go through checkout process
                          without anything in the cart</p>
                        <div className="mt-6">
                          <a onClick={() => router.push({
                            pathname: "/view-all-products",
                          })} className="text-base font-medium text-yellow-600 hover:text-yellow-500">
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </section>
            }
          </div>
        </div>

      </main>
    </>

  )
}

export default Cart