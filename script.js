// script.js — only intended to run on dynamic.html
document.addEventListener('DOMContentLoaded', function () {
  var addBtn = document.getElementById('addItem');
  var input = document.getElementById('userInput');
  var list = document.getElementById('myList');

  if (!addBtn || !input || !list) {
    // If the expected elements are not present, do nothing. This allows the script to be safely
    // included on other pages if desired, but per spec we only reference it from dynamic.html.
    return;
  }

  addBtn.addEventListener('click', function () {
    var val = (input.value || '').trim();
    if (!val) return; // ignore empty submissions

    var li = document.createElement('li');
    li.textContent = val;
    list.appendChild(li);

    input.value = '';
    input.focus();
  });

  // allow pressing Enter in the input to add item
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });
});
