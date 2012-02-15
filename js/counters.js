(function(){
    var countTimer = null;

    var initCounters = function(){
        // if counter inited, remove event listener and die
        if( countTimer != null ){
            return;
        }

        countTimer = setInterval(getCounts, 120000);
        getCounts();
    }

    var getCounts = function(){
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            var inboxString = "";
            if( iLepra.inboxNewPosts > 0 ){
                inboxString += iLepra.inboxNewPosts+"/"+iLepra.inboxNewComments;
            }else if(iLepra.inboxNewComments > 0){
                inboxString += iLepra.inboxNewComments;
            }else{
                inboxString = "";
            }
            if(inboxString.length > 0){
                $(".inboxCounter").text(inboxString);
                $(".inboxCounter").show();
            }else{
                $(".inboxCounter").hide();
            }

            var mystuffString = "";
            if( iLepra.myNewPosts > 0 ){
                mystuffString += iLepra.myNewPosts+"/"+iLepra.myNewComments;
            }else if(iLepra.myNewComments > 0){
                mystuffString += iLepra.myNewComments;
            }else{
                mystuffString = "";
            }
            if(mystuffString.length > 0){
                $(".mystuffCounter").text(mystuffString);
                $(".mystuffCounter").show();
            }else{
                $(".mystuffCounter").hide();
            }
        });

        // get posts
        iLepra.getNewsCounters();
    }

    window.initCounters = initCounters;
})();