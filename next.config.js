module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        AUTH_API_BASE_URL: process.env.AUTH_API_BASE_URL,
        APP_ENV: process.env.APP_ENV,
    },
};
