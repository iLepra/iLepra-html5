(function(){
    var data = null;
    var refreshInterval = null;

    var refreshMessages = function(){
        // clean old
        $("#chatList").empty();
        // render posts
        var p = "";
        for(var i = 0; i < data.length; i++)
            p += _.template(chatTemplate, data[i]);
        $("#chatList").append(p);
        // redraw styles
        $("#chatList").listview('refresh');
    }

    requestNewChatData = function(isInit){
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            data = iLepra.chat.messages.slice(0);
            data.sort(function(a,b){ return a.id > b.id ? -1 : 1});
            refreshMessages();
            if( typeof isInit != 'undefined' && isInit ){
                $(".loadingText").remove();
            }
        });
        iLepra.chat.getMessages();
    }

    // render page on creation
    $(document).on('pagecreate', "#chatPage", function(){
        $("#submitChat").bind(iLepra.config.defaultTapEvent, function(){
            var text = $("#chatInput").val();
            $("#chatInput").val("");

            // clear interval to evade overlap
            clearInterval( refreshInterval );

            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.hidePageLoadingMsg();
                // get data
                data = iLepra.chat.messages.slice(0);
                data.sort(function(a,b){ return a.id > b.id ? -1 : 1});
                // render
                refreshMessages();
                // put refresh interval back
                refreshInterval = setInterval ( "requestNewChatData()", 10000 );
            });
            iLepra.chat.sendMessage(text);
        });

        requestNewChatData(true);
        // set refresh interval
        refreshInterval = setInterval ( "requestNewChatData()", 10000 );
    });

    $(document).on("pagehide", "#chatPage", function(){
        clearInterval( refreshInterval );
    });

    $(document).on(iLepra.config.defaultTapEvent, "li.chatMessage", function(){
        var username = $(this).data('user');

        $("#chatInput").val(username+": ");
    });
})();