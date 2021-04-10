class Map {
    // collect relevant constants
    constructor(doc) {
        this.mapEl =  doc.querySelector(".map");
        this.imgContainerEl = doc.querySelector(".img-container");
        this.imgEl = doc.querySelector("#imap-img");
        this.imgDimensions = {
            height: this.imgEl.height,
            width: this.imgEl.width
        };
        this.divDimensions = {
            height: this.imgContainerEl.clientHeight,
            width: this.imgContainerEl.clientWidth
        };
        this.transformCenter = {};
        this.scale = 1;
        this.origin = {};
        this.panning = false;
        this.origin = {};
        this.transformBounds = {};
        // cursor = { x:0, y:0},
    };

    setTransform() {
        this.mapEl.style.transform = `translate(${this.transformCenter.x}px,${this.transformCenter.y}px) scale(${this.scale})`;
    };

    updateBounds() {
        this.origin = {
            x: (this.divDimensions.width-this.imgDimensions.width*this.scale)/2,
            y:(this.divDimensions.height-this.imgDimensions.height*this.scale)/2
        }
        // set transform boundaries
        this.transformBounds = {
            ...this.transformBounds,
            right: (this.origin.x-(this.imgDimensions.width*this.scale-this.divDimensions.width)/2),
            left: (this.origin.x+(this.imgDimensions.width*this.scale-this.divDimensions.width)/2),
            top: (this.origin.y+(this.imgDimensions.height*this.scale-this.divDimensions.height)/2),
            bottom: (this.origin.y-(this.imgDimensions.height*this.scale-this.divDimensions.height)/2)
        };
        this.scrollSnap();
    };

    scrollSnap() {
        // snap overscroll to bounds
        if (this.transformCenter.x>this.transformBounds.left) {this.transformCenter.x=this.transformBounds.left}
        if (this.transformCenter.x<this.transformBounds.right) {this.transformCenter.x=this.transformBounds.right}
        if (this.transformCenter.y>this.transformBounds.top) {this.transformCenter.y=this.transformBounds.top}
        if (this.transformCenter.y<this.transformBounds.bottom) {this.transformCenter.y=this.transformBounds.bottom}
    }

    centerImage() {
        this.updateBounds();
        // set origin of image to center in div
        this.transformCenter = {
            x: this.origin.x,
            y: this.origin.y
        }
        this.setTransform();
    }

    setZoomLimits() {
        // calculate max possible zoom out
        const scaleMinWidth = this.divDimensions.width/this.imgDimensions.width;
        const scaleMinHeight = this.divDimensions.height/this.imgDimensions.height;
        let scaleMin;
        if (scaleMinHeight>scaleMinWidth) {
            scaleMin = scaleMinHeight
        } else {scaleMin = scaleMinWidth};
        this.transformBounds = {
            ...this.transformBounds,
            scaleMin,
            scaleMax: 4
        };
    }

    addEventListeners() {
        this.imgContainerEl.addEventListener('mousedown', this.mouseDown.bind(this));
        this.imgContainerEl.addEventListener('mousemove', this.mouseMove.bind(this));
        this.imgContainerEl.addEventListener('mouseup', this.mouseUp.bind(this));
        this.imgContainerEl.addEventListener('mouseleave', this.mouseLeave.bind(this));
    }

    init () {
        if (this) {
            this.centerImage();
            console.log(this.imgDimensions);
            this.setZoomLimits();
            this.addEventListeners();
        };
    };

    mouseDown(e) {
        if (e.target.tagName !== "IMG") {return}
        this.imgEl.style.transition = 'default';
        this.panning = true;
        this.cursor = { 
            x:e.clientX-this.transformCenter.x, 
            y:e.clientY-this.transformCenter.y 
        };
        this.imgEl.style.cursor = "grabbing";
    };

    mouseMove(e) {
        // if (e.target.tagName !== "IMG") {return}
        if (!this.panning) {
            return;
        };

        this.transformCenter = {
            x: e.clientX - this.cursor.x, 
            y: e.clientY - this.cursor.y
        };
        this.setTransform();
    };

    mouseUp() {
        // if (e.target.tagName !== "IMG") {return}
        this.panning = false;
        this.imgEl.style.cursor = "grab";
        this.scrollSnap();
        this.setTransform();
    };

    mouseLeave() {
        this.panning = false;
        this.imgEl.style.cursor = "grab";
        this.scrollSnap();
        this.setTransform();
    }

    sayHello() {
        return this.panning;
    }
}

// export default new MapUtils();
module.exports = Map;