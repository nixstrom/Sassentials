var App = App || {};

App.Namespace = (function() {
	"use strict";

	var X = '',
			Y = '',
			Z = '',

			IS_TOUCH = !! ("ontouchstart" in window),

			// Store cached references to DOM elements
			// that will be used over and over again
			dom = {};

	/**
	 * Initialize function
	 * @return {void}
	 */
	function initialize() {
		// Set up DOM and cache references
		_setupDOM();

		// Add event listeners
		_addEventListeners();
	}

	/**
	 * Set up DOM (create?) elements and cache references for future use
	 * @return {void}
	 */
	function _setupDOM() {
		dom.$body = $( document.body );

		// Container element for this
		dom.$wrapper = $();
	}

	/**
	 * Attach event listeners to DOM elements
	 */
	function _addEventListeners() {
		dom.$body.on( 'click', _onBodyClicked );
	}

	/**
	 * Event handler for "click" inside body
	 * @param  {object} event event object
	 * @return {void}
	 */
	function _onBodyClicked( event ) {
		alert( 'body is clicked, yo bro!' );
	}

	////////////////
	// Public API //
	////////////////

	return {
		initialize: initialize
	};

})();
