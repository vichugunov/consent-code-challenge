module.exports = {
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  testRegex: ".*\\.spec\\.ts$",
  roots: [
    "<rootDir>/src/"
  ],
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!src/test-utils/*",
    "!src/main.ts",
    "!src/app.module.ts",
    "!src/db/database-connections.ts",
  ],
  "clearMocks": true,
  "coverageDirectory": "report/unit",
  "preset": "ts-jest",
  "automock": false,
  "testEnvironment": "node",
  "transform": {
    "^.+\\.ts$": "ts-jest"
  }
}
