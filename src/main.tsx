import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from '~/components/root/App';
import { MoralisProvider } from 'react-moralis';

const MORALIS_APP_ID = import.meta.env.VITE_MORALIS_APP_ID;
const MORALIS_SERVER_URL = import.meta.env.VITE_MORALIS_SERVER_URL;

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
