class FavoriteBtnCtrl {
  constructor(User, Motorbikes, $state) {
    'ngInject';

    this._User = User;
    this._Motorbike = Motorbikes;
    this._$state = $state;
  }

  submit() {
    this.isSubmitting = true;

    if (!this._User.current) {
      this._$state.go('app.register');
      return;
    }

    console.log(this.motorbike)

    if (this.motorbike.favorited) {
      this._Motorbike.unfavorite(this.motorbike.slug).then(
        () => {
          this.isSubmitting = false;
          this.motorbike.favorited = false;
          this.motorbike.favoritesCount--;
        }
      )

    } else {
      this._Motorbike.favorite(this.motorbike.slug).then(
        () => {
          this.isSubmitting = false;
          this.motorbike.favorited = true;
          this.motorbike.favoritesCount++;
        }
      )
    }
  }
}

let FavoriteBtn = {
  bindings: {
    motorbike: '='
  },
  transclude: true,
  controller: FavoriteBtnCtrl,
  templateUrl: 'components/buttons/favorite-btn.html'
};

export default FavoriteBtn;
