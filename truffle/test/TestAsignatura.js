var Asignatura = artifacts.require("./Asignatura.sol");

contract('Uso normal de Asignatura:', accounts => {

    const profesor = accounts[0];

    const desconocido = accounts[9];

    // Alumnos que se van a automatricular
    const alumnos = [
        {addr: accounts[4], nombre: "Pepe", email: "pepe@upm.es"},
        {addr: accounts[5], nombre: "Sara", email: "sara@upm.es"},
        {addr: accounts[6], nombre: "Luis", email: "luis@upm.es"},
        {addr: accounts[7], nombre: "Lucia", email: "lucia@upm.es"},
        {addr: accounts[8], nombre: "Jaime", email: "jaime@upm.es"},
    ];

    const evaluaciones = [
        {nombre: "Parcial 1",  fecha: Date.now() + 60 * 24 * 3600000,  porcentaje: 30},
        {nombre: "Parcial 2",  fecha: Date.now() + 120 * 24 * 3600000, porcentaje: 30},
        {nombre: "Practica 1", fecha: Date.now() + 50 * 24 * 3600000,  porcentaje: 20},
        {nombre: "Practica 1", fecha: Date.now() + 110 * 24 * 3600000, porcentaje: 20}
    ];

    // Notas de todos loa alumnos en todas las evaluaciones.
    // Primer subarray: uno para cada alumno.
    // Segundo subsubarray: uno para cada evaluacion.
    const calificaciones = [
        [[1, 0], [2, 400], [2, 750], [2, 900]],   // Notas del primer alumno
        [[2, 500], [2, 600], [2, 750], [2, 800]], // Notas del segundo alumno
        [[0, 0], [0, 0], [0, 0], [0, 0]],         // Notas del tercer alumno
        [[2, 950], [2, 800], [1, 0], [1, 0]],     // Notas del cuarto alumno
        [[1, 0], [1, 0], [1, 0], [1, 0]]          // Notas del quinto alumno
    ];

    it("el nombre y curso deben ser BCDA y 2022", async () => {
        const asignatura = await Asignatura.deployed();

        const nombre = await asignatura.nombre.call();
        assert.equal(nombre, "BCDA", "El nombre debe ser BCDA.");

        const curso = await asignatura.curso.call();
        assert.equal(curso, "2022", "El curso debe ser 2022.");
    });

    it("el profesor debe ser la primera cuenta.", async () => {
        const asignatura = await Asignatura.deployed();

        const profesor = await asignatura.profesor.call();
        assert.equal(profesor, accounts[0], "El profesor debe ser la primera cuenta.");
    });

    it("no puede enviarse dinero al contrato.", async () => {
        const asignatura = await Asignatura.deployed();
        try {
            await asignatura.send(200);
        } catch (error) {
            return;
        }
        assert.fail("El contrato no debe aceptar envios de dinero.")
    });

    it("automatricularse.", async () => {
        const asignatura = await Asignatura.deployed();

        const zero = await asignatura.matriculasLength.call();
        assert.equal(zero, 0, "No debe haber alumnos al principio.");

        for (const alumno of alumnos) {
            await asignatura.automatricula(alumno.nombre, alumno.email, {from: alumno.addr});
        }

        const ml = await asignatura.matriculasLength.call();
        assert.equal(ml, alumnos.length, "No se han añadido todos los alumnos.");

        for (const alumno of alumnos) {
            let a = await asignatura.datosAlumno.call(alumno.addr);

            assert.equal(a[0], alumno.nombre, "El nombre de un alumno no se ha guardado bien.");
            assert.equal(a[1], alumno.email, "El email de un alumno no se ha guardado bien.");
        }

        // No se puede matricular un alumno dos veces.
        try {
            const alumno = alumnos[1];
            await asignatura.automatricula(alumno.nombre, alumno.email, {from: alumno.addr});
        } catch {
            return;
        }
        assert.fail("No se puede matricular un alumno dos veces.")
    });

    it("No puede dejarse el nombre vacio al automatricularse.", async () => {
        const asignatura = await Asignatura.deployed();

        try {
            await asignatura.automatricula("", "email", {from: desconocido});
        } catch {
            return;
        }
        assert.fail("No puede dejarse el nombre vacio al automatricularse.");
    });

    it("quienSoy.", async () => {
        const asignatura = await Asignatura.deployed();

        const sara = alumnos[1];
        let alumno = await asignatura.quienSoy.call({from: sara.addr});

        assert.equal(alumno[0], sara.nombre, "No puedo accedr a mi nombre.");
        assert.equal(alumno[1], sara.email, "No puedo accedr a mi email.");
    });

    it("Solo un alumno matriculado puede consultar quienSoy.", async () => {
        const asignatura = await Asignatura.deployed();

        try {
            await asignatura.quienSoy({from: desconocido});
        } catch {
            return;
        }
        assert.fail("Solo un alumno matriculado puede consultar quienSoy.");
    });

    it("Crear evaluaciones.", async () => {
        const asignatura = await Asignatura.deployed();

        const zero = await asignatura.evaluacionesLength.call();
        assert.equal(zero, 0, "No debe haber evaluaciones al principio.");

        for (const evaluacion of evaluaciones) {
            await asignatura.creaEvaluacion(evaluacion.nombre, evaluacion.fecha, evaluacion.porcentaje, {from: profesor});
        }

        const el = await asignatura.evaluacionesLength.call();
        assert.equal(el, evaluaciones.length, "No se han añadido todas las evaluaciones.");

        for (let i = 0; i < evaluaciones.length; i++) {
            let e = await asignatura.evaluaciones.call(i);

            assert.equal(e[0], evaluaciones[i].nombre, "El nombre de una evaluacion alumno no se ha guardado bien.");
            assert.equal(e[1], evaluaciones[i].fecha, "La fecha de una evaluacion no se ha guardado bien.");
            assert.equal(e[2], evaluaciones[i].porcentaje, "El porcentaje de una evaluacion no se ha guardado bien.");
        }
    });

    it("Solo el profesor puede crear una evaluacion.", async () => {
        const asignatura = await Asignatura.deployed();

        try {
            await asignatura.creaEvaluacion("nombre", 2000, 5, {from: desconocido});
        } catch {
            return;
        }
        assert.fail("Solo el profesor puede crear una evaluacion.");
    });

    it("Crear calificaciones.", async () => {
        const asignatura = await Asignatura.deployed();

        for (let ai = 0; ai < calificaciones.length; ai++) {
            let alumnoAddr = alumnos[ai].addr;
            for (let ei = 0; ei < evaluaciones.length; ei++) {
                await asignatura.califica(alumnoAddr, ei, calificaciones[ai][ei][0], calificaciones[ai][ei][1], {from: profesor});
            }
        }

        for (let ai = 0; ai < calificaciones.length; ai++) {
            let alumnoAddr = alumnos[ai].addr;
            for (let ei = 0; ei < evaluaciones.length; ei++) {
                let c = await asignatura.calificaciones(alumnoAddr, ei);
                assert.equal(c[0].toNumber(), calificaciones[ai][ei][0], "El tipo de una calificacion no se ha guardado bien.");
                assert.equal(c[1].toNumber(), calificaciones[ai][ei][1], "La nota de una calificacion no se ha guardado bien.");
            }
        }
    });

    it("Solo puede calificar un profesor.", async () => {
        const asignatura = await Asignatura.deployed();

        try {
            await asignatura.califica(alumnos[0].addr, 0, 0, 0, {from: desconocido});
        } catch {
            return;
        }
        assert.fail("Solo puede calificar un profesor.");
    });

    it("Consultar mi nota.", async () => {
        const asignatura = await Asignatura.deployed();

        const alumno = alumnos[1];

        for (let i = 0; i < evaluaciones.length; i++) {
            let c1 = await asignatura.miNota(i, {from: alumno.addr});
            assert.equal(c1[0].toNumber(), calificaciones[1][i][0], "El tipo de una calificacion mia no se ha guardado bien.");
            assert.equal(c1[1].toNumber(), calificaciones[1][i][1], "La nota de una calificacion mia no se ha guardado bien.");
        }
    });

    it("Solo pueden llamar a miNota los alumnos matriculados.", async () => {
        const asignatura = await Asignatura.deployed();

        try {
            await asignatura.miNota(0, {from: desconocido});
        } catch {
            return;
        }
        assert.fail("Solo pueden llamar a miNota los alumnos matriculados.");
    });
});

