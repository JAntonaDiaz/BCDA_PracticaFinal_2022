
import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const NoSoyCoordinador = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const coordinadorAddr = useCacheCall("Asignatura", "coordinador");

    if (coordinadorAddr !== drizzleState.accounts[0]) {
        return <>
            {children}
        </>
    }
   
    return null;

};

export default NoSoyCoordinador;