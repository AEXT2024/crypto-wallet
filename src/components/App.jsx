import WalletBalance from './Balance/WalletBalance';
import WithdrawEther from './WithdrawEther/WithdrawEther';
import TransferERC1155 from './TransferERC1155/TransferERC1155';
import TransferERC20 from './TransferERC20/TransferERC20';
import NavBar from './NavBar/NavBar';
import Hero from './Hero/Hero';

export const App = () => {
  return (
    <>
      <header className="w-full">
        <NavBar />
      </header>
      <main className="w-full shadow-lg rounded-lg p-4 mt-4">
        <Hero />
        <WalletBalance />
        <WithdrawEther />
        <TransferERC1155 />
        <TransferERC20 />
      </main>
      <footer></footer>
    </>
  );
};
