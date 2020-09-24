class SocialCtrl {
  constructor(User, $state, $scope) {
    'ngInject';

    this._User = User;
    this._$state = $state;
    this._$scope = $scope;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');
    
    this._User.attemptAuth(this.authType, null).then(
      (res) => {
        if (res.data.user.type == "admin") {
          this._$state.go('app.adminpanel');
        } else {
          location.reload();
          this._$state.go('app.home');
        }
      },
      (err) => {
        console.log(err)
      }
    )

  }

  submitForm() {
    this.isSubmitting = true;

    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {
        this._$state.go('app.home');
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}

export default SocialCtrl;
