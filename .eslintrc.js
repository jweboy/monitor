module.exports = {
    parser:'babel-eslint',  // for es6 code
    extends: ['eslint:recommended', 'airbnb', 'prettier'], // for react remove airbnb-base
    plugins: ['prettier', 'react'],
    parserOptions: {
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true, // for react
      },
    },
    rules: {
      'no-console': 1,
      'prettier/prettier': ['error'],
      'consistent-return': 0,
      /* add react part */
      "react/prefer-stateless-function": [1, {"ignorePureComponents": true}], // class component与 pure function 声明提示
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      // 支持 .js .jsx 文件后缀
      "react/jsx-wrap-multilines": [2, { declaration: "parens" }],
      // 新标签开头另起一行
    }
  };
