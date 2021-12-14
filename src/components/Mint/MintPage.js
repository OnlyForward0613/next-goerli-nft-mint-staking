import { MintButton } from '../styleHook.js'

export default function MintPage(props) {
    console.log(props)
    return (
        <div className="mint">
            <h1>Mint page</h1>
            <div className="mint-content">
                <MintButton>
                    MINT
                </MintButton>
            </div>
        </div>
    )
}