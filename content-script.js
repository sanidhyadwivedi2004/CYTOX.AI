// List of abusive words to check for
const abusiveWords = ["badword1", "badword2", "badword3"]; // Add more abusive words here

// Function to check messages for abusive content
function checkForAbuse(text) {
    const lowerCaseText = text.toLowerCase();
    return abusiveWords.some(word => lowerCaseText.includes(word));
}

// Monitor new messages in the chat
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            const newMessages = mutation.addedNodes;
            newMessages.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
                    if (checkForAbuse(node.textContent)) {
                        console.log("Abusive message detected:", node.textContent);
                        // Send a message to the background script to trigger the report
                        chrome.runtime.sendMessage({ action: "reportToEmail", user: "Instagram User", message: node.textContent });
                    }
                }
            });
        }
    });
});

// Start observing changes in the chat area (replace the selector with Instagram's chat container)
const chatContainer = document.querySelector('[aria-label="Messages"]');
if (chatContainer) {
    observer.observe(chatContainer, { childList: true, subtree: true });
}
