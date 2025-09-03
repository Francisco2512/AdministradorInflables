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
import { ReservacionesService } from '../reservaciones/reservaciones.service';
import { Reservacion } from '../reservaciones/reservaciones.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarWrapperModule, NzModalModule],
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
    titleFormat: { year: 'numeric', month: 'long' }
  };

  reservaciones: Reservacion[] = [];

  constructor(
    private reservacionesService: ReservacionesService,
    private modal: NzModalService
  ) {}

  async ngOnInit() {
    await this.cargarEventosDesdeFirestore();
  }

  async cargarEventosDesdeFirestore() {
    try {
      this.reservaciones = await this.reservacionesService.obtenerReservaciones();

      const eventos: EventInput[] = this.reservaciones.map(r => ({
        id: r.id, 
        title: `${r.inflable} - ${r.cliente}`,
        date: r.fecha
      }));

      this.calendarOptions = {
        ...this.calendarOptions,
        events: eventos
      };

    } catch (error) {
      console.error('Error al cargar reservaciones:', error);
    }
  }

  onEventClick(info: any) {
    const reservacion = this.reservaciones.find(r => r.id === info.event.id);

    if (reservacion) {
      this.modal.info({
        nzTitle: 'Detalles de la reservación',
        nzContent: `
          <p><b>Cliente:</b> ${reservacion.cliente}</p>
          <p><b>Teléfono:</b> ${reservacion.telefono}</p>
          <p><b>Inflable:</b> ${reservacion.inflable}</p>
          <p><b>Fecha:</b> ${reservacion.fecha}</p>
          <p><b>Domicilio:</b> ${reservacion.domicilio}</p>
          <p><b>Pago:</b> ${reservacion.pago}</p>
        `,
        nzOnOk: () => {}
      });
    }
  }
}
