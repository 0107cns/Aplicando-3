import promptSync from "prompt-sync";
const prompt = promptSync();

class Tarea {
  public tarea: string;
  public descripcion: string;
  public dificultad: string;
  public fechaCreacion: string;

  constructor(tarea: string, descripcion: string, dificultad: string) {
    this.tarea = tarea;
    this.descripcion = descripcion;
    this.dificultad = dificultad;
    this.fechaCreacion = new Date().toISOString().split("T")[0];
  }

  public formatear(): string {
    return `${this.tarea} - ${this.descripcion} [${this.dificultad}] (Creada: ${this.fechaCreacion})`;
  }
}

class ListaDeTareas {
  private tareas: Tarea[] = [];
  private tareaCompletada: Tarea[] = [];

  public agregarTarea(tarea: string, descripcion: string, dificultad: string): void {
    const nuevaTarea = new Tarea(tarea, descripcion, dificultad);
    this.tareas.push(nuevaTarea);
    console.log(`Tarea "${nuevaTarea.tarea}" agregada a la lista.`);
  }

  public mostrarTareas(): void {
    if (this.tareas.length === 0) {
      console.log("No hay tareas pendientes en la lista.");
      return;
    }
    console.log("Tareas pendientes:");
    this.tareas.forEach((tarea, index) => {
      console.log(`${index + 1}. ${tarea.formatear()}`);
    });
  }

  public completarTarea(indice: number): void {
    const index = indice - 1;
    if (index >= 0 && index < this.tareas.length) {
      const tareaCompletadaItem = this.tareas.splice(index, 1)[0];
      this.tareaCompletada.push(tareaCompletadaItem);
      console.log(`Tarea "${tareaCompletadaItem.tarea}" marcada como completada.`);
    } else {
      console.log("Número de tarea inválido.");
    }
  }

  public mostrarTareasCompletadas(): void {
    if (this.tareaCompletada.length === 0) {
      console.log("No hay tareas completadas.");
      return;
    }
    console.log("Tareas completadas:");
    this.tareaCompletada.forEach((tarea, index) => {
      console.log(`${index + 1}. ${tarea.formatear()}`);
    });
  }
  
  public hayTareasPendientes(): boolean {
    return this.tareas.length > 0;
  }
}

const miLista = new ListaDeTareas();
let salir = false;

while (!salir) {
  console.log("\n--- Gestor de Tareas (TypeScript) ---");
  console.log("1. Agregar tarea");
  console.log("2. Mostrar tareas pendientes");
  console.log("3. Completar tarea");
  console.log("4. Mostrar tareas completadas");
  console.log("5. Salir");

  const opcion: string = prompt("Seleccione una opción: ");

  switch (opcion) {
    case "1": {
      const tarea = prompt("Ingrese la tarea que desea agregar: ");
      const descripcion = prompt("Ingrese la descripción de la tarea: ");
      const dificultad = prompt("Ingrese la dificultad (baja/media/alta): ");
      miLista.agregarTarea(tarea, descripcion, dificultad);
      break;
    }
    case "2":
      miLista.mostrarTareas();
      break;
    case "3": {
      if (!miLista.hayTareasPendientes()) {
        console.log("No hay tareas para completar.");
        break;
      }
      miLista.mostrarTareas();
      const indiceStr = prompt("Ingrese el número de la tarea que ha completado: ");
      const indice = parseInt(indiceStr);
      miLista.completarTarea(indice);
      break;
    }
    case "4":
      miLista.mostrarTareasCompletadas();
      break;
    case "5":
      console.log("Saliendo...");
      salir = true;
      break;
    default:
      console.log("Opción inválida. Intente de nuevo.");
  }
}