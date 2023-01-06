import {drizzleReactHooks} from '@drizzle/react-plugin';
import { useState } from "react";

import AlumnosList from "./AlumnosList";
import NoSoyOwner from "../roles/NoSoyOwner";
import NoSoyCoordinador from "../roles/NoSoyCoordinador";
import NoSoyProfesor from "../roles/NoSoyProfesor";
import NoSoyAlumno from "../roles/NoSoyAlumno";
import SoyOwnerCoordinadoroProfesor from "../roles/SoyOwnerCoordinadoroProfesor";
import SoyOwner from '../roles/SoyOwner';

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const AlumnosPage = () => {

    let [nombreAlumno, setNombreAlumno] = useState("");
    let [dniAlumno, setDniAlumno] = useState("");
    let [emailAlumno, setEmailAlumno] = useState("");
    let [addrAlumnoMatriculando, setAddrAlumnoMatriculando] = useState("");
    let [nombreAlumnoMatriculando, setNombreAlumnoMatriculando] = useState("");
    let [dniAlumnoMatriculando, setDniAlumnoMatriculando] = useState("");
    let [emailAlumnoMatriculando, setEmailAlumnoMatriculando] = useState("");

    const {useCacheSend} = useDrizzle();

    const drizzleState = useDrizzleState(state => state);
    const addrAlumno = drizzleState.accounts[0];
    
    const {send: sendAutomatricula} = useCacheSend("Asignatura", "automatricula");
    const {send: sendMatricula} = useCacheSend("Asignatura", "matricular");
    
    const automatricula = ev => {
        ev.preventDefault();
        sendAutomatricula(nombreAlumno, dniAlumno, emailAlumno, {from: addrAlumno});
    }

    const matricular = ev => {
        ev.preventDefault();
        sendMatricula(addrAlumnoMatriculando, nombreAlumnoMatriculando, dniAlumnoMatriculando, emailAlumnoMatriculando);
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
            
            <SoyOwnerCoordinadoroProfesor>
                <AlumnosList/>
            </SoyOwnerCoordinadoroProfesor>

            <SoyOwner>
                <h3>Matricular Alumno</h3>
                <form>
                        <p>
                            Dirección del nuevo alumno: &nbsp;
                            <input  type="text"
                                    key="addrAlumnoMatriculando" 
                                    name="addrAlumnoMatriculando" 
                                    placeholder='Dirección del Alumno' 
                                    value={addrAlumnoMatriculando} 
                                    onChange={ev => setAddrAlumnoMatriculando(ev.target.value)}
                            />
                        </p>

                        <p>
                            Introduzca su nombre: &nbsp;
                            <input  type="text"
                                    key="nombreAlumnoMatriculando" 
                                    name="nombreAlumnoMatriculando" 
                                    placeholder='Nombre del alumno' 
                                    value={nombreAlumnoMatriculando} 
                                    onChange={ev => setNombreAlumnoMatriculando(ev.target.value)}
                            />
                        </p>
                    
                        <p>
                            Introduzca su DNI: &nbsp;
                            <input  type="text"
                                    key="dniAlumnoMatriculando" 
                                    name="dniAlumnoMatriculando" 
                                    placeholder='DNI del alumno' 
                                    value={dniAlumnoMatriculando} 
                                    onChange={ev => setDniAlumnoMatriculando(ev.target.value)}
                            />
                        </p>

                        <p>
                            Introduzca su email: &nbsp;
                            <input  type="text"
                                    key="emailAlumnoMatriculando" 
                                    name="emailAlumnoMatriculando" 
                                    placeholder='Email del alumno' 
                                    value={emailAlumnoMatriculando} 
                                    onChange={ev => setEmailAlumnoMatriculando(ev.target.value)}
                            />
                        </p>

                        <p>
                            <button key="submit"
                                    type="button"
                                    className="pure-button"
                                    onClick={ev => matricular(ev)}>
                            Enviar
                            </button>
                        </p>
                </form>
            </SoyOwner>

        </section>
    );
}

export default AlumnosPage;
