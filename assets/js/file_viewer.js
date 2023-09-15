// Log a message to the console to indicate that the script is running
console.log("I'm in");

// Add an event listener to the "Go" button to trigger the searchTable function when clicked
document.getElementById("go").addEventListener("click", searchTable);

// Define the searchTable function
function searchTable() {
  // Get the input value from the search input field and convert it to lowercase
  const input = document.getElementById("search-input").value.toLowerCase();
  console.log(input); // Log the input value to the console for debugging

  // Get all table rows (tr elements)
  const rows = document.getElementsByTagName("tr");

  // Iterate through all the table rows
  for (let i = 0; i < rows.length; i++) {
    // Get the text content of each row and convert it to lowercase
    const rowText = rows[i].textContent.toLowerCase();

    // Check if the input value is found in the row text
    if (rowText.includes(input)) {
      // If the input value is found, add the "highlight" class to the row to highlight it
      rows[i].classList.add("highlight");
    } else {
      // If the input value is not found, remove the "highlight" class from the row
      rows[i].classList.remove("highlight");
    }
  }
}
