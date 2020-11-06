function EditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.newPilot', {
      url: '/editor/:slug',
      controller: 'EditorCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'editor/pilot-editor.html',
      title: 'New Pilot Editor',
      resolve: {
        auth: function (User) {
          return User.ensureAuthIs(true);
        },
        pilot: function (Pilot, User, $state, $stateParams) {
          // if ($stateParams.slug) {
          //   console.log(Motorbikes);
          //   return Motorbikes.getMotorbike($stateParams.slug).then(
          //     (motorbike) => {
          //       console.log(motorbike);
          //       if (User.current.username === motorbike.owner.username) {
          //         return motorbike;
          //       } else {
          //         $state.go('app.home');
          //       }
          //     },
          //     (err) => $state.go('app.home')
          //   )
          // } else {
          //   return null;
          // }
        }
      }
    });

};

export default EditorConfig;
