module.exports = {

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],

  transform: {

    '^.+\\.vue$': 'vue-jest',

    '^.+\\.ts$': 'ts-jest',

    '^.+\\.js$': 'babel-jest'

  },

  testEnvironment: 'jsdom'

}

