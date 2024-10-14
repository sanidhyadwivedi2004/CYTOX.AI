const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Email setup: Use your email and password here
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com',  // Replace with your email
        pass: 'your-email-password'    // Replace with your email password
    }
});

// API endpoint to send email
app.post('/send-report', (req, res) => {
    const { user, ip, timestamp } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',  // Your email
        to: 'your-email@gmail.com',    // Your email to receive the report
        subject: 'Suspicious Activity Report',
        text: `User: ${user}\nIP: ${ip}\nTimestamp: ${timestamp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
