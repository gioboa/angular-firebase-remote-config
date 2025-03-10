import { Injectable } from '@angular/core';
import {
  RemoteConfig,
  getRemoteConfig,
  fetchAndActivate,
  getValue,
} from 'firebase/remote-config';
import { inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import defaultConfig from '../../firebase.json';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  private remoteConfig: RemoteConfig;
  private app: FirebaseApp = inject(FirebaseApp);

  constructor() {
    this.remoteConfig = getRemoteConfig(this.app);
    this.remoteConfig.defaultConfig = { ...defaultConfig };
    this.remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
  }

  async initializeConfig(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
      console.log('Remote config fetched and activated');
    } catch (error) {
      console.error('Error fetching remote config:', error);
    }
  }

  getConfigValue(key: string) {
    return getValue(this.remoteConfig, key);
  }
}
