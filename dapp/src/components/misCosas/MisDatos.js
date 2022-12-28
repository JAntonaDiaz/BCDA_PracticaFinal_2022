import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const MisDatos = () => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const address = drizzleState.accounts[0];
    const balance = drizzleState.accountBalances[address];

    const datos = useCacheCall("Asignatura", "quienSoy", {from: address});

    return (
        <article className="AppMisDatos">
            <h3>Mis Datos</h3>
            <ul>
                <li>Nombre: <span style={{color: "blue"}}>{datos?._nombre || "No matriculado"}</span></li>
                <li>Email: <span style={{color: "blue"}}>{datos?._email || "No matriculado"}</span></li>
                <li>Dirección: <span style={{color: "blue"}}>{address}</span></li>
                <li>Balance: <span style={{color: "blue"}}>{balance}</span> weis</li>
            </ul>
        </article>);
};

export default MisDatos;
