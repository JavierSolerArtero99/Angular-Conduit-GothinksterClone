class MotorbikeActionsCtrl {
  constructor(Motorbikes, User, $scope, $state) {
    'ngInject';

    this._$scope = $scope;
    this._$state = $state;
    this.User = User.current;
  }

  $onInit() {
    this.canModify = this.User.username === this.motorbike.owner.username
    // this.canModify = true
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
