export interface Usuario {
    id?: number;
    nombres: string;
    apellidos: string;
    telefono: string;
    correo_electronico: string;
    contrasenia: string;
    fecha_nacimiento: string; // Puedes usar 'Date' si prefieres trabajar con objetos de fecha
    genero: string;
    identificacion: string;
    departamento: string;
    descripcion: string;
    metodo_pago: string;
    estado: string;
}