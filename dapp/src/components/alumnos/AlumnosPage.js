import {drizzleReactHooks} from '@drizzle/react-plugin';
import { useState } from "react";

import AlumnosList from "./AlumnosList";
import NoSoyOwner from "../roles/NoSoyOwner";
import NoSoyCoordinador from "../roles/NoSoyCoordinador";
import NoSoyProfesor from "../roles/NoSoyProfesor";
import NoSoyAlumno from "../roles/NoSoyAlumno";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const AlumnosPage = () => {

    let [nombreAlumno, setNombreAlumno] = useState("");
    let [dniAlumno, setDniAlumno] = useState("");
    let [emailAlumno, setEmailAlumno] = useState("");

    const {useCacheSend} = useDrizzle();

    const drizzleState = useDrizzleState(state => state);
    const addrAlumno = drizzleState.accounts[0];
    
    const {send: sendAutomatricula, status: statusAutomatricula} = useCacheSend("Asignatura", "automatricula");

    const automatricula = ev => {
        ev.preventDefault();
        sendAutomatricula(nombreAlumno, dniAlumno, emailAlumno, {from: addrAlumno});
    }

    return (
        <section className="AppAlumnos">
            <h2>Alumnos</h2>

            <NoSoyAlumno>
            <NoSoyOwner>
            <NoSoyCoordinador>
            <NoSoyProfesor>
                <h3>Automatrícula</h3>
                <form>
                        <p>
                            Introduzca su nombre: &nbsp;
                            <input  type="text"
                                    key="nombreAlumno" 
                                    name="nombreAlumno" 
                                    placeholder='Nombre del alumno' 
                                    value={nombreAlumno} 
                                    onChange={ev => setNombreAlumno(ev.target.value)}
                            />
                        </p>
                    
                        <p>
                            Introduzca su DNI: &nbsp;
                            <input  type="text"
                                    key="dniAlumno" 
                                    name="dniAlumno" 
                                    placeholder='DNI del alumno' 
                                    value={dniAlumno} 
                                    onChange={ev => setDniAlumno(ev.target.value)}
                            />
                        </p>

                        <p>
                            Introduzca su email: &nbsp;
                            <input  type="text"
                                    key="emailAlumno" 
                                    name="emailAlumno" 
                                    placeholder='Email del alumno' 
                                    value={emailAlumno} 
                                    onChange={ev => setEmailAlumno(ev.target.value)}
                            />
                        </p>

                        <p>
                            <button key="submit"
                                    type="button"
                                    className="pure-button"
                                    onClick={ev => automatricula(ev)}>
                            Enviar
                            </button>
                        </p>
                </form>
            </NoSoyProfesor>
            </NoSoyCoordinador>
            </NoSoyOwner>
            </NoSoyAlumno>

            <AlumnosList/>
        </section>
    );
}

export default AlumnosPage;
