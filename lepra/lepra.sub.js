iLepra.sub = (function() {
    return {
        list: null,
        posts: null,
        fetch: true,
        postCount: 0,

        getList: function(shift){
            $.get("http://leprosorium.ru/underground/", function(data){
                // cleanup data
                data = data.replace(/\n+/g, '');
                data = data.replace(/\r+/g, '');
                data = data.replace(/\t+/g, '');

                iLepra.sub.list = [];

                var subReg = /<strong class="jj_logo"><a href="(.+?)"><img src="(.+?)" alt="(.*?)" \/>.+?<a href=".*?\/users\/.+?">(.+?)<\/a>/g;
                var res = subReg.exec(data);

                while(res != null){
                    var name = res[3] ? res[3] : res[1];

                    var sublepra = {
                        name: name,
                        creator: res[4],
                        link: res[1],
                        logo: res[2]
                    }
                    iLepra.sub.list.push(sublepra);

                    res = subReg.exec(data);
                }

                // dispatch event
                $(document).trigger(iLepra.events.ready);
            });
        },

        getPosts: function(url){
            // get data
            iLepra.sub.postCount = 0;
            $.post(url+"/idxctl/", {from:iLepra.sub.postCount}, function(data){
                // convert string to object
                data = $.parseJSON(data);
                // init posts array
                iLepra.sub.posts = [];
                // parse
                iLepra.util.processJSONPosts(data.posts, iLepra.sub.posts);
                // trigger event
                $(document).trigger(iLepra.events.ready);
            });
        },

        getMorePosts: function(url){
            iLepra.sub.postCount += 42;

            $.post(url+"/idxctl/", {from:iLepra.sub.postCount}, function(data){
                // convert string to object
                data = $.parseJSON(data);
                // parse
                iLepra.util.processJSONPosts(data.posts, iLepra.sub.posts);
                // trigger event
                $(document).trigger(iLepra.events.ready);
            });
        }
    };
})();
