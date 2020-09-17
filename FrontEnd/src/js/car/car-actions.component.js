class CarActionsCtrl {
  constructor(Cars, User, $state) {
    'ngInject';

    this._Cars = Cars;
    this._$state = $state;

    if (User.current) {
      this.canModify = (User.current.username === this.article.author.username);
    } else {
      this.canModify = false;
    }

  }

  deleteCar() {
    this.isDeleting = true;
    this._Cars.destroy(this.car.slug).then(
      (success) => this._$state.go('app.home'),
      (err) => this._$state.go('app.home')
    )
  }
}

let CarActions = {
  bindings: {
    car: '='
  },
  controller: CarActionsCtrl,
  // templateUrl: 'car/car-actions.html'
};

export default CarActions;
