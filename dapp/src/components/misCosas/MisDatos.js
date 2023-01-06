import {drizzleReactHooks} from '@drizzle/react-plugin'
import SoyAlumno from '../roles/SoyAlumno';
import SoyCoordinador from '../roles/SoyCoordinador';
import SoyOwner from '../roles/SoyOwner';
import SoyProfesor from '../roles/SoyProfesor';
import MisDatosAlumno from './MisDatosAlumno';

const { useDrizzleState} = drizzleReactHooks;

const MisDatos = () => {

    const drizzleState = useDrizzleState(state => state);

    const address = drizzleState.accounts[0];
    const balance = drizzleState.accountBalances[address];

    return (
        <article className="AppMisDatos">
            <h3>Mis Datos</h3>
            <ul>
                <SoyAlumno>
                    <li>Rol: <span style={{color: "blue"}}>Alumno</span></li>
                    <MisDatosAlumno/>
                </SoyAlumno>
                <SoyProfesor>
                    <li>Rol: <span style={{color: "blue"}}>Profesor</span></li>
                </SoyProfesor>
                <SoyCoordinador>
                    <li>Rol: <span style={{color: "blue"}}>Coordinador</span></li>
                </SoyCoordinador>
                <SoyOwner>
                    <li>Rol: <span style={{color: "blue"}}>Owner</span></li>
                </SoyOwner>
                <li>Dirección: <span style={{color: "blue"}}>{address}</span></li>
                <li>Balance: <span style={{color: "blue"}}>{balance}</span> weis</li>
            </ul>
        </article>);
};

export default MisDatos;
