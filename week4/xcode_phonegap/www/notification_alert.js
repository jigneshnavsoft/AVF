// api-notification
var showAlert = function() {
    function alertDismissed() {
        console.log("Alert Dismissed");
    }
    navigator.notification.alert(
                                 'Alert Message Here',  // message
                                 alertDismissed,        // callback
                                 'Alert Title',         // title
                                 'Done'                 // buttonName
                                 );    
};

var showConfirm = function() {
    function onConfirm(button) {
        alert('You chose button ' + button);
    }
    navigator.notification.confirm(
                                   'Confirmation Message', // message
                                   onConfirm,              // callback to invoke with index of button pressed
                                   'Confirmation Title',   // title
                                   'ReStart,Exit'          // buttonLabels
                                   );    
};
//research this to add custom sounds
//var beep = function() {
//    navigator.notification.beep(2);
//};
//var vibrate = function() {
//    navigator.notification.vibrate(0);
//};

