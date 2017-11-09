// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  // 'settings': {
  //   'import/resolver': {
  //     'webpack': {
  //       'config': 'build/webpack.base.conf.js'
  //     }
  //   }
  // },
  // add your custom rules here
  'rules': {
    // // don't require .vue extension when importing
    // 'import/extensions': ['error', 'always', {
    //   'js': 'never',
    //   'vue': 'never'
    // }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow dangling commas in arrays and objects
    "comma-dangle": ["error", {
        "arrays": "ignore",
        "objects": "ignore",
        "imports": "never",
        "exports": "never",
        "functions": "ignore"
    }],
    // allow no spaces before function parentheses
    "space-before-function-paren": ["error", {
        "anonymous": "ignore",
        "named": "ignore",
        "asyncArrow": "ignore"
    }],
    "no-extend-native": ["error", { "exceptions": ["String"] }],
    // Force operators to be at the beginning of line breaks (e.g. '+ "more string"')
    "operator-linebreak": ["error", "before"],
    // allow js Strings to be extended
    "no-extend-native": ["error", { "exceptions": ["String"] }],
    // Allow if/else without {}
    "curly": "off",
    // Allow "return" on its own
    "no-useless-return": "off"
  }
}
