export class AnuncioModel{
    id_anuncio: number = 0;
    id_usuario: number = 0;
    titulo: string = '';
    descripcion: string = '';
    categoria: string = '';
    precio: number = 0.0;
    direccion: string = '';
    u_latitud: string = '';
    u_longitud: string = '';
    tiempo: string = '';
    genero: string = '';
    fecha_fin: Date = new Date('');    
    fecha_creacion: Date = new Date('');
    ruta: string = '';
    estado: string = '0'
}