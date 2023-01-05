import {drizzleReactHooks} from '@drizzle/react-plugin'
const {useDrizzle} = drizzleReactHooks;

const ProfesorRow = ({indexProfesor}) => {
    const {useCacheCall} = useDrizzle();
    const profesorAddress = useCacheCall("Asignatura", "profesores", indexProfesor);
    let profesor = useCacheCall(['Asignatura'],
        call => profesorAddress && call("Asignatura", "datosProfesor", profesorAddress));

    return <tr key={"P-" + indexProfesor}>
            <td>{indexProfesor +1}</td>
            <td>{profesor}</td>
        </tr>;
};

export default ProfesorRow;


