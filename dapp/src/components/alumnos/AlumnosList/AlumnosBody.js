import {drizzleReactHooks} from '@drizzle/react-plugin'

import AlumnoRow from "./AlumnoRow";

const {useDrizzle} = drizzleReactHooks;

const AlumnosBody = () => {
    const {useCacheCall} = useDrizzle();

    const matriculasLength = useCacheCall("Asignatura", "matriculasLength") || 0;

    let rows = [];
    for (let i = 0; i < matriculasLength; i++) {
        rows.push(<AlumnoRow key={"ab-"+i} alumnoIndex={i}/>);
    }

    return <tbody>{rows}</tbody>;
};

export default AlumnosBody;
