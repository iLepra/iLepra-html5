(function(){
    var loading = false;

    // render page on creation
    $(document).on('pageshow', "#govPage", function(){
        if(loading) $.mobile.showPageLoadingMsg()
    });
    $(document).on('pagebeforeshow', "#govPage", function(){
        loading = true;

        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg();
            loading = false;

            // render posts
            $("#president").html(
                "<a href='#' class='username'>"+iLepra.gov.president + "</a> - " + iLepra.gov.time
            );
        });
        iLepra.gov.getCurrent();
    });
})();