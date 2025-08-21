// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router'; // <-- IMPORTANTE
// import { FormsModule } from '@angular/forms';
// import { NgFor, NgIf } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { InflablesService } from '../service/Inflables.service';
// import { DatePipe } from '@angular/common';
// import { ReservacionesService } from './reservaciones.service';
// import { LOGO_BASE64 } from './logo';
// import pdfMake from 'pdfmake/build/pdfmake';
// import 'pdfmake/build/vfs_fonts';



// import Swal from 'sweetalert2';

// export interface Reservacion {
//   id?: string;
//   numerocontrato:string;
//   cliente: string;
//   telefono: string;
//   inflable: string;
//   fecha: string;
//   domicilio: string;
//   maps?: string;
//   pago: string;
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
//     numerocontrato:'',
//     cliente: '',
//     telefono: '',
//     inflable: '',
//     fecha: '',
//     domicilio: '',
//     maps: '',
//     pago: ''
//   };
//   filtroFecha: string = '';
// filtradasPorFecha() {
//   if (!this.filtroFecha) {
//     return this.reservacionesOrdenadas;
//   }

//   return this.reservacionesOrdenadas.filter(r => {
//     if (!r.fecha) return false;

//     let fechaReservacion: Date;

//     if ((r.fecha as any).seconds) {
//       fechaReservacion = new Date((r.fecha as any).seconds * 1000);
//     } else if (/^\d{4}-\d{2}-\d{2}$/.test(r.fecha)) {
//       fechaReservacion = new Date(r.fecha + 'T00:00:00'); 
//     } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(r.fecha)) {
//       const [dd, mm, yyyy] = r.fecha.split('/');
//       fechaReservacion = new Date(+yyyy, +mm - 1, +dd);
//     } else {
//       fechaReservacion = new Date(r.fecha);
//     }

//     const yyyy = fechaReservacion.getFullYear();
//     const mm = String(fechaReservacion.getMonth() + 1).padStart(2, '0');
//     const dd = String(fechaReservacion.getDate()).padStart(2, '0');
//     const fechaFormateada = `${yyyy}-${mm}-${dd}`;

//     return fechaFormateada === this.filtroFecha;
//   });
// }

// limpiarFiltro() {
//   this.filtroFecha = ''; // borra la fecha
// }


//   editarId: string | null = null;

//   constructor(
//     private inflablesService: InflablesService,
//     private reservacionesServices: ReservacionesService,
//     private route: ActivatedRoute 
//   ) {}

//   async ngOnInit(): Promise<void> {

//     this.inflablesService.getInflables().subscribe(data => {
//       this.inflables = data;


//       const inflableParam = this.route.snapshot.queryParamMap.get('inflable');
//       if (inflableParam) {
//         this.nueva.inflable = inflableParam;
//       }
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
//           numerocontrato:'',
//           cliente: '',
//           telefono:'',
//           inflable: '',
//           fecha: '',
//           domicilio: '',
//           maps: '',
//           pago: ''
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

