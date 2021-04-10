class Map {
    // collect relevant constants
    constructor(doc) {
        this.mapEl =  doc.querySelector(".map");
        this.imgDimensions = {
            height: doc.querySelector("#imap-img").height,
            width: doc.querySelector("#imap-img").width
        };
        this.divDimensions = {
            height: doc.querySelector(".img-container").clientHeight,
            width: doc.querySelector(".img-container").clientWidth
        };
        this.transformCenter = {};
        this.scale = 1;
        this.origin = {};
        // let panning = false,
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
        // snap overscroll to bounds
        if (this.transformCenter.x>this.transformBounds.left) {this.transformCenter.x=this.transformBounds.left}
        if (this.transformCenter.x<this.transformBounds.right) {this.transformCenter.x=this.transformBounds.right}
        if (this.transformCenter.y>this.transformBounds.top) {this.transformCenter.y=this.transformBounds.top}
        if (this.transformCenter.y<this.transformBounds.bottom) {this.transformCenter.y=this.transformBounds.bottom}
    };

    centerImage() {
        this.updateBounds();
        // set origin of image to center in div
        this.transformCenter = {
            x: this.origin.x,
            y: this.origin.y
        }
        this.setTransform();
    }

    imgLoad (el) {
        // console.log(e.target);
        if (this) {
            //now that image has loaded, update dimensions
            this.imgDimensions = {
                height: el.closest("#imap-img").height,
                width: el.closest("#imap-img").width
            };
            this.divDimensions = {
                height: el.closest(".img-container").clientHeight,
                width: el.closest(".img-container").clientWidth
            };
            this.centerImage();
            console.log(this.imgDimensions);
            
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
        };
    };

    mouseDown() {
        // if (e.target.tagName !== "IMG") {return}
        // e.target.style.transition = 'default';
        // panning = true;
        // cursor = { 
        //     x:e.clientX-transformCenter.x, 
        //     y:e.clientY-transformCenter.y 
        // };
        // e.target.style.cursor = "grabbing";
        console.log('mouse down');
    };
}

// export default new MapUtils();
module.exports = Map;