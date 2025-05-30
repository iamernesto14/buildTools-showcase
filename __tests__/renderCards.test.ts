import '@testing-library/jest-dom';
import { renderCards } from '../src/index';
import type { BuildTool } from '../src/types';

describe('renderCards', () => {
  let cardContainer: HTMLElement;
  let tabBar: HTMLElement;
  const mockTools: BuildTool[] = [
    {
      name: 'Webpack',
      category: 'Bundler',
      description: 'Module bundler',
      icon_url: '/icons/webpack.png',
      website: 'https://webpack.js.org',
      use_cases: ['Bundling JavaScript', 'Optimizing assets'],
      key_features: ['Module federation', 'Hot module replacement'],
    },
    {
      name: 'TypeScript',
      category: 'Language',
      description: 'Typed JavaScript',
      icon_url: '/icons/typescript.png',
      website: 'https://typescriptlang.org',
      use_cases: ['Type-safe development', 'Large-scale apps'],
      key_features: ['Static types', 'Interfaces'],
    },
  ];

  beforeEach(() => {
    cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    tabBar = document.createElement('div');
    tabBar.className = 'tab-bar';
    tabBar.innerHTML = `
      <button class="tab" data-category="All">All</button>
      <button class="tab" data-category="Bundler">Bundler</button>
      <button class="tab" data-category="Language">Language</button>
    `;
  });

  test('should render all tools when category is All', () => {
    renderCards('All', mockTools, cardContainer, tabBar);
    const cards = cardContainer.querySelectorAll('.card');
    expect(cards).toHaveLength(2);
    expect(cards[0].querySelector('.card__description')).toHaveTextContent('Webpack');
    expect(cards[1].querySelector('.card__description')).toHaveTextContent('TypeScript');
    expect(tabBar.querySelector('[data-category="All"]')).toHaveClass('active');
  });

  test('should render filtered tools for specific category', () => {
    renderCards('Bundler', mockTools, cardContainer, tabBar);
    const cards = cardContainer.querySelectorAll('.card');
    expect(cards).toHaveLength(1);
    expect(cards[0].querySelector('.card__description')).toHaveTextContent('Webpack');
    expect(tabBar.querySelector('[data-category="Bundler"]')).toHaveClass('active');
    expect(tabBar.querySelector('[data-category="All"]')).not.toHaveClass('active');
  });
});