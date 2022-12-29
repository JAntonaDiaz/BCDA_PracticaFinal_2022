
import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const NoSoyOwner = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const ownerAddr = useCacheCall("Asignatura", "owner");

    if (ownerAddr !== drizzleState.accounts[0]) {
        return <>
            {children}
        </>
    }
    
    return null;

};

export default NoSoyOwner;
