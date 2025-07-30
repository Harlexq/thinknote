export default {
    debug: !!!Bun.env.NODE_ENV,

    database: {
        uri: Bun.env.MONGODB_URI || process.env.MONGODB_URI || "",
        additionalConfig: {}
    },

    language: {
        default: "en"
    },

    frontend: {
        url: "http://localhost:3000"
    }
}