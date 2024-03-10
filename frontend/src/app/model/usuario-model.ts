export class UsuarioModel{
    idUsuario: number = 0;
    nombres: string = '';
    apellidos: string = '';
    telefono: string = '';
    correoElectronico: string = '';
    contrasenia: string = '';
    fechaNacimiento: Date = new Date();
    genero: string = '';
    identificacion: string = '';
    departamento: string = '';
    descripcion: string = '';
    metodoPago: string = '';
    estado: string = '0';
}