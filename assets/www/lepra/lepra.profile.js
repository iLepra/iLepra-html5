iLepra.profile = (function() {
    return {
        data: null,
    
        getProfile: function(username){
            var url = "http://leprosorium.ru/users/"+username;
            
            $.get(url, function(data){
                // cleanup data
                data = data.replace(/\n+/g, '');
                data = data.replace(/\r+/g, '');
                data = data.replace(/\t+/g, '');
                
                var userpic = /<table class="userpic"><tbody><tr><td><img src="(.+?)".+?\/>/g.exec(data);
                if( userpic ){
                    userpic = userpic[1];
                }else{
                    userpic = "";
                }
                
                var regdata = /<div class="userregisterdate">(.+?)<\/div>/g.exec(data)[1].replace(/\./g, "").split(', ');
                var num = regdata[0];
                var date = regdata[1];
                
                var name = /<div class="userbasicinfo"><h3>(.+?)<\/h3>/g.exec(data)[1];
                var loc = /<div class="userego">(.+?)<\/div>/g.exec(data)[1];
                var karma = /<span class="rating" id="js-user_karma".+?><em>(.+?)<\/em>/g.exec(data)[1];
                
                var statWrote = /<div class="userstat userrating">(.+?)<\/div>/g.exec(data);
                var statRate = /<div class="userstat uservoterate">Вес голоса&nbsp;&#8212; (.+?)<br.*?>Голосов в день&nbsp;&#8212; (.+?)<\/div>/g.exec(data);
                var userstat = statWrote[1].replace(/(<([^>]+)>)/ig, ' ');
                var votestat = "Вес голоса&nbsp;&#8212; "+statRate[1]+",<br>Голосов в день&nbsp;&#8212; "+statRate[2];
                
                var story = /<div class="userstory">(.+?)<\/div>/g.exec(data)[1];
                
                var contacts = /<div class="usercontacts">(.+?)<\/div>/g.exec(data)[1].split(/<br.*?>/);
                
                iLepra.profile.data = {
                    username: username,
                    userpic: userpic,
                    number: num,
                    regDate: date,
                    fullName: name,
                    location: loc,
                    karma: karma,
                    userstat: userstat,
                    votestat: votestat,
                    contacts: contacts,
                    description: story
                };
                
                // dispatch event
                $(document).trigger(iLepra.events.ready);
            });
        }
    };
})();
