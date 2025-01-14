document.addEventListener("DOMContentLoaded", () => {
    const contentContainer = document.getElementById("content");
    const content = ["me", "projects", "blog", "links"];
    let currentContentIndex = content.indexOf("me");
    let currentContentDisplayed = content[currentContentIndex];
    const contentCache = {};

    async function loadContent(content) {
        if (contentCache[content]) {
            displayContent(contentCache[content]);
            return;
        }

        try {
            const response = await fetch(`/src/html/${content}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load HTML: ${response.status}`);
            }
            const html = await response.text();
            contentCache[content] = html;
            displayContent(html);
        } catch (error) {
            console.error(error);
            contentContainer.innerHTML = "<p>the content couldn't be loaded... maybe the script is borken! if you see this, please contact me!!</p>";
        }
    }

    function displayContent(html) {
        contentContainer.innerHTML = ''; // Clear existing content
        const newContent = document.createElement("div");
        newContent.style = "height: 100%; width: 100%;";
        newContent.innerHTML = html;
        contentContainer.appendChild(newContent);
        window.parsingDone = true;
    }

    function updateContentDisplay() {
        currentContentDisplayed = content[currentContentIndex];
        loadContent(currentContentDisplayed);
    }
    
    const activeButton = document.getElementById(currentContentDisplayed);
    
    document
        .querySelectorAll(".top-nav-btn")
        .forEach((button) => button.classList.remove("active"));

    if (activeButton) activeButton.classList.add("active");

    function setupContentSelectors() {
        const contentButtons = Array.from(
            document.getElementsByClassName("top-nav-btn")
        );
    
        document.getElementById(currentContentDisplayed).classList.add("active");
    
        contentButtons.forEach((button) => {
            button.addEventListener("click", () => {
                contentButtons.forEach((btn) => btn.classList.remove("active"));
                button.classList.add("active");
        
                currentContentDisplayed = button.id;
                currentContentIndex = content.indexOf(currentContentDisplayed);
                updateContentDisplay();
            });
        });
    }
    
    updateContentDisplay();
    setupContentSelectors();

});