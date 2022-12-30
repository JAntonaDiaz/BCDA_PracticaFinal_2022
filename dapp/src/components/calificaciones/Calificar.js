import {useState} from "react";

import {drizzleReactHooks} from '@drizzle/react-plugin'

import SoyProfesor from "../roles/SoyProfesor";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;


/*
ERROR:
Si se usa useCacheSend, se envian varias transacciones cada vez que se hace un submit del formulario.
El problema esta relacionado con actualizar el estado del stackIds dentro de la implementacion de ese hook.
 */

const Calificar1 = () => {
    const {useCacheSend} = useDrizzle();

    const {send, status} = useCacheSend('Asignatura', 'califica');


    // Conservar los valores metidos en el formulario
    let [alumnoAddr, setAlumnoAddr] = useState("");
    let [indexEval, setEvalIndex] = useState("");
    let [tipo, setTipo] = useState("");
    let [calificacion, setCalificacion] = useState("");

    return (<article className="AppMisDatos">
        <SoyProfesor>

            <h3>Calificar</h3>

            <form>
                <p>
                    Dirección del Alumno:  &nbsp;
                    <input key="alumno" type="text" name="alumno" value={alumnoAddr} placeholder="Dirección del alumno"
                           onChange={ev => setAlumnoAddr(ev.target.value)}/>
                </p>
                <p>
                    Índice de la Evaluación:  &nbsp;
                    <input key="evaluacion" type="number" name="evaluacion" value={indexEval}
                           placeholder="Índice de la evaluación"
                           onChange={ev => setEvalIndex(ev.target.value)}/>
                </p>
                <p>
                    Tipo: (0=Pendiente 1=N.P. 2=Normal):  &nbsp;
                    <input key="tipo" type="number" name="tipo" value={tipo} placeholder="Tipo de nota"
                           onChange={ev => setTipo(ev.target.value)}/>
                </p>
                <p>
                    Nota (x100):  &nbsp;
                    <input key="calificacion" type="number" name="calificacion" value={calificacion} placeholder="Nota"
                           onChange={ev => setCalificacion(ev.target.value)}/>
                </p>

                <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                                ev.preventDefault();
                            send(alumnoAddr, indexEval, tipo, calificacion);
                            }}>Calificar</button>

                <p> Último estado = {status}</p>
            </form>
        </SoyProfesor>
    </article>);
};


const Calificar2 = () => {
    const {drizzle} = useDrizzle();

    // Obtener el status de la ultima transaccion enviada:
    const {transactionStack, transactions} = useDrizzleState(drizzleState => ({
        transactionStack: drizzleState.transactionStack,
        transactions: drizzleState.transactions
    }));
    const [lastStackID, setLastStackID] = useState(undefined)
    const txObject = transactions[transactionStack[lastStackID] || 'undefined'];
    const status = txObject?.status;

    // Conservar los valores metidos en el formulario
    let [alumnoAddr, setAlumnoAddr] = useState("");
    let [indexEval, setEvalIndex] = useState("");
    let [tipo, setTipo] = useState("");
    let [calificacion, setCalificacion] = useState("");

    return (<article className="AppMisDatos">
        <SoyProfesor>

            <h3>Calificar</h3>

            <form>
                <p>
                    Dirección del Alumno:  &nbsp;
                    <input key="alumno" type="text" name="alumno" value={alumnoAddr} placeholder="Dirección del alumno"
                           onChange={ev => setAlumnoAddr(ev.target.value)}/>
                </p>
                <p>
                    Índice de la Evaluación:  &nbsp;
                    <input key="evaluacion" type="number" name="evaluacion" value={indexEval}
                           placeholder="Índice de la evaluación"
                           onChange={ev => setEvalIndex(ev.target.value)}/>
                </p>
                <p>
                    Tipo: (0=Pendiente 1=N.P. 2=Normal):  &nbsp;
                    <input key="tipo" type="number" name="tipo" value={tipo} placeholder="Tipo de nota"
                           onChange={ev => setTipo(ev.target.value)}/>
                </p>
                <p>
                    Nota (x100):  &nbsp;
                    <input key="calificacion" type="number" name="calificacion" value={calificacion} placeholder="Nota"
                           onChange={ev => setCalificacion(ev.target.value)}/>
                </p>

                <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            const stackId = drizzle.contracts.Asignatura.methods.califica.cacheSend(alumnoAddr, indexEval, tipo, calificacion);
                            setLastStackID(stackId);
                        }}>
                    Calificar
                </button>

                <p> Último estado = {status} </p>
            </form>
        </SoyProfesor>
    </article>);
};

export default Calificar2;
