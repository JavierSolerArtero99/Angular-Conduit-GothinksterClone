class EditorCtrl {
  constructor(Motorbikes, motorbike, $state) {
    'ngInject';
    this._Motorbikes = Motorbikes;
    this._$state = $state;

    if (!motorbike) {
      this.motorbike = {
        name: '',
        cv: '',
        color: '',
      }
    } else {
      this.motorbike = motorbike;
    }
  }

  submit() {
    this.isSubmitting = true;

    this._Motorbikes.save(this.motorbike).then(
      (newMotorbike) => {
        this._$state.go('app.motorbike', { slug: newMotorbike.slug });
      },

      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}


export default EditorCtrl;
