import Header from '~/components/domain/header/Header';
import { NetworkAlert } from '../domain/network-alert/NetworkAlert';
import Footer from '../domain/footer/Footer';
import { lazy } from 'react';
import { Route } from 'react-router-dom';
import Landing from '../screens/Landing';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import SpiritShine from '~/assets/images/yak-spirit/SpiritShine.png';

const IndexScreen = lazy(() => import('~/components/screens/Index'));

function MainLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen relative" id="yak-home">
      <Header />
      <div className="container mx-auto">
        <NetworkAlert />
        <main>
          <Route path="/app" exact component={IndexScreen} />
          <Route path="/" exact component={Landing} />
        </main>
      </div>
      <div className="relative">
        <div className="divider opacity-10" />
        <img src={SpiritShine} className="absolute bottom-[25px] right-0 h-[600px] -z-10" />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
