import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';

//crear el context 
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //State
    const [idReceta, guardarIdReceta] = useState(null);
    const [informacion, guardarReceta] = useState({});

    useEffect(() => {
        const consultarAPI = async () => {
            if (idReceta !== null) {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

                const resultado = await axios.get(url);

                guardarReceta(resultado.data.drinks[0]);
            }
        }
        consultarAPI();
    },[idReceta]);


    return (
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;