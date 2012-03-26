var profileName;

(function(){
    $(document).on(iLepra.config.defaultTapEvent, "ul li.postInfo", function(){
        profileName = $(this).data('user');

        $.mobile.changePage("more_profile.html");
    });

    // render page on creation
    $(document).on('pageshow', "#profilePage", function(){
        $.mobile.showPageLoadingMsg()

        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg()
            $("#profileContent").show();

            var data = iLepra.profile.data;

            // set username
            $("#profileUsername").text( data.username );

            // set userpic
            if( data.userpic != undefined )
                $("#userImage").attr('src', data.userpic);

            // basic info
            $("#fullName").text( data.fullName );
            $("#userLocation").text( data.location );
            $("#userRegdate").html( data.regDate );
            $("#userNumber").text( "Номер; "+data.number );
            $("#userKarma").text( "Карма: "+data.karma );

            // statistic info
            $("#userStat").text( data.userstat );
            var vote = data.votestat.split("<br>");
            $("#userVote").html( vote[0] );
            $("#userVoteCount").html( vote[1] );

            $("#userDescription").html( data.description );

            var clist = $("#contactsList");
            var i, text, link;
            for(i = 0; i < data.contacts.length; i++){
                link = /href="(.+?)"/g.exec(data.contacts[i]);
                text = data.contacts[i].replace(/\s\s+/g, " ").replace(/[\n\r]/g, "").replace(/<.+?>/g, "");
                if( text.length > 1 ){
                    if( link != null ){
                        clist.append( $('<li><a href="'+link[1]+'">'+text+'</a></li>') );
                    }else{
                        clist.append( $('<li>'+text+'</li>') );
                    }
                }
            }
            clist.listview('refresh');
        });

        iLepra.profile.getProfile(profileName);
    });
})();