'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var previewWidth = document.querySelector('.ad-form__photo').offsetWidth;
  var previewHeight = document.querySelector('.ad-form__photo').offsetHeight;

  var setPicture = function (fileChooser, avatar, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (avatar) {
          preview.src = reader.result;
        } else {
          preview.src = reader.result;
          preview.width = previewWidth;
          preview.height = previewHeight;
          preview.style = 'border-radius: 5px;';
        }
      });

      reader.readAsDataURL(file);
    }
  };

  window.loadFiles = {
    setPicture: setPicture,
  };

})();
