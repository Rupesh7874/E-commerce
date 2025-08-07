const nodemailer = require('nodemailer');

function generateOTP() {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const generate_time = new Date();
    const expirationMinutes = 1;
    const expirationTime = new Date(generate_time.getTime() + expirationMinutes * 60 * 1000);

    return { otp, generate_time, expirationTime }; // all are Date objects
}



function sendmail(email, otp) {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "margie.schoen99@ethereal.email",
            pass: "7ymwkmNqSGJYRfyChU",
        },
    });
    // Wrap in an async IIFE so we can use await.
    (async () => {
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch" <brain.schowalter@ethereal.email>',
            to: email,
            subject: "send otp",
            text: otp, // plain‑text body
            html: otp
        });

        console.log("Message sent:", info.messageId);
    })();
}

module.exports = { generateOTP, sendmail }

// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: "brain.schowalter@ethereal.email",
//         pass: "1BB5wHbuFxQh9d3MZS",
//     },
// });

// const generateOTP = () => {
//     const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Example OTP generation
//     const expirationMinutes = 1; // Set your desired expiration time
//     const expirationTime = new Date(Date.now() + expirationMinutes * 60 * 1000); // Calculate expiration timestamp

//     return { otp, expirationTime };
// };
// const { otp, expirationTime } = generateOTP();
// console.log(otp, expirationTime);


// // Wrap in an async IIFE so we can use await.
// (async () => {
//     const info = await transporter.sendMail({
//         from: '"Maddison Foo Koch" <brain.schowalter@ethereal.email>',
//         to: email,
//         subject: "send otp",
//         text: otp, // plain‑text body
//         html: "<b>Hello world?</b>", // HTML body
//     });

//     console.log("Message sent:", info.messageId);
// })();

