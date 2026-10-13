import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaModulo } from './pagina-modulo';

describe('PaginaModulo', () => {
  let component: PaginaModulo;
  let fixture: ComponentFixture<PaginaModulo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaModulo],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaModulo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
