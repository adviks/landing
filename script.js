window.CustomSubstackWidget = {
  substackUrl: "advik.substack.com",
  placeholder: "Enter your email",
  buttonText: "Get Started →",
  theme: "none",
};

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



window.addEventListener('load', function() {
  const style = document.createElement('style');
  style.innerHTML = `
   .custom-substack-widget {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%; /* You can adjust the max-width as needed */
  margin: 0 auto;
}

.custom-substack-widget input {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 2px solid #e54f2d;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  flex: 0;
}

.custom-substack-widget button {
  width: 100%;
  padding: 12px;
  background-color: #e54f2d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
}

.custom-substack-widget button:hover {
  background-color: #d3451e; /* Optional hover effect */
}

.custom-substack-widget input:focus, .custom-substack-widget button:focus {
  outline: none;
}

  `;
  document.head.appendChild(style);
});
