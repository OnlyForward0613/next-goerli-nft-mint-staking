import { useEffect, useState } from 'react'
import SideMenu from '../components/SideMenu'
import '../styles/globals.css'
import '../styles/style.scss'
import Web3 from "web3"
import Web3Modal from "web3modal"
import { SMARTCONTRACT_ABI, SMARTCONTRACT_ADDRESS } from '../../config'

function MyApp({ Component, pageProps }) {

  const [signerAdress, setSignerAddress] = useState("")
  const [connected, setConnected] = useState(false)

  const connectWallet = async () => {
    const providerOptions = {
      /* See Provider Options Section */
    }

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    })

    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    provider.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        setConnected(false)
      } else {
        setConnected(true)
        setSigner(accounts[0])
      }
    });
  }

  const setSigner = (address) => {
    console.log(address, "aaaa")
    setSignerAddress(address)
  }

  useEffect(() => {
    // ethereum.on('accountsChanged', function (accounts) {
    //   if (accounts.length !== 0) {
    //     setSigner(accounts[0])
    //     setConnected(true)
    //   } else {
    //     setConnected(false)
    //   }
    // });
    // if (ethereum.selectedAddress !== null) {
    //   setConnected(true)
    //   setSignerAddress(ethereum.selectedAddress)
    // }
    console.log(SMARTCONTRACT_ABI, SMARTCONTRACT_ADDRESS, "sss")
  }, [])

  return (
    <div className="full-page">
      <SideMenu
        connectWallet={connectWallet}
        connected={connected}
        address={signerAdress}
      />
      <Component {...pageProps}
      />
    </div>
  )
}

export default MyApp
