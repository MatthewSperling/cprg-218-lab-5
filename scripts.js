// Define constants for API key, base URL for fetching news, and URL to fetch news sources
const API_KEY = "&apiKey=53a219365bf140908855584c3e721d6b";
const BASE_URL = `https://newsapi.org/v2/everything?sources=`;
const SOURCE_URL = `https://newsapi.org/v2/top-headlines/sources?language=en`;

// Get the submit button element from the DOM and add an event listener for the click event
const option1SubmitButton = document.getElementById("submit-button");
option1SubmitButton.addEventListener("click", option1DropdownClickHandler);

// Define an asynchronous function to handle the dropdown option click event
async function option1DropdownClickHandler(event) {
  try {
    // Log action to console
    console.log("press");
    // Get the selected value from the dropdown
    const select = document.getElementById("dropdown");
    const dropvalue = select.options[select.selectedIndex].value;
    // Fetch data from the API using the selected value
    const response = await fetch(`${BASE_URL}${dropvalue}${API_KEY}`);
    
    // Convert the response to JSON
    const data = await response.json();
    // Call the render function to display the articles
    render(data.articles);

  }catch (err) {
    // Log any errors to the console
    console.log(console.error());
  }
}

// Define a function to render the fetched articles on the page
function render(data) {
  // Clear previous results
  clearResult();
  
  // Initialize a variable to hold the HTML for all cards
  let cards = '';
  // Iterate over each item in the data array
  for (const item of data) {
    // Check if the item has an image URL
    if(item.urlToImage) {
      // Generate HTML for each card and append it to the cards variable
      cards += renderCard(item);
    }
  }
  // Set the innerHTML of the results container to the cards HTML
  document.getElementById("option-1-results").innerHTML = cards;
}

// Define a function to generate the HTML for a single card
function renderCard(item) {
  return `
  <li class="card">
      <img src=${item.urlToImage} alt="">
      <div class="card-content">
          
          <h3 class="header">
              ${item.title}
          </h3>
      </div>
  </li>
`;
}

// Define a function to clear the results container
function clearResult(){
  document.getElementById("option-1-results").innerHTML = '';
}

// Define an asynchronous function to populate the dropdown with news sources
async function fillUpDropDown () {
  try {
    // Fetch news sources from the API
    const response = await fetch(`${SOURCE_URL}${API_KEY}`);
    // Convert the response to JSON
    const data = await response.json();
    const select = document.getElementById("dropdown");
    
    // Iterate over each news source and add it as an option in the dropdown
    data.sources.forEach((item) => {
      const option = document.createElement("option");
      option.textContent = item.name;
      option.value = item.id;
      select.appendChild(option);
    });
  

  }catch (err ){
    // Log any errors to the console
    console.log(err )
  }
}

// Call the fillUpDropDown function to populate the dropdown when the page loads
fillUpDropDown();
