import { Dispatch, ReactNode, createContext, useReducer } from 'react';
import noop from 'lodash/noop';

export const ShopContext = createContext<{
  state: ICoffeeShopContextState,
  dispatch: Dispatch<IShopAction>,
 }>({
  state: {
    latLong: "",
    coffeeShops: [],
  },
  dispatch: noop,
 });

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_SHOPS: "SET_COFFEE_SHOPS",
};

interface IShopAction {
  type: string;
  payload: ICoffeeShopContextState;
}

const storeReducer = (state: ICoffeeShopContextState, action: IShopAction) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_SHOPS: {
      return { ...state, coffeeShops: action.payload.coffeeShops };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ShopProvider = ({ children }: { children: ReactNode }) => {
  const initialState: ICoffeeShopContextState = {
    latLong: "",
    coffeeShops: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
