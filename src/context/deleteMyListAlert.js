import { useContext } from "react";
import { createContext, useState } from "react";


const DeleteMyListAlert = createContext();
export const AlertProvider = ({ children }) => {
    const [alertt, setAlert] = useState([]);
    const values = {
        alert,
        setAlert
    }
    return <DeleteMyListAlert.Provider value={values}>
        {children}
    </DeleteMyListAlert.Provider>
}
export const useAlert = () => {
    return useContext(DeleteMyListAlert);
}