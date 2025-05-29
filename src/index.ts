import './styles/main.scss';

interface BuildTool {
  name: string;
  description: string;
  use_cases: string[];
  key_features: string[];
  website: string;
  icon_url: string;
  category: string;
}

interface BuildToolsData {
  build_tools: BuildTool[];
}

document.addEventListener('DOMContentLoaded', async () => {
  // Apply saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeToggleIcon(true);
  }

  // Theme toggle button
  const themeToggle = document.querySelector(
    '.theme-toggle'
  ) as HTMLButtonElement;
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLightTheme = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
      updateThemeToggleIcon(isLightTheme);
    });
  }

  // Update toggle button icon
  function updateThemeToggleIcon(isLight: boolean) {
    if (themeToggle) {
      themeToggle.textContent = isLight ? '🌙' : '☀';
    }
  }

  try {
    const response = await fetch('/data/data.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: BuildToolsData = await response.json();
    const container = document.querySelector('#build-tools') as HTMLElement;

    if (!container) {
      console.error('Container #build-tools not found');
      return;
    }

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    container.appendChild(cardContainer);

    data.build_tools.forEach((tool: BuildTool) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card__header">
          <div class="image_container">
          <img src="${tool.icon_url}" alt="${tool.name} icon" class="card__img">
          </div>
          <div class="card__logo">${tool.category}</div>
        </div>
        <div>
        <div class="card__content">
          <h2 class="card__description">${tool.name}</h2>
          <div class="card__text">${tool.description}</div>
          <a href="${tool.website}" target="_blank" class="card__link">Learn More</a>
        </div>
        </div>
      `;
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading build tools:', error);
    const container = document.querySelector('#build-tools') as HTMLElement;
    if (container)
      container.innerHTML =
        '<p>Error loading tools. Please try again later.</p>';
  }
});
