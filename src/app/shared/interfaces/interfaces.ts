export interface User {
    name: string;
    surnames: string;
    email: string;
    dni: number;
    phone: number;
    role: string;
    _id: string;
    page?:number;
}

export interface Student extends User {
    academic_program: any
}

export interface AcademicProgram {
    faculty: string
    name: string
    _id: string
}

export interface Course {
    _id: string,
    teacher_id: string,
    name: string,
    description: string,
    date_start: string,
    date_end: string,
    schedules: Array<Schedule>,
    students?: any[],
    intensity:number,
    academic_programs:AcademicProgram[]
}

export interface Schedule {
    _id: string,
    week_day: string,
    hour_start: string,
    hour_end: string,
    room: string,
    course_id: string,
    disabled?: boolean,
    hour_milliseconds:number


}

export interface Response<T>{
    valid: boolean;
    data:T[];
    metadata?:Metadata;
}

export interface Metadata{
    page: number; 
    limit: number; 
    itemCount: number; 
    pageCount: number; 
    hasPreviousPage: boolean; 
    hasNextPage: boolean; 
}

export interface SelectedCourse {
    _id: string,
    name: string,

}