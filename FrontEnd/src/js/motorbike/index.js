import angular from 'angular';

// Create the module where our functionality can attach to
let MotorbikeModule = angular.module('app.motorbike', []);
let MotorbikeDetailsModule = angular.module('app.motorbikeDetails', []);

// Include our UI-Router config settings
import MotorbikeConfig from './motorbike.config';
MotorbikeModule.config(MotorbikeConfig);

// Controllers
import MotorbikeCtrl from './motorbike.controller';
MotorbikeModule.controller('MotorbikeCtrl', MotorbikeCtrl);

import MotorbikeDetailsCtrl from './motorbikeDetails.controller';
MotorbikeDetailsModule.controller('MotorbikeDetailsCtrl', MotorbikeDetailsCtrl);

export default MotorbikeModule;
