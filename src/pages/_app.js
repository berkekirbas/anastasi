import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Inter } from "next/font/google";

import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
});

import { wrapper } from "@/store/store";
import { Loader } from "@/components";

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <main className={inter.className}>
      <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={<Loader />}>
          <Component {...props.pageProps} />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </main>
  );
}

export default App;
