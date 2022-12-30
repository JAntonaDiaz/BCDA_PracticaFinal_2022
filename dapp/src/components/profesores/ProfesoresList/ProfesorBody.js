import {drizzleReactHooks} from '@drizzle/react-plugin'
import ProfesorRow from "./ProfesorRow";

const {useDrizzle} = drizzleReactHooks;

const ProfesorBody = () => {
    const {useCacheCall} = useDrizzle();
    const profesoresLength = useCacheCall("Asignatura", "profesoresLength");
    let rows = [];
    for (let i=0; i<profesoresLength; i++) {
        rows.push(<ProfesorRow key={"ep-"+i} indexProfesor={i} />);
    }
    return <tbody>{rows}</tbody>;
}

export default ProfesorBody;

