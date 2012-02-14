iLepra.ui = (function() {
    return {
        showError: function(message){
            $("<div class='errorMessage ui-overlay-shadow ui-body-e ui-corner-all'>"+ message +"</div>")
                .css({ "top": $(window).scrollTop() + 100 })
                .appendTo( $.mobile.activePage )
                .delay( 1200 )
                .fadeOut( 500, function(){
                    $(this).remove();
                });
        },
    };
})();