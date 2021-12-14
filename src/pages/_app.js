import { useEffect, useState } from 'react'
import SideMenu from '../components/SideMenu'
import '../styles/globals.css'
import '../styles/style.scss'
import Web3 from "web3"
import Web3Modal from "web3modal"
import { ethers } from "ethers"
import { SMARTCONTRACT_ERC721_ABI, SMARTCONTRACT_ERC721_ADDRESS } from '../../config'

let web3 = undefined
let contract_erc721 = undefined
// let contract_erc20 = undefined
let provider1 = undefined
let signer = undefined
let connection = undefined

function MyApp({ Component, pageProps }) {

  const [signerAdress, setSignerAddress] = useState("")
  const [connected, setConnected] = useState(false)
  const [infoLoading, setInfoLoading] = useState()
  const [minted, setMinted] = useState(0)

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
    web3 = new Web3(provider)

    connection = await web3Modal.connect();
    provider1 = new ethers.providers.Web3Provider(connection);
    signer = provider1.getSigner();
    contract_erc721 = new ethers.Contract(
      SMARTCONTRACT_ERC721_ADDRESS,
      SMARTCONTRACT_ERC721_ABI,
      signer
    );

    getTotalMinted()

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

  const getTotalMinted = async () => {
    console.log(contract_erc721)
    setInfoLoading(true)
    const totalMinted = await contract_erc721.totalSupply()
    setMinted(totalMinted.toString())
    setInfoLoading(false)

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
    connectWallet()
  }, [])

  return (
    <div className="full-page">
      <SideMenu
        connectWallet={connectWallet}
        connected={connected}
        address={signerAdress}
        infoLoading={infoLoading}
        minted={minted}
      />
      <Component {...pageProps}
      />
    </div>
  )
}

export default MyApp
