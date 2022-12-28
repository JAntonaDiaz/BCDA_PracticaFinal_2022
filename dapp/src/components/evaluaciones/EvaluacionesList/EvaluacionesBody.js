import {drizzleReactHooks} from '@drizzle/react-plugin'

import EvaluacionRow from "./EvaluacionRow";

const {useDrizzle} = drizzleReactHooks;

const EvaluacionesBody = () => {
    const {useCacheCall} = useDrizzle();

    const evaluacionesLength = useCacheCall("Asignatura", "evaluacionesLength");

    let rows = [];
    for (let i = 0; i < evaluacionesLength; i++) {
        rows.push(<EvaluacionRow key={"eb-"+i} evaluacionIndex={i}/>);
    }
    return <tbody>{rows}</tbody>;
};

export default EvaluacionesBody;
