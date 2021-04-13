class Map {
    // collect relevant constants
    constructor(doc) {
        this.mapEl =  doc.querySelector(".map");
        this.imgContainerEl = doc.querySelector(".img-container");
        this.imgEl = doc.querySelector("#imap-img");
        this.recenterBttn = doc.getElementById("recenter");
        this.zoomInBttn = doc.getElementById("zoomIn");
        this.zoomOutBttn = doc.getElementById("zoomOut");

        this.imgDimensions = {
            height: this.imgEl.height,
            width: this.imgEl.width
        };
        this.divDimensions = {
            height: this.imgContainerEl.clientHeight,
            width: this.imgContainerEl.clientWidth
        };
        this.transformCenter =  { x:0, y:0 };
        this.scale = .3;
        this.panning = false;
        this.origin = { x:0, y:0 };
        this.transformBounds = { right:0, left:0, top:0, bottom:0, scaleMin:0, scaleMax:0 };
        this.cursor = { x:0, y:0 }
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
        if (this.scaleMinHeight>scaleMinWidth) {
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
        this.imgContainerEl.addEventListener('wheel', this.wheel.bind(this));

        this.recenterBttn.addEventListener('click', this.recenter.bind(this));
        this.zoomInBttn.addEventListener('click', this.zoom.bind(this));
        this.zoomOutBttn.addEventListener('click', this.zoom.bind(this));
    }

    init () {
        if (this) {
            this.updateBounds();
            this.centerImage();
            this.setZoomLimits();
            this.addEventListeners();
        };
    };

    mouseDown(e) {
        if (e.target.tagName !== "IMG") {return}
        this.mapEl.style.transition = 'default';
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

    wheel(e) {
        // if (e.target.tagName !== "IMG") {return}
        this.mapEl.style.transition = 'default';
        this.cursor = { 
            x:(e.clientX-this.transformCenter.x)/this.scale, 
            y:(e.clientY-this.transformCenter.y)/this.scale 
        };
        (e.deltaY>0) ? (this.scale/=1.02) : (this.scale*=1.02);
        this.scale = Math.min(Math.max(this.transformBounds.scaleMin,this.scale), this.transformBounds.scaleMax);
        this.transformCenter = {
            x: e.clientX - this.cursor.x*this.scale,
            y: e.clientY - this.cursor.y*this.scale
        };
        this.setTransform();
        // this.updateBounds();
    }

    recenter() {
        this.mapEl.style.transition = `width 0.5s, height 0.5s, transform 0.5s`;
        this.centerImage();
    }

    zoom(e) {
        const cmd = e.target.closest("button").id;
        // set zoom center to center of div
        this.cursor = { 
            x:(this.divDimensions.width/2-this.transformCenter.x)/this.scale, 
            y:(this.divDimensions.height/2-this.transformCenter.y)/this.scale 
        };
        switch(cmd) {
            case "zoomIn":
                this.scale*=1.5;
                break;
            case "zoomOut":
                this.scale/=1.5;
                break;
            default:
                break;
        };
        this.scale = Math.min(Math.max(this.transformBounds.scaleMin,this.scale), this.transformBounds.scaleMax);
        this.transformCenter = {
            x: this.divDimensions.width/2 - this.cursor.x*this.scale,
            y: this.divDimensions.height/2 - this.cursor.y*this.scale
        };
        this.mapEl.style.transition = `width 0.5s, height 0.5s, transform 0.5s`;
        this.setTransform();
        this.updateBounds();
    }
}

module.exports = Map;