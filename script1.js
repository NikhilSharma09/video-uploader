const videoUploader = (function () {
  const fileInput = document.getElementById('fileInput');
  const videoPreview = document.getElementById('videoPreview');
  let selectedOption;

  function handleFileSelect(event) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

      const fileReader = new FileReader();

      fileReader.onload = function (e) {
        videoPreview.src = e.target.result;
      };

      fileReader.readAsDataURL(selectedFile);
    }
  }

  function selectOption(option) {
    selectedOption = option;
    alert('Selected Option: ' + selectedOption);
  }

  function playPause() {
    if (videoPreview.paused) {
      videoPreview.play();
    } else {
      videoPreview.pause();
    }
  }

  function rewind() {
    videoPreview.currentTime -= 5; // Rewind 5 seconds
  }

  function fastForward() {
    videoPreview.currentTime += 5; // Fast forward 5 seconds
  }

  function submitForm(event) {
    if (!selectedOption) {
      alert('Please select an option before submitting.');
      return;
    }

    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);

    formData.append('option', selectedOption);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error connecting to the server. Please try again later.');
    });
    event.preventDefault();
  }

  return {
    init: function () {
      fileInput.addEventListener('change', handleFileSelect);
      document.getElementById('playPauseButton').addEventListener('click', playPause);
      document.getElementById('rewindButton').addEventListener('click', rewind);
      document.getElementById('fastForwardButton').addEventListener('click', fastForward);
      document.getElementById('submitButton').addEventListener('click', submitForm);
      document.getElementById('malpracticeRadio').addEventListener('click', function() {
        selectOption('Malpractice');
      });
      document.getElementById('noMalpracticeRadio').addEventListener('click', function() {
        selectOption('No Malpractice');
      });
      document.getElementById('othersRadio').addEventListener('click', function() {
        selectOption('Others');
      });
    },
    selectOption: selectOption,
    playPause: playPause,
    rewind: rewind,
    fastForward: fastForward,
    submitForm: submitForm,
  };
})();

videoUploader.init();
