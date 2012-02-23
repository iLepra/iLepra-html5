/**
 ** Main iLepra class that handles all the logic
 */
iLepra = (function() {
    /***
     Processes given html string for captcha data
     ***/
    var processCaptcha = function(source){
        var captchaReg = /img alt="captcha" src="(.+?)"/g;
        var loginReg = /<input type="hidden" name="logincode" value="(.+?)"/g;

        iLepra.captchaURL = "http://leprosorium.ru" + captchaReg.exec(source)[1];
        iLepra.loginCode = loginReg.exec(source)[1];
    };

    /***
     Processes given html string for user's data
     ***/
    var processMain = function(data){
        // cleanup data
        data = data.replace(/\n+/g, '');
        data = data.replace(/\r+/g, '');
        data = data.replace(/\t+/g, '');
        // get mystuff wtf
        iLepra.myStuffWTF = /mythingsHandler.wtf = '(.+?)'/g.exec(data)[1];
        // get chat wtf
        iLepra.chat.wtf = /chatHandler.wtf = '(.+?)'/g.exec(data)[1];
        // get username
        iLepra.username = /<div id="greetings" class="columns_wrapper">.+?<a href=".+?">(.+?)<\/a>/g.exec(data)[1];
        // get sublepras
        iLepra.userSubLepras = [];

        // sub lepra regex
        var subReg = /<div class="sub"><strong class="logo"><a href="(.+?)" title="(.*?)"><img src="(.+?)" alt=".+?" \/>.+?<div class="creator">.+?<a href=".*?\/users\/.+?">(.+?)<\/a>/g;

        // get them all
        var res = subReg.exec(data);
        while(res != null){
            var sublepra = {
                name: res[2],
                creator: res[4],
                link: res[1],
                logo: res[3]
            }
            iLepra.userSubLepras.push(sublepra);

            res = subReg.exec(data);
        }
    };

    /***
     Processes given JSON object for latest posts
     ***/
    var processJSONPosts = function(posts){
        for(var i in posts){
            var post = {};
            // get img and short text
            var imgReg = /img src="(.+?)"/g
            var res = imgReg.exec(posts[i].body);
            var img = "";
            if( res != null ){
                // save first image as post image
                img = "http://src.sencha.io/80/80/"+res[1];

                posts[i].body = posts[i].body.replace(res[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+res[1]);
                // convert all image URIs to compressed ones
                res = imgReg.exec(posts[i].body);
                while(res != null){
                    posts[i].body = posts[i].body.replace(res[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+res[1]);

                    res = imgReg.exec(posts[i].body);
                }
            }/*else{
                img = ''//"../css/img/placeholder.png";
            }*/
            var text = posts[i].body.replace(/(<([^>]+)>)/ig," ").substr(0, 140);
            if(text.length == 140) text += "..";

            post.id = posts[i].id;
            post.body = posts[i].body;
            post.rating = posts[i].rating;
            post.domain_url = posts[i].domain_url;
            post.image = img;
            post.text = text;
            post.user = posts[i].login;
            post.comments = posts[i].comm_count + " / " + posts[i].unread;
            post.wrote = (posts[i].gender == 1 ? "Написал " : "Написала ") + posts[i].user_rank + " " +posts[i].login;
            post.when = posts[i].textdate + " в " + posts[i].posttime;

            if( iLepra.latestPosts.indexOf(post) == -1 ){
                iLepra.latestPosts.push(post);
            }
        }
    };

    var isMobile = function(){
            return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(webOS)|(PlayBook)/i) ? true : false;
    }

    // Define a local copy of iLepra
    return {
        //
        // events
        //
        events: {
            init: "iLepraInit",
            ready: "iLepraReady",
            update: "iLepraUpdate",
            error: "iLepraError"
        },

        //
        // app config
        //
        config: {
            loadImages: true,
            screenBiggest: 0,
            postIncrement: 20,
            defaultTapEvent: 'vclick' // vclick for test in browser, tap - for build on device
        },

        //
        // vars
        //

        // auth stuff
        isAuthenticated: false,
        loginCode: null,
        captchaURL: null,

        // error message
        errorMessage: null,

        // user data
        username: null,
        userSubLepras: null,

        // news data
        inboxNewPosts: null,
        inboxNewComments: null,
        karma: null,
        rating: null,
        voteweight: null,
        myNewComments: null,
        myNewPosts: null,

        // posts data
        latestPosts: null,
        postCount: null,

        // mystuff data
        myStuffPosts: null,
        myStuffWTF: null,
        // fav data
        favouritePosts: null,
        // inbox data
        inboxPosts: null,

        //
        // functions
        //

        /***
         Initializes iLepra for work, checks if user is
         logged in, gets captcha if not and posts if yes
         ***/
        init: function() {
            // detect device properties
            this.config.screenBiggest = window.screen.width > window.screen.height ? window.screen.width : window.screen.height;
            // detect platform and set default event
            if( isMobile() ) this.config.defaultTapEvent = 'tap';

            // get lepra
            $.get("http://leprosorium.ru", function(data){
                if(data.indexOf('<input type="password"') > 0){
                    processCaptcha(data);
                    iLepra.isAuthenticated = false;
                }else{
                    //iLepra.getLastPosts();
                    iLepra.isAuthenticated = true;

                    // process user's data
                    processMain(data);
                }
                // dispatch event
                $(document).trigger(iLepra.events.init);
            });
        },

        /***
         Tries logging in with given data
         ***/
        tryLogin: function(data){
            data.logincode = this.loginCode;

            $.post("http://leprosorium.ru/login/", data, function(data){
                if(data.indexOf('class="error"') > 0){
                    // get error
                    var errorReg = /<div class="error">(.+?)<\/div>/g;
                    iLepra.errorMessage = errorReg.exec(data)[1];

                    // get new captcha
                    processCaptcha(data);

                    // dispatch error event and die
                    $(document).trigger(iLepra.events.error);
                }else{
                    // process user's data
                    processMain(data);

                    // dispatch ready event
                    $(document).trigger(iLepra.events.ready);
                }
            });
        },

        /***
         Gets last posts from JSON interface
         ***/
        getNewsCounters: function(){
            $.ajax({
                url: "http://leprosorium.ru/api/lepropanel",
                dataType: 'json',
                error: function(request){
                    var res = $.parseJSON(request.responseText)

                    iLepra.inboxNewPosts = parseInt(res.inboxunreadposts);
                    iLepra.inboxNewComments = parseInt(res.inboxunreadcomms);
                    iLepra.karma = parseInt(res.karma);
                    iLepra.rating = parseInt(res.rating);
                    iLepra.voteweight = parseInt(res.voteweight);
                    iLepra.myNewComments = parseInt(res.myunreadcomms);
                    iLepra.myNewPosts = parseInt(res.myunreadposts);

                    $(document).trigger(iLepra.events.update);
                }
            });
        },

        /***
         Gets last posts from JSON interface
         ***/
        getLastPosts: function(){
            iLepra.postCount = 0;

            $.post("http://leprosorium.ru/idxctl/", {from:iLepra.postCount}, function(data){
                // convert string to object
                data = $.parseJSON(data);
                // init posts array
                iLepra.latestPosts = [];
                // parse
                processJSONPosts(data.posts);
                // trigger event
                $(document).trigger(iLepra.events.ready);
            });
        },

        /***
         Gets more posts from JSON interface from specified count
         ***/
        getMorePosts: function(){
            iLepra.postCount += 42;

            $.post("http://leprosorium.ru/idxctl/", {from:iLepra.postCount}, function(data){
                // convert string to object
                data = $.parseJSON(data);
                // parse
                processJSONPosts(data.posts);
                // trigger event
                $(document).trigger(iLepra.events.ready);
            });
        },

        /***
         Switches posts layout
         0 = mix of main & sub
         1 = only main
         2 = only sub
         ***/
        switchLayout: function(type){
            $.post("http://leprosorium.ru/threshold/", {
                showonindex: type,
                selected_threshold: "all"
            }, function(){
                iLepra.getLastPosts();
            });
        },


        /***
         Gets my stuff posts
         ***/
        getMyStuff: function(){
            $.get("http://leprosorium.ru/my/", function(data){
                    iLepra.myStuffPosts = [];
                    iLepra.util.processHTMLPosts(data, iLepra.myStuffPosts, undefined);
                    $(document).trigger(iLepra.events.ready);
            });
        },

        /***
         Gets favourite posts
         ***/
        getFavourites: function(){
            $.get("http://leprosorium.ru/my/favourites/", function(data){
                iLepra.favouritePosts = [];
                iLepra.util.processHTMLPosts(data, iLepra.favouritePosts, 'fav');
                $(document).trigger(iLepra.events.ready);
            });
        },

        /***
         Gets inboxes stuff
         ***/
        getInbox: function(){
            $.get("http://leprosorium.ru/my/inbox/", function(data){
                iLepra.inboxPosts = [];
                iLepra.util.processHTMLPosts(data, iLepra.inboxPosts, 'inbox');
                $(document).trigger(iLepra.events.ready);
            });
        }
    }
})();