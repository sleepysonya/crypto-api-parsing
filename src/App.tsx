import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./components/Coin";

function App() {
  const [coins, setCoins] = useState([] as any);
  const [search, setSearch] = useState("" as string);

  useEffect(() => {
    axios
      .get(
        `https://api.coinstats.app/public/v1/coins?skip=0`
      )
      .then((res) => {
        setCoins(res.data.coins);
      });
    

   
  }, []);

  const filteringCoins = coins.filter((coin: any) =>{
    return coin.name.toLowerCase().includes(search.toLowerCase())
  })

  console.log(coins);

  return (
    <div className="App">
      <div className="navbar">
        <input type='text' placeholder="Enter coin name.." className="search" onChange={(event) => setSearch(event.target.value)}></input>
      </div>
      <div className="displayCrypto">
        {filteringCoins.length > 0 ? filteringCoins.map((coin: any) => {
          return (
            <Coin 
            icon={coin.icon}
            name={coin.name}
            price={coin.price}
            pricechange1d={coin.priceChange1d}
            pricechange1h={coin.priceChange1h}
            pricechange1w={coin.priceChange1w}
            redditUrl={coin.redditUrl}
            twitterUrl={coin.twitterUrl}
            websiteUrl={coin.websiteUrl}
            />
          );
        }): <h1>Not found</h1>}
      </div>
    </div>
  );
}

export default App;
