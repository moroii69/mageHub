function resizeImage(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    const message = document.getElementById('message');

    // clear any previous messages
    message.textContent = '';
    message.style.display = 'none';
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.style.display = 'none';

    if (file) {
        // check the file type
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
        if (!validImageTypes.includes(file.type)) {
            message.textContent = 'Invalid file format. Please upload a valid image file.';
            message.style.display = 'block';
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    canvas.width = 1280;
                    canvas.height = 853;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const resizedDataUrl = canvas.toDataURL('image/jpeg');
                    // setting the href attribute to data URL
                    downloadLink.href = resizedDataUrl;
                    // showing the download link
                    downloadLink.style.display = 'inline';

                    // for pc users, adding download attribute to anchor element
                    downloadLink.setAttribute('download', 'resized_image.jpg');

                    // for phone users, directly download the file when the download button is clicked
                    downloadLink.onclick = function () {
                        if (window.innerWidth < 768) {
                            const a = document.createElement('a');
                            a.href = resizedDataUrl;
                            a.download = 'resized_image.jpg';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        }
                    };

                    // display success message
                    message.textContent = 'Your file has been resized!';
                    message.style.display = 'block';

                } catch (error) {
                    message.textContent = 'An error occurred while resizing the image. Please try again.';
                    message.style.display = 'block';
                    console.error('Error resizing image:', error);
                }
            };

            img.onerror = function () {
                message.textContent = 'Invalid image file. Please upload a valid image.';
                message.style.display = 'block';
            };
        };

        reader.onerror = function () {
            message.textContent = 'An error occurred while reading the file. Please try again.';
            message.style.display = 'block';
        };

        try {
            reader.readAsDataURL(file);
        } catch (error) {
            message.textContent = 'An error occurred. Please upload a valid file.';
            message.style.display = 'block';
            console.error('Error reading file:', error);
        }
    } else {
        message.textContent = 'No file selected. Please choose a file to upload.';
        message.style.display = 'block';
    }
}
