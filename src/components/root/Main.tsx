import { Router } from '~/components/router/Router';
import Header from '~/components/domain/header/Header';
import { NetworkAlert } from '../domain/network-alert/NetworkAlert';
import Footer from '../domain/footer/Footer';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Main() {
  return (
    <div className="flex flex-col container mx-auto justify-between min-h-screen" id="yak-home">
      <div>
        <Header />
        <NetworkAlert />
        <main>
          <Router />
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

export default Main;
