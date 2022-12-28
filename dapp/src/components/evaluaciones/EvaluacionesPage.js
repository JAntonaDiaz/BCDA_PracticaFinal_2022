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

    

    const addEvaluacion = (e) => {
        e.preventDefault();
        sendCreaEval(e.target.nombre.value, e.target.fecha.value, e.target.porcentaje.value, e.target.minimo.value);
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
                <form>
                    Añadir nueva evaluación:
                    <input type="text" name="nombre" placeholder='Nombre de la evaluación' value={nombreEval} onChange={ev => setNombreEval(ev.target.value)}/>
                    <input type="number" name="fecha" placeholder='Fecha de la evaluación' value={fechaEval} onChange={ev => setFechaEval(ev.target.value)}/>
                    <input type="number" name="porcentaje" placeholder='Porcentaje de la evaluación' value={porcentajeEval} onChange={ev => setPorcentajeEval(ev.target.value)}/>
                    <input type="number" name="minimo" placeholder='Mínimo de la evaluación' value={minimoEval} onChange={ev => setMinimoEval(ev.target.value)}/>
                    <button key="submit" value="Enviar" type="button" onClick={e => addEvaluacion(e)}/>
                </form>
            </SoyCoordinador>
                <form>
                    Editar evaluación:
                    <input type="number" name="id" placeholder='Id de la evaluación' value={idEval} onChange={ev => setIdEval(ev.target.value)}/>
                    <input type="text" name="nombre" placeholder='Nombre de la evaluación' />
                    <input type="number" name="fecha" placeholder='Fecha de la evaluación' />
                    <input type="number" name="porcentaje" placeholder='Porcentaje de la evaluación' />
                    <input type="number" name="minimo" placeholder='Mínimo de la evaluación' />
                    <button key="submit" value="Enviar" type="button" onClick={e => editEvaluacion(e)}/>
                </form>
        </section>
    );
}

export default EvaluacionesPage;
