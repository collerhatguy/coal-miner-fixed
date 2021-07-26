import React from 'react';
 
const MoneyContext = React.createContext(null);
 
const useMoney = () => React.useContext(MoneyContext);
 
export { MoneyContext, useMoney };