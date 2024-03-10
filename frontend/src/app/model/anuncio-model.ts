export class AnuncioModel{
    idAnuncio: number = 0;
    idUsuario: number = 0;
    titulo: string = '';
    descripcion: string = '';
    categoria: string = '';
    precio: number = 0.0;
    ubicacion: string = '';
    tiempo: string = '';
    genero: string = '';
    fechaFin: Date = new Date('');    
    fechaCreacion: Date = new Date();
    ruta: string = '';
    status: string = '0';
}