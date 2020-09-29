class AuthCtrl {
  constructor(User, $state, Toastr) {     //comprobar orden de parametros
    'ngInject';

    this._User = User;
    this._$state = $state;
    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

    this.nvalidSubmit = function (error) {
      Toastr.showToastr('error', error);
    };

    this.authSubmit = function () {

      this.disabledForm = true;
      User.attemptAuth(this.authType, this.authForm).then(
        (res) => {
          Toastr.showToastr('success', 'Successfully Logged In');
          $state.go('app.home');
        },
        (err) => {
          console.log("=============");
          console.log(err);
          console.log("=============");
          this.disabledForm = false;
          if (err.data) {
            this.nvalidSubmit(err.data)
          } else {
            console.logI("fd")
            // this.nvalidSubmit(err.data)
          }
        }
      )
    }

  }

  submitForm() {
    this.isSubmitting = true;
    console.log("Login")

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

export default AuthCtrl;
