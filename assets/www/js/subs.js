$(window).load(function(){
    var subName = null;
    var subUrl = null;

    var rendreNew = function(){
        // render posts
        var p = "";
        for(var i = 0; i < iLepra.sub.list.length; i++)
            p += _.template(subsTemplate, iLepra.sub.list[i]);
        $("#subsList").append(p);
    }

    // render page on creation
    $(document).on('pagecreate', "#subsPage", function(){
        if( iLepra.sub.fetch ){
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);

                $(".loadingText").remove();

                rendreNew();
                $("#subsList").listview('refresh');
            });
            iLepra.sub.getList();
        }else{
            rendreNew();
        }
    });

    // sub click
    $(document).on(iLepra.config.defaultTapEvent, "a.subListItem", function(){
        subName = $(this).children('h1').text();
        subUrl = $(this).data('link');

        $.mobile.changePage("more_subposts.html");
    });

    $(document).on('pagecreate', "#subpostsPage", function(){
        // on posts data
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            $(".loadingText").remove();

            // render posts
            var p = "";
            for(var i = 0; i < iLepra.sub.posts.length; i++)
                p += _.template(postTemplate, iLepra.sub.posts[i]);
            $("#subpostsList").append(p);
            $("#subpostsList").listview('refresh');
        });

        // get posts
        iLepra.sub.getPosts(subUrl);

        // title
        $("#subpostsTitle").text(subName);
    });
});