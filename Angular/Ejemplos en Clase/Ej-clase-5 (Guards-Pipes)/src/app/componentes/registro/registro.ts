import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Iform } from '../../models/IForm';

@Component({
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro implements Iform {

  protected form!: FormGroup;
  guardado = false;

  noGuardado(): boolean {
    return this.guardado === false;
  }

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  protected onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
      this.guardado = true;
    }
  }
}
