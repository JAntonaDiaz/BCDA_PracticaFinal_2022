import {drizzleReactHooks} from '@drizzle/react-plugin'
const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyOwnerCoordinadoroProfesor = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const myAddr = drizzleState.accounts[0];
    const coordinadorAddr = useCacheCall("Asignatura", "coordinador");
    const ownerAddr = useCacheCall("Asignatura", "owner");
    const nombreProfesor = useCacheCall("Asignatura", "datosProfesor", myAddr);

    if ((coordinadorAddr === myAddr)|(ownerAddr === myAddr)|(nombreProfesor !== "")){
        return <>
        {children}
        </>
    }
    return null;
}

export default SoyOwnerCoordinadoroProfesor;