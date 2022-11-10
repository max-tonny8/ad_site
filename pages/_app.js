import '../styles/globals.css'
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "@rainbow-me/rainbowkit/styles.css";

const mumbaiChain = {
  id: 80001,
  name: "Matic Mumbai",
  network: "mumbai",
  nativeCurrency: {
    decimals: 18,
    name: "Matic Mumbai",
    symbol: "MATIC ",
  },
  rpcUrls: {
    default: "https://rpc-mumbai.maticvigil.com/",
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [chain.mainnet, mumbaiChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: mumbaiChain.rpcUrls,
      }),
    }),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "Imagegram",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={{
          appName: "Imagegram",
        }}
        chains={chains}
        theme={midnightTheme({
          accentColor: "#5859FF",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
        showRecentTransactions={true}
        coolMode
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp
