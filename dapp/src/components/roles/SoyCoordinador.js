
import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyCoordinador = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const coordinadorAddr = useCacheCall("Asignatura", "coordinador");

    if (coordinadorAddr !== drizzleState.accounts[0]) {
        return null
    }
    return <>
        {children}
    </>

};

export default SoyCoordinador;