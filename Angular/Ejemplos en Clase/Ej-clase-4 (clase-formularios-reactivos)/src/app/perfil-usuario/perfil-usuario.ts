import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

function validarDominioEmpresa(control: AbstractControl): ValidationErrors | null {
  const email = control.value as string;
  if (email && !email.endsWith('@empresa.com')) {
    return { dominioInvalido: true };
  }
  return null;
}

@Component({
  imports: [ReactiveFormsModule, JsonPipe],
  selector: 'app-perfil-usuario',
  styleUrl: './perfil-usuario.css',
  templateUrl: './perfil-usuario.html',
})

export class PerfilUsuario {
  
  // Formulario reactivo utilizando ForBuilder con validaciones personalizadas y dinámicas
  private fb = inject(FormBuilder);

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    habilidades: this.fb.array([this.fb.control('', Validators.required)], Validators.required)
  });

  get habilidades(): FormArray {
    return this.miFormulario.get('habilidades') as FormArray;
  }

  agregarHabilidad(): void {
    this.habilidades.push(this.fb.control('', Validators.required));
  }

  eliminarHabilidad(index: number): void {
    this.habilidades.removeAt(index);
  }

  esCampoInvalido(nombreCampo: string): boolean {
    const campo = this.miFormulario.get(nombreCampo);
    return !!(campo && campo.invalid && (campo.dirty || campo.touched));
  }
}