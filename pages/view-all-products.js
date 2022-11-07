import axios from "axios"
import React, { useEffect, useState } from "react"
import Header from "../components/header"
import { useRouter } from "next/router"

const ViewAllProducts = () => {
  const router = useRouter()
  const [productArray, setProductArray] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get-all`)
      .then((response) => {
        setProductArray(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const gotoProduct = async (id) => {
    await router.push({
      pathname: "/view-product",
      query: { id: id },
    })
  }

  return (
    <>
      <Header />
      <section aria-labelledby="products-heading" className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {productArray.map((product) => (
            <div
              onClick={() => gotoProduct(product._id)}
              key={product._id} className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
              <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                  <p className="mt-1 text-sm text-gray-500">
                    {product.quantity !== 0 ? `${product.quantity} in stock` : "No Stock"}
                  </p>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">LKR {product.price} </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default ViewAllProducts