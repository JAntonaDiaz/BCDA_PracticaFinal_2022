import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyAlumno = ({children}) => {

    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const myAddr = drizzleState.accounts[0];

    const alumno = useCacheCall("Asignatura", "quienSoy", {from: myAddr});

    if(alumno !== null){
        return <>
            {children}
        </>

    }
    
    return null;

};

export default SoyAlumno;