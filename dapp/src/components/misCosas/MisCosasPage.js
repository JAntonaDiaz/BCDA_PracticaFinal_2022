import SoyAlumno from "../roles/SoyAlumno";
import NoSoyAlumno from "../roles/NoSoyAlumno";
import SoyCoordinador from "../roles/SoyCoordinador";
import NoSoyCoordinador from "../roles/NoSoyCoordinador";
import SoyOwner from "../roles/SoyOwner";
import NoSoyOwner from "../roles/NoSoyOwner";
import SoyProfesor from "../roles/SoyProfesor";
import NoSoyProfesor from "../roles/NoSoyProfesor";

import MisDatos from "./MisDatos";
import MisNotas from "./MisNotas";


const MisCosasPage = () => {

    return <section className="AppMisCosas">

        <h2>Mis Cosas</h2>

        <SoyOwner>
            <MisDatos/>
        </SoyOwner>

        <SoyCoordinador>
            <MisDatos/>
        </SoyCoordinador>

        <SoyProfesor>
            <MisDatos/>
        </SoyProfesor>

        <SoyAlumno>
            <MisDatos/>
            <MisNotas/>
        </SoyAlumno>

        <NoSoyAlumno>
        <NoSoyProfesor>
        <NoSoyCoordinador>
        <NoSoyOwner>
            <p>Esta dirección no está asociada a ningún rol en la asignatura.</p>
        </NoSoyOwner>
        </NoSoyCoordinador>
        </NoSoyProfesor>
        </NoSoyAlumno>
    
    </section>;
}

export default MisCosasPage;

