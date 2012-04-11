iLepra.util = (function() {
    return {
        /***
         Processes given HTML object for latest posts and pushes them to given array
         ***/
        processHTMLPosts: function(data, postArray, type){
            // cleanup data
            data = data.replace(/\n+/g, '');
            data = data.replace(/\r+/g, '');
            data = data.replace(/\t+/g, '');

            var postReg =/<div class="post.+?id="(.+?)".+?class="dt">(.+?)<\/div>.+?<a href=".*?\/users\/.+?".*?>(.+?)<\/a>,(.+?)<span>.+?<a href=".*?\/(comments|inbox)\/.+?">(.+?)<\/span>.+?.+?(<div class="vote".+?><em>(.+?)<\/em><\/span>|<\/div>)(<a href="#".+?class="plus(.*?)">.+?<a href="#".+?class="minus(.*?)">|<\/div>)/g;
            // /<div class="post.+?id="(.+?)".+?class="dt">(.+?)<\/div>.+?<a href=".*?\/users\/.+?".*?>(.+?)<\/a>,(.+?)<span>.+?<a href=".*?\/(comments|inbox)\/.+?">(.+?)<\/span>.+?<em>(.+?)<\/em>/g;
            var res = postReg.exec(data);

            while(res != null){
                var body = res[2];

                var imgReg = /img src="(.+?)"/g
                var resImg = imgReg.exec(body);
                var img = "";
                if( resImg != null ){
                    img = "http://src.sencha.io/80/80/"+resImg[1];

                    body = body.replace(resImg[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+resImg[1]);
                    // convert all image URIs to compressed ones
                    resImg = imgReg.exec(body);
                    while(resImg != null){
                        body = body.replace(res[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+resImg[1]);

                        resImg = imgReg.exec(body);
                    }
                }

                var text = body.replace(/(<([^>]+)>)/ig," ").substr(0, 140);
                if(text.length == 140) text += "..";

                var userSub = res[3].split('</a> в ');
                var sub = userSub[1] ? userSub[1].replace(/(<([^>]+)>)/ig, '') : '' ;

                var vote = 0;
                if(res[9] != null && res[9].length > 0){
                    vote = 1;
                }else if(res[10] != null && res[10].length > 0){
                    vote = -1;
                }

                body = body.replace(/href="(.+?)"/g, 'href="#" data-url="$1"');

                var post = {
                    id: res[1].replace('p', ''),
                    body: body,
                    rating: res[8],
                    user: userSub[0],
                    domain_url: sub,
                    when: res[4],
                    comments: res[6].replace(/(<([^>]+)>)/ig, '').replace(/коммента.+?(\s|$)/g, '').replace(/ нов.+/g, ''),
                    image: img,
                    text: text,
                    type: type,
                    vote: vote
                };


                postArray.push(post);

                res = postReg.exec(data);
            }
        },

        /***
         Processes given JSON object for latest posts
         ***/
        processJSONPosts: function(posts, postArray){
            for(var i in posts){
                var post = {};
                // get img and short text
                var imgReg = /img src="(.+?)"/gi;
                var res = imgReg.exec(posts[i].body);
                var img = "";
                if( res != null ){
                    // save first image as post image
                    img = "http://src.sencha.io/80/80/"+res[1];

                    posts[i].body = posts[i].body.replace(res[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+res[1]);
                    // convert all image URIs to compressed ones
                    res = imgReg.exec(posts[i].body);
                    while(res != null){
                        if( res[1].indexOf('http://') != -1){
                            posts[i].body = posts[i].body.replace(res[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+res[1]);
                        }

                        res = imgReg.exec(posts[i].body);
                    }
                }/*else{
                    img = ''//"../css/img/placeholder.png";
                }*/
                var text = posts[i].body.replace(/(<([^>]+)>)/g," ").substr(0, 140);
                if(text.length == 140) text += "..";

                var body = posts[i].body.replace(/href="(.+?)"/g, 'href="#" data-url="$1"');

                post.id = posts[i].id;
                post.body = body;
                post.rating = posts[i].rating;
                post.domain_url = posts[i].domain_url;
                post.image = img;
                post.text = text;
                post.user = posts[i].login;
                post.comments = posts[i].comm_count + " / " + posts[i].unread;
                post.wrote = (posts[i].gender == 1 ? "Написал " : "Написала ") + posts[i].user_rank + " " +posts[i].login;
                post.when = posts[i].textdate + " в " + posts[i].posttime;
                post.vote = parseInt( posts[i].user_vote );

                if( postArray.indexOf(post) == -1 ){
                    postArray.push(post);
                }
            }
        }
    };
})();