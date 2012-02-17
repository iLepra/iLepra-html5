(function(){
    var postLimit = iLepra.config.postIncrement;

    var renderNewPosts = function(){
        // render posts
        var limit = postLimit > iLepra.inboxPosts.length ? iLepra.inboxPosts.length : postLimit;
        var p = "";
        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.inboxPosts[i]);
        $("#inboxList").append(p);
    }

    // render page on creation
    $(document).on('pagecreate', "#inboxPage", function(){
        updateNewsCounts();

        renderNewPosts();
        // hide button if needed
        if( postLimit >= iLepra.inboxPosts.length ){
            $("#moreInboxButton").hide();
        }else{
            // more posts click
            $("#moreInboxButton").bind(iLepra.config.defaultTapEvent, function(event){
                // stops event to prevent random post opening
                event.preventDefault();
                event.stopPropagation();

                postLimit += postLimit;
                if( postLimit >= iLepra.inboxPosts.length ){
                    $("#moreInboxButton").hide();
                }

                // clean old data
                $("#inboxList").empty();
                renderNewPosts();
                $("#inboxList").listview('refresh');
            });
        }
    });
})();