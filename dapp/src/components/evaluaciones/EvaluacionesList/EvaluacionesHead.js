import SoyCoordinador from "../../roles/SoyCoordinador";

const EvaluacionesHead = () =>
    <thead>
    <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Fecha</th>
        <th>%</th>
        <th>Mínimo</th>
        <SoyCoordinador>
        <th>Editar</th>
        </SoyCoordinador>
    </tr>
    </thead>;

export default EvaluacionesHead;
