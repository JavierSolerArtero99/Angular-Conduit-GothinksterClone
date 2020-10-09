class MotorbikeActionsCtrl {
  constructor($scope, $state, motorbike) {
    'ngInject';


  }
}

let MotorbikeActions = {
  bindings: {
    motorbike: '='
  },
  controller: MotorbikeActionsCtrl,
  templateUrl: 'components/motorbike-helper/motorbike-actions.html'
};

export default MotorbikeActions;
