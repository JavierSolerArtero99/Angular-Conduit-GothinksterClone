class PilotDetailCtrl {
  constructor(User, $state, pilot, Toastr) {
    'ngInject';

    this._Toastr = Toastr;
    this._User = User;
    this._pilot = pilot;
  }
}

let PilotDetail = {
  bindings: {
    pilot: '='
  },
  controller: PilotDetailCtrl,
  templateUrl: 'components/pilot-helpers/pilot-details.html'
};

export default PilotDetailCtrl;