import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuariosService } from './usuarios.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { User,UserForm } from '../../../../core/models';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  usuarioForm: FormGroup;
  idActual: string = '';
  isLoading = false;
  usuarios : User[] = [];
  usuariosSubscription: Subscription | null = null; // Subscription to manage the observable
  authUser$: Observable<User | null>;
  
  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private authService: AuthService){
    this.authUser$ = this.authService.authUser$;
    this.loadUsuariosObservable();
    this.usuarioForm = this.fb.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', [Validators.required]],
      token: [''],
    })
  }

  loadUsuariosObservable() {
    this.isLoading = true;
    this.usuariosSubscription = this.usuariosService
      .get$()
      .subscribe({
        next: (datos) => {
          this.usuarios = datos;
        },
        error: (error) => console.error(error),
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  onSubmit(){
    if (this.usuarioForm.invalid) {
      alert('Complete todos los valores del formulario correctamente');
      return;
    }  
    if(this.idActual===''){
      const { id, ...newUser } = this.usuarioForm.value;
      newUser.token = crypto.randomUUID();
      this.usuariosService.create(newUser).subscribe({
        next: (response) => {
          this.usuarios = [...this.usuarios, response];
        },
        error: (error) => console.error(error),
        complete: () => {console.log('Usuario creado exitosamente')},
      });
    } else {
      //edita
      const user = this.usuarioForm.value;
      this.usuariosService.update(this.idActual,user).subscribe({
        next: (response) => {
          this.usuarios = response;
          console.log(this.usuarios);
        },
      });
    }

    this.idActual = '';
    this.usuarioForm.reset();
  }

  onDeleteUsuario(id:number | string){
    console.log('Se elimina usuario '+id)
    if(confirm('¿Está seguro de eliminar el usuario?')){
      this.usuariosService.delete(id.toLocaleString()).subscribe({
        next: (response) => {
          this.usuarios = response;
        },
      });
    }
  }

  onEditUsuario(user:User){
    this.idActual = user.id;
    console.log('Se edita el user '+user.id)
    this.usuarioForm.patchValue(user)
  }

}
