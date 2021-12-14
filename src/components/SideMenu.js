import { ConnectButton, MenuButton } from './styleHook';

export default function SideMenu({
  connectWallet,
  connected,
  address,
  minted,
  totalSignerNFTs,
  totalSignerTroops,
  infoLoading,
  ...props
}) {
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
                <p>Your Troops: <span>{totalSignerTroops}</span></p>
                <p>Total minted: <span>{minted}&nbsp;/&nbsp;5050</span></p>
              </div>
            }
          </>
        }
      </div>
      <div className="side-content">
        <ul>
          <li>
            <MenuButton fullWidth style={{ borderTop: '1px solid #ccc' }}>
              Mint
            </MenuButton>
          </li>
          <li>
            <MenuButton fullWidth>
              Farm
            </MenuButton>
          </li>
          <li>
            <MenuButton fullWidth>
              Train
            </MenuButton>
          </li>
          <li>
            <MenuButton fullWidth>
              unstake&nbsp;&amp;&nbsp;Claim
            </MenuButton>
          </li>
          <li>
            <MenuButton fullWidth>
              Pillage
            </MenuButton>
          </li>
        </ul>
      </div>
    </div>
  )
}