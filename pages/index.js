import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { setUserId } from "../store/userSlice"
import Header from "../components/header"
import axios from "axios"
import { toast } from "react-toastify"

const Index = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [userID, setUserID] = useState("")


  useEffect(() => {
    if (userID) {
      dispatch(setUserId(userID))
      sendToProducts()
    }
  }, [userID])

  const sendToProducts = async () => {
    await router.push("/view-all-products")
  }

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [status, setStatus] = useState(0)
  const authUser = async (e) => {
    e.preventDefault()

    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      email, password, name,
    }).then((res) => {
      if (res.status === 200) {
        setStatus(200)
      }
    }).catch((err) => {
      if (err.response.status === 409) {
        setStatus(err.response.status)
      }
    })
  }

  useEffect(() => {
    if (status === 200 || status === 409) {
      login()
    }
  }, [status])


  const login = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      email, password,
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Login successful")
        setUserID(res.data.userId)
      }
    }).catch((err) => {
      toast.error("Login failed")
      console.log(err)
    })
  }

  return (
    <>
      <Header homepage={true} />
      <main>
        <div className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <form className="space-y-6" onSubmit={authUser}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Index