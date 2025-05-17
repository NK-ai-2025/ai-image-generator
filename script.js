async function generate() {
  const prompt = document.getElementById("promptInput").value;
  const res = await fetch("https://your-render-api.onrender.com/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  if (data?.urls?.get) {
    document.getElementById("output").innerText = "Image is being generated. Visit your Render console for result.";
  } else {
    document.getElementById("output").innerText = "Failed to generate.";
  }
}
