module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error"
    }
}
