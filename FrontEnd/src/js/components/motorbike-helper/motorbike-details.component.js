class MotorbikesDetailCtrl {
  constructor(Motorbikes, $state) {
    'ngInject';
  }

  $onInit() {
    console.log(this.motorbike);
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