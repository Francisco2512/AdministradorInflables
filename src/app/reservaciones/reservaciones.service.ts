// import { inject, Injectable } from '@angular/core';
// import { Firestore, collection, addDoc, getDocs, deleteDoc, updateDoc, doc, CollectionReference} from '@angular/fire/firestore';
// import { Reservacion } from './reservaciones.component';

// @Injectable({ providedIn: 'root' })
// export class ReservacionesService {
//   private firestore = inject(Firestore);
//   private coleccion: CollectionReference;

//   constructor() {
//     this.coleccion = collection(this.firestore, 'Reservaciones');
//   }

//   async agregarfecha(data: any): Promise<{ data?: any; error?: any }> {
//     let response: any = {};
//     try {
//       const ref = collection(this.firestore, 'RegistroFechasInflables');
//       const consulta = await addDoc(ref, data);
//       if (consulta.id) {
//         response.data = { ...data, id: consulta.id };
//       }
//     } catch (error) {
//       response.error = error;
//     }
//     return response;
//   }

//   async guardarReservacion(reservaciones: Reservacion): Promise<Reservacion> {
//     const docRef = await addDoc(this.coleccion, reservaciones);
//     return { ...reservaciones, id: docRef.id };
//   }

//   async obtenerReservaciones(): Promise<Reservacion[]> {
//     const snapshot = await getDocs(this.coleccion);
//     return snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     })) as Reservacion[];
//   }

//   async eliminarReservacion(id: string): Promise<void> {
//     const ref = doc(this.firestore, `Reservaciones/${id}`);
//     await deleteDoc(ref);
//   }

//   async actualizarReservacion(id: string, reservacion: Reservacion): Promise<void> {
//     const ref = doc(this.firestore, `Reservaciones/${id}`);
//     await updateDoc(ref, { ...reservacion });
//   }
// }


import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, updateDoc, doc, CollectionReference} from '@angular/fire/firestore';
import { Reservacion } from './reservaciones.component';

@Injectable({ providedIn: 'root' })
export class ReservacionesService {
  private firestore = inject(Firestore);
  private coleccion: CollectionReference;

  constructor() {
    this.coleccion = collection(this.firestore, 'Reservaciones');
  }

  async agregarfecha(data: any): Promise<{ data?: any; error?: any }> {
    let response: any = {};
    try {
      const ref = collection(this.firestore, 'Reservaciones');
      const consulta = await addDoc(ref, data);
      if (consulta.id) {
        response.data = { ...data, id: consulta.id };
      }
    } catch (error) {
      response.error = error;
    }
    return response;
  }

  async guardarReservacion(reservaciones: Reservacion): Promise<Reservacion> {
    const docRef = await addDoc(this.coleccion, reservaciones);
    return { ...reservaciones, id: docRef.id };
  }

  async obtenerReservaciones(): Promise<Reservacion[]> {
    const snapshot = await getDocs(this.coleccion);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Reservacion[];
  }

  async eliminarReservacion(id: string): Promise<void> {
    const ref = doc(this.firestore, `Reservaciones/${id}`);
    await deleteDoc(ref);
  }

  async actualizarReservacion(id: string, reservacion: Reservacion): Promise<void> {
    const ref = doc(this.firestore, `Reservaciones/${id}`);
    await updateDoc(ref, { ...reservacion });
  }
}
