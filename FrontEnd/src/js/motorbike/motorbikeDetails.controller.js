class MotorbikeDetailsCtrl {
  constructor(motorbike) {
    'ngInject';
    console.log("DESDE CONTROLADOR DE DETAILS:")
    console.log(motorbike)
    this.motorbike=motorbike;
  }
}
export default MotorbikeDetailsCtrl;
