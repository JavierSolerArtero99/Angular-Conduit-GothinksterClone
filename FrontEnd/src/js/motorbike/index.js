import angular from 'angular';

// Create the module where our functionality can attach to
let MotorbikeModule = angular.module('app.motorbike', []);

// Include our UI-Router config settings
import MotorbikeConfig from './motorbike.config';
MotorbikeModule.config(MotorbikeConfig);

// Controllers
import MotorbikeCtrl from './motorbike.controller';
MotorbikeModule.controller('MotorbikeCtrl', MotorbikeCtrl);

export default MotorbikeModule;
