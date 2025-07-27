// src/services/emailService.ts
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isInitialized: boolean = false;

  constructor() {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    try {
      // Development modunda email gönderme
      if (process.env.NODE_ENV === "development") {
        console.log("📧 Development mode: Email gönderimi devre dışı");
        return;
      }

      const port = parseInt(process.env.SMTP_PORT || "587");
      const isSecure = port === 465;

      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: port,
        secure: isSecure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
        // Timeout'ları optimize et
        connectionTimeout: 5000, // 5 saniye
        greetingTimeout: 5000,
        socketTimeout: 5000,
        pool: true, // Connection pooling kullan
        maxConnections: 5,
        maxMessages: 100,
        debug: false,
        logger: false,
      });

      // Verify işlemini asenkron yap
      if (this.transporter) {
        this.transporter.verify((error) => {
          if (error) {
            console.error("❌ Email servisi başlatılamadı:", error.message);
            this.transporter = null;
          } else {
            console.log("✅ Email servisi hazır");
            this.isInitialized = true;
          }
        });
      }
    } catch (error) {
      console.error("❌ Email servisi hatası:", error);
      this.transporter = null;
    }
  }

  async sendVerificationEmail(
    email: string,
    firstName: string,
    verificationCode: string
  ): Promise<void> {
    // Development modunda sadece logla
    if (process.env.NODE_ENV === "development" || !this.transporter) {
      console.log(`📧 [DEV] Doğrulama kodu: ${verificationCode} (${email})`);
      return;
    }

    try {
      const templatePath = path.join(
        process.cwd(),
        "src/templates/email-verification.hbs"
      );

      // Template'i cache'le
      const templateSource = await fs.readFile(templatePath, "utf-8");
      const template = handlebars.compile(templateSource);

      const html = template({
        firstName,
        verificationCode,
        appName: "ThinkNote",
        year: new Date().getFullYear(),
      });

      const info = await this.transporter.sendMail({
        from: `"ThinkNote" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Email Doğrulama - ThinkNote",
        html,
        text: `Merhaba ${firstName},\n\nThinkNote hesabınızı doğrulamak için kodunuz: ${verificationCode}\n\nBu kod 15 dakika içinde geçerliliğini yitirecektir.\n\nSaygılarımızla,\nThinkNote Ekibi`,
      });

      console.log(`✅ Email gönderildi: ${info.messageId}`);
    } catch (error: any) {
      console.error("❌ Email gönderim hatası:", error.message);
      // Production'da bile hata fırlatma, sadece logla
    }
  }
}
