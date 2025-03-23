async function loadQA() {
    let response = await fetch("data.txt");
    let text = await response.text();
    let lines = text.split("\n");
    let qa = {};
    lines.forEach(line => {
        let parts = line.split("|");
        if (parts.length === 2) {
            let questions = parts[0].split(",").map(q => q.trim().toLowerCase());
            let answer = parts[1].trim();
            questions.forEach(q => qa[q] = answer);
        }
    });
    return qa;
}

async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let userMessage = inputField.value.trim();
    if (!userMessage) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>Siz:</strong> ${userMessage}</p>`;

    let qa = await loadQA();
    let response = "Kechirasiz, tushunmadim.";

    let lowerMessage = userMessage.toLowerCase();
    for (let key in qa) {
        if (lowerMessage.includes(key)) {
            response = qa[key];
            break;
        }
    }

    chatBox.innerHTML += `<p><strong>AI:</strong> ${response}</p>`;
    inputField.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}
