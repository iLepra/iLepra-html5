(function(){
    var postLimit = iLepra.config.postIncrement;

    var renderNewPosts = function(){
        // render posts
        var limit = postLimit > iLepra.favouritePosts.length ? iLepra.favouritePosts.length : postLimit;
        var p = "";
        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.favouritePosts[i]);
        $("#favsList").append(p);
    }

    // render page on creation
    $(document).on('pagecreate', "#favsPage", function(){
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            $(".loadingText").remove();

            renderNewPosts();
            try{
                $("#favsList").listview('refresh');
            }catch(e){}

            // hide button if needed
            if( postLimit < iLepra.favouritePosts.length ){
                $("#moreFavsButton").show();
                // more posts click
                $("#moreFavsButton").bind(iLepra.config.defaultTapEvent, function(event){
                    // stops event to prevent random post opening
                    event.preventDefault();
                    event.stopPropagation();

                    postLimit += postLimit;
                    if( postLimit >= iLepra.favouritePosts.length ){
                        $("#moreFavsButton").hide();
                    }

                    // clean old data
                    $("#favsList").empty();
                    renderNewPosts();
                    $("#favsList").listview('refresh');
                });
            }
        });
        iLepra.getFavourites();
    });
})();