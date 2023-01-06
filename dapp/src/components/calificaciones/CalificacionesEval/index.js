import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";
import {drizzleReactHooks} from '@drizzle/react-plugin';
import {useState} from "react";

const {useDrizzle} = drizzleReactHooks;


const CalificacionesEvalPage = () => {
    const {useCacheCall} = useDrizzle();
    const evaluacionesLength = useCacheCall("Asignatura", "evaluacionesLength");

    // Conservar los valores metidos en el formulario
    let [indexEval, setEvalIndex] = useState(0);

    const getEvaluacion = ev => {
        setEvalIndex(parseInt(ev.target.value));
    }

    return (
        <section className="EvalCalificaciones">
            <h3>Selecciona el índice de la evaluación que desea visualizar</h3>
            <form>
                <p>
                    Índice de la Evaluación:  &nbsp;
                    <input key="evaluacion" type="number" name="evaluacion" value={indexEval}
                        placeholder="Índice de la evaluación"
                        onChange={ev => getEvaluacion(ev)}/>
                </p>
                </form>

            <div>   
                { (indexEval < evaluacionesLength && indexEval >= 0) ? 
                  <>
                    <h3>Calificaciones de la evaluación {indexEval}</h3>
                    <table>
                        <CalificacionesHead />
                        <CalificacionesBody indexEval={indexEval}/>
                    </table>
                  </>
                  : <p> Esta evaluación no está disponible. Inserte una evaluación entre 0 y {evaluacionesLength-1}. </p>
                }
            </div> 
        </section>
    );
};

export default CalificacionesEvalPage;
