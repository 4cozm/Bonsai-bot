export default {
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };