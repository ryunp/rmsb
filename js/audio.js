var audioLog;

function initAudio() {

	audioLog = new Log( document.getElementById("log") );

	document.getElementById("audioContainer")
		.addEventListener("click", onContainerClick);
}


/*
 * Event Handlers
 */
function onContainerClick(e) {

	if (e.target.className === "audio") {

		var src = e.target.dataset.file;
		var audio = createAudioElement(src);
		audio.play();
	}
}


function onAudioPlay(e) {

	var audio = e.currentTarget;
	audioLog.add(audio);
	audioLog.render();
	audio.removeEventListener(e.type, onAudioPlay);
}


function onAudioEnd(e) {

	var audio = e.currentTarget;
	audioLog.remove(audio);
	audioLog.render();
	audio.removeEventListener(e.type, onAudioEnd);
}


// Helper function
function createAudioElement(file) {

	var a = document.createElement("audio");
	a.src = file;

	a.addEventListener('play', onAudioPlay);
	a.addEventListener('ended', onAudioEnd);

	return a;
}



/*
 * Logging Mechinism
 */
function Log(el) {
	this.el = el;
	this.records = [];
}


Log.prototype.add = function(entry) {
	
	this.records.push(entry);
};


Log.prototype.remove = function(entry) {
	
	var idx = this.records.indexOf(entry);
	this.records.splice(idx, 1);
};


Log.prototype.render = function() {

	// Append once via container element
	var entries = document.createElement('div');

	// Build elements into container
	this.records.forEach(function(item) {

		var fileName = item.src.split("/").pop();
		var entry = document.createElement('div');
		var txt = document.createTextNode(fileName);
		entry.appendChild(txt);

		entries.appendChild(entry);
	});

	// Remove old container(s)
	while (this.el.lastChild)
	    this.el.removeChild(this.el.lastChild);

	// Add new container
	this.el.appendChild(entries);
};