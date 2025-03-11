import nodemailer from "nodemailer";
import { UserType } from "types/userType";
import dotenv from "dotenv";
dotenv.config();

const { SMTP_USER, SMTP_PASSWORD, SMTP_HOST, BACKEND_URL, SMTP_PORT } =
  process.env;

if (!SMTP_USER || !SMTP_PASSWORD || !SMTP_HOST || !BACKEND_URL || !SMTP_PORT) {
  throw new Error("missing info");
}

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASSWORD);
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("BACKEND_URL:", process.env.BACKEND_URL);

const createTransporter = (user: UserType) => {
  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    throw new Error("Invalid or missing user email address");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV !== "production" ? false : true,
    },
    ...(process.env.NODE_ENV !== "production" && { logger: true, debug: true }),
  });
};

export const sendVerificationEmail = async (user: UserType) => {
  const transporter = createTransporter(user);

  try {
    let info = await transporter.sendMail({
      from: `My_Shop ✉ <${SMTP_USER}>`,
      to: `${user.email}`,
      subject: "Confirm email address ✔",
      text: `Just click the link ${BACKEND_URL}/verifyUser/${user.verificationToken}. Please note that your account will be deleted if not verified within 24 hours.`,
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Hello!</h2>
    <p>
      Thank you for registering with <strong>My_Shop</strong>. To complete your registration, please click the link below to confirm your email address:
    </p>
    <p style="text-align: center; margin: 20px 0;">
      <a href="${BACKEND_URL}/verifyUser/${user.verificationToken}" 
         style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
         Confirm Email Address
      </a>
    </p>
    <p>
      Please note that if your account is not verified within 24 hours, it will be automatically deleted.
    </p>
    <p>
      If you did not register with My_Shop, please ignore this email.
    </p>
    <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">
    <p style="font-size: 0.9em; color: #555;">
      Best regards,<br>
      The My_Shop Team
    </p>
  </div>
`,
    });

    console.log("Email sent successfully:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendConfirmResetPasswordEmail = async (user: UserType) => {
  const transporter = createTransporter(user);

  try {
    let info = await transporter.sendMail({
      from: `My_Shop ✉ <${SMTP_USER}>`,
      to: `${user.email}`,
      subject: "Reset Your Password - My_Shop ✔",
      text: `Hello ${user.name},\n\nWe received a request to reset your password. Click the link below to reset it:\n${BACKEND_URL}/resetPassword/${user.verificationToken}\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe My_Shop Team`,
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #4CAF50; text-align: center;">Reset Your Password</h2>
    <p>Hi <strong>${user.name}</strong>,</p>
    <p>
      We received a request to reset your password. To reset your password, please click the button below:
    </p>
    <p style="text-align: center; margin: 20px 0;">
      <a href="${BACKEND_URL}/resetPassword/${user.verificationToken}"
         style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px;">
         Reset Password
      </a>
    </p>
    <p>
      If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
    </p>
    <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="font-size: 0.9em; color: #555; text-align: center;">
      Need help? Contact our support team at <a href="mailto:support@myshop.com" style="color: #4CAF50;">support@myshop.com</a>.
    </p>
    <p style="font-size: 0.9em; color: #555; text-align: center;">
      Best regards,<br>
      <strong>The My_Shop Team</strong>
    </p>
  </div>
`,
    });

    console.log("Email sent successfully:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendNewPassword = async (user: UserType, newPass: string) => {
  const transporter = createTransporter(user);

  try {
    const info = await transporter.sendMail({
      from: `My_Shop ✉ <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Reset Password Request ✔",
      text: `Hello ${user.name},\n\nYour new password is: ${newPass}\n\nPlease log in using this password and change it immediately for security reasons.\n\nBest regards,\nMy_Shop Team`,
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Hello ${user.name},</h2>
    <p>
      You have requested a password reset. Your new password is:
    </p>
    <p style="text-align: center; margin: 20px 0; font-size: 1.2em; font-weight: bold; color: #333;">
      ${newPass}
    </p>
    <p>
      Please log in using this password and change it immediately for security reasons.
    </p>
    <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">
    <p style="font-size: 0.9em; color: #555;">
      Best regards,<br>
      My_Shop Team
    </p>
  </div>
      `,
    });

    console.log("Email sent successfully:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
