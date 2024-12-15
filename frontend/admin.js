const apiUrl = "https://drawingkk.onrender.com"; // Backend URL

document.getElementById("clearDataButton").addEventListener("click", async () => {
    const confirmation = confirm("Are you sure you want to clear all prompts and drawings?");
    if (!confirmation) return;

    try {
        const response = await fetch(`${apiUrl}/kriskringle/clear`, { method: "DELETE" });
        const data = await response.json();

        document.getElementById("adminMessage").innerText = data.message;
    } catch (error) {
        document.getElementById("adminMessage").innerText = "Failed to reset the site.";
        console.error("Error clearing data:", error);
    }
});