//  async eliminar(id: string): Promise<void> {
//   Swal.fire({
//     title: "¿Está seguro?",
//     text: "No podrás revertir esto!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Sí, eliminar!",
//     cancelButtonText: "Cancelar"
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       try {
//         await this.reservacionesServices.eliminarReservacion(id);
//         await this.cargarReservaciones();

//         Swal.fire({
//           title: "Eliminado!",
//           text: "Su reservación ha sido eliminada.",
//           icon: "success"
//         });
//       } catch (error) {
//         console.error("Error al eliminar reservación:", error);
//         Swal.fire("Error", "No se pudo eliminar la reservación", "error");
//       }
//     } else if (result.dismiss === Swal.DismissReason.cancel) {
//       Swal.fire({
//         title: "Cancelado",
//         text: "La reservación no se eliminó.",
//         icon: "error"
//       });
//     }
//   });
// }

//   async actualizar(): Promise<void> {
//     if (!this.editarId) return;

//     if (this.nueva.cliente && this.nueva.inflable && this.nueva.fecha) {
//       try {
//         await this.reservacionesServices.actualizarReservacion(this.editarId, this.nueva);
//         await this.cargarReservaciones();

//         this.nueva = {
//           numerocontrato:'',
//           cliente: '',
//           telefono:'',
//           inflable: '',
//           fecha: '',
//           domicilio: '',
//           maps: '',
//           pago: ''
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
//   generarContrato(reservacion: Reservacion) {
//   const docDefinition: any = {
//     content: [
//       {
//         columns: [
//           { 
//             image: 'logo', 
//             width: 120, 
//             alignment: 'left',       
//           },
//           [
//             { text: 'INFLABLES CHIKIPARTY', bold: true, fontSize: 12, alignment: 'right' },
//             { text: 'COMPROMETIDOS CON TU DIVERSIÓN', fontSize: 9, alignment: 'right' },
//             { text: 'www.chikiparty.com', fontSize: 9, alignment: 'right', color: 'blue' },
//             { text: 'TEL. 55 3518 1238', fontSize: 9, alignment: 'right' }
//           ]
//         ]
//     },
//    { text: '\nCONTRATO DE RENTA DE INFLABLES', style: 'header' },

// { 
//   text: [
//     'CONTRATO No: ', 
//     { text: `${reservacion.numerocontrato}`, bold: true, color: 'red' }, 
//     `   Fecha: ${reservacion.fecha}`
//   ], 
//   margin: [0, 5, 0, 10], 
//   fontSize: 9, 
//   alignment: 'justify' 
// },

// { 
//   text: [
//     'El (la) contratante ',{ text: `${reservacion.cliente}`, bold: true }, 
//     ' contrata el servicio de renta del(los) juego(s):\n', 
//     { text: `${reservacion.inflable}`, bold: true }, 
//     ' con sus accesorios para el día ', 
//     { text: `${reservacion.fecha}`, bold: true }, 
//     ', en el lugar ubicado en:', 
//     { text: `${reservacion.domicilio}`, bold: true }, 
//     ', Teléfono ', 
//     { text: `${reservacion.telefono}`, bold: true }, 
//     '.'
//   ], 
//   margin: [0, 0, 0, 5], 
//   fontSize: 9, 
//   alignment: 'justify' 
// },

// { 
//   text: [
//     'El juego estará en renta desde las 13:00 horas del día ', 
//     { text: `${reservacion.fecha}`, bold: true }, 
//     ' hasta el siguiente día a las 10:00 hrs., con un precio de: $', 
//     { text: `${reservacion.pago}`, bold: true }
//   ], 
//   margin: [0, 0, 0, 10], 
//   fontSize: 9, 
//   alignment: 'justify' 
// },
// { text: 'Cláusulas del Contrato:', style: 'subheader', fontSize: 10, alignment: 'justify', margin: [0, 5, 0, 10] },

//     {
      
//   ol: [
//     'La renta es por el horario y la fecha especificados.',
//     'El precio convenido se pagará al 100% cuando se deje instalado y funcionando el juego.',
//     {
//       text: [
//         'El prestador del servicio ',
//         { text: 'CHIKIPARTY', bold: true },
//         ' NO se responsabiliza por eventuales daños que se puedan ocasionar en el juego y/o sus accesorios, ni por lesiones a las personas por el mal uso, falta de precaución y/o no acatar las restricciones del juego mencionadas en las cláusulas 4 y 5 del presente contrato.'
//       ]
//     },
//     'No deberá excederse el límite de edad y/o peso de las personas que hagan uso del juego, que es de 3 a 12 años, así como la cantidad máxima de personas que lo utilicen simultáneamente, que es de 15.',
//     'No se deberá hacer uso del juego con ningún tipo de calzado, juguete, alimento, bebida, anteojos, lentes, animales, espuma, líquido, serpentina, instrumentos punzocortantes ni cualquier otro objeto que ponga en riesgo la integridad física de las personas y el buen funcionamiento y/o durabilidad del juego y sus accesorios. Asimismo, no se debe fumar en el juego ni en sus inmediaciones.',
//     'Todo daño al juego y/o sus accesorios y componentes, o la falta de algún material que se haya entregado conforme al presente contrato, será pagado en su totalidad por el contratante.',
//     {
//       text: [
//         'El prestador del servicio ',
//         { text: 'CHIKIPARTY', bold: true },
//         ' se reserva el derecho de no rentar el juego si considera que la superficie y/o la corriente eléctrica ponen en riesgo el buen funcionamiento y/o durabilidad del juego. Lo mismo aplicará en caso de presentarse condiciones climáticas adversas cuando se trate de un evento al aire libre.'
//       ]
//     },
//     'Esta empresa ni los encargados de recoger el inflable se hacen responsables por objetos o valores olvidados o perdidos en el inflable.',
//     'Es responsabilidad de la persona que contrata el inflable tomar todas las medidas posibles y necesarias para evitar lesiones en los niños y daños en el inflable.'
//   ],
//   fontSize: 10,
//   alignment: 'justify',
//   margin: [0, 0, 0, 10]
// },
  
//       { 
//   text: 'POLITICA DE PRIVACIDAD: La información que nos proporciones es almacenada en una base de datos segura, y en ningún momento daremos tus datos para mercadotecnia de otras empresas o cualquier otro fin sin tu consentimiento.',
//   fontSize: 10,
//   alignment: 'justify',
//   margin: [0, 0, 0, 10]
// },
// { 
//   text: 'Al firmar el presente contrato, se dan por aceptadas todas y cada una de las condiciones listadas en el presente contrato, así como la recepción por parte del contratante de que el inflable se recibió en óptimas condiciones.',
//   fontSize: 10,
//   alignment: 'justify',
//   margin: [0, 0, 0, 10]
// },
// { 
//   text: 'Habiendo leído y aceptado los términos y condiciones de renta, se firma el presente contrato.',
//   fontSize: 10,
//   alignment: 'justify',
//   margin: [0, 0, 0, 10]
// },
//     { 
//   text: '\n__________________________                          ________________________________', 
//   margin: [0, 15, 20, 0], 
//   alignment: 'center' 
// },
// { 
//   text: '\nINFLABLES CHIKIPARTY                                      NOMBRE Y FIRMA DEL CONTRATANTE',
//   fontSize:10, 
//   margin: [0, 0, 0, 0], 
//   alignment: 'center' 
// }
//   ],
//   images: {
//     logo: LOGO_BASE64
//   },
//   styles: {
//     header: {
//       fontSize: 18,
//       bold: true,
//       alignment: 'center',
//       margin: [0, 10, 0, 10]
//     },
//     subheader: {
//       fontSize: 14,
//       bold: true,
//       margin: [0, 10, 0, 5]
//     }
//   }
// };

// pdfMake.createPdf(docDefinition).download(`Contrato-${reservacion.cliente}.pdf`);
//   }
// }
// export interface Reservacion {
//   numerocontrato:string;
//   id?: string;
//   cliente: string;
//   telefono: string;
//   inflable: string;
//   fecha: string;
//   domicilio: string;
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InflablesService } from '../service/Inflables.service';
import { ReservacionesService } from './reservaciones.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LOGO_BASE64 } from './logo';
import pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';

