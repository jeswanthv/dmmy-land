import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';
import Hero from './components/Hero';
import Singlecard from './components/Singlecard';
// ABIs
import RealEstate from './abis/RealEstate.json';
import Escrow from './abis/Escrow.json';

// Config
import config from './config.json';
import { Button } from '@chakra-ui/react';

function App() {
  const [provider, setProvider] = useState(null);
  const [escrow, setEscrow] = useState(null);

  const [account, setAccount] = useState(null);
  const [seller, setSeller] = useState(null);
  const [homes, setHomes] = useState([]);
  const [previousHomes, setPreviousHomes] = useState([]);
  const [home, setHome] = useState({});
  const [toggle, setToggle] = useState(false);
  const [realEstate, setrealEstate] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();

    const realEstate = new ethers.Contract(
      config[network.chainId].realEstate.address,
      RealEstate,
      provider
    );
    setrealEstate(realEstate);
    console.log(realEstate);
    realEstate
      .totalSupply()
      ?.then((value) => console.log(value))
      .catch((e) => console.log(e));
    const totalSupply = await realEstate.totalSupply();
    const homes = [];

    for (var i = 1; i <= totalSupply; i++) {
      const uri = await realEstate.tokenURI(i);
      const response = await fetch(uri);
      const metadata = await response.json();
      homes.push(metadata);
    }

    setHomes(homes);
    setPreviousHomes(homes);

    const escrow = new ethers.Contract(
      config[network.chainId].escrow.address,
      Escrow,
      provider
    );
    setEscrow(escrow);

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  useEffect(() => {
    console.log(homes);
  }, [homes]);

  const togglePop = (home) => {
    setHome(home);

    toggle ? setToggle(false) : setToggle(true);
  };
  const mintNft = async () => {
    const seller = await escrow.seller();
    setSeller(seller);
    console.log(realEstate);
    realEstate
      .mint()
      ?.then((value) => console.log(value))
      .catch((e) => console.log(e));
    // const transaction = await realEstate.mint()
    //   .connect(seller)
    //   .mint(
    //     'https://land-bloc-1.infura-ipfs.io/ipfs/QmS2tYbmMKt9mUr8h4T7zqKSFpbBVdgShdDtKCchVvXTJE'
    //   );
    // await transaction.wait();
    console.log(seller);
    console.log('minted');
  };

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      {/* <Search homes={homes} setHomes={setHomes} previousHomes={previousHomes} /> */}
      <Hero />

      <div className='cards__section'>
        <h3>Assets</h3>
        <Button onClick={mintNft}>Mint</Button>

        <div className='cards'>
          {homes.map((home, index) => (
            <div className='card' key={index} onClick={() => togglePop(home)}>
              <Singlecard
                image={home?.image}
                address={home?.address}
                name={home?.name}
              />
            </div>
          ))}
        </div>
      </div>

      {toggle && (
        <Home
          home={home}
          provider={provider}
          account={account}
          escrow={escrow}
          togglePop={togglePop}
        />
      )}
    </div>
  );
}

export default App;
