import { Component } from '@angular/core';
import { File } from 'ionic-native';

declare var cordova: any;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor() {

  }

  record(event) {
    (<any>window).plugins.audioRecorderAPI.record(function (savedFilePath) {
      var fileName = savedFilePath.split('/')[savedFilePath.split('/').length - 1];
      var directory;
      if (cordova.file.documentsDirectory) {
        directory = cordova.file.documentsDirectory; // for iOS
      } else {
        directory = cordova.file.externalDataDirectory; // for Android
      }
      File.copyFile(
        cordova.file.dataDirectory, fileName,
        directory, "new_file.m4a"
      )
        .then(function (success) {
          alert(JSON.stringify(success));
        }, function (error) {
          alert(JSON.stringify(error));
        });
    }, function (msg) {
      alert('ko: ' + msg);
    }, 5);
  }

  playback(event) {
    (<any>window).plugins.audioRecorderAPI.playback(function (msg) {
      // complete
      alert('ok: ' + msg);
    }, function (msg) {
      // failed
      alert('ko: ' + msg);
    });
  }
}
