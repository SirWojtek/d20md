import * as logrocket from 'logrocket';

import { environment } from '../../environments/environment';

export function initLogRocket() {
  if (!environment.disableLogRocket) {
    logrocket.init('prjatf/d20site');
  }
}

export function identifyUser(email: string) {
  if (!environment.disableLogRocket) {
    logrocket.identify(email);
  }
}
