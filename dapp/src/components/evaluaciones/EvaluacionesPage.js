import {drizzleReactHooks} from '@drizzle/react-plugin';
import { useState } from 'react';
import SoyCoordinador from "../roles/SoyCoordinador";
import EvaluacionesList from "./EvaluacionesList";

const {useDrizzle} = drizzleReactHooks;

const EvaluacionesPage = () => {

    let [nombreEval, setNombreEval] = useState("");
    let [fechaEval, setFechaEval] = useState(0);
    let [porcentajeEval, setPorcentajeEval] = useState(0);
    let [minimoEval, setMinimoEval] = useState(0);

    const {useCacheSend} = useDrizzle();
    const {send: sendCreaEval} = useCacheSend("Asignatura", "creaEvaluacion");


    const addEvaluacion = ev => {
        ev.preventDefault();
        sendCreaEval(nombreEval, fechaEval, porcentajeEval, minimoEval);
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
                </SoyCoordinador>
        </section>
    );
}

export default EvaluacionesPage;
