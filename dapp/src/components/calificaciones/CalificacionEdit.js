import {drizzleReactHooks} from '@drizzle/react-plugin'
import { useState } from 'react';
import {useParams, Link} from "react-router-dom";

const {useDrizzle} = drizzleReactHooks;


const CalificacionEdit = () => {
    const {useCacheCall, useCacheSend} = useDrizzle();

    let {ide, idadress} = useParams();

    const datos = useCacheCall("Asignatura", "calificaciones", idadress, ide);

    // Conservar los valores metidos en el formulario
    let [tipoNew, setTipo] = useState(datos.tipo);
    let [calificacionNew, setCalificacion] = useState(datos.calificacion);

   const {send: sendCalificaEval, status: CalificaEval} = useCacheSend("Asignatura", "califica");

   const editCalificacion = ev => {
       ev.preventDefault();
       sendCalificaEval(idadress, ide, tipoNew, calificacionNew);
   }

   return (
       <section className="AppAlumno">

       <h3>Editar Calificacion</h3>
               <form>
                    <p>
                        Tipo: (0=Pendiente 1=N.P. 2=Normal):  &nbsp;
                        <input key="tipo" type="number" name="tipo" value={tipoNew} placeholder="Tipo de nota"
                            onChange={ev => setTipo(ev.target.value)}/>
                    </p>
                    <p>
                        Nota (x100):  &nbsp;
                        <input key="calificacion" type="number" name="calificacion" value={calificacionNew} placeholder="Nota"
                            onChange={ev => setCalificacion(ev.target.value)}/>
                    </p>
                    <p>
                       <button key="submit"  
                               type="button"
                               className="pure-button" 
                               onClick={ev => editCalificacion(ev)}>
                       Guardar
                       </button>
                    </p>
                    <Link to="/calificaciones">Volver</Link>
               </form>
   </section>
   );
};

export default CalificacionEdit;