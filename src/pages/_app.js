import { useEffect, useState } from 'react'
import SideMenu from '../components/SideMenu'
import '../styles/globals.css'
import '../styles/style.scss'
import Web3 from "web3"
import Web3Modal from "web3modal"
import { ethers } from "ethers"
import { SMARTCONTRACT_ERC20_ABI, SMARTCONTRACT_ERC20_ADDRESS, SMARTCONTRACT_ERC721_ABI, SMARTCONTRACT_ERC721_ADDRESS } from '../../config'

let web3 = undefined
let contract_erc721 = undefined
let contract_erc20 = undefined
let provider = undefined
let signer = undefined

function MyApp({ Component, pageProps }) {

  const [signerAdress, setSignerAddress] = useState("")
  const [connected, setConnected] = useState(false)
  const [infoLoading, setInfoLoading] = useState()
  const [minted, setMinted] = useState(0)
  const [totalSignerNFTs, setTotalSignerNFTs] = useState(0)
  const [totalSignerTroops, setTotalSignerTroops] = useState(0)

  const connectWallet = async () => {
    const providerOptions = {
      /* See Provider Options Section */
    }
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    })

    provider = await web3Modal.connect()
    checkContract()
    provider.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        setConnected(false)
      } else {
        setConnected(true)
        setSigner(accounts[0])
      }
    });

    setInfoLoading(true)
    getTotalMinted()
    setInfoLoading(false)
  }

  const checkContract = async () => {
    web3 = new Web3(provider)
    provider = new ethers.providers.Web3Provider(provider);
    signer = provider.getSigner();
    contract_erc721 = new ethers.Contract(
      SMARTCONTRACT_ERC721_ADDRESS,
      SMARTCONTRACT_ERC721_ABI,
      signer
    );
    contract_erc20 = new ethers.Contract(
      SMARTCONTRACT_ERC20_ADDRESS,
      SMARTCONTRACT_ERC20_ABI,
      signer
    );
    const accounts = await web3.eth.getAccounts()
    getNFTs(accounts[0])
    getTroops(accounts[0])

  }

  const setSigner = (address) => {
    console.log(address, "aaaa")
    setSignerAddress(address)
  }

  const getTotalMinted = async () => {
    const totalMinted = await contract_erc721.totalSupply()
    setMinted(totalMinted.toString())
  }

  const getTroops = async (address) => {
    const total = await contract_erc20.balanceOf(address)
    setTotalSignerTroops(total.toString())
  }

  const getNFTs = async (address) => {
    const total = await contract_erc721.balanceOf(address)
    setTotalSignerNFTs(total.toString())
  }

  useEffect(() => {
    ethereum.on('accountsChanged', function (accounts) {
      if (accounts.length !== 0) {
        setSigner(accounts[0])
        setConnected(true)
      } else {
        setConnected(false)
      }
    });
    if (ethereum.selectedAddress !== null) {
      setConnected(true)
      setSignerAddress(ethereum.selectedAddress)
    }
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
        totalSignerNFTs={totalSignerNFTs}
        totalSignerTroops={totalSignerTroops}
      />
      <Component {...pageProps}
      />
    </div>
  )
}

export default MyApp
