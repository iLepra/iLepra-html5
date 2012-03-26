(function(){
    var countTimer = null;

    var initCounters = function(){
        // if counter inited, remove event listener and die
        if( countTimer != null ){
            updateNewsCounts();
            return;
        }

        countTimer = setInterval(getCounts, 120000);
        getCounts();
    }

    var getCounts = function(){
        $(document).bind(iLepra.events.update, function(event){
            $(document).unbind(event);
            updateCounts();
        });

        // get posts
        iLepra.getNewsCounters();
    }

    var updateCounts = function(){
        var inboxString = "";
        if( iLepra.inboxNewPosts > 0 ){
            inboxString += iLepra.inboxNewPosts+"/"+iLepra.inboxNewComments;
        }else if(iLepra.inboxNewComments > 0){
            inboxString += iLepra.inboxNewComments;
        }else{
            inboxString = "";
        }
        if(inboxString != ""){
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
        if(mystuffString != ""){
            $(".mystuffCounter").text(mystuffString);
            $(".mystuffCounter").show();
        }else{
            $(".mystuffCounter").hide();
        }
    }

    window.initCounters = initCounters;
    window.updateNewsCounts = updateCounts;
})();