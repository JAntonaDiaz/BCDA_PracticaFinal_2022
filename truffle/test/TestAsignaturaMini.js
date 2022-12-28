

let Asignatura = artifacts.require("Asignatura");


contract('Asignatura:', accounts => {

    let asignatura;

    before(async () => {
        asignatura = await Asignatura.deployed();
        // console.log("Asignatura =", asignatura.address);
    });


    it("El profesor es el que despliego el contrato",  async () => {

        let profesor = await asignatura.profesor();
        
        let desplegador = accounts[0];

        assert.equal(profesor, desplegador,"El profesor debe ser quien despliega en contrato.");
    })


    it("La asignatura es BCDA del curso 2020-2021",  async () => {

        let nombre = await asignatura.nombre();
        let curso = await asignatura.curso();

        assert.equal(nombre, "BCDA", "El nombre de la asignatura debe ser BCDA.");
        assert.equal(curso, "2022", "La asignatura es del curso 2022.");
    })


    it("Inicialmente la asignatura esta vacia",  async () => {

        let numEvaluaciones = await asignatura.evaluacionesLength();
        let numMatriculas = await asignatura.matriculasLength();

        assert.equal(numEvaluaciones, 0, "La asignatura no tiene ninguna evaluacion inicialmente.");
        assert.equal(numMatriculas, 0, "La asignatura no tiene ningun alumno matriculado inicialmente");
    })


    it("Crear dos evaluaciones correctamente",  async () => {

        // la nota va de 0 a 100.
        await asignatura.creaEvaluacion("Examen Parcial", 12345678, 30);
        await asignatura.creaEvaluacion("Examen Final", 12349999, 70);

        let numEvaluaciones = await asignatura.evaluacionesLength();

        let evaluacion0 = await asignatura.evaluaciones(0);
        let evaluacion1 = await asignatura.evaluaciones(1);

        assert.equal(numEvaluaciones, 2, "La asignatura debe tener dos evaluaciones.");

        assert.equal(evaluacion0.nombre, "Examen Parcial", "La primera evaluacion debe ser el examen parcial.");
        assert.equal(evaluacion0.fecha, 12345678, "La fecha del primer parcial debe ser 12345678.");
        assert.equal(evaluacion0.porcentaje, 30, "El primer parcial debe valer 3 puntos.");

        assert.equal(evaluacion1.nombre, "Examen Final", "La primera evaluacion debe ser el examen parcial.");
        assert.equal(evaluacion1.fecha, 12349999, "La fecha del examen final debe ser 123499.");
        assert.equal(evaluacion1.porcentaje, 70, "El examen final debe valer 7 puntos.");
    })


    it("Matricular a dos alumnos correctamente",  async () => {

        let evaAccount = accounts[1];
        let pepeAccount = accounts[2];

        await asignatura.automatricula("Eva Gomez", "eva_gomez_00@gmail.com", {from: evaAccount});
        await asignatura.automatricula("Jose Ortega", "josore_99@gmail.com", {from: pepeAccount});

        let numMatriculas = await asignatura.matriculasLength();
        assert.equal(numMatriculas, 2, "Tiene que haber dos alumnos matriculados.");

        let direccion0 = await asignatura.matriculas(0);
        let direccion1 = await asignatura.matriculas(1);

        assert.equal(direccion0, evaAccount, "La direccion del primer alumno matriculado esta mal.");
        assert.equal(direccion1, pepeAccount, "La direccion del segundo alumno matriculado esta mal.");

        let matricula0 = await asignatura.datosAlumno(direccion0);
        let matricula1 = await asignatura.datosAlumno(direccion1);

        assert.equal(matricula0.nombre, "Eva Gomez", "El nombre del primer alumno matriculado esta mal.");
        assert.equal(matricula0.email, "eva_gomez_00@gmail.com", "El email del primer alumno matriculado esta mal.");
     
        assert.equal(matricula1.nombre, "Jose Ortega", "El nombre del segundo alumno matriculado esta mal.");
        assert.equal(matricula1.email, "josore_99@gmail.com", "El email del segundo alumno matriculado esta mal.");
    })


    it("Evaluar correctamente",  async () => {

        let alumno0 = await asignatura.matriculas(0);
        let alumno1 = await asignatura.matriculas(1);

        let indice = 0;
        let tipoNota = 1;
        let calificacion = 65;
        await asignatura.califica(alumno0, indice, tipoNota, calificacion); 

        indice = 1;
        tipoNota = 1;
        calificacion = 75;
        await asignatura.califica(alumno0, indice, tipoNota, calificacion); 

        indice = 0;
        tipoNota = 0;
        calificacion = 0;
        await asignatura.califica(alumno1, indice, tipoNota, calificacion);

        indice = 1;
        tipoNota = 1;
        calificacion = 50;
        await asignatura.califica(alumno1, indice, tipoNota, calificacion); 

        // Primer parcial de Eva
        let nota = await asignatura.calificaciones(alumno0, 0);
        assert.equal(nota.tipo, 1, "La nota del alumno esta mal (1).");
        assert.equal(nota.calificacion, 65, "La nota del alumno esta mal (2).");

        // Final de Eva
        nota = await asignatura.calificaciones(alumno0, 1);
        assert.equal(nota.tipo, 1, "La nota del alumno esta mal (3).");
        assert.equal(nota.calificacion, 75, "La nota del alumno esta mal (4).");

        // Primer parcial de Pepe
        nota = await asignatura.calificaciones(alumno1, 0);
        assert.equal(nota.tipo, 0, "La nota del alumno esta mal (5).");
        assert.equal(nota.calificacion, 0, "La nota del alumno esta mal (6).");

        // Final de Pepe
        nota = await asignatura.calificaciones(alumno1, 1);
        assert.equal(nota.tipo, 1, "La nota del alumno esta mal (7).");
        assert.equal(nota.calificacion, 50, "La nota del alumno esta mal (8).");

    })


    it("Un alumno pregunta quien es el",  async () => {

        let pepeAccount = accounts[2];

        let datos = await asignatura.quienSoy({from: pepeAccount});

        assert.equal(datos._nombre, "Jose Ortega", "El nombre de un  alumno matriculado se recupera mal.");
        assert.equal(datos._email, "josore_99@gmail.com", "El email de un alumno matriculado se recupera mal.");
    })


    it("Un alumno consulta su nota",  async () => {

        let pepeAccount = accounts[2];

        let nota = await asignatura.miNota(1, {from: pepeAccount});

        assert.equal(nota.tipo, 1, "El alumno no puede recuperar su tipo de nota.");
        assert.equal(nota.calificacion, 50, "El alumno no puede recuperar su calificacion.");
    })

});
