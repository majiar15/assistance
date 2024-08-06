

export const weekdays: Array<any> = [
    {
        value: 'Monday',
        title: 'Lunes'
    },
    {
        value: 'Tuesday',
        title: 'Martes'
    },
    {
        value: 'Wednesday',
        title: 'Miercoles'
    },
    {
        value: 'Thursday',
        title: 'Jueves'
    },
    {
        value: 'Friday',
        title: 'Viernes'
    },
    {
        value: 'Saturday',
        title: 'Sabado'
    },

]

export function getDayNumber(dayName: string): number {
    const daysOfWeek: { [key: string]: number } = {
      'Monday': 0,
      'Tuesday': 1,
      'Wednesday': 2,
      'Thursday': 3,
      'Friday': 4,
      'Saturday': 5,
      'Sunday': 6,

    };

    return daysOfWeek[dayName];
  }