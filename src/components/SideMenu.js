import { Button } from "@mui/material";

export default function SideMenu() {
    return (
        <div className="side-menu">
            <div className="side-logo">
                <h2>Game Of Risk</h2>
            </div>
            <div className="owner-info">
                <Button variant="contained" fullWidth>
                    Connect
                </Button>
            </div>
            <div className="side-content">
                <ul>
                    <li>
                        <Button fullWidth>
                            Mint
                        </Button>
                    </li>
                    <li>
                        <Button fullWidth>
                            Farm
                        </Button>
                    </li>
                    <li>
                        <Button fullWidth>
                            Train
                        </Button>
                    </li>
                    <li>
                        <Button fullWidth>
                            unstake&nbsp;&amp;&nbsp;Claim
                        </Button>
                    </li>
                    <li>
                        <Button fullWidth>
                            Pillage
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    )
}