import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CounterComponent} from './counter.component';
import {By} from '@angular/platform-browser';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';

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
    const button = await loader.getHarness(MatButtonHarness.with({
      text: '+',
    }));

    // WHEN
    await button.click();

    // THEN
    expect(getCountValue()).toBe('1');
  });

  it('should decrement', () => {
    component.minus();
    expect(component.count).toBe(-1);
  });

  function getCountValue() {
    return fixture.debugElement.query(By.css('[data-testid="counter"]')).nativeElement.innerHTML;
  }
});
