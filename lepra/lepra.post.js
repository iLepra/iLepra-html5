iLepra.post = (function() {
    return {
        // current post
        current: null,

        // comments array
        comments: null,
        newComments: null,

        // get post comments
        getComments: function(id, type){
            if( typeof id == 'undefined' ) id = iLepra.post.current.id;
            if( typeof type == 'undefined' ) type = iLepra.post.current.type;

            var url;
            if( type == 'inbox' ){
                url = "http://leprosorium.ru/my/inbox/"+id
            }else{
                var server = "leprosorium.ru";
                if( iLepra.post.current.domain_url.length > 0 ) server = iLepra.post.current.domain_url;
                url = "http://"+server+"/comments/"+id
            }

            $.get(url, function(data){
                // cleanup data
                data = data.replace(/\n+/g, '');
                data = data.replace(/\r+/g, '');
                data = data.replace(/\t+/g, '');

                iLepra.post.comments = [];
                iLepra.post.newComments = [];

                var voteRes = /wtf_vote = '(.+?)'/gi.exec(data);
                iLepra.post.current.wtf = {
                    comment: /commentsHandler.wtf = '(.+?)'/g.exec(data)[1],
                    vote: voteRes != null ? voteRes[1] : null
                }

                var commentReg = /<div id="(.+?)" class="post tree(.+?)"><div class="dt">(.+?)<\/div>.+?<a href=".*?\/users\/.+?">(.+?)<\/a>,(.+?)<span>.+?(<div class="vote".+?><em>(.+?)<\/em><\/span>|<\/div>)(<a href="#".+?class="plus(.*?)">.+?<a href="#".+?class="minus(.*?)">|<\/div>)/g;

                data = data.substr( data.indexOf('id="js-commentsHolder"') );
                var res = commentReg.exec(data);

                while(res != null){
                    var text = res[3];

                    // replace images with compressed ones
                    var imgReg = /img src="(.+?)"/g
                    var resImg = imgReg.exec(text);
                    while(resImg != null){
                        text = text.replace(resImg[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+resImg[1]);
                        resImg = imgReg.exec(text);
                    }

                    var vote = 0;
                    if(res[9] != null && res[9].length > 0){
                        vote = 1;
                    }else if(res[10] != null && res[10].length > 0){
                        vote = -1;
                    }

                    var indent = 0;
                    resImg = /indent_(.+?) /.exec(res[2]);
                    if(resImg != null) indent = resImg[1];
                    if(indent > 15) indent = 15;

                    text = text.replace(/<p.*?>/gi, '');
                    text = text.replace(/<\/p>/gi, '');
                    text = text.replace(/<nonimg/ig, '<img');

                    var post = {
                        id: res[1],
                        isNew: res[2].indexOf('new') != -1 ? 1 : 0,
                        indent: indent,
                        text: text,
                        rating: res[7],
                        user: res[4],
                        when: res[5],
                        vote: vote
                    };

                    iLepra.post.comments.push(post);
                    if(post.isNew) iLepra.post.newComments.push(post);

                    res = commentReg.exec(data);
                }

                // dispatch event
                $(document).trigger(iLepra.events.ready);
            });
        },

        // add comment to post
        addComment: function(comment, inReplyTo){
            var url = "http://";
            if( iLepra.post.current.domain_url != "" && iLepra.post.current.type != "inbox" ){
                url += iLepra.post.current.domain_url;
            }else{
                url += "leprosorium.ru";
            }
            url += "/commctl/";

            var data = {
                wtf: iLepra.post.current.wtf.comment,
                pid: iLepra.post.current.id,
                comment: comment
            }

            if(typeof inReplyTo != 'undefined' && inReplyTo != null) data.replyto = inReplyTo;

            $.post(url, data, function(data){
                data = $.parseJSON(data);

                if( data.status == "ERR" ){
                    $(document).trigger(iLepra.events.error);
                }else{
                    iLepra.post.getComments();
                }
            }).error(function(){ iLepra.post.addComment(comment, inReplyTo); });
        },

        // vote for comment
        voteComment: function(id, value){
            var url = "http://";
            if( iLepra.post.current.domain_url != "" ){
                url += iLepra.post.current.domain_url;
            }else{
                url += "leprosorium.ru";
            }
            url += "/rate/";

            var data = {
                type: 0,
                wtf: iLepra.post.current.wtf.vote,
                post_id: iLepra.post.current.id,
                id: id,
                value: value // 1 || -1
            }

            // post
            $.post(url, data, function(data){}).error(function(){ iLepra.post.voteComment(commentId, value); });
        },

        // vote for post
        votePost: function(id, value){
            var url = "http://";
            if( iLepra.post.current.domain_url != "" ){
                url += iLepra.post.current.domain_url;
            }else{
                url += "leprosorium.ru";
            }
            url += "/rate/";

            var data = {
                type: 1,
                wtf: iLepra.postVoteWTF,
                id: id,
                value: value // 1 || -1
            }

            // post
            $.post(url, data, function(data){}).error(function(){ iLepra.post.votePost(id, value); });
        }
    };
})();
