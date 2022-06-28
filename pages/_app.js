import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Header.css";
import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import Layout from "../components/Layout";
import "../styles/globals.css";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [infuraProvider({ infuraId }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "primero",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// const { data: account } = useAccount();
// const { disconnect } = useDisconnect();

function MyApp({ Component, pageProps }) {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div>
      {/* <nav className="border-b p-6 flex justify-between items-center shadow-lg bg-blue-500"> */}
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}></RainbowKitProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>
      {/* </nav> */}
    </div>
  );
}

export default MyApp;
