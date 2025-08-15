// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { NgFor, NgIf } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { InflablesService } from '../service/Inflables.service';
// import { DatePipe } from '@angular/common';
// import { ReservacionesService } from './reservaciones.service';
// import Swal from 'sweetalert2';

// export interface Reservacion {
//   id?: string;
//   cliente: string;
//   telefono: number;
//   inflable: string;
//   fecha: string;
//   domicilio: string;
//   maps?: string;
//   pago: number;
// }

// @Component({
//   selector: 'app-reservaciones',
//   standalone: true,
//   imports: [FormsModule, NgFor, NgIf, HttpClientModule, DatePipe],
//   templateUrl: './reservaciones.component.html',
//   styleUrls: ['./reservaciones.component.css']
// })
// export class ReservacionesComponent implements OnInit {
//   inflables: any[] = [];
//   reservaciones: Reservacion[] = [];

//   nueva: Reservacion = {
//     cliente: '',
//     telefono:5555555555,
//     inflable: '',
//     fecha: '',
//     domicilio: '',
//     maps: '',
//     pago: 0
//   };

//   editarId: string | null = null;

//   constructor(
//     private inflablesService: InflablesService,
//     private reservacionesServices: ReservacionesService
//   ) {}

//   async ngOnInit(): Promise<void> {
//     this.inflablesService.getInflables().subscribe(data => {
//       this.inflables = data;
//     });
//     await this.cargarReservaciones();
//   }

//   async cargarReservaciones(): Promise<void> {
//     try {
//       this.reservaciones = await this.reservacionesServices.obtenerReservaciones();
//     } catch (error) {
//       console.error('Error al cargar reservaciones', error);
//       Swal.fire('Error', 'No se pudieron cargar las reservaciones', 'error');
//     }
//   }

//   hayConflicto(): boolean {
//     return this.reservaciones.some(r =>
//       r.inflable === this.nueva.inflable &&
//       r.fecha === this.nueva.fecha &&
//       this.editarId === null
//     );
//   }

//   async agregar(): Promise<void> {
//     if (this.hayConflicto()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Reservación duplicada",
//         text: `⚠️ Ya hay una reservación para el inflable "${this.nueva.inflable}" en la fecha ${this.nueva.fecha}`,
//       });
//       return;
//     }

//     if (this.nueva.cliente && this.nueva.inflable && this.nueva.fecha) {
//       try {
//         await this.reservacionesServices.agregarfecha(this.nueva);
//         await this.reservacionesServices.guardarReservacion({ ...this.nueva });
//         await this.cargarReservaciones();

//         this.nueva = {
//           cliente: '',
//           telefono:5555555555,
//           inflable: '',
//           fecha: '',
//           domicilio: '',
//           maps: '',
//           pago: 0
//         };

//         Swal.fire({
//           icon: "success",
//           title: "¡Reservación agregada!",
//           text: "La reservación fue guardada correctamente.",
//           timer: 1500,
//           showConfirmButton: false
//         });
//       } catch (error) {
//         console.error("Error al agregar reservación:", error);
//         Swal.fire("Error", "No se pudo guardar la reservación", "error");
//       }
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Campos incompletos",
//         text: "Por favor, completa todos los campos antes de guardar.",
//       });
//     }
//   };

//   editar(reservacion: Reservacion) {
//     this.nueva = { ...reservacion };
//     this.editarId = reservacion.id ?? null;
//   }

//   async eliminar(id: string): Promise<void> {
//     try {
//       await this.reservacionesServices.eliminarReservacion(id);
//       await this.cargarReservaciones();

//       Swal.fire({
//         icon: "success",
//         title: "¡Reservación eliminada!",
//         text: "La reservación se eliminó correctamente.",
//         timer: 1500,
//         showConfirmButton: false
//       });
//     } catch (error) {
//       console.error("Error al eliminar reservación:", error);
//       Swal.fire("Error", "No se pudo eliminar la reservación", "error");
//     }
//   }

//   async actualizar(): Promise<void> {
//     if (!this.editarId) return;

//     if (this.nueva.cliente && this.nueva.inflable && this.nueva.fecha) {
//       try {
//         await this.reservacionesServices.actualizarReservacion(this.editarId, this.nueva);
//         await this.cargarReservaciones();

//         this.nueva = {
//           cliente: '',
//           telefono:5555555555,
//           inflable: '',
//           fecha: '',
//           domicilio: '',
//           maps: '',
//           pago: 0
//         };
//         this.editarId = null;

