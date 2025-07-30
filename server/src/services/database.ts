import mongoose from "mongoose";
import logger from "./getLogger";
import config from "../../config";

const connectDB = async () => {
  if (!config.database.uri)
    throw new Error(
      ".env doğru ayarladığınızdan emin olun. MONGODB_URI bulamadım"
    );

  try {
    const database = await mongoose.connect(
      (Bun.env.MONGODB_URI || process.env.MONGODB_URI)!,
      config.database.additionalConfig
    );

    switch (database.connection.readyState) {
      case 0:
        logger.critical("MongoDB sunucusundan bağlantı kesildi!");
        break;
      case 1:
        logger.info("MongoDB sunucusuna başarıyla bağlanıldı!");
        break;
      case 2:
        logger.info("MongoDB sunucusuna bağlanılıyor...");
        break;
      case 3:
        logger.error("MongoDB sunucusundan bağlantı kesiliyor...");
        break;
      case 99:
        logger.info("MongoDB sunucusu bağlantı kurulmadı.?");
        break;
      default:
        logger.warning("MongoDB sunucusundan bilinmedik yanıt geldi.")
    }

    return database;
  } catch (e) {
    logger.error("MongoDB bağlanırken bir hata oluştu", e as Error);
  }
};

export default { connectDB };
