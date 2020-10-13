function EditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.editor', {
      url: '/editor/:slug',
      controller: 'EditorCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'editor/editor.html',
      title: 'Editor',
      resolve: {
        auth: function (User) {
          return User.ensureAuthIs(true);
        },
        motorbike: function (Motorbikes, User, $state, $stateParams) {
          if ($stateParams.slug) {
            console.log(Motorbikes);
            return Motorbikes.getMotorbike($stateParams.slug).then(
              (motorbike) => {
                console.log(motorbike);
                if (User.current.username === motorbike.owner.username) {
                  return motorbike;
                } else {
                  $state.go('app.home');
                }
              },
              (err) => $state.go('app.home')
            )
          } else {
            return null;
          }
        }
      }
    });

};

export default EditorConfig;
