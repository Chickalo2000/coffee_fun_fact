"use strict";

    (async function rotateFacts() {
        const factContainer = document.getElementById("fact-container");

    try {
        const response = await fetch("http://localhost:3000/coffee-facts");
        const coffeeFacts = await response.json();

        if (coffeeFacts.length === 0) {
            factContainer.textContent = "No coffee facts available.";
            return
        }
        let currentIndex = 0;
        setInterval(() => {
            factContainer.textContent = coffeeFacts[currentIndex].fact;
            currentIndex = (currentIndex + 1) % coffeeFacts.length;
        }, 5000);
    } catch (error) {
        console.error("Error fetching coffee facts:", error);
        factContainer.textContent = "Error loading coffee facts.";
    }
    })();