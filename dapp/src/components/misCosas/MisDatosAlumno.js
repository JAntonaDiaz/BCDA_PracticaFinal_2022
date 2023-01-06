import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle,useDrizzleState} = drizzleReactHooks;

const MisDatosAlumno = () => {

    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const address = drizzleState.accounts[0];

    const datos = useCacheCall("Asignatura", "quienSoy", {from: address});

    return (
        <>
            <li>Nombre: <span style={{color: "blue"}}>{datos?._nombre || "No matriculado"}</span></li>
            <li>Email: <span style={{color: "blue"}}>{datos?._email || "No matriculado"}</span></li>
            <li>DNI: <span style={{color: "blue"}}>{datos?._dni || "No matriculado"}</span></li> 
        </> 
    );
};

export default MisDatosAlumno;