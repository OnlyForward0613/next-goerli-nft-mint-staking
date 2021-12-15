import { useState } from 'react'
import Head from 'next/head'
import { MintButton } from '../components/styleHook'
import ClipLoader from 'react-spinners/ClipLoader'
import { successAlert, errorAlert } from '../components/toastGroup'

export default function Mint({
  address,
  connectWallet,
  minted,
  contract,
  totalSignerNFTs,
  getTotalMinted,
  balance,
  getNFTs,
  ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const mint = async () => {
    setIsLoading(true)
    try {
      await contract.mint()
      successAlert("Contratulation! You get new NFT")
    } catch (err) {
      console.log(err)
      err.message ? errorAlert(err.message) : errorAlert("Oops! We find an error. Please try again")
    }
    connectWallet()
    getTotalMinted()
    getNFTs(address)
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>Game of Risk | Mint</title>
        <meta name="description" content="Game of Risk Dapp Created by Oura Kano" />
      </Head>

      <div className="page">
        <h1>Please Mint</h1>
        <div className="mint-content">
          <p>Total Minted: <span>{minted}</span></p>
          <p>Your NFTs: <span>{totalSignerNFTs}</span></p>
          <p>Your Balance: <span>{balance}</span><span style={{ fontSize: 20 }}>&nbsp;ETH</span></p>
          <MintButton onClick={() => mint()} disabled={isLoading}>
            {isLoading ?
              <ClipLoader loading={isLoading} color="#fff" size={30} />
              :
              "MINT"
            }
          </MintButton>
        </div>
      </div>
    </>
  )
}
