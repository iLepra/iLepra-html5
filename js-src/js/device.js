// device specific functions
(function(){
    // check if connected to internet
    function isOnline() {
        var networkState = navigator.network.connection.type;

        if(networkState == Connection.NONE){ //){
            return false;
        }else{
            return true;
        }
    }

    function isOldAndroid() {
        var dv = device.version.split(".");
        if( parseInt(dv[0]) < 3 ){
            return true;
        }else{
            return false;
        }
    }

    window.isOnline = isOnline;
    window.isOldAndroid = isOldAndroid;
})();