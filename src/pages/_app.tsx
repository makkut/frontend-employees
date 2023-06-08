import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Store from "@/store/store";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import { State } from "../interfaces/interfaces";

export const store = new Store();

export const Context = createContext<State>({
  store,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Context.Provider
      value={{
        store,
      }}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Context.Provider>
  );
}
