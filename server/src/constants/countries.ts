const COUNTRY_MESSAGES = {
  tr: {
    SUCCESSFULL_RESPONSE: "Ülke verileri başarıyla getirildi",
    SERVER_ERROR: "Ülke verileri getirilirken bir sorun oluştu",
  },
  en: {
    SUCCESSFULL_RESPONSE: "Country data successfully retrieved",
    SERVER_ERROR: "An error occurred while retrieving country data",
  },
};

export type Language = keyof typeof COUNTRY_MESSAGES;

export default COUNTRY_MESSAGES;