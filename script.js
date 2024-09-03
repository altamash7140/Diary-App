document.addEventListener("DOMContentLoaded", function () {
  const diaryForm = document.getElementById("diaryForm");
  const diaryEntry = document.getElementById("diaryEntry");
  const entriesList = document.getElementById("entriesList");

  // Load existing entries from localStorage
  loadEntries();

  // Save diary entry
  diaryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const entry = diaryEntry.value.trim();
      if (entry) {
          saveEntry(entry);
          diaryEntry.value = ""; // Clear the textarea
      }
  });

  function saveEntry(entry) {
      const date = new Date().toLocaleString();
      const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
      entries.push({ date, entry });
      localStorage.setItem("diaryEntries", JSON.stringify(entries));
      addEntryToDOM(date, entry);
  }

  function loadEntries() {
      const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
      entries.forEach(entry => addEntryToDOM(entry.date, entry.entry));
  }

  function addEntryToDOM(date, entry) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${date}</strong><p>${entry}</p>`;
      entriesList.appendChild(li);
  }
});
