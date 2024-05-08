export interface User {
    name: string;
    surnames:string;
    email: string;
    dni: number;
    phone: number;
    role: string;
    _id: string;
}

export interface AcademicProgram {
    faculty: string
    name: string
    _id: string
}