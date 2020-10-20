class HomeCtrl {
  constructor(User, MotorbikeTags, Motorbikes, AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;

    // Get list of all tags
    MotorbikeTags
      .getAll()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };

    Motorbikes
      .query(this.listConfig)
      .then((motorbikes) => {
        this.motorbikes = motorbikes.motorbike
      })

  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
    console.log(newList);
  }
}

export default HomeCtrl;
