/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  roots: ["<rootDir>/src"],

  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  detectOpenHandles: true,

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/src/__tests__/",
    "/src/config/",
    "/src/Models/",
    "/src/Routers/"
  ]
}