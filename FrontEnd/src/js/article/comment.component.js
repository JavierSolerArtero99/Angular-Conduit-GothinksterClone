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
}

let Comment = {
  bindings: {
    data: '=',
    motorbike: '=',
    deleteCommentParent: '&'
  },
  controller: CommentCtrl,
  templateUrl: 'article/comment.html'
};

export default Comment;
