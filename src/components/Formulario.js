import React from 'react';

const Formulario = () => {
    return ( 
        <form
            className="col-12"
        >
            <fieldset className="text-center">
                <legend>Bebidas por categoría o ingrediente</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-12 col-md-4">
                    <input
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por ingrediente"
                    />
                </div>
                <div className="col-12 col-md-4">
                    <select
                        name="categoria"
                        className="form-control"
                    >
                        <option value="">-- Selecciona categoría --</option>
                    </select>
                </div>
                <div className="col-12 col-md-4">
                    <div className="d-grid mt-1">
                        <input
                            type="submit"
                            className="btn btn-block btn-primary"
                            value="Buscar bebidas"
                        />
                    </div> 
                </div>
            </div>
        </form>
     );    
}
 
export default Formulario;  