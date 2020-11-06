import angular from 'angular';

// Create the module where our functionality can attach to
let PilotModule = angular.module('app.pilot', []);

// Include our UI-Router config settings
import PilotConfig from './pilot.config';
PilotModule.config(PilotConfig);

// Controllers
import PilotCtrl from './pilot.controller';
PilotModule.controller('PilotCtrl', PilotCtrl);

export default PilotModule;
