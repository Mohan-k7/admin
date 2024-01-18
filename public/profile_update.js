// profile_update.js
$(document).ready(function () {
    // Add any profile update-related JavaScript logic here
    console.log('Profile update page loaded');

    // Example: Initialize Cropper.js for image cropping
    const image = document.getElementById('image');
    const cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 3,
        dragMode: 'move',
        autoCropArea: 0.8,
        cropBoxResizable: false,
        cropBoxMovable: false,
        toggleDragModeOnDblclick: false,
        ready: function () {
            // Do something when Cropper is ready
        }
    });

    // Example: Handling the 'Submit' button click event
    $('#submitBtn').on('click', function () {
        // Get cropped image data
        const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();

        // Do something with the cropped data, e.g., send it to the server
        console.log('Cropped Image Data:', croppedDataUrl);

        // Add additional logic for form submission
    });
});
