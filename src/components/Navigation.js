import { ethers } from 'ethers';
import logo from '../assets/logo.svg';

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div className='nav__brand'>
        <h1>Flipper</h1>
      </div>
      <div className='nav__right'>
        {' '}
        <ul className='nav__links'>
          {account && (
            <>
              <li>
                <a href='#'>Buy</a>
              </li>
              <li>
                <a href='#'>Sell</a>
              </li>
            </>
          )}

          <li>
            <a href='#'>About</a>
          </li>
        </ul>
        <div>
          {account ? (
            <button type='button' className='nav__connect'>
              {account.slice(0, 6) + '...' + account.slice(38, 42)}
            </button>
          ) : (
            <button
              type='button'
              className='nav__connect'
              onClick={connectHandler}
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
