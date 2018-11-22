import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipesComponent } from './new-recipes.component';

describe('NewRecipesComponent', () => {
  let component: NewRecipesComponent;
  let fixture: ComponentFixture<NewRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
