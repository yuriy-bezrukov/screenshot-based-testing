/// <reference path="..\node_modules\@types\jquery\index.d.ts" />

class Slider {

    private photo: string[];
    private timeout: number;
    private wrapper: JQuery; 

    constructor(photo: string[], timeout: number, wrapper: string) {
        this.photo = photo;
        this.timeout = timeout;
        this.wrapper = $(wrapper);

        this.init();
    };

    //todo
    private init() {
        this.wrapper.text("Я пока не готов");
    }
}

let slider = new Slider(["/img.png", "/img2.png", "/img3.png"], 1000, "sliderDiv");