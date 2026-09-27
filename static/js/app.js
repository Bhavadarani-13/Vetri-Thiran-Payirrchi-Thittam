async function askQuestion() {
    const question = document.getElementById("question").value;
    const result = document.getElementById("result");

    if (!question.trim()) {
        result.innerText = "Please enter a question.";
        return;
    }

    result.innerText = "Thinking...";

    try {
        const response = await fetch("/qa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        result.innerText = data.result || data.answer || "No answer received.";

    } catch (error) {
        console.error(error);
        result.innerText = "Error: " + error.message;
    }
}