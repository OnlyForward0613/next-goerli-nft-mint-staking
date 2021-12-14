import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'
import '../assets/scss/style.scss'
import Header from '../components/Header'
import { AppThemeProvider } from '../components/ThemeContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getMessageFromCode } from 'eth-rpc-errors'
import { URDT_SmartContractAddress, USDT_SmartContract } from '../../config'
import Loading from '../components/Loading'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { orange, purple } from '@mui/material/colors'

let chainData = undefined
let chainId = undefined
let accounts = undefined
let web3 = undefined

function App({ Component, pageProps }) {

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: '#eee',
      },
    },
  });

  const [address, setAddress] = useState('')
  const [connected, setConnected] = useState(false)
  const [balance, setBalance] = useState('')
  const [symbol, setSymbol] = useState('')
  const [networkName, setNetworkname] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const connectWallet = async () => {
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(
        async () => {
          setAccountInfo()
        }
      )
      .catch((error) => {
        if (error.code === -32002) {
          // EIP-1193 userRejectedRequest error
          !connected &&
            toast.error('The wallet is opened. Please connect', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'colored'
            })
        } else if (error.code === 4001) {
          !connected &&
            toast.error('You rejected the connect, please connect the MetaMask', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'colored'
            })
        }
      })
  }

  const setAccountInfo = async () => {
    toast.dismiss()
    web3 = new Web3(Web3.givenProvider)
    accounts = await web3.eth.getAccounts()
    chainId = await web3.eth.getChainId()
    const balanceAccount = await web3.eth.getBalance(accounts[0])
    setSymbol(getChainData(chainId))
    setConnected(true)
    setAddress(accounts[0])
    setBalance(ethers.utils.formatEther(balanceAccount))
  }

  const getChainData = (id) => {
    fetch('https://chainid.network/chains.json')
      .then(resp =>
        resp.json()
      ).then((json) => {
        chainData = json
        setSymbol(chainData.find(x => x.chainId === id).nativeCurrency.symbol)
        setNetworkname(chainData.find(x => x.chainId === id).name)
      })
  }

  const getUsdtBalance = async () => {
    web3 = new Web3(Web3.givenProvider)
    const Contract = new web3.eth.Contract(USDT_SmartContract, URDT_SmartContractAddress)
    const balance1 = await Contract.methods.balanceOf('0x1AA8CC0549e936D449e649D6D35B4c107a589D08')
    const balance = await Contract.methods.owner()
  }

  const getResult = async () => {
    setIsLoading(true)
    web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    const blockNumber = await web3.eth.getBlockNumber()
    const block = await web3.eth.getBlock(blockNumber)
    const blockTransactionCount = await web3.eth.getBlockUncleCount(blockNumber)
    // const transaction = await web3.eth.getTransaction('0x82d998aaa6b6cf8b8a055aca7eb42d5991f781785a3c11db2167ad755d8627c5')
    // web3.eth.getTransactionCount(accounts[0]).then(console.log)
    web3.eth.getChainId()
      .then(console.log)
      .catch((err) => {
        const errorCode = err.code
        console.log(getMessageFromCode(errorCode))
      })
    setIsLoading(false)
  }

  useEffect(async () => {
    // connectWallet()
    ethereum.on('chainChanged', (chainId) => {
      setAccountInfo()
    }
    )
    ethereum.on('accountsChanged', () => {
      setConnected(false)
    })
    // getUsdtBalance()
  }, [])

  useEffect(() => {
    connectWallet()
  }, [connected])

  useEffect(async () => {
    ethereum.on('chainChanged', (chainId) => {
      console.log(chainId)
    });
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <AppThemeProvider>
        <Header
          handleConnect={connectWallet}
          address={address}
          connected={connected}
          network={networkName}
        />
        <Component {...pageProps}
          connected={connected}
          address={address}
          getResult={getResult}
          balance={balance}
          symbol={symbol}
          chainData={chainData}
          chainId={chainId}
          loading={isLoading}
          setLoading={() => setIsLoading(true)}
          closeLoading={() => setIsLoading(false)}
          web3={web3}
        />
        <ToastContainer style={{ fontSize: 12, padding: '5px !important', lineHeight: '15px' }} />
        <Loading loading={isLoading} />
      </AppThemeProvider>
    </ThemeProvider>
  )
}

export default App
