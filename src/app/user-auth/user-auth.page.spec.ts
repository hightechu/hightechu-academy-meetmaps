import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserAuthPage } from './user-auth.page';

describe('UserAuthPage', () => {
  let component: UserAuthPage;
  let fixture: ComponentFixture<UserAuthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
