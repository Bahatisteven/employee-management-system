module.exports = {
    parser : '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugins:@typescript-eslint/recommended',
        'prettier'
    ],
    env: {
        node: true,
        es6: true,
    },
};