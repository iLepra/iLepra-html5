(function(){
    // render page on creation
    $(document).on('pagecreate', "#govPage", function(){
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            $(".loadingText").remove();

            // render posts
            $("#president").html(
                "<a href='#' class='username'>"+iLepra.gov.president + "</a> - " + iLepra.gov.time
            );
        });
        iLepra.gov.getCurrent();
    });
})();