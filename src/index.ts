import './styles/main.scss';
import type { BuildTool, BuildToolsData } from './types';
import moment from 'moment';

export function updateThemeToggleIcon(
  isLight: boolean,
  themeToggle: HTMLButtonElement | null
) {
  if (themeToggle) {
    themeToggle.textContent = isLight ? '🌙' : '☀️';
  }
}

export function renderCards(
  selectedCategory: string,
  tools: BuildTool[],
  cardContainer: HTMLElement,
  tabBar: HTMLElement
) {
  cardContainer.innerHTML = '';
  const filteredTools =
    selectedCategory === 'All'
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

  filteredTools.forEach((tool: BuildTool) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__header">
        <div class="image_container">
          <img src="${tool.icon_url}" alt="${tool.name} icon" class="card__img">
        </div>
        <div class="card__logo">${tool.category}</div>
      </div>
      <div class="card__content">
        <h2 class="card__description">${tool.name}</h2>
        <div class="card__text">${tool.description}</div>
        <a href="${tool.website}" target="_blank" class="card__link">Learn More</a>
      </div>
    `;
    cardContainer.appendChild(card);
  });

  // Update active tab
  const tabs = tabBar.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.classList.toggle(
      'active',
      tab.getAttribute('data-category') === selectedCategory
    );
  });
}

export async function initializeApp() {
  // Apply saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.querySelector(
    '.theme-toggle'
  ) as HTMLButtonElement;
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeToggleIcon(true, themeToggle);
  }

  // Theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLightTheme = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
      updateThemeToggleIcon(isLightTheme, themeToggle);
    });
  }

  try {
    // Fetch build tools data
    const response = await fetch('./data/data.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: BuildToolsData = await response.json();
    const container = document.querySelector('#build-tools') as HTMLElement;

    if (!container) {
      console.error('Container #build-tools not found');
      return;
    }

    // Get unique categories
    const categories = [
      'All',
      ...Array.from(new Set(data.build_tools.map((tool) => tool.category))),
    ];

    // Create tab bar
    const tabBar = document.createElement('div');
    tabBar.className = 'tab-bar';
    categories.forEach((category) => {
      const tab = document.createElement('button');
      tab.className = 'tab';
      tab.textContent = category;
      tab.setAttribute('data-category', category);
      tabBar.appendChild(tab);
    });
    container.appendChild(tabBar);

    // Create card container
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    container.appendChild(cardContainer);

    // Initialize with 'All' tab
    renderCards('All', data.build_tools, cardContainer, tabBar);

    // Tab click handler
    tabBar.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('tab')) {
        const category = target.getAttribute('data-category');
        if (category) {
          renderCards(category, data.build_tools, cardContainer, tabBar);
        }
      }
    });

    // Update footer with timestamp
    const footer = document.querySelector('footer p') as HTMLElement;
    if (footer) {
      footer.innerHTML += ` | Last updated: ${moment().format('MMMM D, YYYY')}`;
    }
  } catch (error) {
    console.error('Error loading build tools:', error);
    const container = document.querySelector('#build-tools') as HTMLElement;
    if (container) {
      container.innerHTML =
        '<p>Error loading tools. Please try again later.</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', initializeApp);
