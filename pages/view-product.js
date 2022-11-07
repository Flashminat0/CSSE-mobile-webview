import React, { useEffect, useState } from "react"
import axios from "axios"
import Header from "../components/header"
import { useRouter } from "next/router"
import { addToCart, setCartItemCount } from "../store/cartSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const ViewProduct = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id)
    }
  }, [id])


  const [product, setProduct] = useState({})
  const fetchSingleProduct = async (id) => {
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get-by-id`, {
      params: {
        id: id,
      },
    })
      .then((response) => {
        setProduct(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const [amount, setAmount] = useState(1)

  const addToCartHandler = () => {
    for (let i = 0; i < amount; i++) {
      dispatch(addToCart(product._id))
    }
    dispatch(setCartItemCount())
    setAmount(1)

    toast.success("Item added to cart")
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8 h-screen">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          {Object.keys(product).length !== 0 &&
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              <div className="flex flex-col-reverse">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover sm:rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 capitalize">{product.name}</h1>

                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl text-gray-900 ">LKR {product.price} </p>
                </div>

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />

                {product.quantity > 0 && <div className="mt-10 flex sm:flex-col1">
                  <button
                    disabled={amount === 1}
                    onClick={() => setAmount(amount - 1)}
                    type="button"
                    className="w-2 flex-1 bg-yellow-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-yellow-500"
                  >
                    <p className={`scale-150`}>-</p>
                  </button>
                  <p
                    className="w-2 flex-1  border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-4xl font-medium text-black"
                  >
                    {amount}
                  </p>
                  <button
                    onClick={() => setAmount(amount + 1)}
                    type="button"
                    className="max-w-xs flex-1 bg-yellow-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-yellow-500"
                  >
                    <p className={`scale-150`}>+</p>
                  </button>
                </div>
                }

                {product.quantity === 0 &&
                  <div className="mt-10  justify-center text-center bg-red-border/20 py-4 rounded-lg text-xl font-bold text-gray-500">
                    Out of stock
                  </div>
                    }
                <div className="mt-10 flex justify-center">
                  <button
                    disabled={product.quantity === 0}
                    onClick={addToCartHandler}
                    type="button"
                    className={`max-w-xs flex-1 bg-yellow-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-yellow-500 sm:w-full ${product.quantity === 0 && `opacity-50 cursor-not-allowed`}`}
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>}
        </div>
      </main>
    </>
  )
}

export default ViewProduct