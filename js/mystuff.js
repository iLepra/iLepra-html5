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
    $(document).on('pageshow', "#mystuffPage", function(){
        $.mobile.showPageLoadingMsg()

        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg()

            renderNewPosts();
            try{
                $("#mystuffList").listview('refresh');
            }catch(e){}

            // hide button if needed
            if( postLimit < iLepra.myStuffPosts.length ){
                $("#moreMystuffButton").show();
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
        iLepra.getMyStuff();

        updateNewsCounts();
    });
})();