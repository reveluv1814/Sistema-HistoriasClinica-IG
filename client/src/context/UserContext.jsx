//import React, { useState ,createContext} from "react";

/*export const UserContext = createContext({
    rol: "",
  });

export function UserContextProvider(props) {
  const [user, setUser] = useState({
    rol: "",
  });

  return (
    <UserContext.Provider
      value={
        {
            user
        }
      }
    >
      {props.children}
    </UserContext.Provider>
  );
}*/

import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext({
  user: { rol: "" },
  setUser: () => {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState({
    rol: "",
  });
  useEffect(() => {
    console.log("El estado de user ha cambiado:", user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
