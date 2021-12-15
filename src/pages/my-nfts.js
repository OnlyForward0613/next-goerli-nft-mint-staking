import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

export default function MyNfts({
  address,
  connectWallet,
  minted,
  contract,
  totalSignerNFTs,
  getTotalMinted,
  balance,
  onLoading,
  connected,
  offLoading,
  ...props }) {
  const [lists, setLists] = useState([])

  let mine_NFTs = []

  const getNFTList = async () => {
    console.log(contract)
    onLoading()
    let totalNfts = []
    let mine = []
    let resNft
    for (let i = 1; i <= minted; i++) {
      const owner = await contract.ownerOf(i)
      totalNfts.push({ "address": owner, "id": i })
    }
    for (let i = 0; i < totalNfts.length; i++) {
      if (totalNfts[i]['address'].toString().toLowerCase() === address.toString().toLowerCase()) {
        mine.push(totalNfts[i]['id'])
      }
    }
    for (var i = 0; i < mine.length; i++) {
      if (contract !== undefined) resNft = await contract.tokenURI(mine[i])
      fetch(resNft)
        .then(resp =>
          resp.json()
        ).then((json) => {
          mine_NFTs.push(json)
        })
    }
    console.log(mine_NFTs)
    drawList(mine_NFTs)
    offLoading()
  }
  const drawList = (list) => {
    setLists(list)
  }

  const setFarm = async (id) => {
    try {
      await contract.doAction(id, 1)
    } catch (err) {
      console.log(err)
    }
  }
  const setTrain = async (id) => {
    try {
      await contract.doAction(id, 2)
    } catch (err) {
      console.log(err)
    }
  }
  const setUnstake = async (id) => {
    try {
      await contract.doAction(id, 0)
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    connectWallet()
    contract !== undefined && getNFTList()
  }, [])

  return (
    <>
      <Head>
        <title>Game of Risk | Mint</title>
        <meta name="description" content="Game of Risk Dapp Created by Oura Kano" />
      </Head>
      <div className="page">
        <h1>My NFTs</h1>
        <div className="my-nfts-content">
          {
            lists.map((item, key) => (
              <Card sx={{ maxWidth: 300, margin: "15px" }} key={key}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ButtonGroup variant="contained" fullWidth>
                    <Button onClick={() => setUnstake(item.name.split("#")[1].toString())}>Unstake</Button>
                    <Button onClick={() => setFarm(item.name.split("#")[1].toString())}>Farm</Button>
                    <Button onClick={() => setTrain(item.name.split("#")[1].toString())}>Train</Button>
                  </ButtonGroup>
                </CardActions>
              </Card>
            ))
          }
        </div>
      </div>
    </>
  )
}
