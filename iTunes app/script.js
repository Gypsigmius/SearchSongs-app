"use strict";

// function getSong() {
//   fetch("https://itunes.apple.com/search?term=indie&entity")
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// }
// getSong();

// const searchInput = document.getElementById("searchInput");
// const resultsDiv = document.getElementById("results");

// function searchSongs(searchInput) {
//   // Ako je polje prazno, očisti rezultate
//   if (!searchInput.trim()) {
//     resultsDiv.innerHTML = "";
//     return;
//   }
//   fetch("https://itunes.apple.com/search?term=indie&&entity=song")
//     .then((res) => res.json())
//     .then((data) => {
//       displayResults(data.results);
//     })
//     .catch((error) => {
//       console.error("Error", error);
//       resultsDiv.innerHTML = "<p> error loading songs</p>";
//     });
// }
// // Dodajemo searchTerm u URL i ispravljen entity parametar

// function displayResults() {
//   if (searchSongs.length === 0) {
//     resultsDiv.innerHTML = "<p> no songs found</p>";
//     return;
//   }

//   const songsHTML = songs
//     .map(
//       (song) => `
//      <div class="song-item">
//                     <img src="${song.artworkUrl100}" alt="${song.trackName}">
//                     <div class="song-info">
//                         <h3>${song.trackName}</h3>
//                         <p>${song.artistName}</p>
//                     </div>
//                 </div>
//     `
//     )
//     .join(``);
//   resultsDiv.innerHTML = songsHTML;
// }
// function debounce(func, wait) {
//   let timeout;

//   return function (...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this.args), wait);
//   };
// }
// // Dodajemo event listener s debounce funkcijom
// searchInput.addEventListener("input", debounce(searchSongs, 300));

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

function searchSongs(searchTerm) {
  // If search term is empty, clear results
  if (!searchTerm.trim()) {
    resultsDiv.innerHTML = "";
    return;
  }

  // Use the search term in the fetch URL
  fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&entity=song`
  )
    .then((res) => res.json())
    .then((data) => {
      // Call displayResults with the actual results
      displayResults(data.results);
    })
    .catch((error) => {
      console.error("Error", error);
      resultsDiv.innerHTML = "<p>Error loading songs</p>";
    });
}

function displayResults(songs) {
  // Check if songs array is empty
  if (!songs || songs.length === 0) {
    resultsDiv.innerHTML = "<p>No songs found</p>";
    return;
  }

  // Create HTML for songs
  const songsHTML = songs
    .map(
      (song) => `
     <div class="song-item">
        <img src="${song.artworkUrl100 || ""}" alt="${song.trackName}">
        <div class="song-info">
            <h3>${song.trackName || "Unknown Track"}</h3>
            <p>${song.artistName || "Unknown Artist"}</p>
        </div>
     </div>
    `
    )
    .join("");

  resultsDiv.innerHTML = songsHTML;
}

// Improved debounce function
function debounce(func, wait) {
  let timeout;
  return function (event) {
    const searchTerm = event.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => func(searchTerm), wait);
  };
}

// Add event listener with debounce
searchInput.addEventListener("input", debounce(searchSongs, 300));
