import '@testing-library/jest-dom';
import { updateThemeToggleIcon } from '../src/index';

describe('updateThemeToggleIcon', () => {
  let themeToggle: HTMLButtonElement;

  beforeEach(() => {
    themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    document.body.appendChild(themeToggle);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should set moon icon for light theme', () => {
    updateThemeToggleIcon(true, themeToggle);
    expect(themeToggle).toHaveTextContent('🌙');
  });

  test('should set sun icon for dark theme', () => {
    updateThemeToggleIcon(false, themeToggle);
    expect(themeToggle).toHaveTextContent('☀️');
  });

  test('should do nothing if themeToggle is null', () => {
    updateThemeToggleIcon(true, null);
    expect(themeToggle).toHaveTextContent('');
  });
});