//         Swal.fire({
//           icon: "success",
//           title: "¡Reservación actualizada!",
//           text: "La reservación se ha actualizado correctamente.",
//           timer: 1500,
//           showConfirmButton: false
//         });
//       } catch (error) {
//         console.error("Error al actualizar reservación:", error);
//         Swal.fire("Error", "No se pudo actualizar la reservación", "error");
//       }
//     }
//   }

//   get reservacionesOrdenadas() {
//     return this.reservaciones.slice().sort((a, b) =>
//       new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
//     );
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { NgFor, NgIf } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { InflablesService } from '../service/Inflables.service';
// import { DatePipe } from '@angular/common';
// import { ReservacionesService } from './reservaciones.service';
// import Swal from 'sweetalert2';

// export interface Reservacion {
//   id?: string;
//   cliente: string;
//   telefono: number;
//   inflable: string;
//   fecha: string;
//   domicilio: string;
//   maps?: string;
//   pago: number;
// }

// @Component({
//   selector: 'app-reservaciones',
//   standalone: true,
//   imports: [FormsModule, NgFor, NgIf, HttpClientModule, DatePipe],
//   templateUrl: './reservaciones.component.html',
//   styleUrls: ['./reservaciones.component.css']
// })
// export class ReservacionesComponent implements OnInit {
//   inflables: any[] = [];
//   reservaciones: Reservacion[] = [];

//   nueva: Reservacion = {
//     cliente: '',
//     telefono:5555555555,
//     inflable: '',
//     fecha: '',
//     domicilio: '',
//     maps: '',
//     pago: 0
//   };

//   editarId: string | null = null;

//   constructor(
//     private inflablesService: InflablesService,
//     private reservacionesServices: ReservacionesService
//   ) {}

//   async ngOnInit(): Promise<void> {
//     this.inflablesService.getInflables().subscribe(data => {
//       this.inflables = data;
//     });
//     await this.cargarReservaciones();
//   }

//   async cargarReservaciones(): Promise<void> {
//     try {
//       this.reservaciones = await this.reservacionesServices.obtenerReservaciones();
//     } catch (error) {
//       console.error('Error al cargar reservaciones', error);
//       Swal.fire('Error', 'No se pudieron cargar las reservaciones', 'error');
//     }
//   }

//   hayConflicto(): boolean {
//     return this.reservaciones.some(r =>
//       r.inflable === this.nueva.inflable &&
//       r.fecha === this.nueva.fecha &&
//       this.editarId === null
//     );
//   }

//   async agregar(): Promise<void> {
//     if (this.hayConflicto()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Reservación duplicada",
//         text: `⚠️ Ya hay una reservación para el inflable "${this.nueva.inflable}" en la fecha ${this.nueva.fecha}`,
//       });
//       return;
//     }

//     if (this.nueva.cliente && this.nueva.inflable && this.nueva.fecha) {
//       try {
//         await this.reservacionesServices.guardarReservacion({ ...this.nueva });
//         await this.cargarReservaciones();

//         this.nueva = {
//           cliente: '',
//           telefono:5555555555,
//           inflable: '',
//           fecha: '',
//           domicilio: '',
//           maps: '',
//           pago: 0
//         };

//         Swal.fire({
//           icon: "success",
//           title: "¡Reservación agregada!",
//           text: "La reservación fue guardada correctamente.",
//           timer: 1500,
//           showConfirmButton: false
//         });
//       } catch (error) {
//         console.error("Error al agregar reservación:", error);
//         Swal.fire("Error", "No se pudo guardar la reservación", "error");
//       }
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Campos incompletos",
//         text: "Por favor, completa todos los campos antes de guardar.",
//       });
//     }
//   };

//   editar(reservacion: Reservacion) {
//     this.nueva = { ...reservacion };
//     this.editarId = reservacion.id ?? null;
//   }

//   async eliminar(id: string): Promise<void> {
//     try {
//       await this.reservacionesServices.eliminarReservacion(id);
//       await this.cargarReservaciones();

//       Swal.fire({
//         icon: "success",
//         title: "¡Reservación eliminada!",
//         text: "La reservación se eliminó correctamente.",
//         timer: 1500,
//         showConfirmButton: false
//       });
//     } catch (error) {
//       console.error("Error al eliminar reservación:", error);
//       Swal.fire("Error", "No se pudo eliminar la reservación", "error");
//     }
//   }

//   async actualizar(): Promise<void> {
//     if (!this.editarId) return;

//     if (this.nueva.cliente && this.nueva.inflable && this.nueva.fecha) {
//       try {
//         await this.reservacionesServices.actualizarReservacion(this.editarId, this.nueva);
//         await this.cargarReservaciones();

//         this.nueva = {
//           cliente: '',
//           telefono:5555555555,
//           inflable: '',
//           fecha: '',
//           domicilio: '',
//           maps: '',
//           pago: 0
//         };
//         this.editarId = null;

