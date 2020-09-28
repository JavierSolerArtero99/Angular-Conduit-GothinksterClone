class AuthCtrl {
  constructor(User, $state, Toastr) {     //comprobar orden de parametros
    'ngInject';

    this._User = User;
    this._$state = $state;
    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

    this.nvalidSubmit = function () {
      Toastr.showToastr('error', 'Rellena todos los campos del formulario correctamente');
    };
    this.authSubmit = function () {
      console.log("Se ha clicado en el authSubmit")
      this.disabledForm = true;
      if (this.authType === 'register') {
        User.attemptAuth(this.authType, this.authForm).then(
          (res) => {
            Toastr.showToastr('success', 'Successfully Logged In');
            $state.go('app.home');
          },
          (err) => {
            console.log(err);
            this.disabledForm = false;
            if (err.data) {
              Toastr.showToastr('error', err.data);
            } else {
              Toastr.showToastr('error', 'Error')
            }
          }
        )
      }
    }

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

export default AuthCtrl;
