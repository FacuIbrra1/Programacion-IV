import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaUno } from './pagina-uno';

describe('PaginaUno', () => {
  let component: PaginaUno;
  let fixture: ComponentFixture<PaginaUno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaUno],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaUno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
