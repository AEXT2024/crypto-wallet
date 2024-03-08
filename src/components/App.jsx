import WalletBalance from './Balance/WalletBalance';
import WithdrawEther from './WithdrawEther/WithdrawEther';
import TransferERC1155 from './TransferERC1155/TransferERC1155';
import TransferERC20 from './TransferERC20/TransferERC20';
import MetamaskConnection from './MetamaskConnection/MetamaskConnection';

export const App = () => {
  return (
    <div>
      <MetamaskConnection />
      <WalletBalance />
      <WithdrawEther />
      <TransferERC1155 />
      <TransferERC20 />
    </div>
  );
};
