//http://docs.phonegap.com/en/1.0.0/phonegap_camera_camera.md.html#Camera

//image source
var imageSource;

//set format of returned value
var destinationType;

var onBodyLoad = function()
{
    document.addEventListener("deviceready",onDeviceReady,false);
    console.log('deviceready');
}

/* PhoneGap is initialized */
var onDeviceReady = function()
{
    phoneGapReady.innerHTML = "";
    imageSource=navigator.camera.imageSourceType;
    destinationType=navigator.camera.DestinationType;
    console.log('Initialize PhoneGap');
}

// Call when Image successfully received
var onPhotoDataSuccess = function(imageData) {
    
    // Get image handle
    var myImage = document.getElementById('myImage');
    
    // Unhide image elements
    myImage.style.display = 'block';
    
    // Show captured photo
    myImage.src = "data:image/jpeg;base64," + imageData;
    
}

// Called when image is received
var onPhotoURISuccess = function(imageURI) {
    
    // Get image handle
    var myImage = document.getElementById('myImage');
    
    // Unhide image elements
    myImage.style.display = 'block';
    
    // Show the captured photo
    myImage.src = imageURI;
}

// Use a button to call this
var captureImage = function() {
    
    // Take picture using device camera and retrieve image as base64-encoded string
    try {
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { 
                                    quality: 90,
                                    destinationType: destinationType.FILE_URI, 
                                    saveToPhotoAlbum: true  });
    }
    catch (err)
    {
        alert(err);
    }
}

// Use a button to call this.  Not working yet.
var captureImageEdit = function() {
    try {
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
                                    quality: 70, 
                                    allowEdit: true, 
                                    saveToPhotoAlbum: true  });
    }catch (err)
    {
        alert(err);
    }
}

// Use a button to call this.  Not working yet.
var getPhoto = function(source) {
    
    try {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { 
                                    quality: 50,
                                    destinationType: destinationType.FILE_URI,
                                    sourceType: source, 
                                    saveToPhotoAlbum: true });
    }catch (err)
    {
        alert(err);
    }
}

function onFail(message) {
    
    alert('Failed: ' + message);
}

// Save Photo to LocalStorage

// Upload Photo to Server

// Share link to Photo on Facebook

// Email Photo