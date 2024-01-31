
import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// email sender
async function sendVerificationEmail(email: string, otp: string) {
  try {
    
    console.log("Email sent successfully: ", );
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

OtpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);

export default Otp