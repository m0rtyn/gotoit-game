// .eslintrc.js is prioritised over other eslintrc formats

module.exports = {
    'extends': [
        'eslint-config-react-app',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:promise/recommended",
        "plugin:lodash/recommended",
        "plugin:destructuring/recommended"
    ],
    "plugins": [
        "react",
        "security",
        "import",
        "compat",
        "promise",
        "prefer-object-spread",
        "destructuring",
        "lodash"
    ],
    rules: {
        'jsx-a11y/accessible-emoji': 0,
        'jsx-a11y/alt-text': 0,
        'jsx-a11y/anchor-has-content': 0,
        'jsx-a11y/anchor-is-valid': 0
    }
};