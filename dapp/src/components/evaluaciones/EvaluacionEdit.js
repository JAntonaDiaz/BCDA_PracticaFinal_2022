import {drizzleReactHooks} from '@drizzle/react-plugin'
import { useState } from 'react';
import {useParams, Link} from "react-router-dom";

const {useDrizzle} = drizzleReactHooks;


const EvaluacionEdit = () => {
    const {useCacheCall, useCacheSend} = useDrizzle();

    let {id} = useParams();

    const datos = useCacheCall("Asignatura", "evaluaciones", id);

    let [nombreEvalNew, setNombreEvalNew] = useState(datos.nombre);
    let [fechaEvalNew, setFechaEvalNew] = useState(datos.fecha);
    let [porcentajeEvalNew, setPorcentajeEvalNew] = useState(datos.porcentaje);
    let [minimoEvalNew, setMinimoEvalNew] = useState(datos.minimo);

    const {send: sendEditEval, status: statusEditEval} = useCacheSend("Asignatura", "editarEvaluacion");

    const editEvaluacion = ev => {
        ev.preventDefault();
        sendEditEval(id, nombreEvalNew, fechaEvalNew, porcentajeEvalNew, minimoEvalNew);
    }

    return (
        <section className="AppAlumno">

        <h3>Editar evaluación</h3>
                <form>
                    <p>
                        Nuevo nombre de la evaluación: &nbsp;
                        <input  type="text"
                                key="nombreEvalNew" 
                                name="nombreEvalNew" 
                                placeholder='Nombre de la evaluación'
                                value={nombreEvalNew}
                                onChange={ev => setNombreEvalNew(ev.target.value)} 
                        />
                    </p>

                    <p>
                        Nueva fecha de la evaluación: &nbsp;
                        <input  type="number"
                                key="fechaEvalNew"  
                                name="fechaEvalNew" 
                                placeholder='Fecha de la evaluación'
                                value={fechaEvalNew}
                                onChange={ev => setFechaEvalNew(ev.target.value)} 
                        /> 
                    </p>
                   
                    <p>
                        Nuevo porcentaje de la evaluación: &nbsp;
                        <input  type="number"
                                key="porcentajeEvalNew" 
                                name="porcentajeEvalNew" 
                                placeholder='Porcentaje de la evaluación'
                                value={porcentajeEvalNew}
                                onChange={ev => setPorcentajeEvalNew(ev.target.value)}  
                        />
                    </p>
                    
                    <p>
                        Nuevo mínimo de la evaluación: &nbsp;
                        <input  type="number"
                                key="minimoEvalNew" 
                                name="minimoEvalNew" 
                                placeholder='Mínimo de la evaluación'
                                value={minimoEvalNew}
                                onChange={ev => setMinimoEvalNew(ev.target.value)}   
                        />
                    </p>
                   
                    <p>
                        <button key="submit"  
                                type="button"
                                className="pure-button" 
                                onClick={ev => editEvaluacion(ev)}>
                        Guardar
                        </button>
                    </p>
                    <Link to="/evaluaciones">Volver</Link>
                </form>
    </section>
    );
};

export default EvaluacionEdit;