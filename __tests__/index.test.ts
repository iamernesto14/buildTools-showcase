import '@testing-library/jest-dom';
import { initializeApp } from '../src/index';
import type { BuildToolsData } from '../src/types';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        build_tools: [
          {
            name: 'Webpack',
            category: 'Bundler',
            description: 'Module bundler',
            icon_url: '/icons/webpack.png',
            website: 'https://webpack.js.org',
            use_cases: ['Bundling JavaScript'],
            key_features: ['Module federation'],
          },
        ],
      } as BuildToolsData),
  } as Response)
);

jest.mock('moment', () => {
  const momentMock = () => ({
    format: jest.fn(() => 'May 30, 2025'),
  });
  momentMock.__esModule = true;
  momentMock.default = momentMock;
  return momentMock;
});

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

describe('initializeApp', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="theme-toggle"></button>
      <div id="build-tools"></div>
      <footer><p>Copyright 2025</p></footer>
    `;
    document.body.className = '';
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorMock.mockReset();
  });

  test('should initialize with saved light theme', async () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('light');
    await initializeApp();
    expect(document.body).toHaveClass('light-theme');
    expect(document.querySelector('.theme-toggle')).toHaveTextContent('🌙');
  });

  test('should toggle theme on button click', async () => {
    await initializeApp();
    const themeToggle = document.querySelector('.theme-toggle') as HTMLButtonElement;
    expect(document.body).not.toHaveClass('light-theme');
    themeToggle.click();
    expect(document.body).toHaveClass('light-theme');
    expect(themeToggle).toHaveTextContent('🌙');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    themeToggle.click(); 
    expect(document.body).not.toHaveClass('light-theme');
    expect(themeToggle).toHaveTextContent('☀️');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('should render tab bar and cards', async () => {
    await initializeApp();
    const container = document.querySelector('#build-tools') as HTMLElement;
    expect(container.querySelector('.tab-bar')).toBeTruthy();
    expect(container.querySelector('.card-container')).toBeTruthy();
    expect(container.querySelectorAll('.card')).toHaveLength(1);
    expect(container.querySelector('.tab.active')).toHaveAttribute('data-category', 'All');
  });

  test('should update footer with timestamp', async () => {
    await initializeApp();
    expect(document.querySelector('footer p')).toHaveTextContent('Copyright 2025 | Last updated: May 30, 2025');
  });

  test('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    await initializeApp();
    const container = document.querySelector('#build-tools') as HTMLElement;
    expect(container.innerHTML).toContain('Error loading tools');
    expect(consoleErrorMock).toHaveBeenCalledWith('Error loading build tools:', expect.any(Error));
  });

  test('should filter tools on tab click', async () => {
    await initializeApp();
    const container = document.querySelector('#build-tools') as HTMLElement;
    const tab = container.querySelector('.tab[data-category="Bundler"]') as HTMLElement;
    tab.click();
    expect(container.querySelectorAll('.card')).toHaveLength(1);
    expect(tab).toHaveClass('active');
  });

  test('should handle missing #build-tools container', async () => {
    document.body.innerHTML = '<button class="theme-toggle"></button><footer><p>Copyright 2025</p></footer>';
    await initializeApp();
    expect(consoleErrorMock).toHaveBeenCalledWith('Container #build-tools not found');
  });

  test('should handle empty tools array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ build_tools: [] } as BuildToolsData),
    });
    await initializeApp();
    const container = document.querySelector('#build-tools') as HTMLElement;
    expect(container.querySelectorAll('.card')).toHaveLength(0);
  });
});