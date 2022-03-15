import { Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import MainLayout from '../root/MainLayout';
import SpiritLoader from '../shared/SpiritLoader';

const Loading = () => (
  <div className="p-4 w-screen h-screen font-bold flex flex-col items-center justify-center text-center">
    <SpiritLoader size="medium" />
    <p className="mt-2">Loading...</p>
  </div>
);

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <MainLayout />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
