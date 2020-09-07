import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailimageComponent } from './detailimage.component';

describe('DetailimageComponent', () => {
  let component: DetailimageComponent;
  let fixture: ComponentFixture<DetailimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
