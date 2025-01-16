import nodemailer from "nodemailer";
import { UserType } from "types/userType";
import dotenv from "dotenv";
dotenv.config();

const { SMTP_USER, SMTP_PASSWORD, SMTP_HOST, BACKEND_URL, SMTP_PORT } =
  process.env;

if (!SMTP_USER || !SMTP_PASSWORD || !SMTP_HOST || !BACKEND_URL || !SMTP_PORT) {
  throw new Error("missing info");
}

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
      subject: "Confirm email adress ✔",
      text: `just click link ${BACKEND_URL}/verifyUser/${user.verificationToken}`,
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Witaj!</h2>
    <p>
      Dziękujemy za rejestrację w <strong>My_Shop</strong>. Aby zakończyć proces rejestracji, kliknij poniższy link, aby potwierdzić swój adres e-mail:
    </p>
    <p style="text-align: center; margin: 20px 0;">
      <a href="${BACKEND_URL}/verifyUser/${user.verificationToken}" 
         style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
         Potwierdź adres e-mail
      </a>
    </p>
    <p>
      Jeśli nie rejestrowałeś/aś się w My_Shop, zignoruj tę wiadomość.
    </p>
    <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">
    <p style="font-size: 0.9em; color: #555;">
      Pozdrawiamy,<br>
      Zespół My_Shop
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

