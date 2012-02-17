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

            var postReg = /<div class="post.+?id="(.+?)".+?class="dt">(.+?)<\/div><div class="dd"><div class="p">Написал.+?<a href=".+?".*?>(.+?)<\/a>,(.+?)<span>.+?<a href=".*?\/(comments|inbox)\/.+?">(.+?)<\/span>.+?<span class="rating".+?><em>(.+?)<\/em><\/span>/g;
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
                text = text.replace(/\s\s+/g, '').replace(/[\n\r\t]/g, '');
                if(text.length == 140) text += "..";

                var userSub = res[3].split('</a> в ');
                var sub = userSub[1] ? userSub[1].replace(/(<([^>]+)>)/ig, '') : '' ;

                var post = {
                    id: res[1].replace('p', ''),
                    body: body,
                    rating: res[7],
                    user: userSub[0],
                    domain_url: sub,
                    when: res[4],
                    comments: res[6].replace(/(<([^>]+)>)/ig, '').replace(/коммента.+?(\s|$)/g, '').replace(/ нов.+/g, ''),
                    image: img,
                    text: text,
                    type: type
                };


                postArray.push(post);

                res = postReg.exec(data);
            }
        }
    };
})();