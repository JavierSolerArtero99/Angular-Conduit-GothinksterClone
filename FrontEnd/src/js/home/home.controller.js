class HomeCtrl {
  constructor(User, MotorbikeTags, motorbikes, AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.motorbikes = motorbikes;

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
  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
    console.log(newList);
    console.log("=======================");
    console.log(this.motorbikes)
  }
}

export default HomeCtrl;
