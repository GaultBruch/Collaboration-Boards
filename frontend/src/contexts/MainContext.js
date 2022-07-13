import React, {useState} from 'react';
const MainContext= React.createContext();

function MainContextProvider({children}) {
  const [jwt, setJwt] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    _id: '',
    jwt: ''
  });

  return ( <MainContext.Provider value={{userData, setUserData}}>
    {children}
  </MainContext.Provider>)
}

export {MainContextProvider, MainContext}