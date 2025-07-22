document.getElementById("soil-form").addEventListener("submit", (event) => {
  event.preventDefault()

  const button = document.querySelector(".btn-analyze")
  const resultContainer = document.querySelector(".result-container")
  const resultElement = document.getElementById("result")
  const resultDetails = document.getElementById("result-details")

  // Add loading state
  button.classList.add("loading")
  button.disabled = true

  // Clear previous results
  resultContainer.className = "result-container"
  resultElement.textContent = ""
  resultDetails.textContent = ""

  try {
    const pH = Number.parseFloat(document.getElementById("ph").value)
    const potassium = Number.parseFloat(document.getElementById("potassium").value)
    const nitrogen = Number.parseFloat(document.getElementById("nitrogen").value)
    const phosphorus = Number.parseFloat(document.getElementById("phosphorus").value)
    const organicMatter = Number.parseFloat(document.getElementById("organic-matter").value)
    const soilMoisture = Number.parseFloat(document.getElementById("soil-moisture").value)
    const rainfall = Number.parseFloat(document.getElementById("rainfall").value)
    const treeAge = Number.parseFloat(document.getElementById("tree-age").value)

    // Validate inputs
    if (isNaN(pH) || isNaN(potassium) || isNaN(nitrogen) || isNaN(phosphorus) || 
        isNaN(organicMatter) || isNaN(soilMoisture) || isNaN(rainfall) || isNaN(treeAge)) {
      throw new Error("Please enter valid numbers for all fields.")
    }

    // Simulate analysis delay for better UX
    setTimeout(() => {
      const analysis = analyzeSoil(pH, potassium, nitrogen, phosphorus, organicMatter, soilMoisture, rainfall, treeAge)

      // Remove loading state
      button.classList.remove("loading")
      button.disabled = false

      // Display results with animation
      resultContainer.classList.add("show", `result-${analysis.status.toLowerCase()}`)
      resultElement.textContent = `Comprehensive Soil Health: ${analysis.status}`
      resultDetails.textContent = analysis.details
    }, 2000)
  } catch (error) {
    // Remove loading state
    button.classList.remove("loading")
    button.disabled = false

    resultContainer.classList.add("show", "result-poor")
    resultElement.textContent = "Analysis Error"
    resultDetails.textContent = error.message
    console.error("Soil analysis error:", error)
  }
})

