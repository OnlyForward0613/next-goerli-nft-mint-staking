import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import ClipLoader from 'react-spinners/ClipLoader'
import { errorAlert, successAlert } from '../components/toastGroup'

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
  const [isLoading, setIsLoading] = useState(false)
  const [isTLoading, setIsTLoading] = useState(false)

  const getNFTList = async () => {
    console.log(contract)
    onLoading()
    let mine_NFTs = []
    let totalNfts = []
    let mine = []
    let resNft
    for (let i = 1; i <= minted; i++) {
      const owner = await contract.ownerOf(i)
      totalNfts.push({ "owner": owner, "id": i })
    }
    for (let i = 0; i < totalNfts.length; i++) {
      if (totalNfts[i]['owner'].toString().toLowerCase() === address.toString().toLowerCase()) {
        mine.push(totalNfts[i]['id'])
      }
    }
    for (var i = 0; i < mine.length; i++) {
      if (contract !== undefined) resNft = await contract.tokenURI(mine[i])
      await fetch(resNft)
        .then(resp =>
          resp.json()
        ).then((json) => {
          mine_NFTs.push(json)
        })
    }
    setLists(mine_NFTs)
    offLoading()
  }

  const setFarm = async (id) => {
    setIsLoading(true)
    try {
      await contract.doAction(id, 1)
      successAlert("Contratulation! You done the farming")
    } catch (err) {
      console.log(err)
      err.message ? errorAlert(err.message) : errorAlert("Oops! We find an error. Please try again")
    }
    setIsLoading(false)
  }
  const setTrain = async (id) => {
    setIsTLoading(true)
    successAlert("Contratulation! You done the training")
    try {
      await contract.doAction(id, 2)
    } catch (err) {
      console.log(err)
      err.message ? errorAlert(err.message) : errorAlert("Oops! We find an error. Please try again")
    }
    setIsTLoading(false)
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
    if (totalSignerNFTs !== "0") {
      contract !== undefined && getNFTList()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Game of Risk | Mint</title>
        <meta name="description" content="Game of Risk Dapp Created by Oura Kano" />
      </Head>
      <div className="page">
        <h1>My NFTs</h1>
        {totalSignerNFTs === "0" &&
          <p className="empty-items">You don't have any NFTs. Please Mint a new NFT or unstake</p>
        }
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
                    <Button onClick={() => setUnstake(item.name.split("#")[1].toString())} disabled>Unstake</Button>
                    <Button onClick={() => setFarm(item.name.split("#")[1].toString())}>
                      {isLoading ?
                        <ClipLoader loading={isLoading} color="#fff" size={15} />
                        :
                        "Farm"
                      }
                    </Button>
                    <Button onClick={() => setTrain(item.name.split("#")[1].toString())}>
                      {isTLoading ?
                        <ClipLoader loading={isTLoading} color="#fff" size={15} />
                        :
                        "Train"
                      }</Button>
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
