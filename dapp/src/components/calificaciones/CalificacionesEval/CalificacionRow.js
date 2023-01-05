import {drizzleReactHooks} from '@drizzle/react-plugin'
import { Link } from 'react-router-dom';
import SoyProfesor from '../../roles/SoyProfesor';

const {useDrizzle} = drizzleReactHooks;

const CalificacionRow = ({alumnoIndex, indexEval}) => {
    const {useCacheCall} = useDrizzle();

    const alumnoAddr = useCacheCall("Asignatura", "matriculas", alumnoIndex);

    let alumnoName = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
    );

    let notas = useCacheCall(['Asignatura'], call => { 
        let result = [];
        const nota = call("Asignatura", "calificaciones", alumnoAddr, indexEval);
        result.push(
            <td key={"p219" + alumnoIndex}>
                {nota?.tipo === "0" ? "" : ""}
                {nota?.tipo === "1" ? "N.P." : ""}
                {nota?.tipo === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
            </td>
        )
        return result;
    });

    return (
        <tr key={"cal19" + alumnoIndex}>
            <td>{alumnoName}</td>
            {notas}
            <SoyProfesor>
                <td><Link to={`/calificaciones/${indexEval}/${alumnoAddr}`}>Editar</Link></td>
            </SoyProfesor>
        </tr>
    );
};

export default CalificacionRow;
