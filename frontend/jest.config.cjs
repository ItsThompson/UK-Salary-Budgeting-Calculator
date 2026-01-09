module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          verbatimModuleSyntax: false,
          module: "commonjs",
          strict: false,
        },
      },
    ],
  },
  testMatch: ["**/__tests__/**/*.(ts|tsx)", "**/*.(test|spec).(ts|tsx)"],
};
