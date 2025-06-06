export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface UserForm {
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface Inscripcion{
  id: string;
  courseId : string;
  studentId : string;
}
export interface InscripcionForm{
  courseId : string;
  studentId : string;
}

export interface InscripcionExpand extends Inscripcion {
  nombre?: string;
}
export interface InscripcionExpandComplete extends Inscripcion {
  nombreStudent?: string;
  nombreCourse?: string;
}