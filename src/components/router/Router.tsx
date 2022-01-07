import { Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import MainLayout from '../root/MainLayout';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

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
