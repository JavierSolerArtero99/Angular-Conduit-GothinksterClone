class AuthCtrl {
  constructor(User, $state, Toastr) {     //comprobar orden de parametros
    'ngInject';

    this._User = User;
    this._$state = $state;
    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

    this.nvalidSubmit = function (error) {
      console.log("ERRRRRRRRRRRRRRRRRROR")
      console.log(error)
      Toastr.showToastr('error', error);
    };

    this.authSubmit = function () {
      console.log("Se ha clicado en el authSubmit")
      console.log(this.authForm);

      this.disabledForm = true;
      User.attemptAuth(this.authType, this.authForm).then(
        (res) => {
          Toastr.showToastr('success', 'Successfully Logged In');
          $state.go('app.home');
        },
        (err) => {
          console.log(err);
          this.disabledForm = false;
          if (err.data.errors) {
            this.nvalidSubmit("Rellena correctamente los datos del formulario")
          } else {
            this.nvalidSubmit(err.data)
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
