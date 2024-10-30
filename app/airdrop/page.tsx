import React from "react";

function Airdrop() {
  return (
    <div>
      <iframe
        src="https://embed.ipfscdn.io/ipfs/bafybeigdie2yyiazou7grjowoevmuip6akk33nqb55vrpezqdwfssrxyfy/erc20.html?contract=0xe5C02A2811b4D8fE4D1Dd096D0bBc008025463e4&chain=%7B%22name%22%3A%22Avalanche+Fuji+Testnet%22%2C%22chain%22%3A%22AVAX%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F43113.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Avalanche%22%2C%22symbol%22%3A%22AVAX%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22Fuji%22%2C%22chainId%22%3A43113%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22avalanche-fuji%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9%2Favalanche%2F512.png%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=7640080ddc353f83029aa2175adc209b&theme=system&primaryColor=orange"
        width="100%"
        height="750px"
        style={{ maxWidth: "100%" }}
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default Airdrop;
