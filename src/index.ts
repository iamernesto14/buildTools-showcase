import './styles/main.scss';

interface Tool {
  name: string;
  description: string;
}

async function loadTools(): Promise<Tool[]> {
  const response = await fetch('/data/tools.json');
  return await response.json();
}

function renderTools(tools: Tool[]): string {
  return `
    <ul class="tool-list">
      ${tools
        .map(
          (tool) => `
          <li class="tool-item">
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
          </li>
        `
        )
        .join('')}
    </ul>
  `;
}

function toggleTheme(): void {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

async function init(): Promise<void> {
  const app = document.getElementById('app');
  if (app) {
    const tools = await loadTools();
    app.innerHTML = renderTools(tools);
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Apply saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

init();
