import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosError } from './productos-error';

describe('ProductosError', () => {
  let component: ProductosError;
  let fixture: ComponentFixture<ProductosError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosError],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
