class EditorCtrl {
  constructor(Pilot, pilot, $state) {
    'ngInject';
    this._Pilot = Pilot;
    this._$state = $state;
    this.newTag = '';

    (!pilot) && (this.pilot = {
      name: "Dovi",
      img: "nomia",
      age: 20,
      cc: 250,
      team: "asdf",
      mundialChapionship: 0,
      country: "asdf",
    })

    // if (!motorbike) {
    //   this.motorbike = {
    //     name: '',
    //     cv: '',
    //     color: '',
    //     motorbikeTags: []
    //   }
    // } else {
    //   console.log(motorbike);
    //   this.motorbike = motorbike;
    // }
  }

  submit() {
    this._Pilot.savePilot(this.pilot).then(
      // (newPilot) => {console.log("GUARDADO", newPilot)}
    )
    // this.isSubmitting = true;
    // if (this.newTag && this.newTag.length >= 1) {
    //   this.motorbike.motorbikeTags.push(this.newTag)
    // }
    // this._Motorbikes.save(this.motorbike).then(
    //   (newMotorbike) => {
    //     console.log("NUeva Moto:");
    //     console.log(newMotorbike);
    //     this._$state.go('app.motorbike', { slug: newMotorbike.slug });
    //   },

    //   (err) => {
    //     this.isSubmitting = false;
    //     this.errors = err.data.errors;
    //   }
    // )
  }
}


export default EditorCtrl;
