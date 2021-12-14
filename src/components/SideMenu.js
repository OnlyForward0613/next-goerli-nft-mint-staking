import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ConnectButton, MenuButton } from './styleHook';

export default function SideMenu({
  connectWallet,
  connected,
  address,
  minted,
  totalSignerNFTs,
  totalSignerTroops,
  infoLoading,
  balance,
  ...props
}) {
  const router = useRouter()
  const handleItem = (link) => {
    router.push(link)
  }
  useEffect(() => {
    !connected && router.push("/")
  }, [connected])
  return (
    <div className="side-menu">
      <div className="side-logo">
        <h2>GAME OF RISK</h2>
      </div>
      <div className="owner-info">
        <ConnectButton variant="contained" fullWidth onClick={connectWallet} disabled={connected}>
          {!connected ? "Connect" : "0x" + address.slice(2, 5) + "..." + address.slice(38, 42)}
        </ConnectButton>
        {connected &&
          <>
            {infoLoading ? "Loading..." :
              <div className="detail-box">
                <p>Your NFTs: <span>{totalSignerNFTs}</span></p>
                <p>Your Troops: <span>{totalSignerTroops}&nbsp;</span><span style={{ fontSize: 12 }}>TROOP</span></p>
                <p>Your Balance: <span>{balance}&nbsp;</span><span style={{ fontSize: 12 }}>ETH</span></p>
                <p>Total minted: <span>{minted}&nbsp;/&nbsp;5050</span></p>
              </div>
            }
          </>
        }
      </div>
      <div className="side-content">
        <ul>
          <li>
            <MenuButton fullWidth style={{ borderTop: '1px solid #ccc' }} onClick={() => handleItem("/")}>
              Home
            </MenuButton>
          </li>
          <li>
            <MenuButton fullWidth onClick={() => handleItem("/mint")} disabled={!connected}>
              Mint
            </MenuButton>
          </li>
          {/* <li>
            <MenuButton fullWidth onClick={() => handleItem("/farm")}>
              Farm
            </MenuButton>
          </li>
          <li>
            <MenuButton fullWidth onClick={() => handleItem("/train")}>
              Train
            </MenuButton>
          </li>
          <li>
            <MenuButton fullWidth onClick={() => handleItem("/unstake")}>
              unstake&nbsp;&amp;&nbsp;Claim
            </MenuButton>
          </li>
          <li>
            <MenuButton fullWidth onClick={() => handleItem("/pillage")}>
              Pillage
            </MenuButton>
          </li> */}
        </ul>
      </div>
    </div>
  )
}