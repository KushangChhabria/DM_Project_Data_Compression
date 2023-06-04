document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('file-input');
    var convertBtn = document.getElementById('convert-btn');
    var selectedFilesContainer = document.getElementById('selected-files');

    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            convertBtn.disabled = false;
        } else {
            convertBtn.disabled = true;
        }

        // Display selected files
        selectedFilesContainer.innerHTML = '';
        for (var i = 0; i < fileInput.files.length; i++) {
            var fileName = fileInput.files[i].name;
            var fileElement = document.createElement('p');
            fileElement.textContent = fileName;
            selectedFilesContainer.appendChild(fileElement);
        }
    });
    
    convertBtn.addEventListener('click', function() {
        var zip = new JSZip();

        Array.from(fileInput.files).forEach(function(file) {
            zip.file(file.name, file);
        });

        zip.generateAsync({ type: 'blob' }).then(function(content) {
            saveAs(content, 'files.zip');
        });
    });
});