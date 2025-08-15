// import { Component } from '@angular/core';
// import { FullCalendarWrapperModule } from './full-calendar-wrapper.module';
// import { CalendarOptions, EventInput } from '@fullcalendar/core';
// import esLocale from '@fullcalendar/core/locales/es';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import { Router } from '@angular/router';
// import { ReservacionService } from '../service/reservacion.service';

// @Component({
//   selector: 'app-calendario',
//   standalone: true,
//   imports: [FullCalendarWrapperModule],
//   templateUrl: './calendario.component.html',
//   'styleUrls': ['./calendario.component.css']
// })

// export class CalendarioComponent {

//   calendarOptions: CalendarOptions = {
//     plugins: [dayGridPlugin],
//     initialView: 'dayGridMonth',
//     locale: esLocale,
//     events: this.getEventosDesdeLocalStorage(),
//     eventClick: this.onEventClick.bind(this),
//   };

//   getEventosDesdeLocalStorage(): EventInput[] {
//     const raw = localStorage.getItem('reservaciones');
//     if (!raw) return [];
    

//     try {
//       const reservaciones = JSON.parse(raw);
//       return reservaciones.map((r: any) => ({
//         title: `${r.inflable} - ${r.cliente}`,
//         date: r.fecha
//       }));
//     } catch (e) {
//       console.error('Error al leer reservaciones:', e);
//       return [];
//     }
//   }constructor(private router: Router) {}
//   onEventClick(info: any) {
//     console.log('Evento clicado:', info.event);

//     this.router.navigate(['/reservaciones']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FullCalendarWrapperModule } from './full-calendar-wrapper.module';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from '@angular/router';
import { ReservacionesService } from '../reservaciones/reservaciones.service'; // Ajusta la ruta según tu proyecto
import { Reservacion } from '../reservaciones/reservaciones.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarWrapperModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    events: [],
    eventClick: this.onEventClick.bind(this),
  };

  constructor(
    private router: Router,
    private reservacionesService: ReservacionesService
  ) {}

  async ngOnInit() {
    await this.cargarEventosDesdeFirestore();
  }

  async cargarEventosDesdeFirestore() {
    try {
      const reservaciones: Reservacion[] = await this.reservacionesService.obtenerReservaciones();

 
      const eventos: EventInput[] = reservaciones.map(r => ({
        title: `${r.inflable} - ${r.cliente}`,
        date: r.fecha
      }));


      this.calendarOptions = {
        ...this.calendarOptions,
        events: eventos
      };

    } catch (error) {
      console.error('Error al cargar reservaciones desde Firestore:', error);
    }
  }

  onEventClick(info: any) {
    console.log('Evento clicado:', info.event);
    this.router.navigate(['/reservaciones']);
  }
}
