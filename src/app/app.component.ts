import { Component, OnInit } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { BackgroundFetch, BackgroundFetchConfig } from '@awesome-cordova-plugins/background-fetch/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  height: number;
  currentHeight = 'No Data';
  stepcount = 'No Data';
  heartRate = 0;
  workouts = [];

  constructor(private healthKit: HealthKit,private openNativeSettings: OpenNativeSettings,private backgroundFetch: BackgroundFetch) {
    // document.addEventListener('deviceReady', this.onDeviceReady(), false);
  }
  ngOnInit(): void {
    // <key>NSHealthUpdateUsageDescription</key>
    // <string>Read heart rate monitor data.</string>
    // <key>NSHealthShareUsageDescription</key>
    // <string>Share workout data with other apps.</string>
   /*  const config: BackgroundFetchConfig = {
      stopOnTerminate: false, // Set true to cease background-fetch from operating after user "closes" the app. Defaults to true.
    }
  
    this.backgroundFetch.configure(config)
       .then(() => {
           console.log('Background Fetch initialized');
  
           this.test();
  
       })
       .catch(e => console.log('Error initializing background fetch', e));
  
    // Start the background-fetch API. Your callbackFn provided to #configure will be executed each time a background-fetch event occurs. NOTE the #configure method automatically calls #start. You do not have to call this method after you #configure the plugin
    this.backgroundFetch.start(); */
  

  
    this.test();
  }

  test():void {
    this.healthKit.available().then((available) => {
      console.log(available);
      if (available) {
        // Request all permissions up front if you like to
        var options: HealthKitOptions = {
          readTypes: [
            'HKQuantityTypeIdentifierHeight',
            'HKQuantityTypeIdentifierStepCount',
            'HKWorkoutTypeIdentifier',
            'HKQuantityTypeIdentifierActiveEnergyBurned',
            'HKQuantityTypeIdentifierDistanceCycling',
            'HKQuantityTypeIdentifierHeartRate'
          ]
        };
        this.healthKit.requestAuthorization(options).then((_) => {
          this.loadHealthData();
        });
      }
    });
  }

  getheartData(){
    var heartRateOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierHeartRate',
      unit: 'count/min',
    };

    this.healthKit.querySampleType(heartRateOptions).then(
      (data) => {
        console.log("heart rate data",data);
        
        this.heartRate = data[0].quantity;
      },
      (err) => {
        console.log('No steps: ', err);
      }
    );
  }

  loadHealthData() {
    var heartRateOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierHeartRate',
      unit: 'count/min',
    };

    this.healthKit.monitorSampleType(heartRateOptions).then(
      (data) => {
        if(this.openNativeSettings){
          
       this.openNativeSettings.open('settings');
        }
        console.log("heart rate data",data);
        this.getheartData();

      },
      (err) => {
        console.log('No steps: ', err);
      }
    );
    this.healthKit.readHeight({ unit: 'cm' }).then(
      (val) => {
        console.log(val);
        this.currentHeight = val.value;
      },
      (err) => {
        console.log('No height: ', err);
      }
    );
    
    
    var stepOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierStepCount',
      unit: 'count',
    };

     this.healthKit.querySampleType(stepOptions).then(
      (data) => {
        let stepSum = data.reduce((a, b) => a + b.quantity, 0);
        this.stepcount = stepSum;
      },
      (err) => {
        console.log('No steps: ', err);
      }
    );

   

    
  }


}
