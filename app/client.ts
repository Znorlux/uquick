import { createThirdwebClient, getContract } from "thirdweb";
import { avalancheFuji } from "thirdweb/chains";
import { privateKeyToAccount } from "thirdweb/wallets";

const clientID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;

if (!clientID) {
  throw new Error("Missing CLIENT_ID");
}
if (!ADMIN_PRIVATE_KEY) {
  throw new Error("Missing ADMIN_PRIVATE_KEY");
}

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({
  clientId: clientID,
});

export const contract = getContract({
  client,
  chain: avalancheFuji,
  address: "0x9ba4d68eE64ce4c17A2d6D1EA073768217340841",
});

export const account = privateKeyToAccount({
  client,
  privateKey: ADMIN_PRIVATE_KEY,
});