export interface Reservacion {
  id?: string;
  numerocontrato: string;
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
    numerocontrato: '',
    cliente: '',
    telefono: '',
    inflable: '',
    fecha: '',
    domicilio: '',
    maps: '',
    pago: ''
  };
  filtroFecha: string = '';
  editarId: string | null = null;

  constructor(
    private inflablesService: InflablesService,
    private reservacionesServices: ReservacionesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inflablesService.getInflables().subscribe(data => {
      this.inflables = data;
      const inflableParam = this.route.snapshot.queryParamMap.get('inflable');
      if (inflableParam) this.nueva.inflable = inflableParam;
    });
    this.cargarReservaciones();
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
        icon: 'warning',
        title: 'Reservación duplicada',
        text: `⚠️ Ya hay una reservación para el inflable "${this.nueva.inflable}" en la fecha ${this.nueva.fecha}`,
      });
      return;
    }

    if (this.nueva.cliente && this.nueva.inflable && this.nueva.fecha) {
      try {
        await this.reservacionesServices.guardarReservacion({ ...this.nueva });
        await this.cargarReservaciones();
        this.nueva = { numerocontrato:'', cliente:'', telefono:'', inflable:'', fecha:'', domicilio:'', maps:'', pago:'' };
        Swal.fire({ icon: 'success', title: '¡Reservación agregada!', text: 'La reservación fue guardada correctamente.', timer: 1500, showConfirmButton: false });
      } catch (error) {
        console.error('Error al agregar reservación:', error);
        Swal.fire('Error', 'No se pudo guardar la reservación', 'error');
      }
    } else {
      Swal.fire({ icon: 'error', title: 'Campos incompletos', text: 'Por favor, completa todos los campos antes de guardar.' });
    }
  }

  editar(reservacion: Reservacion) {
    this.nueva = { ...reservacion };
    this.editarId = reservacion.id ?? null;
  }

  async eliminar(id: string): Promise<void> {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await this.reservacionesServices.eliminarReservacion(id);
        await this.cargarReservaciones();
        Swal.fire('Eliminado!', 'Su reservación ha sido eliminada.', 'success');
      } catch (error) {
        console.error('Error al eliminar reservación:', error);
        Swal.fire('Error', 'No se pudo eliminar la reservación', 'error');
      }
    }
  }

  async actualizar(): Promise<void> {
    if (!this.editarId) return;
    if (this.nueva.cliente && this.nueva.inflable && this.nueva.fecha) {
      try {
        await this.reservacionesServices.actualizarReservacion(this.editarId, this.nueva);
        await this.cargarReservaciones();
        this.nueva = { numerocontrato:'', cliente:'', telefono:'', inflable:'', fecha:'', domicilio:'', maps:'', pago:'' };
        this.editarId = null;
        Swal.fire({ icon: 'success', title: '¡Reservación actualizada!', text: 'La reservación se ha actualizado correctamente.', timer: 1500, showConfirmButton: false });
      } catch (error) {
        console.error('Error al actualizar reservación:', error);
        Swal.fire('Error', 'No se pudo actualizar la reservación', 'error');
      }
    }
  }

  get reservacionesOrdenadas() {
    return this.reservaciones.slice().sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }

  limpiarFiltro() {
    this.filtroFecha = '';
  }

  filtradasPorFecha() {
    if (!this.filtroFecha) return this.reservacionesOrdenadas;

    return this.reservacionesOrdenadas.filter(r => {
      if (!r.fecha) return false;
      const fechaReservacion = new Date(r.fecha + 'T00:00:00');
      const yyyy = fechaReservacion.getFullYear();
      const mm = String(fechaReservacion.getMonth() + 1).padStart(2, '0');
      const dd = String(fechaReservacion.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}` === this.filtroFecha;
    });
  }


  formatearFecha(fecha: string): string {
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const [anio, mes, dia] = fecha.split('-');
    return `${parseInt(dia)} de ${meses[parseInt(mes,10)-1]} del ${anio}`;
  }

 
  generarContrato(reservacion: Reservacion) {
    const fechaFormateada = this.formatearFecha(reservacion.fecha);

    const docDefinition: any = {
      content: [
        {
          columns: [
            { absolutePosition: { x: 10, y: 10 },image: 'logo', width: 100, alignment: 'left', margin: [0, 0, 0, 0] },
            [
              { text: 'INFLABLES CHIKIPARTY', bold: true, fontSize: 12, alignment: 'right' },
              { text: 'COMPROMETIDOS CON TU DIVERSIÓN', fontSize: 9, alignment: 'right' },
              { text: 'www.chikiparty.com', fontSize: 9, alignment: 'right', color: 'blue' },
              { text: 'TEL. 55 3518 1238', fontSize: 9, alignment: 'right' }
            ]
          ]
        },
        { text: '\nCONTRATO DE RENTA DE INFLABLES',fontSize: 11, alignment: 'center'},
        { text: [
            'CONTRATO No: ', { text: `${reservacion.numerocontrato}`, bold: true, color: 'red' },
            `   Fecha: ${fechaFormateada}`
          ], margin:[0,10,0,10], fontSize:9, alignment:'justify'
        },
        { text: [
            'El (la) contratante ', { text: `${reservacion.cliente}`, bold:true },
            ' contrata el servicio de renta del(los) juego(s):\n', { text:`${reservacion.inflable}`, bold:true },
            ' con sus accesorios para el día ', { text: fechaFormateada, bold:true },
            ', en el lugar ubicado en:', { text:`${reservacion.domicilio}`, bold:true },
            ', Teléfono ', { text:`${reservacion.telefono}`, bold:true },'.'
          ], margin:[0,10,0,5], fontSize:9, alignment:'justify'
        },
        { text: [
            'El juego estará en renta desde las 13:00 horas del día ', { text: fechaFormateada, bold:true },
            ' hasta el siguiente día a las 10:00 hrs., con un precio de: $', { text:`${reservacion.pago}`, bold:true }
          ], margin:[0,0,0,10], fontSize:9, alignment:'justify'
        },
        { text: 'Cláusulas del Contrato:', style: 'subheader', fontSize: 10, alignment: 'justify', margin: [0, 5, 0, 0] },

    {
      
  ol: [
    'La renta es por el horario y la fecha especificados.',
    'El precio convenido se pagará al 100% cuando se deje instalado y funcionando el juego.',
    {
      text: [
        'El prestador del servicio ',
        { text: 'CHIKIPARTY', bold: true },
        ' NO se responsabiliza por eventuales daños que se puedan ocasionar en el juego y/o sus accesorios, ni por lesiones a las personas por el mal uso, falta de precaución y/o no acatar las restricciones del juego mencionadas en las cláusulas 4 y 5 del presente contrato.'
      ]
    },
    'No deberá excederse el límite de edad y/o peso de las personas que hagan uso del juego, que es de 3 a 12 años, así como la cantidad máxima de personas que lo utilicen simultáneamente, que es de 15.',
    'No se deberá hacer uso del juego con ningún tipo de calzado, juguete, alimento, bebida, anteojos, lentes, animales, espuma, líquido, serpentina, instrumentos punzocortantes ni cualquier otro objeto que ponga en riesgo la integridad física de las personas y el buen funcionamiento y/o durabilidad del juego y sus accesorios. Asimismo, no se debe fumar en el juego ni en sus inmediaciones.',
    'Todo daño al juego y/o sus accesorios y componentes, o la falta de algún material que se haya entregado conforme al presente contrato, será pagado en su totalidad por el contratante.',
    {
      text: [
        'El prestador del servicio ',
        { text: 'CHIKIPARTY', bold: true },
        ' se reserva el derecho de no rentar el juego si considera que la superficie y/o la corriente eléctrica ponen en riesgo el buen funcionamiento y/o durabilidad del juego. Lo mismo aplicará en caso de presentarse condiciones climáticas adversas cuando se trate de un evento al aire libre.'
      ]
    },
    'Esta empresa ni los encargados de recoger el inflable se hacen responsables por objetos o valores olvidados o perdidos en el inflable.',
    'Es responsabilidad de la persona que contrata el inflable tomar todas las medidas posibles y necesarias para evitar lesiones en los niños y daños en el inflable.'
  ],
  fontSize: 10,
  alignment: 'justify',
  margin: [0, 0, 0, 10]
},
  
      { 
  text: 'POLITICA DE PRIVACIDAD: La información que nos proporciones es almacenada en una base de datos segura, y en ningún momento daremos tus datos para mercadotecnia de otras empresas o cualquier otro fin sin tu consentimiento.',
  fontSize: 10,
  alignment: 'justify',
  margin: [0, 0, 0, 10]
},
{ 
  text: 'Al firmar el presente contrato, se dan por aceptadas todas y cada una de las condiciones listadas en el presente contrato, así como la recepción por parte del contratante de que el inflable se recibió en óptimas condiciones.',
  fontSize: 10,
  alignment: 'justify',
  margin: [0, 0, 0, 10]
},
{ 
  text: 'Habiendo leído y aceptado los términos y condiciones de renta, se firma el presente contrato.',
  fontSize: 10,
  alignment: 'justify',
  margin: [0, 0, 0, 10]
},
    { 
  text: '\n__________________________                          ________________________________', 
  margin: [0, 15, 20, 0], 
  alignment: 'center' 
},
{ 
  text: '\nINFLABLES CHIKIPARTY                                      NOMBRE Y FIRMA DEL CONTRATANTE',
  fontSize:10, 
  margin: [0, 0, 0, 0], 
  alignment: 'center' 
}
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