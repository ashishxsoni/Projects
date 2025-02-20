const fileInput = document.getElementById("fileInput");
const uploadForm = document.getElementById("uploadForm");
const progressBar = document.getElementById("progressBar");
const statusText = document.getElementById("statusText");

// Reset progress bar and status text when a new file is selected
// fileInput.addEventListener("focus", () => {
fileInput.addEventListener("blur", () => { // this event we can use focus blur , change , but focus blur is good to use
    progressBar.style.width = "0%"; // Reset progress bar
    statusText.textContent = "No file selected"; // Reset status text
    const file = fileInput.files[0];
    if (file) {
        statusText.textContent = `Selected file: ${file.name}`;
    }
});

uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const file = fileInput.files[0];
    if (!file) {
        statusText.textContent = "Please select a file first";
        return;
    }

    const formData = new FormData();
    formData.append("myFile", file);

    statusText.textContent = "Uploading...";
    progressBar.style.width = "0%"; // Reset progress bar before starting

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const reader = response.body.getReader();
            console.log("Headers" ,response.headers);
            const contentLength = +response.headers.get("Content-Length") || 100; // Fallback to 100 if not provided
            let receivedLength = 0;

            const processStream = async () => {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    receivedLength += value.length;

                    const percentComplete = (receivedLength / contentLength) * 100;
                    progressBar.style.width = `${Math.min(percentComplete, 100)}%`; // Prevent exceeding 100%
                }
            };

            await processStream();

            statusText.textContent = "File uploaded successfully!";
            progressBar.style.width = "100%";
        } else {
            statusText.textContent = "Upload failed. Please try again.";
            progressBar.style.width = "0%";
        }
    } catch (error) {
        statusText.textContent = "Error uploading file.";
        progressBar.style.width = "0%";
    }
});