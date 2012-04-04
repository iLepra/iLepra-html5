var borderColors = [
    "#000000",
    "#660000",
    "#cc3333",
    "#663399",
    "#0066cc",
    "#66cccc",
    "#669900",
    "#666600",
    "#cccc33",
    "#ffcc33",
    "#ff6600",
    "#996633",
    "#999999",
    "#cccccc",
    "#333333"
],

postTemplate = '\
            <li data-icon="false">\
                <a href="#" class="postListItem" data-id="<%= id %>">\
                    <% if(text.length < 5 && iLepra.config.loadImages && image.length > 0){ %>\
                        <div>\
                            <img src="<%= image.replace("http://src.sencha.io/80/80/", "http://src.sencha.io/"+iLepra.config.screenBiggest+"/") %>" />\
                        </div>\
                    <% }else{ %>\
                        <% if(iLepra.config.loadImages && image.length > 0){ %>\
                            <img src="<%= image %>" class="postThumb" />\
                        <% } %>\
                        <h3 style="white-space:normal; font-weight:normal;"><%= text %></h3>\
                        <p><% if(domain_url != ""){ %><%= domain_url %> <% } %></p>\
                    <% } %>\
                </a>\
            </li>\
            <li data-role="list-divider" class="postInfo" data-user="<%= user %>">\
                <img />\
                <b><%= user %></b>, \
                <span style="font-size:80%;">\
                <img src="../css/img/comment_16.png" class="iconImage" />\
                <% if(comments.indexOf("/") != -1){ %>\
                <b><%= comments %></b>,\
                <% }else{ %>\
                <%= comments %>,\
                <% } %>\
                <%= when %></span>\
                <% if(rating != undefined && rating.length > 0 && rating != 0){ %>, \
                    <span style="font-weight: bold; color: \
                    <% if( rating >= 0 ){ %>#157B25<% }else{ %>\
                        #824E48<% } %>\
                    "><%= rating %></span> \
                <% } %>\
            </li>',

subsTemplate = '\
            <li>\
                <a href="#" class="subListItem" data-link="<%= link %>">\
                    <% if(iLepra.config.loadImages){ %><img src="<%= logo %>" class="postThumb" /><% } %>\
                    <h1><%= name %></h1>\
                    <p><%= creator %></p>\
                </a>\
            </li>',

commentTemplate = '\
            <li data-id="<%= id %>" data-user="<%= user %>" class="<%= newClass %>" <%= style %>>\
                <p class="commentText"><%= text %></p>\
                <div style="display:none;" class="commentsMenu">\
                    <a href="#" class="reply"><img src="../css/img/reply_32.png" /></a>\
                    <a href="#" class="voteup" style="float:right; \
                    <% if(vote == 1){ %>opacity: 1;<% }else{ %> opacity: 0.3; <% } %>\
                    "><img src="../css/img/voteup_32.png" /></a>\
                    <a href="#" class="votedown" style="float:right; \
                    <% if(vote == -1){ %>opacity: 1;<% }else{ %> opacity: 0.3; <% } %>\
                    "><img src="../css/img/votedown_32.png" /></a>\
                </div>\
            </li>\
            <li data-role="list-divider" class="postInfo" data-user="<%= user %>" <%= style %>>\
                <img />\
                <b><%= user %></b>, \
                <%= when %></span>\
                <% if(rating != undefined && rating.length > 0 && rating != 0){ %>, \
                    <span style="font-weight: bold; color: \
                    <% if( rating >= 0 ){ %>#157B25<% }else{ %>\
                        #824E48<% } %>\
                    "><%= rating %></span> \
                <% } %>\
            </li>',

chatTemplate = '\
            <li data-icon="false"  class="chatMessage commentText" data-user="<%= user_login %>">\
                <p class="commentText"><%= body %></p>\
            </li>\
            <li data-role="list-divider" class="postInfo">\
                <b><%= user_login %></b>, \
                <%= createdate %></span>\
            </li>';