(function(){
    // render page on creation
    $(document).on('pagecreate', "#govPage", function(){
        // render posts
        $("#president").html(
            "<a href='#' class='username'>"+iLepra.gov.president + "</a> - " + iLepra.gov.time
        );
    });
})();