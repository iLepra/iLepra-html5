iLepra.ui = (function() {
	return {
		showError: function(message){
			$("<div class='errorMessage ui-overlay-shadow ui-body-e ui-corner-all'>"+ message +"</div>")
				.css({ "top": 100 })
				.appendTo( 'body' );
		},
	};
})();