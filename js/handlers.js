(function(){
    var handleImageError = function(element){
        $(element).parents('li').removeClass('ui-li-has-thumb');
        $(element).parent().append("&nbsp;");
        $(element).remove();
    }

    window.handleImageError = handleImageError;
})();