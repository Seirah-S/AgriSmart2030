document.getElementById("soil-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let pH = parseFloat(document.getElementById("ph").value);
    let potassium = parseFloat(document.getElementById("potassium").value);
    let nitrogen = parseFloat(document.getElementById("nitrogen").value);
    let phosphorus = parseFloat(document.getElementById("phosphorus").value);
    
    let result = analyzeSoil(pH, potassium, nitrogen, phosphorus);
    
    document.getElementById("result").innerText = `Soil Health: ${result}`;
});

function analyzeSoil(pH, potassium, nitrogen, phosphorus) {
    let score = 0;
    
    if (pH >= 6 && pH <= 7.5) {
        score += 1;  // Good
    } else if (pH < 6 || pH > 7.5) {
        score -= 1;  // Poor
    }
    
    if (potassium >= 200 && potassium <= 400) {
        score += 1;  // Good
    } else if (potassium < 200 || potassium > 400) {
        score -= 1;  // Poor
    }
    
    if (nitrogen >= 30 && nitrogen <= 70) {
        score += 1;  // Good
    } else {
        score -= 1;  // Poor
    }

    if (score >= 3) {
        return "Good";
    } else if (score == 2) {
        return "Moderate";
    } else {
        return "Poor";
    }
}
