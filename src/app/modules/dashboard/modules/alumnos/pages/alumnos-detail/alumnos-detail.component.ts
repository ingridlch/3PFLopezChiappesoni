import { Component } from '@angular/core';
import { Alumno } from '../../models';
import { InscripcionExpand } from './../../../../../../core/models';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlumnosService } from '../../alumnos.service';

@Component({
  selector: 'app-alumnos-detail',
  standalone: false,
  templateUrl: './alumnos-detail.component.html',
  styles: ``
})
export class AlumnosDetailComponent {
  alumno$: Observable<Alumno | null>;
  inscripciones$ : Observable<InscripcionExpand[]>;

  constructor(private activatedRoute: ActivatedRoute, private alumnoService: AlumnosService) {
    const id = this.activatedRoute.snapshot.params['id'];
    this.alumno$ = this.alumnoService.getById(id);
    this.inscripciones$ = this.alumnoService.getInscriptionsById(id);
  }

  eliminarCurso(id: string) {
    if(confirm('Desea eliminar la inscripción al curso?')){
      console.log('eliminando inscripcion '+id) 
    }
  }
}
