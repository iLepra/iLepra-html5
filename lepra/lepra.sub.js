iLepra.sub = (function() {
    return {
        list: null,
        posts: null,
        fetch: true,

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
            $.get(url, function(data){
                iLepra.sub.posts = [];
                iLepra.util.processHTMLPosts(data, iLepra.sub.posts, undefined);
                $(document).trigger(iLepra.events.ready);
            });
        }
    };
})();
