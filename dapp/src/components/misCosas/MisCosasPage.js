import SoyAlumno from "../roles/SoyAlumno";
import SoyCoordinador from "../roles/SoyCoordinador";
import SoyOwner from "../roles/SoyOwner";
import MisDatos from "./MisDatos";
import MisNotas from "./MisNotas";
import SoyProfesor from "../roles/SoyProfesor";

const MisCosasPage = () => {

    return <section className="AppMisCosas">
        <h2>Mis Cosas</h2>
        <SoyOwner>
            <p>Role: owner</p>
        </SoyOwner>
        <SoyCoordinador>
            <p>Role: coordinador</p>
        </SoyCoordinador>
        <SoyProfesor>
            <p>Role: profesor</p>
        </SoyProfesor>
        <SoyAlumno>
            <p>Role: alumno</p>
            <MisDatos/>
            <MisNotas/>
        </SoyAlumno>
        
    </section>;
}

export default MisCosasPage;

