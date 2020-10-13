class MotorbikeActionsCtrl {
  constructor(Motorbikes, User, $scope, $state, Toastr) {
    'ngInject';

    this._$scope = $scope;
    this._$state = $state;
    this.User = User.current;
    this._toastr = Toastr;
    this._Motorbikes = Motorbikes;
    console.log(this._Motorbikes);
  }

  $onInit() {
    this.canModify = this.User.username === this.motorbike.owner.username
  }

  deleteMotorbike() {
    this._Motorbikes.destroy(this.motorbike.slug)
      .then((data) => {
        this._toastr.showToastr('success', "Se ha eliminado la moto")
        this._$state.go('app.motorbike')
      })
      .catch((error) => this._toastr.showToastr('error', "No se ha podido eliminar la moto"))
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
