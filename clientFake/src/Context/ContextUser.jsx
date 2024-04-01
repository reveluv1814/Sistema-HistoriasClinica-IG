import { createContext, useEffect, useState  } from "react";

export const contextUser = createContext({
            user:"", setUser: null
        });

export default function  UserProvider ({children}){
    const [ user, setUser] = useState({rol:"Public"});


    useEffect(() => {
      //console.log(user);
    }, [user])
    

    return (
    <contextUser.Provider value={{user, setUser}}>
        {children}
    </contextUser.Provider>);
}
