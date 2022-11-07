import "../styles/globals.css"
import { store } from "../store/store"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return <>
    <ToastContainer position={'bottom-center'} />
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp
