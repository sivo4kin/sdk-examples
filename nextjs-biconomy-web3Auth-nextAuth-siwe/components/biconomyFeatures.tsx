import dynamic from "next/dynamic";
import {Suspense} from "react";
import {useSession} from "next-auth/react";

const SignMessage = dynamic(() => import("./signMessage"), {ssr: false});
const NFTSafeTransferTx = dynamic(() => import("./gasslessTx"), {ssr: false});
const ZKPTransferTx = dynamic(() => import("./zkpTransfer"), {ssr: false});
const ZKPTransferFromTx = dynamic(() => import ("./zkpTransferFrom"), {ssr: false});

const BiconomyFeatures = () => {
    const {data: session} = useSession();

    return session ? (
        <div style={{textAlign: "center"}}>
            <h1>Biconomy Features</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <SignMessage/>
                <ZKPTransferFromTx/>
                <ZKPTransferTx/>
                <NFTSafeTransferTx/>
            </Suspense>
        </div>
    ) : null;
};

export default BiconomyFeatures;
