class MotorbikesDetailCtrl {
  constructor(User, MotorbikeComments, $state, Toastr) {
    'ngInject';

    this._MotorbikeComments = MotorbikeComments;
    this._Toastr = Toastr;
    this._User = User;
  }

  $onInit() {
    this._MotorbikeComments.getAll(this.motorbike.slug)
      .then((data) => {
        this.motorbikeComments = data;
      })
      .catch((error) => console.log("No se han podido acceder a los commentarios de las motos"))

    this.user = this._User.current
  }

  addMotorbikeComment() {
    if (this.commentForm.body) {
      this._MotorbikeComments.add(this.motorbike.slug, this.commentForm.body)
        .then((data) => {
          this.commentForm.body = undefined;
          this.motorbikeComments.unshift(data)
        })
        .catch((error) => { console.log(error); })
    }
  }

  deleteCommentParent(cmt, index) {
    this._MotorbikeComments.destroy(cmt.id, this.motorbike.slug)
      .then((data) => {
        this._Toastr.showToastr('success', 'Se ha eliminado el comentario correctamente');
        console.log(this.motorbikeComments.splice(index, 1));
      })
      .catch((error) => {
        this._Toastr.showToastr('error', 'No se ha podido eliminar el comentario');
      })
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