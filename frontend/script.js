const apiUrl = "https://drawingkk.onrender.com"; // Update with your backend URL

// Add a Prompt
document.getElementById("addPromptForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = document.getElementById("promptInput").value;

    const response = await fetch(`${apiUrl}/kriskringle/prompts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    document.getElementById("addPromptMessage").innerText = data.message;
});

// Get a Random Prompt
document.getElementById("getPromptButton").addEventListener("click", async () => {
    try {
        const response = await fetch(`${apiUrl}/kriskringle/prompt`);
        if (!response.ok) {
            if (response.status === 404) {
                document.getElementById("randomPromptDisplay").innerText = "No prompts left!";
            } else {
                document.getElementById("randomPromptDisplay").innerText = "Error fetching prompt!";
            }
            return;
        }

        const data = await response.json();
        document.getElementById("randomPromptDisplay").innerText = data.prompt || "No prompt available!";
    } catch (error) {
        document.getElementById("randomPromptDisplay").innerText = "Failed to fetch prompt!";
        console.error("Error:", error);
    }
});

// Submit Completed Drawing
document.getElementById("submitDrawingForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("drawingTitleInput").value;
    const file = document.getElementById("drawingFileInput").files[0];

    if (!file) {
        document.getElementById("submitDrawingMessage").innerText = "Please select a file!";
        return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
        const response = await fetch(`${apiUrl}/kriskringle/completed`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, image: reader.result }),
        });

        const data = await response.json();
        document.getElementById("submitDrawingMessage").innerText = data.message;
    };

    reader.readAsDataURL(file);
});

// Get All Completed Drawings
document.getElementById("getCompletedDrawingsButton").addEventListener("click", async () => {
    const response = await fetch(`${apiUrl}/kriskringle/completed`);
    const data = await response.json();

    const container = document.getElementById("completedDrawingsContainer");
    container.innerHTML = "";

    data.forEach((drawing) => {
        const img = document.createElement("img");
        img.src = drawing.image;
        const caption = document.createElement("p");
        caption.innerText = `Title: ${drawing.title}`;
        container.appendChild(img);
        container.appendChild(caption);
    });
});
