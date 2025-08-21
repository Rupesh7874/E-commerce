const cron = require('node-cron');
const usermodel = require('../models/user.model');


cron.schedule('* * * * *', async () => {
    console.log("Running expire otp cleanup");
    const now = new Date();

    try {
        const users = await usermodel.find({ "otp_history.4": { $exists: true } });
        // console.log("users",users);
        
        for (let user of users) {
            const otphistory = user.otp_history;
            if (otphistory.length !== 5) continue;

            const letestOtp = otphistory[otphistory.length - 1];
            // console.log("letestOtp", letestOtp);
            
            const lastGeneratetime = new Date(letestOtp.generate_time);
            // console.log("lastGeneratetime", lastGeneratetime);

          
            if (now.getTime() - lastGeneratetime.getTime() > 1 * 60 * 1000) {
                user.otp_history = [];
                await user.save();

                console.log(`✅ Deleted expired 5 OTPs for: ${user.email}`);
            }
        }
    } catch (error) {
        console.error("cron error:", error);
    }
});
