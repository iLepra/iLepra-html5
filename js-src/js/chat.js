(function(){
    var data = null,
        refreshInterval = null,

        // dom
        chatList = null,
        chatInput = null,
        chatLimit = 64;

    var refreshMessages = function(){
        // clean old
        chatList.empty();
        // render posts
        var p = "",
            i, max = data.length > chatLimit ? chatLimit : data.length;
        for(i = 0; i < max; i++)
            p += _.template(chatTemplate, data[i]);
        chatList.append(p);
        // redraw styles
        chatList.listview('refresh');
    }

    var requestNewChatData = function(isInit){
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            data = iLepra.chat.messages.slice(0);
            data.sort(function(a,b){ return a.id > b.id ? -1 : 1});
            refreshMessages();
            if( typeof isInit != 'undefined' && isInit ){
                // hide loading msg
                $.mobile.hidePageLoadingMsg()
            }
        });
        iLepra.chat.getMessages();
    }

    // render page on creation
    $(document).on('pageshow', "#chatPage", function(){
        chatList = $("#chatList");
        chatInput = $("#chatInput");

        $("#submitChat").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            var text = chatInput.val();
            chatInput.val("");

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

        $.mobile.showPageLoadingMsg()
        requestNewChatData(true);
        // set refresh interval
        refreshInterval = setInterval ( "requestNewChatData()", 10000 );
    });

    $(document).on("pagehide", "#chatPage", function(){
        clearInterval( refreshInterval );
    });

    $(document).on(iLepra.config.defaultTapEvent, "li.chatMessage", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        var username = $(this).data('user');

        chatInput.val(username+": ");
    });
})();