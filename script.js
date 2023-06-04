// fetch data 
async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }
  
  //  current image of the day 
  async function getCurrentImageOfTheDay() {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const url = `https://api.nasa.gov/planetary/apod?api_key=hhG6G2akNqV3ZFRfFWcCXJtF02AQtEQgSwH2UMzK&date=${currentDate}`;
      const data = await fetchData(url);
      displayImage(data);
    } catch (error) {
      displayError("Error loading the current image of the day");
    }
  }
// fetch data 
async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }
  
  //  current image of the day 
  async function getCurrentImageOfTheDay() {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const url = `https://api.nasa.gov/planetary/apod?api_key=hhG6G2akNqV3ZFRfFWcCXJtF02AQtEQgSwH2UMzK&date=${currentDate}`;
      const data = await fetchData(url);
      displayImage(data);
    } catch (error) {
      displayError("Error loading the current image of the day");
    }
  }
  
  // image of  specific date
  async function getImageOfTheDay(date) {
    try {
      const url = `https://api.nasa.gov/planetary/apod?api_key=hhG6G2akNqV3ZFRfFWcCXJtF02AQtEQgSwH2UMzK&date=${date}`;
      const data = await fetchData(url);
      displayImage(data);
      saveSearch(date);
      addSearchToHistory();
    } catch (error) {
      displayError("Error loading the image for the selected date");
    }
  }
  
  // save the selected date on local storage
  function saveSearch(date) {
    let searches = localStorage.getItem("searches");
    if (!searches) {
      searches = [];
    } else {
      searches = JSON.parse(searches);
    }
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
  //  search history 
function addSearchToHistory() {
    const searchHistory = document.getElementById("search-history");
    searchHistory.innerHTML = "";
  
    let searches = localStorage.getItem("searches");
    if (searches) {
      searches = JSON.parse(searches);
      for (const date of searches) {
        const listItem = document.createElement("li");
        listItem.textContent = date;
        listItem.addEventListener("click", () => {
          getImageOfTheDay(date);
        });
        searchHistory.appendChild(listItem);
      }
    }
  }
  
  //display the image 
  function displayImage(data) {
    const currentImageContainer = document.getElementById(
      "current-image-container"
    );
    currentImageContainer.innerHTML = "";
  
    const title = document.createElement("h3");
    title.textContent = data.title;
  
    const image = document.createElement("img");
    image.src = data.url;
    image.alt = data.title;
  
    const explanation = document.createElement("p");
    explanation.textContent = data.explanation;
  
    // currentImageContainer.appendChild(title);
    currentImageContainer.appendChild(image);
    currentImageContainer.appendChild(explanation);
  }
  
  
  
  //  submit  form
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("search-input");
    const date = searchInput.value;
    getImageOfTheDay(date);
  });
  
  //  error messages
  function displayError(message) {
    const currentImageContainer = document.getElementById(
      "current-image-container"
    );
    currentImageContainer.innerHTML = "";

    const error = document.createElement("p");
    error.style.color = "red";
    error.textContent = message;
  
    currentImageContainer.appendChild(error);
  }
  
  // Call getCurrentImageOfTheDay 
  window.addEventListener("load", getCurrentImageOfTheDay);        