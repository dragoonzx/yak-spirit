import { Router } from '~/components/router/Router';
import Header from '~/components/domain/header/Header';
import { NetworkAlert } from '../domain/network-alert/NetworkAlert';

function Main() {
  return (
    <>
      <Header />
      <NetworkAlert />
      <main>
        <Router />
      </main>
    </>
  );
}

export default Main;
