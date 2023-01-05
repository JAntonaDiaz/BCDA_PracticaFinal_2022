import SoyProfesor from "../../roles/SoyProfesor";

const CalificacionesHead = () => {

    return (<thead>
                <tr>
                    <th key={"chne19"}>Nombre Alumno</th>
                    <th key={"chcal19"}>Nota</th>
                    <SoyProfesor>
                        <th key={"chedit19"}>Editar</th>
                    </SoyProfesor>
                </tr>
            </thead>);
};

export default CalificacionesHead;
