class MotorbikesDetailCtrl {
  constructor(MotorbikeComments, $state) {
    'ngInject';

    this._MotorbikeComments = MotorbikeComments;
  }

  $onInit() {
    this._MotorbikeComments.getAll(this.motorbike.slug)
      .then((data) => {
        this.motorbikeComments = data;
      })
      .catch((error) => console.log("No se han podido acceder a los commentarios de las motos"))
  }

  addMotorbikeComment() {
    if (this.commentForm) {
      this._MotorbikeComments.add(this.motorbike.slug, this.commentForm.body)
        .then((data) => this.motorbikeComments.unshift(data))
        .catch((error) => { console.log(error); })
    }
  }
}

let MotorbikesDetail = {
  bindings: {
    motorbike: '='
  },
  controller: MotorbikesDetailCtrl,
  templateUrl: 'components/motorbike-helper/motorbike-detail.html'
};

export default MotorbikesDetail;