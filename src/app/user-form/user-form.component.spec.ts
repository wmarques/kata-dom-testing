import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserFormComponent} from './user-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatInputHarness} from '@angular/material/input/testing';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule],
      declarations: [ UserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should display invalid email when typing Cricri', async () => {
    // GIVEN
    const harness = await loader.getHarness(MatFormFieldHarness);
    const input = await harness.getControl(MatInputHarness);

    // WHEN
    await input.setValue('invalid');
    await input.blur();

    // THEN
    const errors = await harness.getTextErrors();
    expect(errors[0]).toBe('Not a valid email');
  });
});
