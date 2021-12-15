import { proxy, useSnapshot, subscribe } from 'valtio';
import Moralis from 'moralis';

interface IState {
  user: Moralis.User<Moralis.Attributes> | null;
}

const state: IState = proxy({
  user: null,
});

export { state, useSnapshot, subscribe };
