class CommentCtrl {
  constructor(User, MotorbikeComments, Toastr) {
    'ngInject';
    this._User = User;
    this._MotorbikeComments = MotorbikeComments;
    this._Toastr = Toastr;
  }

  $onInit() {
    if (this._User) {
      this.canModify = (this._User.current.username === this.data.owner.username);
    } else {
      this.canModify = false;
    }
  }

  deleteComment() {
    this._MotorbikeComments.destroy(this.data.id, this.motorbike.slug)
      .then((data) => {
        console.log(data);
        this._Toastr.showToastr('success', 'Se ha eliminado el comentario correctamente');
        console.log(this);
        let index = this.motorbike.motorbikeComments.indexOf(this.data.id);
        if (index >= 0) {
          console.log(this.motorbike.motorbikeComments[this.motorbike.motorbikeComments.indexOf(this.data.id)]);
        } else {
          console.log(this.motorbike.motorbikeComments[this.motorbike.motorbikeComments.length - 1]);
        }
      })
      .catch((error) => {
        console.log(error);
        this._Toastr.showToastr('error', 'No se ha podido eliminar el comentario');
      })

  }
}

let Comment = {
  bindings: {
    data: '=',
    deleteCb: '&',
    motorbike: '='
  },
  controller: CommentCtrl,
  templateUrl: 'article/comment.html'
};

export default Comment;
