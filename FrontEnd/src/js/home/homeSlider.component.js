class homeSliderCtrl {
    constructor() {
        this.myInterval = 5000;
        this.noWrapSlides = false;
        this.slides = [
            { image: '/images/imagen1', text: "imagen 1", id: 0 },
            { image: '/images/imagen1', text: "imagen 1", id: 0 },
            { image: '/images/imagen1', text: "imagen 1", id: 0 }
        ]
    }
}

let homeSlider = {
    controller: homeSliderCtrl,
    templateUrl: 'home/homeSlider.html'
};

export default homeSliderCtrl;