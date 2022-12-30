import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const CalificacionRow = ({alumnoIndex, indexEval}) => {
    const {useCacheCall} = useDrizzle();

    const alumnoAddr = useCacheCall("Asignatura", "matriculas", alumnoIndex);

    let alumnoName = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
    );

    let nota = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "calificaciones", alumnoAddr, indexEval)?.calificacion
    );

    let prettynota = (nota/100).toFixed(2);

    return <tr key={"cal" + alumnoIndex}>
            <td>{alumnoName}</td>
            <td>{prettynota}</td>
        </tr>;
};

export default CalificacionRow;
