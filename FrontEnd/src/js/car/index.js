import angular from 'angular';

// Create the module where our functionality can attach to
let carModule = angular.module('app.car', []);

// Include our UI-Router config settings
import CarConfig from './car.config';
carModule.config(CarConfig);

// Controllers
import CarCtrl from './car.controller';
carModule.controller('CarCtrl', CarCtrl);

export default carModule;
