import {drizzleReactHooks} from "@drizzle/react-plugin";

import CalificacionRow from "./CalificacionRow";

const {useDrizzle} = drizzleReactHooks;

const CalificacionesBody = ({indexEval}) => {
    const {useCacheCall} = useDrizzle();
    const alumnoslength = useCacheCall("Asignatura", "matriculasLength");
    let rows = [];
    for (let i = 0; i < alumnoslength; i++) {
        rows.push(<CalificacionRow key={"ce-"+i} alumnoIndex={i} indexEval={indexEval}/>);
    }

    return <tbody>{rows}</tbody>;
};

export default CalificacionesBody;
