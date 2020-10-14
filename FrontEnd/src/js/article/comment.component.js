class CommentCtrl {
  constructor(User) {
    'ngInject';

  var $onInit = () => {
    console.log(User);
    if (User.current) {
      this.canModify = (User.current.username === this.data.owner.username);
    } else {
      this.canModify = false;
    }
  }
  }

}

let Comment = {
  bindings: {
    data: '=',
    deleteCb: '&'
  },
  controller: CommentCtrl,
  templateUrl: 'article/comment.html'
};

export default Comment;
