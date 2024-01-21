const imagesArray = [];

for (let i = 1; i <= 23; i++) {
  imagesArray.push(`${i}.png`);
}

function getRandomImage() {
  const index = Math.floor(Math.random() * imagesArray.length);
  return chrome.runtime.getURL(`./images/` + imagesArray[index]);
}

function addOverlay() {
  const thumbnails = document.querySelectorAll(
    "ytd-thumbnail:not(.overlay-added, .ytd-video-preview, .ytd-rich-grid-slim-media)"
  );

  const duration = document.querySelectorAll(
    "ytd-thumbnail-overlay-time-status-renderer"
  );

  thumbnails.forEach((thumbnail) => {
    const videoLink = thumbnail.querySelector("a").href;

    const link = document.createElement("a");
    link.href = videoLink;
    link.style.position = "absolute";
    link.style.top = "0";
    link.style.left = "0";
    link.style.width = "100%";
    link.style.height = "100%";
    link.style.zIndex = "10";

    const overlay = document.createElement("img");
    overlay.src = getRandomImage();
    overlay.classList.add("my-overlay");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "10";
    overlay.style.transition = "opacity 0.3s";

    if (Math.random() > 0.5) {
      overlay.style.transform = "scaleX(-1)";
    }

    link.appendChild(overlay);
    thumbnail.appendChild(link);

    thumbnail.style.position = "relative";

    thumbnail.classList.add("overlay-added"); // Mark the thumbnail so it doesn't get multiple overlays

    thumbnail.addEventListener("mouseenter", () => {
      overlay.style.opacity = "0";
    });
    thumbnail.addEventListener("mouseleave", () => {
      overlay.style.opacity = "1";
    });
  });

  duration.forEach((durationTime) => {
    durationTime.style.position = "absolute";
    durationTime.style.zIndex = "15";
  });
}

// Check when the DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addOverlay);
} else {
  addOverlay();
}

// This will re-apply overlays when new content is loaded without refreshing the page
setInterval(addOverlay, 1000);
