// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from '~/components/root/App';
import { MoralisProvider } from 'react-moralis';

const MORALIS_APP_ID = 'rthX7a3rcVGAfiUj6AocOY6ZTM64E3EVrm8wKQ8O';
const MORALIS_SERVER_URL = 'https://ami09h70nxqb.usemoralis.com:2053/server';

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
