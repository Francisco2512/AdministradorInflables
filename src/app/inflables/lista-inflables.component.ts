import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ModalInflableService } from '../service/modal-inflable-service';

interface Detail {
  label: string;
  value: string;
  icon: string;
}

interface Inflable {
  id: number;
  title: string;
  description: string;
  thumb: string;
  category: string;
  link: string;
  detail: Detail[];
  images: string[];
}

@Component({
  selector: 'app-lista-inflables',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './lista-inflables.component.html'
})

export class ListaInflablesComponent implements OnInit {
  private http = inject(HttpClient);
  inflables: Inflable[] = [];
  
constructor(private modalService: ModalInflableService) {}

abrirReservacion(inflable: string) {
  this.modalService.abrirModal(inflable);
}

  ngOnInit(): void {
    
    const url = 'https://us-central1-real-courses.cloudfunctions.net/getInflables';
    this.http.get<Inflable[]>(url).subscribe(
      data => {
        data = data.map(e=> {
          return {...e,description: e.description.slice (0,120)}
          
        })
        this.inflables = data;
      },
      
      err => {
        console.error('Error cargando inflables:', err);
      }
    );
  }
}
