module.exports = {
  roots: ["src"],
  preset: "ts-jest",
  transformIgnorePatterns: [
    "node_modules/(?!(lodash-es)/)"
  ]
};
