import {drizzleReactHooks} from '@drizzle/react-plugin';

const { useDrizzleState } = drizzleReactHooks;

const Loading = ({children}) => {

    const initialized = useDrizzleState(state => state.drizzleStatus.initialized);

    // Comprobar que el navegador soporta Ethereum
    if (typeof window.ethereum === "undefined") {
        return (<main><h1>⚠️ Instale MetaMask.</h1></main>);
    }

    if (!initialized) {
        return (<main><h1>⚙️ Cargando dapp...</h1></main>);
    }

    // Comprobar que MetaMask está conectado a la red que quiero:
    if (window.ethereum.chainId && window.ethereum.chainId !== "0x539") {
        return (<main><h1>⚠️ Use Ganache {window.ethereum.chainId}</h1></main>);
    }

    return <>
        {children}
    </>
};

export default Loading;
