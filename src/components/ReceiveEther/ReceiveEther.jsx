import React from 'react';
import QRCode from 'qrcode.react';

const ReceiveEther = ({ account }) => {
  return (
    <div>
      <h3>Receive Ether</h3>
      <p>Address: {account}</p>
      <QRCode value={account} size={256} level={'H'} includeMargin={true} />
      <p>Scan the QR code with a wallet app to send Ether to this address.</p>
    </div>
  );
};

export default ReceiveEther;
