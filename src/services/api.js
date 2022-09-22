//Cross-domain proxy prefix
// const API_PROXY_PREFIX='/api'
//const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
// const NETWORK = process.env.NODE_ENV === 'development' ? 'testnet' : 'mainnet'
const NETWORK = 'mainnet'
// var NETWORK = ''

function CONFIG(keyStores) {
  switch (NETWORK) {
  case 'mainnet':
    return {
      networkId: 'mainnet',
      keyStore: keyStores,
      nodeUrl: "https://rpc.mainnet.near.org",
      // walletUrl: "https://wallet.mainnet.near.org",
      walletUrl: "https://app.mynearwallet.com/",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://explorer.mainnet.near.org",
    }
  case 'testnet':
    return {
      networkId: "testnet",
      keyStore: keyStores,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    }
  default:
    throw Error(`Unconfigured environment '${NETWORK}'`)
  }
}


module.exports = {
  ROUTES: `${BASE_URL}/menu-get`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,
  BINANCE_NEAR: `https://api.binance.com/api/v3/ticker/24hr?symbol=NEARUSDT`,
  CONFIG,
}
