// Substack Feed
async function fetchSubstackPosts() {
  const rss2jsonUrl =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fadvik.substack.com%2Ffeed";

  try {
    const response = await fetch(rss2jsonUrl);
    const data = await response.json();

    // Check if the API returned posts
    if (data.status === "ok") {
      const posts = data.items.slice(0, 3); // Get the latest 3 posts

      // Render posts to the container
      const container = document.getElementById("substack-posts");
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
          <div class="text-content">
            <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
            <p>${post.description.slice(0, 100)}...</p>
          </div>
          <div class="thumbnail">
            <a href="${post.link}" target="_blank">
              <img src="${post.enclosure.link || "placeholder.jpg"}" alt="${
          post.title
        }">
            </a>
          </div>
        `;
        container.appendChild(postElement);
      });
    } else {
      console.error("Error fetching posts:", data.message);
    }
  } catch (error) {
    console.error("Error fetching Substack posts:", error);
  }
}

// Fetch posts when the page loads
window.onload = fetchSubstackPosts;



// Success message on form submit 
const signupForm = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");
    const privacyText = document.getElementById("privacy-text");
    const submitButton = document.getElementById("form-submit"); 
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Show loading spinner
        submitButton.classList.add("loading");
        submitButton.disabled = true;

        // Get form data
        const formData = new FormData(signupForm);

        // Simulate form submission delay (2-3 seconds)
        setTimeout(() => {
            // Submit form data using fetch
            fetch(signupForm.getAttribute("action"), {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    // Hide form (optional)
                    // signupForm.style.display = "none";
                    privacyText.style.display = "none";

                    // Show success message
                    successMessage.style.display = "block";
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    // Remove loading spinner and enable button
                    submitButton.classList.remove("loading");
                    submitButton.disabled = false;
                });
        }, 2000); // 3 seconds delay
    });
