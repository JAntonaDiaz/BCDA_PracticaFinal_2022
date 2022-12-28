import {drizzleReactHooks} from '@drizzle/react-plugin';
import SoyCoordinador from '../roles/SoyCoordinador';
import SoyOwner from '../roles/SoyOwner';

const {useDrizzle} = drizzleReactHooks;

function HomePage() {

    const {useCacheCall, useCacheSend} = useDrizzle();
    const owner = useCacheCall("Asignatura","owner");
    const coordinador = useCacheCall("Asignatura","coordinador");
    const stateAsignatura = useCacheCall("Asignatura", "cerrada");
    const {send: sendCoordinador, status: statusCoordinador } = useCacheSend("Asignatura", "setCoordinador");
    const {send: sendCerrada, status: statusCerrada } = useCacheSend("Asignatura", "cerrar");

    const setCoordinador = (e) => {
        e.preventDefault();
        sendCoordinador(e.target.value);
    }

    const cerrarAsignatura = (e) => {
        e.preventDefault();
        sendCerrada();
    }

    return (
        <div>
            <p>Dirección del owner: {owner}</p>
            <p>Dirección del coordinador de la asignatura: {coordinador}</p>
            <SoyOwner>
                <form>
                    Cambiar la dirección del coordinador
                    <input type="text" name="Dirección del coordinador" placeholder='Nueva dirección del coordinador'/>
                    <button key="submit" value="Enviar" type="button" onClick={e => setCoordinador(e)}></button>
                </form>
            </SoyOwner>
            <p>La asignatura está: {stateAsignatura ? 'Cerrada' : 'Abierta'}</p>
            <SoyCoordinador>
                <form onSubmit={cerrarAsignatura}>
                    <input type="submit" value="Cerrar"/>
                </form>
            </SoyCoordinador>
        </div>
       
    );
}

export default HomePage;
