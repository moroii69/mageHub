function resizeImage(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          canvas.width = 1280;
          canvas.height = 853;
  
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          const resizedDataUrl = canvas.toDataURL('image/jpeg');
          const downloadLink = document.getElementById('downloadLink');
          // setting the href attribute to data URL
          downloadLink.href = resizedDataUrl;
          // showing the download link
          downloadLink.style.display = 'inline';
  
          // for pc users, adding download attribute to ancchor element
          downloadLink.setAttribute('download', 'resized_image.jpg');
  
          // for phone users, directly download the file when the download button is clicked
          downloadLink.onclick = function() {
            if (window.innerWidth < 768) {
              const a = document.createElement('a');
              a.href = resizedDataUrl;
              a.download = 'resized_image.jpg';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          };
  
          const progress = document.querySelector('.progress-bar');
          progress.style.width = '100%';
        };
      };
  
      reader.readAsDataURL(file);
    }
  }
  