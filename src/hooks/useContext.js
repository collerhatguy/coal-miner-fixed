import { createContext, useContext } from 'react';
 
const MoneyContext = createContext();
const useMoney = () => useContext(MoneyContext);
 
const MultiplierContext = createContext();
const useMultiplier = () => useContext(MultiplierContext);
 
export { MoneyContext, useMoney, MultiplierContext, useMultiplier };