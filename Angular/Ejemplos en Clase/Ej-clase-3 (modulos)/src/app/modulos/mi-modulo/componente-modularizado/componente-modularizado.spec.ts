import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponenteModularizado } from './componente-modularizado';

describe('ComponenteModularizado', () => {
  let component: ComponenteModularizado;
  let fixture: ComponentFixture<ComponenteModularizado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteModularizado],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteModularizado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
