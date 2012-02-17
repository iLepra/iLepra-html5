(function(){
    var postLimit = iLepra.config.postIncrement;

    var renderNewPosts = function(){
        // render posts
        var limit = postLimit > iLepra.myStuffPosts.length ? iLepra.myStuffPosts.length : postLimit;
        var p = "";
        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.myStuffPosts[i]);
        $("#mystuffList").append(p);
    }

    // render page on creation
    $(document).on('pagecreate', "#mystuffPage", function(){
        updateNewsCounts();

        renderNewPosts();
        // hide button if needed
        if( postLimit >= iLepra.myStuffPosts.length ){
            $("#moreMystuffButton").hide();
        }else{
            // more posts click
            $("#moreMystuffButton").bind(iLepra.config.defaultTapEvent, function(event){
                // stops event to prevent random post opening
                event.preventDefault();
                event.stopPropagation();

                postLimit += postLimit;
                if( postLimit >= iLepra.myStuffPosts.length ){
                    $("#moreMystuffButton").hide();
                }

                // clean old data
                $("#mystuffList").empty();
                renderNewPosts();
                $("#mystuffList").listview('refresh');
            });
        }
    });
})();