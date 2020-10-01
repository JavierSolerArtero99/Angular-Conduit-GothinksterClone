class homeSliderCtrl {
    constructor() {
        this.myInterval = 5000;
        this.noWrapSlides = false;
        this.slides = [
            { image: './../../images/image.jpg', text: "imagen 1", id: 0 },
            { image: './../../images/image.jpg', text: "imagen 2", id: 1 },
            { image: './../../images/image.jpg', text: "imagen 3", id: 2 },
        ]
    }
}

let homeSlider = {
    controller: homeSliderCtrl,
    templateUrl: 'home/homeSlider.html'
};

export default homeSlider;