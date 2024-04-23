async function getFaviconUrl() {
  console.debug("Getting favicon URL...");
  const tabsQuery = {
    active: true,
    currentWindow: true,
  };

  const tabs = await chrome.tabs.query(tabsQuery);
  const faviconUrl = tabs[0].favIconUrl;

  if (faviconUrl) {
    console.debug(`Found favicon URL: ${tabs[0].favIconUrl}`);
  } else {
    console.debug("Favicon URL not found...");
  }

  return tabs[0].favIconUrl;
}

async function copyFaviconUrl(faviconUrl) {
  if (!faviconUrl) {
    console.debug("No favicon URL to copy...");
    return;
  }

  navigator.clipboard.writeText(faviconUrl).then(() => {
    console.debug("Favicon URL copied!");
  });
}

async function populateIcon(faviconUrl) {
  console.debug("Populating icon...");
  const faviconFileName = faviconUrl.split("/").pop();

  const faviconElement = document.getElementById("favicon-img");
  faviconElement.src = faviconUrl;
  faviconElement.alt = faviconFileName;
  faviconElement.title = faviconFileName;

  const faviconUrlElement = document.getElementById("favicon-url");
  faviconUrlElement.innerHTML = `<a href="${faviconUrl}" target="_blank">${faviconUrl}</a>`;

  const containerElement = document.getElementById("container");
  containerElement.hidden = false;
}

function clearPopup() {
  const containerElement = document.getElementById("container");
  containerElement.style.display = "none";
}

document.addEventListener("DOMContentLoaded", async function () {
  const faviconUrl = await getFaviconUrl();
  if (!faviconUrl) {
    return clearPopup();
  }

  Promise.all([copyFaviconUrl(faviconUrl), populateIcon(faviconUrl)]);
});
