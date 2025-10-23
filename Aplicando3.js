import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function input(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function Tarea(tarea, descripcion, dificultad) {
    this.tarea = tarea;
    this.descripcion = descripcion;
    this.dificultad = dificultad;
    this.fechaCreacion = new Date().toISOString().split("T")[0];
}

Tarea.prototype.formatear = function() {
    return `${this.tarea} - ${this.descripcion} [${this.dificultad}] (Creada: ${this.fechaCreacion})`;
};

function ListaDeTareas() {
    this.tareas = [];
    this.tareaCompletada = [];
}

ListaDeTareas.prototype.agregarTarea = function(tarea, descripcion, dificultad) {
    const nuevaTarea = new Tarea(tarea, descripcion, dificultad);
    this.tareas.push(nuevaTarea);
    console.log(`Tarea "${nuevaTarea.tarea}" agregada a la lista.`);
};

ListaDeTareas.prototype.mostrarTareas = function() {
    if (this.tareas.length === 0) {
        console.log("No hay tareas pendientes en la lista.");
        return;
    }
    console.log("Tareas pendientes:");
    this.tareas.forEach((tarea, index) => {
        console.log(`${index + 1}. ${tarea.formatear()}`);
    });
};

ListaDeTareas.prototype.completarTarea = function(indice) {
    const index = parseInt(indice) - 1;
    if (index >= 0 && index < this.tareas.length) {
        const tareaCompletadaItem = this.tareas.splice(index, 1)[0];
        this.tareaCompletada.push(tareaCompletadaItem);
        console.log(`Tarea "${tareaCompletadaItem.tarea}" marcada como completada.`);
    } else {
        console.log("Número de tarea inválido.");
    }
};

ListaDeTareas.prototype.mostrarTareasCompletadas = function() {
    if (this.tareaCompletada.length === 0) {
        console.log("No hay tareas completadas.");
        return;
    }
    console.log("Tareas completadas:");
    this.tareaCompletada.forEach((tarea, index) => {
        console.log(`${index + 1}. ${tarea.formatear()}`);
    });
};

function GestorTareasApp() {
    this.listaDeTareas = new ListaDeTareas();
}

GestorTareasApp.prototype.mostrarMenu = function() {
    console.log("\n--- Gestor de Tareas (POO Prototipos) ---");
    console.log("1. Agregar tarea");
    console.log("2. Mostrar tareas pendientes");
    console.log("3. Completar tarea");
    console.log("4. Mostrar tareas completadas");
    console.log("5. Salir");
};

GestorTareasApp.prototype.gestionarAgregarTarea = async function() {
    const tarea = await input("Ingrese la tarea que desea agregar: ");
    const descripcion = await input("Ingrese la descripción de la tarea: ");
    const dificultad = await input("Ingrese la dificultad (baja/media/alta): ");
    this.listaDeTareas.agregarTarea(tarea, descripcion, dificultad);
};

GestorTareasApp.prototype.gestionarCompletarTarea = async function() {
    if (this.listaDeTareas.tareas.length === 0) {
        console.log("No hay tareas para completar.");
        return;
    }
    this.listaDeTareas.mostrarTareas();
    const indice = await input("Ingrese el número de la tarea que ha completado: ");
    this.listaDeTareas.completarTarea(indice);
};

GestorTareasApp.prototype.procesarOpcion = async function(opcion) {
    switch (opcion) {
        case "1":
            await this.gestionarAgregarTarea();
            break;
        case "2":
            this.listaDeTareas.mostrarTareas();
            break;
        case "3":
            await this.gestionarCompletarTarea();
            break;
        case "4":
            this.listaDeTareas.mostrarTareasCompletadas();
            break;
        case "5":
            console.log("Saliendo...");
            rl.close();
            return true;
        default:
            console.log("Opción inválida. Intente de nuevo.");
    }
    return false;
};

GestorTareasApp.prototype.iniciar = async function() {
    while (true) {
        this.mostrarMenu();
        const opcion = await input("Seleccione una opción: ");
        const salir = await this.procesarOpcion(opcion);
        if (salir) {
            break;
        }
    }
};

async function main() {
    const miApp = new GestorTareasApp();
    await miApp.iniciar();
}

main();