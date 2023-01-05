import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const CalificacionRow = ({alumnoIndex}) => {
    const {useCacheCall} = useDrizzle();

    const alumnoAddr = useCacheCall("Asignatura", "matriculas", alumnoIndex);

    let alumnoName = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
    ); 

    let calificacionFinal = useCacheCall(['Asignatura'], call => {
        if (!alumnoAddr) { return []; }

        let cells = [];
        const notaFinal = call("Asignatura", "notaFinal", alumnoAddr);
        //console.log(notaFinal)
        cells.push(
            <td key={"p2-" + alumnoIndex}>
                {notaFinal?.tipo === "0" ? "" : ""}
                {notaFinal?.tipo === "1" ? "N.P." : ""}
                {notaFinal?.tipo === "2" ? (notaFinal?.calificacion / 100).toFixed(2) : ""}
            </td>
        );
        return cells;
    });

    return <tr key={"d" + alumnoIndex}>
            <td>{alumnoName}</td>
            {calificacionFinal}
        </tr>;
};

export default CalificacionRow;
