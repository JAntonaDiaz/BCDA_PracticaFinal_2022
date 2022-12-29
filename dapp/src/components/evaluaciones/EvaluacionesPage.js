import {drizzleReactHooks} from '@drizzle/react-plugin';
import { useState } from 'react';
import SoyCoordinador from "../roles/SoyCoordinador";
import EvaluacionesList from "./EvaluacionesList";

const {useDrizzle} = drizzleReactHooks;

const EvaluacionesPage = () => {

    let [idEval, setIdEval] = useState(-1);

    let [nombreEval, setNombreEval] = useState("");
    let [fechaEval, setFechaEval] = useState(0);
    let [porcentajeEval, setPorcentajeEval] = useState(0);
    let [minimoEval, setMinimoEval] = useState(0);

    const {useCacheCall, useCacheSend} = useDrizzle();
    const {send: sendCreaEval, status: statusCreaEval} = useCacheSend("Asignatura", "creaEvaluacion");
    const {send: sendEditEval, status: statusEditEval} = useCacheSend("Asignatura", "evaluaciones", idEval);

    let evaluacion = useCacheCall("Asignatura", "evaluaciones", idEval);

    const addEvaluacion = ev => {
        ev.preventDefault();
        sendCreaEval(nombreEval, fechaEval, porcentajeEval, minimoEval);
    }

    const editEvaluacion = (e) => {
        e.preventDefault();
        evaluacion.nombre = e.target.nombre.value;
        evaluacion.fecha = e.target.fecha.value;
        evaluacion.porcentaje = e.target.porcentaje.value;
        evaluacion.minimo = e.target.minimo.value;
        sendEditEval(evaluacion);

    }

    return (
        <section className="AppEvaluaciones">
            <h2>Evaluaciones</h2>
            <EvaluacionesList/>

            <SoyCoordinador>
                <h3>Crear evaluación</h3>
                <form>
                    <p>
                        Nombre de la evaluación: &nbsp;
                        <input  type="text"
                                key="nombreEvaluacion" 
                                name="nombreEvaluacion" 
                                placeholder='Nombre de la evaluación' 
                                value={nombreEval} 
                                onChange={ev => setNombreEval(ev.target.value)}
                        />
                    </p>

                    <p>
                        Fecha de la evaluación: &nbsp;
                        <input  type="number"
                                key="fechaEvaluacion"  
                                name="fechaEvaluacion" 
                                placeholder='Fecha de la evaluación' 
                                value={fechaEval} 
                                onChange={ev => setFechaEval(ev.target.value)}
                        />
                    </p>
                       
                    <p>
                        Porcentaje de la evaluación: &nbsp;
                        <input  type="number"
                                key="porcentajeEvaluacion"  
                                name="porcentajeEvaluacion" 
                                placeholder='Porcentaje de la evaluación' 
                                value={porcentajeEval} 
                                onChange={ev => setPorcentajeEval(ev.target.value)}
                        />
                   
                    </p>

                    <p>
                        Mínimo de la evaluación: &nbsp;
                        <input  type="number"
                                key="minimoEvaluacion" 
                                name="minimoEvaluacion" 
                                placeholder='Mínimo de la evaluación' 
                                value={minimoEval} 
                                onChange={ev => setMinimoEval(ev.target.value)}
                        />
                    </p>
                    
                    <p>
                        <button key="submit" 
                                type="button"
                                className="pure-button" 
                                onClick={ev => addEvaluacion(ev)}>
                        Crear
                        </button>
                    </p>
                </form>
            
                <h3>Editar evaluación</h3>
                <form>
                    <p>
                        Identificador de la evaluación: &nbsp;
                        <input  type="number"
                                key="idEvalEdit"
                                name="idEvalEdit" 
                                placeholder='Id de la evaluación' 
                                value={idEval} 
                                onChange={ev => setIdEval(ev.target.value)}
                        />
                    </p>

                    <p>
                        Nuevo nombre de la evaluación: &nbsp;
                        <input  type="text" 
                                name="nombre" 
                                placeholder='Nombre de la evaluación' 
                        />
                    </p>

                    <p>
                        Nueva fecha de la evaluación: &nbsp;
                        <input  type="number" 
                                name="fecha" 
                                placeholder='Fecha de la evaluación' 
                        /> 
                    </p>
                   
                    <p>
                        Nuevo porcentaje de la evaluación: &nbsp;
                        <input  type="number" 
                                name="porcentaje" 
                                placeholder='Porcentaje de la evaluación' 
                        />
                    </p>
                    
                    <p>
                        Nuevo mínimo de la evaluación: &nbsp;
                        <input  type="number" 
                                name="minimo" 
                                placeholder='Mínimo de la evaluación' 
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
                </form>
                </SoyCoordinador>
        </section>
    );
}

export default EvaluacionesPage;
