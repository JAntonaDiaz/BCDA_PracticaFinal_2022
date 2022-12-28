import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const EvaluacionRow = ({evaluacionIndex}) => {
    
    const {useCacheCall} = useDrizzle();

    const ev = useCacheCall("Asignatura", "evaluaciones", evaluacionIndex);

    return <tr key={"EVA-" + evaluacionIndex}>
            <th>E<sub>{evaluacionIndex}</sub></th>
            <td>{ev?.nombre}</td>
            <td>{ev?.fecha ? (new Date(1000 * ev.fecha)).toLocaleString() : ""}</td>
            <td>{ev?.porcentaje}</td>
            <td>{ev?.minimo}</td>
        </tr>;
};

export default EvaluacionRow;
