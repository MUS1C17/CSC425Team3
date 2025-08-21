document.addEventListener('DOMContentLoaded', function() {
  const addItemBtn = document.getElementById('addItem');
  const userInput = document.getElementById('userInput');
  const myList = document.getElementById('myList');

  addItemBtn.addEventListener('click', function() {
    const value = userInput.value.trim();
    if (value) {
      const li = document.createElement('li');
      li.textContent = value;
      myList.appendChild(li);
      userInput.value = '';
      userInput.focus();
    }
  });

  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addItemBtn.click();
    }
  });
});