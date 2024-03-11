export interface Job {
    id:            number;
    usuario_id:    string;
    titulo:        string;
    descripcion:   string;
    categoria:     string;
    precio:        number;
    direccion:     string;
    u_latitud:     string;
    u_longitud:     string;
    tiempo:        string;
    genero:        string;
    fecha_fin:       Date;
    fecha_creacion:  Date;
    fechaUpdate?:    Date;
    ruta:          string;
    estado:        string;
}
