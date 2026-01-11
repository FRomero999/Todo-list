// Definición de la clase TareaDAO para manejar operaciones relacionadas con la tabla 'tareas'

class TareaDAO {
    #database = null; // Variable estática para almacenar la instancia de la base de datos
    
    // El constructor recibe la instancia de la base de datos y la almacena en la clase
    constructor(database) {
        this.#database = database;
    }

    // Método para buscar un usuario por su email
    findTareasByUserId(id){
        // Prepara y ejecuta una consulta SQL para buscar el usuario por email
        const sql= `SELECT * FROM tareas WHERE id_usuario=?`;
        return this.#database.prepare(sql).all(id);
    }

    // Método para guardar una nueva tarea
    // Recibe como parámetros la info de la nueva tarea: id_usuario, titulo, descripcion, completada
    saveTarea(id_usuario, titulo, descripcion, completada = 0) {
        const sql = `INSERT INTO tareas (id_usuario, titulo, descripcion, completada) VALUES (?, ?, ?, ?)`;
        return this.#database.prepare(sql).run(id_usuario, titulo, descripcion, completada);
    }

}

// Exporta la clase UsuarioDAO para que pueda ser utilizada en otros módulos
module.exports = TareaDAO;