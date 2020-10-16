class EditorCtrl {
  constructor(Motorbikes, motorbike, $state) {
    'ngInject';
    this._Motorbikes = Motorbikes;
    this._$state = $state;
    this.newTag = ''

    if (!motorbike) {
      this.motorbike = {
        name: '',
        cv: '',
        color: '',
        motorbikeTags: []
      }
    } else {
      console.log(motorbike);
      this.motorbike = motorbike;
    }
  }

  submit() {
    this.isSubmitting = true;
    if (this.newTag && this.newTag.length >= 1) {
      this.motorbike.motorbikeTags.push(this.newTag)
    }
    this._Motorbikes.save(this.motorbike).then(
      (newMotorbike) => {
        console.log("NUeva Moto:");
        console.log(newMotorbike);
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
