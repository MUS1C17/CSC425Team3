// script.js — only loaded on dynamic.html (per bonus requirement)

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('userInput');
  const addBtn = document.getElementById('addItem');
  const list = document.getElementById('myList');

  if (!input || !addBtn || !list) return; // Safety guard

  function addItem() {
    const value = input.value.trim();
    if (!value) {
      // simple inline feedback
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');

    const li = document.createElement('li');
    li.textContent = value;
    list.appendChild(li);

    input.value = '';
    input.focus();
  }

  addBtn.addEventListener('click', addItem);

  // Optional QoL: let users press Enter to add
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addItem();
  });
});
