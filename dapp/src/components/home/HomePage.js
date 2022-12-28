import {drizzleReactHooks} from '@drizzle/react-plugin';
import { useState } from 'react';
import SoyCoordinador from '../roles/SoyCoordinador';
import SoyOwner from '../roles/SoyOwner';

const {useDrizzle} = drizzleReactHooks;

function HomePage() {

    let [stateAddrCoord, setStateAddrCoord] = useState("");

    const {useCacheCall, useCacheSend} = useDrizzle();

    const owner = useCacheCall("Asignatura","owner");
    const coordinador = useCacheCall("Asignatura","coordinador");
    const stateAsignatura = useCacheCall("Asignatura", "cerrada");

    const {send: sendCoordinador, status: statusCoordinador } = useCacheSend("Asignatura", "setCoordinador");
    const {send: sendCerrada, status: statusCerrada } = useCacheSend("Asignatura", "cerrar");

    const setCoordinador = ev => {
        ev.preventDefault();
        console.log(stateAddrCoord);
        sendCoordinador(stateAddrCoord);
    }

    const cerrarAsignatura = ev => {
        ev.preventDefault();
        sendCerrada();
    }

    return (
        <section className="AppAlumnos">
            <h2>Información general de la asignatura</h2>

            <p>Dirección del owner: {owner}</p>
            <p>Dirección del coordinador: {coordinador}</p>

            <SoyOwner>
                <h3>Cambiar Coordinador</h3>
                <form>
                    <p>
                        Dirección del nuevo coordinador: &nbsp;
                        <input  type="text" 
                                key="addressCoordinador"
                                name="addressCoordinador" 
                                placeholder='Dirección del coordinador'
                                value={stateAddrCoord}
                                onChange={ev => setStateAddrCoord(ev.target.value)}
                        />
                    </p>

                    <p>
                        <button key="submit" 
                                className="pure-button" 
                                type="button" 
                                onClick={ev => setCoordinador(ev)}>
                        Guardar
                        </button>
                    </p>
                </form>

            </SoyOwner>

            <h3>Estado de la asignatura</h3>
            <p>La asignatura está: {stateAsignatura ? 'Cerrada' : 'Abierta'}</p>
            
            <SoyCoordinador>
                <form onSubmit={cerrarAsignatura}>
                    <p>
                        <input  type="submit"
                                className="pure-button" 
                                value="Cerrar"/>
                    </p>
                </form>
            </SoyCoordinador>
        </section>
       
    );
}

export default HomePage;
