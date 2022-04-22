import { Component, NgZone } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  height: number;
  currentHeight = 'No Data';
  stepcount = 'No Data';
  heartRate = 0;
  workouts = [];

  constructor(
    private healthKit: HealthKit,
    private platform: Platform,
    private zone: NgZone
  ) {
    platform.ready().then(() => {
      this.platform.resume.subscribe(async () => {
         this.test();
      });
    });
  }

   test() {
    this.healthKit.available().then((available) => {
      if (available) {
        const options: HealthKitOptions = {
          readTypes: [
            'HKQuantityTypeIdentifierHeight',
            'HKQuantityTypeIdentifierStepCount',
            'HKWorkoutTypeIdentifier',
            'HKQuantityTypeIdentifierActiveEnergyBurned',
            'HKQuantityTypeIdentifierDistanceCycling',
            'HKQuantityTypeIdentifierHeartRate',
          ],
        };
        this.healthKit.requestAuthorization(options).then((_) => {
          this.loadHealthData();
        });
      }
    });
  }

  getheartData() {
    const heartRateOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierHeartRate',
      unit: 'count/min',
    };

    this.healthKit.querySampleType(heartRateOptions).then(
      (data) => {
        this.zone.run(() => {
          console.log(data, "** data hearrt **")
          this.heartRate = data[0].quantity;
        });
      },
      (err) => {
        console.log('No heart: ', err);
      }
    );
  }

  loadHealthData = () => {
    const heartRateOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierHeartRate',
      unit: 'count/min',
    };

    this.healthKit.monitorSampleType(heartRateOptions).then(
      () => {
        this.getheartData();
      },
      (err) => {
        console.log('No steps: ', err);
      }
    );
    this.healthKit.readHeight({ unit: 'cm' }).then(
      (val) => {
        this.zone.run(() => {
          this.currentHeight = val.value;
        });
      },
      (err) => {
        console.log('No height: ', err);
      }
    );

    const stepOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierStepCount',
      unit: 'count',
    };
    console.log(stepOptions, "stepoptionss")
    this.healthKit.querySampleType(stepOptions).then(
      (data) => {
        this.zone.run(() => {
          console.log(data, "** data steps **")
          this.stepcount = data.reduce((a, b) => a + b.quantity, 0);
        });
      },
      (err) => {
        console.log('No steps: ', err);
      }
    );
  };
}
