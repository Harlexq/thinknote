const AUTH_MESSAGES = {
  tr: {
    USER_ALREADY_FOUND: "Kullanıcı zaten mevcut",
    PROBLEM_CREATING_USER: "Kullanıcı oluşturulurken hata oluştu",
    PASSWORDS_DO_NOT_MATCH: "Şifreler eşleşmiyor",
    INVALID_CREDENTIALS: "Geçersiz giriş bilgileri",
    SIGN_UP_SUCCESS: "Kayıt başarıyla tamamlandı",
    SIGN_IN_SUCCESS: "Giriş başarılı",
    INVALID_REFRESH_TOKEN: "Geçersiz veya süresi dolmuş yenileme tokeni",
    USER_NOT_FOUND: "Kullanıcı bulunamadı",
    TOKEN_REFRESHED: "Token başarıyla yenilendi"
  },
  en: {
    USER_ALREADY_FOUND: "User already exists",
    PROBLEM_CREATING_USER: "Problem creating user",
    PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
    INVALID_CREDENTIALS: "Invalid credentials",
    SIGN_UP_SUCCESS: "Registration completed successfully",
    SIGN_IN_SUCCESS: "Sign in successful",
    INVALID_REFRESH_TOKEN: "Invalid or expired refresh token",
    USER_NOT_FOUND: "User not found",
    TOKEN_REFRESHED: "Token refreshed successfully"
  },
};

export type Language = keyof typeof AUTH_MESSAGES;

export default AUTH_MESSAGES;