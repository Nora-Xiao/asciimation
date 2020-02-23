// This is the ascii.js for the interaction side of the ascii.html page which is about ASCIImation. 
// It defines the responses of the web page when the user clicks the buttons for starting and 
// ending playing ASCIImation, and when the user changes the option controls for changing 
// the currently displayed ASCIImation, changing the size of the displayed ASCIImation and changing 
// the playing speed of the ASCIImation.

"use strict";

(function() {
	let timer; // id of the current timer for controlling the playing speed of ASCIImation
	let animationFrames; // the set of animation frames currently used
	let frameNumber; // the current frame number

	/**
	 *  Returns the DOM element with the given id.
	 *
	 *  @param {string} id - the id of the DOM element to retrieve
	 *  @return {object} the DOM object with the given id 
	 */
	function $(id) {
		return document.getElementById(id);
	}

	/** 
	 * Defines the responses of the web page when the user clicks the buttons for starting and 
	 * ending playing ASCIImation, and when the user changes the option controls for changing 
	 * the currently displayed ASCIImation, changing the size of the displayed ASCIImation and 
	 * changing the playing speed of the ASCIImation.
	 */ 
	window.onload = function() {
		timer = null;
		animationFrames = null;
		frameNumber = 0;		
		document.querySelector("select[name=animation]").onchange = changeAnimation;
		document.querySelector("select[name=size]").onchange = changeSize;
		let speed = 250;
		let speeds = document.getElementsByName("speed");
		for (let i = 0; i < speeds.length; i++) {			
			speeds[i].onchange = function() {
				speed = parseInt(this.value, 10);
				changeSpeed(speed);
			};
		}
		$("start").onclick = function() {
			startAnimation(speed);
		};
		$("stop").onclick = endAnimation;
	};

	/** 
	 * Plays the current ASCIImation in the text box repeatly, frame by frame, with the currently
	 * selected speed. Disables the button for starting playing ASCIImation, and the option control
	 * for changing the currently displayed ASCIImation. Enables the button for ending playing 
	 * ASCIImation.
	 */ 
	function startAnimation(speed) {
		animationFrames = document.querySelector("textarea").value.split("=====\n");
		frameNumber = 0;
		$("start").disabled = true;
		document.querySelector("select[name=animation]").disabled = true;
		$("stop").disabled = false;
		timer = setInterval(playFrame, speed);
	}

	/** Displays the current frame of the current ASCIImation. */ 
	function playFrame() {
		if (frameNumber === animationFrames.length) {
			frameNumber = 0;
		}
		document.querySelector("textarea").value = animationFrames[frameNumber];
		frameNumber++;
	}

	/** 
	 * Ends playing the current ASCIImation. Enables the button for starting playing ASCIImation, 
	 * and the option control for changing the currently displayed ASCIImation. Disables the button 
	 * for ending playing ASCIImation. Displays all frames of the current ASCIImation in 
	 * the text box.
	 */ 
	function endAnimation() {
		clearInterval(timer);
		timer = null;
		$("stop").disabled = true;
		$("start").disabled = false;
		document.querySelector("select[name=animation]").disabled = false;
		document.querySelector("textarea").value = animationFrames.join("=====\n");
	}	

	/** Displays all frames of the currently selected ASCIImation in the text box. */ 
	function changeAnimation() {
		document.querySelector("textarea").value = ANIMATIONS[this.value];	
	}

	/** Sets the size of the current ASCIImation in the text box to the currently selected size. */ 
	function changeSize() {
		document.querySelector("textarea").className = this.value;	
	}	

	/** 
	 * If the ASCIImation is playing, changes the playing speed to the currently selected speed.
	 */ 
	function changeSpeed(speed) {
		if (timer !== null) {
			clearInterval(timer);
			timer = setInterval(playFrame, speed);
		}
	}
})();