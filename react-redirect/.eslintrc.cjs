module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
      "airbnb",
      "airbnb-typescript",
      "airbnb/hooks",
      "plugin:import/errors",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "settings": {
      "react": {
        "version": "detect"
      },
      "import/resolver": {
        "alias": {
          "extensions": [".js", ".jsx", ".ts", ".tsx"],
          "map": [
            ["@", "./src"]
          ]
        }
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
