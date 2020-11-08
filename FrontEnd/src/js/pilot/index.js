import angular from 'angular';

// Create the module where our functionality can attach to
let PilotModule = angular.module('app.pilot', []);
let PilotDetailsModule = angular.module('app.pilotDetails', []);

// Include our UI-Router config settings
import PilotConfig from './pilot.config';
PilotModule.config(PilotConfig);

// Controllers
import PilotCtrl from './pilot.controller';
PilotModule.controller('PilotCtrl', PilotCtrl);

import PilotDetailsCtrl from '../components/pilot-helpers/pilot.detail.component';
PilotDetailsModule.controller('PilotDetailsCtrl', PilotDetailsCtrl);

export default PilotModule;
