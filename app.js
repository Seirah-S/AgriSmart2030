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

    // Validate inputs
    if (isNaN(pH) || isNaN(potassium) || isNaN(nitrogen) || isNaN(phosphorus)) {
      throw new Error("Please enter valid numbers for all fields.")
    }

    // Simulate analysis delay for better UX
    setTimeout(() => {
      const analysis = analyzeSoil(pH, potassium, nitrogen, phosphorus)

      // Remove loading state
      button.classList.remove("loading")
      button.disabled = false

      // Display results with animation
      resultContainer.classList.add("show", `result-${analysis.status.toLowerCase()}`)
      resultElement.textContent = `Soil Health: ${analysis.status}`
      resultDetails.textContent = analysis.details
    }, 1500)
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

function analyzeSoil(pH, potassium, nitrogen, phosphorus) {
  let score = 0
  const issues = []
  const strengths = []

  // pH scoring (6.0 - 7.5 is ideal)
  if (pH >= 6 && pH <= 7.5) {
    score += 1
    strengths.push("pH level is optimal")
  } else if (pH < 6) {
    issues.push("soil is too acidic")
  } else {
    issues.push("soil is too alkaline")
  }

  // Potassium scoring (200-400 ppm is ideal)
  if (potassium >= 200 && potassium <= 400) {
    score += 1
    strengths.push("potassium levels support strong root development")
  } else if (potassium < 200) {
    issues.push("potassium levels are too low")
  } else {
    issues.push("potassium levels are too high")
  }

  // Nitrogen scoring (30-70 ppm is ideal)
  if (nitrogen >= 30 && nitrogen <= 70) {
    score += 1
    strengths.push("nitrogen levels promote healthy leaf growth")
  } else if (nitrogen < 30) {
    issues.push("nitrogen levels are insufficient")
  } else {
    issues.push("nitrogen levels may cause excessive vegetative growth")
  }

  // Phosphorus scoring (20-50 ppm is ideal)
  if (phosphorus >= 20 && phosphorus <= 50) {
    score += 1
    strengths.push("phosphorus levels enhance flowering and fruiting")
  } else if (phosphorus < 20) {
    issues.push("phosphorus levels are too low")
  } else {
    issues.push("phosphorus levels are too high")
  }

  // Determine soil health and create detailed feedback
  let status, details

  if (score >= 3) {
    status = "Good"
    details = `Excellent! Your soil has ${score}/4 optimal parameters. ${strengths.join(", ")}.`
    if (issues.length > 0) {
      details += ` Consider addressing: ${issues.join(", ")}.`
    }
  } else if (score >= 2) {
    status = "Moderate"
    details = `Your soil shows promise with ${score}/4 optimal parameters. Strengths: ${strengths.join(", ")}. Areas for improvement: ${issues.join(", ")}.`
  } else {
    status = "Poor"
    details = `Your soil needs attention with only ${score}/4 optimal parameters. Priority issues: ${issues.join(", ")}. Consider soil amendments and testing.`
  }

  return { status, details }
}
