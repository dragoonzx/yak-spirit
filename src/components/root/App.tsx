import {HelmetProvider} from "react-helmet-async";
import Main from "~/components/root/Main";

export const App = () => {
  return (
    <HelmetProvider>
        <Main />
    </HelmetProvider>
  )
};
