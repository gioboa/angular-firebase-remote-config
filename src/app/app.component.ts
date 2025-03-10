import { Component, inject } from '@angular/core';
import { RemoteConfigService } from './config.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular and Firebase Remote Config</h1>
    <span>Check the console to see the loaded config.</span>
  `,
})
export class AppComponent {
  private remoteConfig = inject(RemoteConfigService);

  async ngOnInit() {
    await this.remoteConfig.initializeConfig();
    const config = this.remoteConfig.getConfigValue('my_config_key_TZ');
    console.log('Config: ' + config.asString());
  }
}
