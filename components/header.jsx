import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

const Header = ({homepage}) => {
  const router = useRouter()
  const { count } = useSelector(state => state.cart)

  return (
    <header className="bg-yellow-600">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-yellow-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a onClick={async () => {
              await router.push(`${homepage ? "/" : "/view-all-products"}`)
            }}>
              <span className="sr-only">Your Company</span>
              <img className="h-10 w-auto"
                   src="https://img.icons8.com/external-kmg-design-flat-kmg-design/64/000000/external-excavator-transportation-kmg-design-flat-kmg-design.png"
                   alt="" />
            </a>
          </div>
          <div className={`ml-10 space-x-4 ${homepage && 'hidden'}`}>
            <a
              onClick={async () => {
                await router.push("/cart")
              }}
              className="inline-block rounded-md border border-transparent bg-yellow-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
            >
              View Cart {count > 0 && `(${count})`}
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header