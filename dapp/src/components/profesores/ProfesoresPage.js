import {drizzleReactHooks} from '@drizzle/react-plugin';
import { useState } from "react";

import ProfesoresList from "./ProfesoresList";
import SoyOwner from "../roles/SoyOwner";

const {useDrizzle} = drizzleReactHooks;

const ProfesoresPage = () => {

    let [nombreProfesor, setNombreProfesor] = useState("");
    let [addrProfesor, setAddrProfesor] = useState("");

    const {useCacheSend} = useDrizzle();
    
    const {send: sendAddProfesor, status: statusAddProfesor} = useCacheSend("Asignatura", "addProfesor");

    const addProfesor = ev => {
        ev.preventDefault();
        sendAddProfesor(addrProfesor, nombreProfesor);
    }

    return (
        <section className="AppAlumnos">
            <h2>Profesores</h2>

            <ProfesoresList/>

            <SoyOwner>
                <h3>Añadir Profesor</h3>
                <form>
                    <p>
                        Nombre del nuevo profesor: &nbsp;
                        <input  type="text"
                                key="nombreProfesor" 
                                name="nombre" 
                                placeholder='Nombre del profesor' 
                                value={nombreProfesor} 
                                onChange={ev => setNombreProfesor(ev.target.value)}
                        />
                    </p>
                
                    <p>
                        Dirección del nuevo profesor: &nbsp;
                        <input  type="text"
                                key="addressProfesor" 
                                name="address" 
                                placeholder='Dirección del profesor' 
                                value={addrProfesor} 
                                onChange={ev => setAddrProfesor(ev.target.value)}
                        />
                    </p>

                    <p>
                        <button key="submit"
                                type="button"
                                className="pure-button"
                                onClick={ev => addProfesor(ev)}>
                        Añadir
                        </button>
                    </p>
                </form>
            </SoyOwner>
        </section>
    );
}

export default ProfesoresPage;