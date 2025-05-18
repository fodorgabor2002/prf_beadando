import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAdminPanelComponent } from './track-admin-panel.component';

describe('TrackAdminPanelComponent', () => {
  let component: TrackAdminPanelComponent;
  let fixture: ComponentFixture<TrackAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackAdminPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
