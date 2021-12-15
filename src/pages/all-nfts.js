import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Modal, Box, ButtonGroup, Card, FormGroup, FormControlLabel, CardContent, CardMedia, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material'
import ClipLoader from 'react-spinners/ClipLoader'
import { errorAlert, successAlert } from '../components/toastGroup'
import { DoActionButton, PilActionButton } from '../components/styleHook'

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

  const getNFTList = async () => {
    // console.log(contract)
    onLoading()
    let totalNfts = []
    for (let i = 22; i <= minted; i++) {
      const activities = await contract.activities(i.toString())
      if (activities.owner.toString().toLowerCase() === address.toString().toLowerCase()) {
        const meta = await contract.tokenURI(i)
        await fetch(meta)
          .then(resp =>
            resp.json()
          ).then((json) => {
            totalNfts.push({
              "id": i,
              "owner": activities.owner,
              "action": activities.action,
              "image": json.image,
              "name": json.name,
              "description": json.description
            })
          })
      }
    }
    setLists(totalNfts)
    offLoading()
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
        <title>Game of Risk | NFT list</title>
        <meta name="description" content="Game of Risk Dapp Created by Oura Kano" />
      </Head>
      <div className="page">
        <h1>All NFTs</h1>
        {totalSignerNFTs === "0" &&
          <p className="empty-items">You don't have any NFTs. Please Mint a new NFT or unstake</p>
        }
        <div className="my-nfts-content">
          {
            lists.map((item, key) => (
              <NFTCard item={item} contract={contract} key={key} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export function NFTCard({ item, contract, ...props }) {

  const [isFLoading, setIsFLoading] = useState(false)
  const [isTLoading, setIsTLoading] = useState(false)
  const [isULoading, setIsULoading] = useState(false)
  const [isCLoading, setIsCLoading] = useState(false)
  const [label, setLabel] = useState("")
  const [modal, setModal] = useState(false)

  const setFarm = async () => {
    setIsFLoading(true)
    try {
      await contract.doAction(item.id, 1)
      successAlert("Contratulation! You done the farming")
      setIsFLoading(false)
    } catch (err) {
      console.log(err)
      err.message ? errorAlert(err.message) : errorAlert("Oops! We find an error. Please try again")
      setIsFLoading(false)
    }
  }
  const setTrain = async () => {
    setIsTLoading(true)
    try {
      await contract.doAction(item.id, 2)
      successAlert("Contratulation! You done the training")
      setIsTLoading(false)
    } catch (err) {
      console.log(err)
      err.message ? errorAlert(err.message) : errorAlert("Oops! We find an error. Please try again")
      setIsTLoading(false)
    }
  }
  const setUnstake = async () => {
    setIsULoading(true)
    try {
      await contract.doAction(item.id, 0)
      successAlert("Contratulation! You done the unstake")
      setIsULoading(false)
    } catch (err) {
      console.log(err)
      err.message ? errorAlert(err.message) : errorAlert("Oops! We find an error. Please try again")
      setIsULoading(false)
    }
  }

  const setClaim = async () => {
    setIsCLoading(true)
    try {
      await contract.claim([item.id.toString()])
      successAlert("Contratulation! You done the claiming")
      setIsCLoading(false)
    } catch (err) {
      console.log(err)
      err.message ? errorAlert(err.message) : errorAlert("Oops! We find an error. Please try again")
      setIsCLoading(false)
    }
  }
  useEffect(() => {
    if (item.action === 0) setLabel("UNSTAKED")
    if (item.action === 1) setLabel("FARMING")
    if (item.action === 2) setLabel("TRAINING")
  }, [])
  return (
    <Card sx={{ maxWidth: 300, margin: "15px" }}>
      <CardMedia
        component="img"
        image={item.image}
        alt="Game of Risk NFT"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}<span className="card-ribbon">{label}{item.action}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <ButtonGroup variant="contained" fullWidth>
          <DoActionButton onClick={() => setUnstake()} disabled={isULoading} >
            {isULoading ?
              <ClipLoader loading={isULoading} color="#fff" size={15} />
              :
              "Unstake"
            }
          </DoActionButton>
          <DoActionButton onClick={() => setFarm()} disabled={isFLoading} >
            {isFLoading ?
              <ClipLoader loading={isFLoading} color="#fff" size={15} />
              :
              "Farm"
            }
          </DoActionButton>
          <DoActionButton onClick={() => setTrain()} disabled={isTLoading} >
            {isTLoading ?
              <ClipLoader loading={isTLoading} color="#fff" size={15} />
              :
              "Train"
            }
          </DoActionButton>
          <DoActionButton onClick={() => setClaim()} disabled={isCLoading} >
            {isCLoading ?
              <ClipLoader loading={isCLoading} color="#fff" size={15} />
              :
              "Claim"
            }
          </DoActionButton>
        </ButtonGroup>

        <PilActionButton onClick={() => setModal(true)}>Pillage</PilActionButton>
      </CardContent>
      <PillageModal opened={modal} close={() => setModal(false)} contract={contract} id={item.id} />
    </Card>
  )
}

export function PillageModal({ opened, close, contract, id, ...props }) {
  const [place, setPlace] = useState(0)
  const [tree, setTree] = useState(false)
  const [mountain, setMountain] = useState(false)
  const [special, setSpecial] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setPlace(event.target.value);
  };

  const pillage = async () => {
    setLoading(true)
    try {
      await contract.pillage(id.toString(), place, tree, mountain, special)
      successAlert("Contratulation! You done the unstake")
      setLoading(false)
    } catch (err) {
      console.log(err)
      err.message ? errorAlert(err.message) : errorAlert("Oops! We find an error. Please try again")
      setLoading(false)
    }
  }
  return (
    <div>
      <Modal
        open={opened}
        onClose={close}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 style={{ padding: "10px 0" }}>Please select place</h2>
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Place</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={place ?? " "}
              label="Age"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value={0}>TOWN</MenuItem>
              <MenuItem value={1}>DUNGEON</MenuItem>
              <MenuItem value={2}>CRYPT</MenuItem>
              <MenuItem value={3}>CASTLE</MenuItem>
              <MenuItem value={4}>DRAGONS LAIR</MenuItem>
              <MenuItem value={5}>THE ETHER</MenuItem>
              <MenuItem value={6}>TAINTED KINGDOM</MenuItem>
              <MenuItem value={7}>OOZING DEN</MenuItem>
              <MenuItem value={8}>ANCIENT CHAMBER</MenuItem>
              <MenuItem value={9} disabled>TROOP GODS</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel onClick={() => setTree(!tree)} control={<Checkbox checked={tree} />} label="Tree" />
            <FormControlLabel onClick={() => setMountain(!mountain)} control={<Checkbox checked={mountain} />} label="Mountain" />
            <FormControlLabel onClick={() => setSpecial(!special)} control={<Checkbox checked={special} />} label="Special" />
          </FormGroup>
          <DoActionButton onClick={close} style={{ marginTop: 30, marginLeft: 10 }}>Cancel</DoActionButton>
          <PilActionButton onClick={() => pillage()} style={{ marginTop: 30, marginLeft: 10 }}>
            {loading ?
              <ClipLoader loading={loading} color="#fff" size={15} />
              :
              "Pillage"
            }
          </PilActionButton>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "6px",
  pt: 2,
  px: 4,
  pb: 3,
};