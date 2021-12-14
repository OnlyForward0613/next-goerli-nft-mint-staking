import { Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import TxTable from '../../components/TxTable.js'
import Web3 from 'web3'

let web3 = undefined

export default function Transactions({ address, connected, setLoading, closeLoading, ...props }) {

  const [transaction, setTransactions] = useState([])

  const getTxList = async () => {
    setLoading()
    web3 = new Web3(Web3.givenProvider)
    const blockNumber = await web3.eth.getBlockNumber()
    const block = await web3.eth.getBlock(blockNumber)
    const hash = block.hash
    getTxDetail(block.transactions)
  }

  const getTxDetail = async (tx) => {
    const item = await web3.eth.getTransaction('0xb2d815d3dd72ca273c491fc250b0fa17ad8217f0af7c686cff8bc4d24de5ed92')
    let txdetails = []
    for (var i = 0; i < 10; i++) {
      txdetails[i] = await web3.eth.getTransaction(tx[i])
    }
    setTransactions(txdetails)
    // console.log(txdetails)
    closeLoading()
  }

  useEffect(() => {
    getTxList()
  }, [])

  return (
    <Container>
      <Typography component="h2" color="secondary" fontSize={30} fontWeight={900}>
        Transactions
      </Typography>
      <TxTable transaction={transaction} />
    </Container>
  )
}