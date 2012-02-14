(function(){
    var postIncrement = 10;
    var postLimit = 10;
    
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
        renderNewPosts();
        // hide button if needed
        if( postLimit >= iLepra.favouritePosts.length ){
            $("#moreFavsButton").hide();
        }else{
            // more posts click
            $("#moreFavsButton").bind(iLepra.config.defaultTapEvent, function(event){
                // stops event to prevent random post opening
                event.preventDefault();
                event.stopPropagation();
                
                postLimit += postIncrement;
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
})();