//         Swal.fire({
//           icon: "success",
//           title: "¡Reservación actualizada!",
//           text: "La reservación se ha actualizado correctamente.",
//           timer: 1500,
//           showConfirmButton: false
//         });
//       } catch (error) {
//         console.error("Error al actualizar reservación:", error);
//         Swal.fire("Error", "No se pudo actualizar la reservación", "error");
//       }
//     }
//   }

//   get reservacionesOrdenadas() {
//     return this.reservaciones.slice().sort((a, b) =>
//       new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
//     );
//   }
// }
// export interface Reservacion {
//   id?: string;
//   cliente: string;
//   telefono: number;
//   inflable: string;
//   fecha: string;
//   domicilio: string;
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // <-- IMPORTANTE
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InflablesService } from '../service/Inflables.service';
import { DatePipe } from '@angular/common';
import { ReservacionesService } from './reservaciones.service';
import { LOGO_BASE64 } from './logo';
import pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';



import Swal from 'sweetalert2';

export interface Reservacion {
  id?: string;
  numerocontrato:string;
  cliente: string;
  telefono: string;
  inflable: string;
  fecha: string;
  domicilio: string;
  maps?: string;
  pago: string;
}

@Component({
  selector: 'app-reservaciones',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, HttpClientModule, DatePipe],
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit {
  inflables: any[] = [];
  reservaciones: Reservacion[] = [];

  nueva: Reservacion = {
    numerocontrato:'',
    cliente: '',
    telefono: '',
    inflable: '',
    fecha: '',
    domicilio: '',
    maps: '',
    pago: ''
  };

  editarId: string | null = null;

  constructor(
    private inflablesService: InflablesService,
    private reservacionesServices: ReservacionesService,
    private route: ActivatedRoute 
  ) {}

  async ngOnInit(): Promise<void> {

    this.inflablesService.getInflables().subscribe(data => {
      this.inflables = data;


      const inflableParam = this.route.snapshot.queryParamMap.get('inflable');
      if (inflableParam) {
        this.nueva.inflable = inflableParam;
      }
    });

    await this.cargarReservaciones();
  }

  async cargarReservaciones(): Promise<void> {
    try {
      this.reservaciones = await this.reservacionesServices.obtenerReservaciones();
    } catch (error) {
      console.error('Error al cargar reservaciones', error);
      Swal.fire('Error', 'No se pudieron cargar las reservaciones', 'error');
    }
  }

  hayConflicto(): boolean {
    return this.reservaciones.some(r =>
      r.inflable === this.nueva.inflable &&
      r.fecha === this.nueva.fecha &&
      this.editarId === null
    );
  }

  async agregar(): Promise<void> {
    if (this.hayConflicto()) {
      Swal.fire({
        icon: "warning",
        title: "Reservación duplicada",
        text: `⚠️ Ya hay una reservación para el inflable "${this.nueva.inflable}" en la fecha ${this.nueva.fecha}`,
      });
      return;
    }

    if (this.nueva.cliente && this.nueva.inflable && this.nueva.fecha) {
      try {
        await this.reservacionesServices.guardarReservacion({ ...this.nueva });
        await this.cargarReservaciones();

        this.nueva = {
          numerocontrato:'',
          cliente: '',
          telefono:'',
          inflable: '',
          fecha: '',
          domicilio: '',
          maps: '',
          pago: ''
        };

        Swal.fire({
          icon: "success",
          title: "¡Reservación agregada!",
          text: "La reservación fue guardada correctamente.",
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error("Error al agregar reservación:", error);
        Swal.fire("Error", "No se pudo guardar la reservación", "error");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de guardar.",
      });
    }
  };

  editar(reservacion: Reservacion) {
    this.nueva = { ...reservacion };
    this.editarId = reservacion.id ?? null;
  }

  async eliminar(id: string): Promise<void> {
    try {
      await this.reservacionesServices.eliminarReservacion(id);
      await this.cargarReservaciones();

      Swal.fire({
        icon: "success",
        title: "¡Reservación eliminada!",
        text: "La reservación se eliminó correctamente.",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error al eliminar reservación:", error);
      Swal.fire("Error", "No se pudo eliminar la reservación", "error");
    }
  }

  async actualizar(): Promise<void> {
    if (!this.editarId) return;

    if (this.nueva.cliente && this.nueva.inflable && this.nueva.fecha) {
      try {
        await this.reservacionesServices.actualizarReservacion(this.editarId, this.nueva);
        await this.cargarReservaciones();

        this.nueva = {
          numerocontrato:'',
          cliente: '',
          telefono:'',
          inflable: '',
          fecha: '',
          domicilio: '',
          maps: '',
          pago: ''
        };
        this.editarId = null;

        Swal.fire({
          icon: "success",
          title: "¡Reservación actualizada!",
          text: "La reservación se ha actualizado correctamente.",
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error("Error al actualizar reservación:", error);
        Swal.fire("Error", "No se pudo actualizar la reservación", "error");
      }
    }
  }

  get reservacionesOrdenadas() {
    return this.reservaciones.slice().sort((a, b) =>
      new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );
  }
  generarContrato(reservacion: Reservacion) {



    const docDefinition: any = {
      content: [
        {
          columns: [
            { image: 'logo', width: 80 },
            [
              { text: 'INFLABLES CHIKIPARTY', bold: true, fontSize: 14, alignment: 'right' },
              { text: 'COMPROMETIDOS CON TU DIVERSIÓN', fontSize: 10, alignment: 'right' },
              { text: 'www.chikiparty.com', fontSize: 10, alignment: 'right' },
              { text: 'TEL. 55 3518 1238', fontSize: 10, alignment: 'right' }
            ]
          ]
        },
        { text: '\nCONTRATO DE RENTA DE INFLABLES', style: 'header' },
        { text: `CONTRATO No.: ${reservacion.numerocontrato}   Fecha: ${reservacion.fecha}`, margin: [0, 5, 0, 10] },

        { text: `El (la) contratante ${reservacion.cliente} contrata el servicio de renta del juego(s): ${reservacion.inflable} con sus accesorios para el dia ${reservacion.fecha}, en el lugar ubicado en ${reservacion.domicilio},telefono ${reservacion.telefono}.`, margin: [0, 0, 0, 5] },
        { text: `El juego estara en renta desde las 13:00 horas del dia ${reservacion.fecha} hasta el siguiente dia a las 10:00 hrs. Con un precio de: $${reservacion.pago}`, margin: [0, 0, 0, 10] },

        { text: 'Cláusulas del Contrato:', style: 'subheader' },
        {
          ol: [
            'La renta es por el horario y la fecha especificados.',
            'El precio convenido se pagará el 100% cuando se deje instalado y funcionando el juego.',
            'El prestador del servicio CHIKIPARTY NO se responsabiliza por eventuales daños que se puedan ocasionar en el juego y/o sus accesorios, ni de lesiones en las personas por el mal uso, falta de precaución y/o no acatar las restricciones del juego mencionadas en las cláusulas 4 y 5 del presente contrato.',
            'No deberá de excederse el límite de edad y/o peso de las personas que hagan uso del juego que es de, 3 hasta 12 años, así como la cantidad de personas que simultáneamente usen el juego que es de 15 personas.',
            'No se deberá de hacer uso del juego con ningún tipo de calzado, juguete, alimento, bebida, anteojos, lentes, animal, espuma, líquido, serpentina, instrumento punzocortante y cualquier otro objeto que ponga en riesgo la integridad física de las personas y el buen funcionamiento y/o durabilidad del juego y sus accesorios. Así mismo, no se debe fumar en el juego ni en las inmediaciones del mismo.',
            'Todo daño al juego y/o sus accesorios y componentes o la falta de algún material de los mismos que se haya entregado conforme al presente contrato será pagado en su totalidad por el contratante.',
            'El prestador del servicio CHIKIPARTY se reserva el derecho de no rentar el juego si considera que la superficie y/o (en su caso) la corriente eléctrica pone en riesgo el buen funcionamiento y/o durabilidad del juego. Lo mismo aplicará en caso de presentarse condiciones climáticas adversas cuando se trate de un evento al aire libre.',
            'Esta empresa ni los encargados de recoger el inflable, se hacen responsables por objetos o valores olvidados o perdidos en el inflable.',
            'Es responsabilidad de la persona que está contratando el inflable, tomar todas las medidas posibles y necesarias para evitar lesiones en los niños y daños en el inflable.'
          ],
        },
                { text: '\n    ____________________________                           ______________________________', margin: [0, 20, 0, 0] },
                { text: '\n       INFLABLES CHIKIPARTY                                NOMBRE Y FIRMA DEL CONTRATANTE', margin: [0, 0, 0, 0] }
      ],
      images: {
        logo: LOGO_BASE64
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        }
      }
    };

    pdfMake.createPdf(docDefinition).download(`Contrato-${reservacion.cliente}.pdf`);
  }
}
export interface Reservacion {
  numerocontrato:string;
  id?: string;
  cliente: string;
  telefono: string;
  inflable: string;
  fecha: string;
  domicilio: string;
}
