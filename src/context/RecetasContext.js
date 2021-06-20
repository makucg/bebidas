import React, {createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
    
    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });

    const [consultar, guardarConsultar] = useState(false);

    useEffect(() => {
        const consultarAPI = async () => {
            if(busqueda.nombre.trim() === '' || busqueda.categoria === '') return;
            if(consultar) {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`;

                const resultado = await axios.get(url);

                guardarRecetas(resultado.data.drinks);

                guardarConsultar(false);
            }
        }
        consultarAPI();
    },[busqueda]);

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;