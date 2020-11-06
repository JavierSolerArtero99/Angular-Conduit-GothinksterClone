import angular from 'angular';

// Create the module where our functionality can attach to
let editorModule = angular.module('app.newPilot', []);

// Include our UI-Router config settings
import EditorConfig from './pilotEditor.config';
editorModule.config(EditorConfig);

// Controllers
import EditorCtrl from './pilotEditor.controller';
editorModule.controller('EditorCtrl', EditorCtrl);

export default editorModule;
