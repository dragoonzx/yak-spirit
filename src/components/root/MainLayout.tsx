import Header from '~/components/domain/header/Header';
import { NetworkAlert } from '../domain/network-alert/NetworkAlert';
import Footer from '../domain/footer/Footer';
import { lazy } from 'react';
import { Route } from 'react-router-dom';
import Landing from '../screens/Landing';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const IndexScreen = lazy(() => import('~/components/screens/Index'));

function MainLayout() {
  return (
    <div className="flex flex-col container mx-auto justify-between min-h-screen" id="yak-home">
      <div>
        <Header />
        <NetworkAlert />
        <main>
          <Route path="/app" exact component={IndexScreen} />
          <Route path="/" exact component={Landing} />
        </main>
      </div>
      <Footer />
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </div>
  );
}

export default MainLayout;
