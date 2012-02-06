iLepra.util = (function() {
	return {
		/***
         Processes given HTML object for latest posts and pushes them to given array
         ***/ 
        processHTMLPosts: function(doc, postArray, type){
            // replace all img tags to evade image loading while parsing
            doc = doc.replace(/<img/ig, '<nonimg');
            // parse
            $(".post", doc).each(function(){
                    var data = this;
                    var add = $(".dd .p", data);
                    
                    var body = $(".dt", data).html();
                    var wroteFull = add.text().replace(/\s\s+/gi, " ").split("|");
                    var wroteTime = wroteFull[0].split(', ');
                    var wrote = wroteTime[0].split(' в ')[0];
                    
                    var imgReg = /nonimg src="(.+?)"/g
                    var res = imgReg.exec(body);
                    var img = "";
                    if( res != null ){ 
                        img = "http://src.sencha.io/80/80/"+res[1];
                        
                        body = body.replace(res[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+res[1]);
                        // convert all image URIs to compressed ones
                        res = imgReg.exec(body);
                        while(res != null){
                            body = body.replace(res[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+res[1]);
                        
                            res = imgReg.exec(body);
                        }
                    }/*else{
                        img = '';//"../css/img/placeholder.png";
                    }*/
                    var text = body.replace(/(<([^>]+)>)/ig," ").substr(0, 140);
					if(text.length == 140) text += "..";
					
					var comments = wroteFull[1].replace(/комментар.+? /, '').replace(/новы.+?/, '');
                    
                    var post = {
                        id: data.id.replace('p', ''),
                        body: body,
                        rating: $(".rating", data).text(),
                        user: $( $("a", add)[0] ).text(),
                        domain_url: $(".sub_domain_url", data).text(),
                        wrote: wrote,
                        when: wroteTime[1],
                        comments: comments,
                        image: img,
                        text: text,
                        type: type
                    };
                    
                    postArray.push(post);
                });
        }
	};
})();