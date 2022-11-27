import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(fecha_init:any, fecha_End:any): string {

    if (fecha_init != null && fecha_End!=null) {
      let date_init = moment(fecha_init);
      let date_end = moment(fecha_End);
      var seconds = date_end.diff(date_init)/1000
      var interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) > 1 ? " años" : " año");
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) > 1 ? " meses" : " mes");
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) > 1 ? " dias" : " dia");
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) > 1 ? " horas" : " hora");
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) > 1 ? " minutos" : " minuto");
      }
      return Math.floor(seconds) + (Math.floor(seconds) > 1 ? " segundos" : " segundo");
    } else {
      return "1 minuto";
    }
  }

}