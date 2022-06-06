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
  healthkitBPData :any=[];
  bloodPressureSystolic = 0;
  bloodPressureDiastolic = 0;
  bloodGlucose = 0;
  bmi = 0;
  bodyFat = 0;
  leanBodyMass = 0;
  weight = 'No Data';
  bodyTemperature = 'No data'
  respiratoryRate = 0;
  inhalerRate = 0;
  forcedExpiratoryRate = 0;
  PeakExpiratoryFlowRate = 0;

  constructor(
    private healthKit: HealthKit,
    private platform: Platform,
    private zone: NgZone
  ) {
    platform.ready().then(() => {
      this.platform.resume.subscribe(async () => {
        await this.test();
      });
    });
  }

  async test() {
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
            'HKQuantityTypeIdentifierBloodPressureSystolic',
            'HKQuantityTypeIdentifierBloodPressureDiastolic',
            'HKQuantityTypeIdentifierBloodGlucose',
            'HKQuantityTypeIdentifierBodyMassIndex',
            'HKQuantityTypeIdentifierBodyFatPercentage',
            'HKQuantityTypeIdentifierLeanBodyMass',
            'HKQuantityTypeIdentifierBodyTemperature',
            'HKQuantityTypeIdentifierRespiratoryRate',
            'HKQuantityTypeIdentifierInhalerUsage',
            'HKQuantityTypeIdentifierForcedExpiratoryVolume1',
            'HKQuantityTypeIdentifierPeakExpiratoryFlowRate'
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
          this.heartRate = data[0].quantity;
        });
      },
      (err) => {
        console.log('No steps: ', err);
      }
    );
  }

  loadHealthData = () => {
    // Heart Rate
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

    // Height
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

    // Steps
    const stepOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierStepCount',
      unit: 'count',
    };

    this.healthKit.querySampleType(stepOptions).then(
      (data) => {
        this.zone.run(() => {
          this.stepcount = data.reduce((a, b) => a + b.quantity, 0);
        });
      },
      (err) => {
        console.log('No steps: ', err);
      }
    );

    // Blood Pressure
    const bloodPressureOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 
      endDate: new Date(),
      correlationType: 'HKCorrelationTypeIdentifierBloodPressure',
      unit: 'mmHg'
    }
    this.healthKit.queryCorrelationType(bloodPressureOptions
    ).then( data => {
      this.zone.run(() => {
       this.healthkitBPData = data[0];


        // if (data[0].samples[0].sampleType == "HKQuantityTypeIdentifierBloodPressureSystolic"){
        //  // console.log(data.samples[0].value, "** HKQuantityTypeIdentifierBloodPressureSystolic")
        //   this.BloodPressureSystolic =data[0].samples[0].value
        // }

        // if (data[0].samples[0].sampleType == "HKQuantityTypeIdentifierBloodPressureDiastolic"){
        //   //console.log(data.samples[0].value, "** HKQuantityTypeIdentifierBloodPressureDiastolic")
        //   this.BloodPressureDiastolic = data[0].samples[0].value
        // }


        this.healthkitBPData.samples.map(bpdata => {
          console.log(bpdata)
          if (bpdata.sampleType === "HKQuantityTypeIdentifierBloodPressureSystolic") {
            this.bloodPressureSystolic = bpdata.value
          } else if (bpdata.sampleType === "HKQuantityTypeIdentifierBloodPressureDiastolic") {
            this.bloodPressureDiastolic = bpdata.value
          }
      });
       
      });
    }, err => {
      console.log('error getting blood pressure: ', err);
    });

    // Blood Glucose
    const bloodGlucoseOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierBloodGlucose',
      unit: 'mg/dL'
    }

    this.healthKit.querySampleType(bloodGlucoseOptions 
      ).then(
      (data) => {
        console.log(data, "glucose")
        this.zone.run(() => {
         this.bloodGlucose = data[0].quantity
        });
      },
      (err) => {
        console.log('No blood glucose: ', err);
      }
    );   
    
    // Body Mass Index
    const bodyMassOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierBodyMassIndex',
      unit: 'count'
    }

    this.healthKit.querySampleType(bodyMassOptions 
      ).then(
      (data) => {
        console.log(data, "bmi")
        this.zone.run(() => {
         this.bmi = data[0].quantity
        });
      },
      (err) => {
        console.log('No bMI: ', err);
      }
    );   

    // Body fat percentage
     const bodyFatOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierBodyFatPercentage',
      unit: 'count'
    }

    this.healthKit.querySampleType(bodyFatOptions 
      ).then(
      (data) => {
        console.log(data, "body fat")
        this.zone.run(() => {
         this.bodyFat = data[0].quantity * 100
        });
      },
      (err) => {
        console.log('No BFP: ', err);
      }
    );   

    // Lean Body Mass
    const leanBodyMassOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierLeanBodyMass',
      unit: 'lb'
    }

    this.healthKit.querySampleType(leanBodyMassOptions 
      ).then(
      (data) => {
        console.log(data, "lean body mass")
        this.zone.run(() => {
         this.leanBodyMass = data[0].quantity 
        });
      },
      (err) => {
        console.log('No HKQuantityTypeIdentifierLeanBodyMass: ', err);
      }
    );   

    // Weight
     const weightOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierBodyMass',
      unit: 'lb',
    };

    this.healthKit.querySampleType(weightOptions).then(
      (data) => {
        console.log(data, "body weight")
        this.zone.run(() => {
          this.weight = data[0].quantity
        });
      },
      (err) => {
        console.log('No Weight: ', err);
      }
    );

    // body temperature
    const bodyTempOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierBodyTemperature',
      unit: 'degF',
    };

    this.healthKit.querySampleType(bodyTempOptions).then(
      (data) => {
        console.log(data, "body temp")
        this.zone.run(() => {
          this.bodyTemperature = data[0].quantity
        });
      },
      (err) => {
        console.log('No body temp: ', err);
      }
    );

    // Respiratory Rate
    const respiratoryRateOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierRespiratoryRate',
      unit: 'count/min',
    };

    this.healthKit.querySampleType(respiratoryRateOptions).then(
      (data) => {
        console.log(data, "respiratory rate")
        this.zone.run(() => {
          this.respiratoryRate = data[0].quantity
        });
      },
      (err) => {
        console.log('No respiratory rate: ', err);
      }
    );

    // Inhaler usage
    const inhalerUsageOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierInhalerUsage',
      unit: 'count',
    };

    this.healthKit.querySampleType(inhalerUsageOptions).then(
      (data) => {
        console.log(data, "inhaler usage data")
        this.zone.run(() => {
          this.inhalerRate = data[0].quantity
        });
      },
      (err) => {
        console.log('No inhaler rate: ', err);
      }
    );

    // Forced Expiratory vol 1
    

    // Peak Expiratory rate



  };
}
