
const CalificacionesHead = () => {

    let thead = [];
    //thead.push(<th key={"chae"}>#</th>);
    thead.push(<th key={"chn"}>Nombre Alumno</th>);


    thead.push(<th key={"chcf"}>Calificacion Final</th>);


    return <thead><tr>{thead}</tr></thead>;
};

export default CalificacionesHead;
