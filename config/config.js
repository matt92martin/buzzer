module.exports = {
    development: {
        dialect: 'postgres',
        url: process.env.DATABASE_URL,
    },
    production: {
        dialect: 'postgres',
        use_env_variable: 'DATABASE_URL',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
}
