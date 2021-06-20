import React, {useContext, useState} from 'react';
import { ModalContext } from '../context/ModalContext';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        display: 'block',
        [theme.breakpoints.down("sm")]: {
            height: '100%',
            maxHeight: 500,
        }
    },
    header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
    },
    content: {
        padding: "12px 0",
        overflow: 'scroll'
    }
  }));

const Receta = ({ receta }) => {

    const classes = useStyles();

    //configuracion modal
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const { informacion, guardarIdReceta, guardarReceta } = useContext(ModalContext);

    const mostrarIngredientes = (informacion) => {
        let ingredientes = [];
        for(let i = 1; i < 16; i++) {
            if(informacion[`strIngredient${i}`] !== null) {
                ingredientes.push(
                    <li> 
                        {informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}
                    </li>
                )
            }
        }

        return ingredientes;
    }
    

    return ( 
        <div className="col-12 col-md-4">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img src={receta.strDrinkThumb} className="card-img-top" alt={receta.strDrink} />
                <div className="card-body">
                    <div className="d-grid mt-1">
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={() => {
                                guardarIdReceta(receta.idDrink)
                                handleOpen();
                            }}
                        >Ver receta</button>

                        <Modal
                            open={open}
                            onClose={() => {
                                guardarIdReceta(null);
                                guardarReceta({});
                                handleClose();
                            }}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div style={modalStyle} className={classes.paper} >
                                <h2 className="text-black">{informacion.strDrink}</h2>
                                <h3 className="mt-4">Instrucciones</h3>
                                <p>{informacion.strInstructions}</p>
                                <img className="img-fluid my-4" src={informacion.strDrinkThumb} alt={informacion.strDrink}/>
                                <h3>Ingredientes y cantidades</h3>
                                <ul>
                                    {mostrarIngredientes(informacion)}
                                </ul>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Receta;