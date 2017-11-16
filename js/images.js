var imageSlideshowTimer;

function initImages() {

	// preloading image elements off DOM
	var files = document.getElementById("imageDisplay").dataset.files.split(",");

	files.forEach(function createImgEl(file) {

		var img = document.createElement("img");
		img.src = file;
	});
	
	
	// init slideshow
	var el = document.getElementById("image");
	var slideshow = new Slideshow(el, files);

	slideshow.setBG();
	slideshow.start(10000);
}



function Slideshow(el, files) {

	this.el = el;
	this.files = files;
	this.currentIdx = 0;
	this.duration = null;
	this.timer = null;
}

Slideshow.prototype.start = function start(duration) {

	if (this.timer === null) {

		this.duration = duration;
		this.timer = window.setInterval(this.transition.bind(this), duration);
	}
};


Slideshow.prototype.stop = function stop() {

	window.clearInterval(this.timer);
	this.timer = null;
};


Slideshow.prototype.transition = function transition(){
	 
	 this.nextIdx();
	 this.setBG();
};


Slideshow.prototype.nextIdx = function next() {
	
	this.currentIdx = (this.currentIdx + 1) % this.files.length;
};


Slideshow.prototype.setBG = function() {
	
	this.el.style.backgroundImage = 'url(' + this.files[this.currentIdx] + ')';
};