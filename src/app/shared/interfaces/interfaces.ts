export interface User {
    name: string;
    surnames: string;
    email: string;
    dni: number;
    phone: number;
    role: string;
    _id: string;
}

export interface Student extends User {
    academic_program_id: string
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
    schedules_ids: Array<Schedule>,
    students_ids: any[],
}

export interface Schedule {
    _id: string,
    week_day: string,
    hour_start: string,
    hour_end: string,
    room: string,
    course_id: string,
    disabled?: boolean,


}