function analyzeSoil(pH, potassium, nitrogen, phosphorus, organicMatter, soilMoisture, rainfall, treeAge) {
  let score = 0
  const issues = []
  const strengths = []
  const recommendations = []

  // pH scoring (6.0 - 7.5 is ideal)
  if (pH >= 6 && pH <= 7.5) {
    score += 1
    strengths.push("pH level is optimal for nutrient uptake")
  } else if (pH < 6) {
    issues.push("soil is too acidic")
    recommendations.push("add lime to raise pH")
  } else {
    issues.push("soil is too alkaline")
    recommendations.push("add sulfur or organic matter to lower pH")
  }

  // Potassium scoring (200-400 ppm is ideal)
  if (potassium >= 200 && potassium <= 400) {
    score += 1
    strengths.push("potassium levels support strong root development")
  } else if (potassium < 200) {
    issues.push("potassium levels are too low")
    recommendations.push("apply potassium-rich fertilizer")
  } else {
    issues.push("potassium levels are too high")
    recommendations.push("reduce potassium fertilization")
  }

  // Nitrogen scoring (30-70 ppm is ideal)
  if (nitrogen >= 30 && nitrogen <= 70) {
    score += 1
    strengths.push("nitrogen levels promote healthy leaf growth")
  } else if (nitrogen < 30) {
    issues.push("nitrogen levels are insufficient")
    recommendations.push("add nitrogen-rich fertilizer or compost")
  } else {
    issues.push("nitrogen levels may cause excessive vegetative growth")
    recommendations.push("reduce nitrogen inputs")
  }

  // Phosphorus scoring (20-50 ppm is ideal)
  if (phosphorus >= 20 && phosphorus <= 50) {
    score += 1
    strengths.push("phosphorus levels enhance flowering and fruiting")
  } else if (phosphorus < 20) {
    issues.push("phosphorus levels are too low")
    recommendations.push("add phosphorus fertilizer or bone meal")
  } else {
    issues.push("phosphorus levels are too high")
    recommendations.push("avoid phosphorus fertilizers")
  }

  // Organic Matter scoring (3-6% is ideal)
  if (organicMatter >= 3 && organicMatter <= 6) {
    score += 1
    strengths.push("organic matter content improves soil structure and water retention")
  } else if (organicMatter < 3) {
    issues.push("organic matter content is low")
    recommendations.push("add compost, aged manure, or organic mulch")
  } else {
    issues.push("organic matter content is very high")
    recommendations.push("monitor for potential nutrient imbalances")
  }

  // Soil Moisture scoring (20-40% is ideal)
  if (soilMoisture >= 20 && soilMoisture <= 40) {
    score += 1
    strengths.push("soil moisture levels provide adequate water availability")
  } else if (soilMoisture < 20) {
    issues.push("soil moisture is too low")
    recommendations.push("improve irrigation or add organic matter for water retention")
  } else {
    issues.push("soil moisture is too high")
    recommendations.push("improve drainage or reduce watering frequency")
  }

  // Rainfall scoring (600-1200mm is ideal)
  if (rainfall >= 600 && rainfall <= 1200) {
    score += 1
    strengths.push("annual rainfall provides sufficient natural irrigation")
  } else if (rainfall < 600) {
    issues.push("annual rainfall is insufficient")
    recommendations.push("implement supplemental irrigation systems")
  } else {
    issues.push("annual rainfall is excessive")
    recommendations.push("ensure proper drainage to prevent waterlogging")
  }

  // Tree Age considerations
  let ageCategory = ""
  if (treeAge < 2) {
    ageCategory = "young seedling"
    recommendations.push("focus on gentle fertilization and consistent moisture")
  } else if (treeAge < 5) {
    ageCategory = "establishing tree"
    recommendations.push("maintain balanced nutrition for steady growth")
  } else if (treeAge < 15) {
    ageCategory = "mature young tree"
    recommendations.push("optimize nutrition for peak productivity")
  } else {
    ageCategory = "mature tree"
    recommendations.push("monitor for age-related nutrient deficiencies")
    score += 0.5 // Bonus for established root system
  }

  // Determine soil health and create detailed feedback
  let status, details
  const maxScore = 7.5 // Updated max score including age bonus

  if (score >= 6) {
    status = "Excellent"
    details = `Outstanding! Your soil ecosystem scores ${score.toFixed(1)}/${maxScore.toFixed(1)} with optimal conditions. Your ${ageCategory} benefits from: ${strengths.join(", ")}. `
    if (recommendations.length > 0) {
      details += `Fine-tuning suggestions: ${recommendations.slice(0, 2).join(", ")}.`
    }
  } else if (score >= 4.5) {
    status = "Good"
    details = `Very good soil health with ${score.toFixed(1)}/${maxScore.toFixed(1)} optimal parameters. Your ${ageCategory} shows: ${strengths.join(", ")}. Priority improvements: ${recommendations.slice(0, 3).join(", ")}.`
  } else if (score >= 3) {
    status = "Moderate"
    details = `Moderate soil health (${score.toFixed(1)}/${maxScore.toFixed(1)}). Your ${ageCategory} has some strengths: ${strengths.join(", ")}. Key issues to address: ${issues.join(", ")}. Recommended actions: ${recommendations.slice(0, 3).join(", ")}.`
  } else {
    status = "Poor"
    details = `Soil needs significant improvement (${score.toFixed(1)}/${maxScore.toFixed(1)}). Your ${ageCategory} faces challenges: ${issues.join(", ")}. Urgent actions needed: ${recommendations.slice(0, 4).join(", ")}. Consider professional soil testing and consultation.`
  }

  return { status, details }
}
