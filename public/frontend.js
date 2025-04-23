(function () {

  function loadAudiowideFont() {
    return new Promise((resolve) => {
      // Check if the font is already loaded
      if (document.getElementById("audiowide-font-link")) {
        resolve();
        return;
      }

      // Create link for Google Fonts
      const fontLink = document.createElement("link");
      fontLink.id = "audiowide-font-link";
      fontLink.rel = "stylesheet";
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Audiowide&display=swap";

      // Resolve promise once font is loaded
      fontLink.onload = function () {
        resolve();
      };

      // Resolve anyway after a timeout in case the font fails to load
      setTimeout(resolve, 2000);

      // Add to document
      document.head.appendChild(fontLink);
    });
  }

  // Frontend Badge Injection
  async function injectFrontendBadge() {
    // Check if badge=false is in URL params
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("badge") === "0") {
      return; // Don't inject badge if badge=0
    }

    // Load Audiowide font
    await loadAudiowideFont();

    // Create badge styles
    const badgeStyles = document.createElement("style");
    badgeStyles.textContent = `
      .frontend-badge-container {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding-bottom: 16px;
        padding-right: 16px;
        z-index: 9999;
        pointer-events: none;
      }
      
      .frontend-badge-link {
        position: relative;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
        pointer-events: auto;
      }
      
      .frontend-badge-content {
        padding: 4px 10px;
        border-radius: 6px;
        background-color: #000000;
        border: 1px solid #333333;
        display: flex;
        align-items: center;
      }
      
      .frontend-badge-text {
        font-size: 11px;
        color: #cccccc; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-weight: 600;
      }
      
      .frontend-badge-font {
        font-family: 'Audiowide', cursive;
        font-size: 10px;
        letter-spacing: 0.25px;
        margin-left: 5px;
        color: #ffffff; 
      }
    `;

    // Add styles to the document
    document.head.appendChild(badgeStyles);

    // Create badge container
    const badgeContainer = document.createElement("div");
    badgeContainer.className = "frontend-badge-container";

    // Create badge link
    const badgeLink = document.createElement("a");
    badgeLink.href = "https://www.frontend.co";
    badgeLink.target = "_blank";
    badgeLink.className = "frontend-badge-link";

    // Create badge content
    const badgeContent = document.createElement("div");
    badgeContent.className = "frontend-badge-content";

    // Create badge text using separate spans for different font weights and families
    const normalText = document.createElement("span");
    normalText.className = "frontend-badge-text";
    normalText.textContent = "built with";

    const audiowideText = document.createElement("span");
    audiowideText.className = "frontend-badge-text frontend-badge-font";
    audiowideText.textContent = "FRONTEND";

    // Assemble the badge components
    badgeContent.appendChild(normalText);
    badgeContent.appendChild(audiowideText);
    badgeLink.appendChild(badgeContent);
    badgeContainer.appendChild(badgeLink);

    // Inject the badge
    document.body.appendChild(badgeContainer);
  }

  // Utility function to post data to parent window
  function postToParent(data) {
    if (window.parent && window.parent !== window) {
      try {
        window.parent.postMessage(data, "*");
      } catch (e) {
        originalConsole.error("Error posting data to parent:", e);
      }
    }
  }

  // Edit mode functionality
  function setupedit() {
    const urlParams = new URLSearchParams(window.location.search);
    const isedit = urlParams.get("edit") === "1";

    if (!isedit) {
      return; // Don't enable edit mode if edit=1 is not in URL
    }

    // Create edit mode styles
    const editStyles = document.createElement("style");
    editStyles.textContent = `
      .frontend-edit-hover {
        outline: 2px solid rgba(0, 162, 255, 0.5) !important;
      }
      
      .frontend-edit-selected {
        outline: 2px solid rgba(0, 162, 255, 1) !important;
      }
    `;
    document.head.appendChild(editStyles);

    let selectedElement = null;

    // Add event listeners for mouse over and click
    document.addEventListener(
      "mouseover",
      function (event) {
        // Skip if target is already selected or is part of the frontend badge
        if (
          event.target.classList.contains("frontend-edit-selected") ||
          event.target.closest(".frontend-badge-container")
        ) {
          return;
        }

        // Add hover class
        event.target.classList.add("frontend-edit-hover");
      },
      true,
    );

    document.addEventListener(
      "mouseout",
      function (event) {
        // Remove hover class
        event.target.classList.remove("frontend-edit-hover");
      },
      true,
    );

    document.addEventListener(
      "click",
      function (event) {
        // Prevent default behavior
        event.preventDefault();
        event.stopPropagation();

        // Skip if target is part of the frontend badge
        if (event.target.closest(".frontend-badge-container")) {
          return;
        }

        // Remove hover class from the clicked element
        event.target.classList.remove("frontend-edit-hover");

        // Handle selection
        if (selectedElement) {
          selectedElement.classList.remove("frontend-edit-selected");

          // If clicking the same element, just unselect it
          if (selectedElement === event.target) {
            selectedElement = null;

            // Send deselection event
            postToParent({
              type: "select",
              action: "deselect",
              timestamp: new Date().toISOString(),
            });

            return;
          }
        }

        // Select the clicked element
        selectedElement = event.target;
        selectedElement.classList.add("frontend-edit-selected");

        // Capture element data
        const elementData = {
          id: selectedElement.id || "",
          className: selectedElement.className || "",
          tagName: selectedElement.tagName || "",
          textContent: selectedElement.textContent || "",
          innerHTML: selectedElement.innerHTML || "",
          clientX: event.clientX,
          clientY: event.clientY,
          rect: selectedElement.getBoundingClientRect()
            ? {
                top: selectedElement.getBoundingClientRect().top,
                left: selectedElement.getBoundingClientRect().left,
                width: selectedElement.getBoundingClientRect().width,
                height: selectedElement.getBoundingClientRect().height,
              }
            : null,
          attributes: Array.from(selectedElement.attributes || []).map(
            (attr) => {
              return { name: attr.name, value: attr.value };
            },
          ),
        };

        // Send selection event with element data to parent window
        postToParent({
          type: "dom_click",
          element: elementData,
          timestamp: new Date().toISOString(),
        });
      },
      true,
    );
  }

  // Setup a timer to check and inject the badge once the document is fully loaded
  function setupBadgeInjection() {
    if (document.readyState === "complete") {
      injectFrontendBadge();
    } else {
      // For NextJS hydration, we need to delay a bit to ensure the app is fully rendered
      window.addEventListener("load", function () {
        // Small timeout to ensure Next.js has fully hydrated
        setTimeout(injectFrontendBadge, 500);
      });
    }
  }

  // Function to listen for messages from parent window
  function setupMessageListener() {
    window.addEventListener("message", function(event) {
      if (event.data && event.data.type === "send_dom") {
        // Get the DOM and send it to the parent window
        const domContent = document.documentElement.outerHTML;
        postToParent({
          type: "send_dom",
          data: domContent,
          timestamp: new Date().toISOString()
        });
      }
    });
  }

  // Start the processes
  setupBadgeInjection();
  setupMessageListener();

  // Setup edit mode once the document is fully loaded
  if (document.readyState === "complete") {
    setupedit();
  } else {
    window.addEventListener("load", function () {
      // Small timeout to ensure Next.js has fully hydrated
      setTimeout(setupedit, 500);
    });
  }
})();
