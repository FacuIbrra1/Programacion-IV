import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaDos } from './pagina-dos';

describe('PaginaDos', () => {
  let component: PaginaDos;
  let fixture: ComponentFixture<PaginaDos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaDos],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaDos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
