export interface Job {
    id?:            number;
    usuario_id:    number;
    titulo:        string;
    descripcion:   string;
    categoria:     string;
    precio:        string;
    direccion:     string;
    u_latitud:     string;
    u_longitud:     string;
    tiempo:        string;
    genero:        string;
    fecha_fin:       string;
    fecha_creacion:  string;
    fechaUpdate?:    string;
    ruta?:          string;
    estado:        string;
}
