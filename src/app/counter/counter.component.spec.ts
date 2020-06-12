import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CounterComponent} from './counter.component';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {By} from '@angular/platform-browser';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should increment', async () => {
    // GIVEN
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    // WHEN
    await buttons[1].click();

    // THEN
    await expect(getCount()).toBe('1');
  });

  it('should decrement', async () => {
    // GIVEN
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    // WHEN
    await buttons[0].click();

    // THEN
    await expect(fixture.debugElement.query(By.css('[data-testid="count"]')).nativeElement.innerHTML).toBe('-1');
  });


  function getCount() {
    return fixture.debugElement.query(By.css('[data-testid="count"]')).nativeElement.innerHTML;
  }
});
