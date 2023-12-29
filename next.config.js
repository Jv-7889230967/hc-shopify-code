/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        // connectionString: "mongodb://127.0.0.1/next-js-registration-login-example",
        secret: 'jatin'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}

module.exports = {
    ...nextConfig,
    images: {
        domains: ['imgs.search.brave.com'],
    },
};
