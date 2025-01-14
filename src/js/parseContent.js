document.addEventListener("DOMContentLoaded", () => {
    const contentContainer = document.getElementById("content");
    const content = ["me", "projects", "blog", "links"];
    let currentContentIndex = content.indexOf("me");
    let currentContentDisplayed = content[currentContentIndex];

    function loadContent(content) {
        const xhr = new XMLHttpRequest();
    
        xhr.open("GET", `/src/html/${content}.html`);
    
        xhr.onload = () => {
            if (xhr.status === 200) {
                contentContainer.removeChild(contentContainer.lastElementChild);

                const newContent = document.createElement("div");
                newContent.style = "height: 100%; width: 100%;";
                newContent.innerHTML = xhr.responseText;

                contentContainer.appendChild(newContent);
            } else {
                console.error("Failed to load HTML:", xhr.status);
                contentContainer.innerHTML = "<p>the content couldn't be loaded... maybe the script is borken! if you see this, please contact me!!</p>";
            }
        };
        xhr.onerror = () => {
            console.error("Network error");
            contentContainer.innerHTML =
                "<p>oops... couldn't connect to server! check ur internet connection!</p>";
        };
    
        xhr.send();
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