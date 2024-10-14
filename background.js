chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "reportToEmail") {
      // Collect information for the report
      const reportData = {
          user: request.user,
          ip: sender.tab.url, // Placeholder for IP address
          timestamp: new Date()
      };

      // Send the report to your Node.js server
      fetch("http://localhost:3000/send-report", { // Make sure this URL matches your server's URL
          method: "POST",
          body: JSON.stringify(reportData),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
              console.log("Email report sent successfully");
          } else {
              console.error("Failed to send email report");
          }
      })
      .catch(error => {
          console.error("Error sending email report:", error);
      });
  }
});
