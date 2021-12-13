// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "../../__mocks__/modules";

const originConsoleErr = console.error;
console.error = (message, ...optionalParams) => {
  if (/Not implemented: navigation/.exec(message)) return;
  originConsoleErr(message, ...optionalParams);
};

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  observe() {
    return null;
  }

  disconnect() {
    return null;
  }

  unobserve() {
    return null;
  }
};
