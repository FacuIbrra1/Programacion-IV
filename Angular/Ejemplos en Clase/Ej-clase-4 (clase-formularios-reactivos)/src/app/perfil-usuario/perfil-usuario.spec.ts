import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilUsuariomiComponente } from './perfil-usuariomi-componente';

describe('PerfilUsuariomiComponente', () => {
  let component: PerfilUsuariomiComponente;
  let fixture: ComponentFixture<PerfilUsuariomiComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilUsuariomiComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilUsuariomiComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
