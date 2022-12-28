import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyProfesor = ({children}) => {

    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const myAddr = drizzleState.accounts[0];

    const nombreProfesor = useCacheCall("Asignatura", "datosProfesor", myAddr);

    if(nombreProfesor !== ""){
        return <>
            {children}
        </>

    }
    
    return null;

};

export default SoyProfesor;