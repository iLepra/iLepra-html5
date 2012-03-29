// device specific functions
(function(){
    // check if connected to internet
    function isOnline() {
        var networkState = navigator.network.connection.type;

        if(networkState == Connection.NONE || networkState == Connection.UNKNOWN){
            return false;
        }else{
            return true;
        }
    }

    window.isOnline = isOnline;
})();