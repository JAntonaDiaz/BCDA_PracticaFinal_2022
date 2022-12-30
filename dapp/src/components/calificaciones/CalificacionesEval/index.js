import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";
import {drizzleReactHooks} from '@drizzle/react-plugin';
import {useState} from "react";

const {useDrizzle} = drizzleReactHooks;


const CalificacionesEvalPage = () => {
    const {useCacheCall} = useDrizzle();
    let parrafo = document.querySelector('p');
    const evaluacionesLength = useCacheCall("Asignatura", "evaluacionesLength");

    // Conservar los valores metidos en el formulario
    let [indexEval, setEvalIndex] = useState("");

    const getEvaluacion = ev => {
        setEvalIndex(ev.target.value)
        if (indexEval >= evaluacionesLength){
            document.getElementById("incumplido").innerHTML = 'Esta evaluación no está disponible. Inserte una evaluación correcta < '+ evaluacionesLength;
        }
    }
    return (
        <section className="EvalCalificaciones">
            <h2>Selecciona el índice de la evaluación que desea visualizar</h2>
            <form>
                <p>
                    Índice de la Evaluación:  &nbsp;
                    <input key="evaluacion" type="number" name="evaluacion" value={indexEval}
                        placeholder="Índice de la evaluación"
                        onChange={ev => getEvaluacion(ev)}/>
                </p>
                </form>

            <div>
                <h1 id="incumplido"></h1>   
                <h3>Calificaciones de la evaluación {indexEval}</h3>
                <table>
                    <CalificacionesHead />
                    <CalificacionesBody indexEval={indexEval}/>
                </table>
            </div> 
        </section>
    );
};

export default CalificacionesEvalPage;
