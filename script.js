// INTERNSHIP DATA
const internships = [
    {
        id: "INT-101",
        title: "Frontend Intern",
        domain: "Full Stack Development",
        mode: "Remote",
        location: "India",
        skills: ["HTML", "CSS", "JavaScript"],
        openings: 3
    },
    {
        id: "INT-102",
        title: "API Engineering Intern",
        domain: "Full Stack Development",
        mode: "Hybrid",
        location: "Pune",
        skills: ["Node.js", "SQL", "Testing"],
        openings: 2
    },
    {
        id: "INT-103",
        title: "UI/UX Intern",
        domain: "UI/UX",
        mode: "Remote",
        location: "India",
        skills: ["Figma", "Research", "Accessibility"],
        openings: 1
    },
    {
        id: "INT-104",
        title: "Data Analyst Intern",
        domain: "Data Analytics",
        mode: "On-site",
        location: "Bengaluru",
        skills: ["Excel", "SQL", "Data visualisation"],
        openings: 2
    },
    {
        id: "INT-105",
        title: "Security Operations Intern",
        domain: "Cyber Security",
        mode: "Remote",
        location: "India",
        skills: ["Linux", "Logs", "Networking"],
        openings: 1
    }
];
// GET HTML ELEMENTS
const internshipList = document.getElementById("internshipList");
const searchInput = document.getElementById("searchInput");
const domainFilter = document.getElementById("domainFilter");
const resultCount = document.getElementById("resultCount");
const statusMessage = document.getElementById("statusMessage");
// Theme
const themeToggle = document.getElementById("themeToggle");
// Modal
const detailsModal = document.getElementById("detailsModal");
const closeModal = document.getElementById("closeModal");
const modalCloseButton = document.getElementById("modalCloseButton");
const modalDomain = document.getElementById("modalDomain");
const modalTitle = document.getElementById("modalTitle");
const modalMode = document.getElementById("modalMode");
const modalLocation = document.getElementById("modalLocation");
const modalOpenings = document.getElementById("modalOpenings");
const modalId = document.getElementById("modalId");
const modalSkills = document.getElementById("modalSkills");
const applyButton = document.getElementById("applyButton");
// CREATE DOMAIN FILTERS
function createDomainFilters() {
    const domains = [
        ...new Set(
            internships.map(
                internship => internship.domain
            )
        )
    ];
    domains.forEach(domain => {
        const option = document.createElement("option");
        option.value = domain;
        option.textContent = domain;
        domainFilter.appendChild(option);
    });
}
// CREATE INTERNSHIP CARD
function createInternshipCard(internship) {
    const card = document.createElement("article");
    card.className = "internship-card";
    card.innerHTML = `
        <span class="domain">
            ${internship.domain}
        </span>
        <h3>
            ${internship.title}
        </h3>
        <div class="card-info">
            <span class="info-badge">
                🌐 ${internship.mode}
            </span>
            <span class="info-badge">
                📍 ${internship.location}
            </span>
            <span class="info-badge">
                👥 ${internship.openings}
                Opening${internship.openings !== 1 ? "s" : ""}
            </span>
        </div>
        <div class="skills-heading">
            <strong>Skills</strong>
        </div>
        <div class="skills">
            ${internship.skills
                .map(
                    skill =>
                        `<span class="skill">${skill}</span>`
                )
                .join("")}
        </div>
        <div class="card-footer">
            <span class="internship-id">
                ${internship.id}
            </span>
            <button
                class="apply-btn"
                type="button"
            >
                View Details
            </button>
        </div>
    `;
    // View Details button
    const detailsButton =
        card.querySelector(".apply-btn");
    detailsButton.addEventListener(
        "click",
        () => {
            openDetailsModal(internship);
        }
    );
    return card;
}
// DISPLAY INTERNSHIPS
function displayInternships(list) {
    internshipList.innerHTML = "";
    hideStatus();
    resultCount.textContent =
        `${list.length} internship${list.length !== 1 ? "s" : ""}`;
    if (list.length === 0) {
        showStatus(
            "No internships found. Try another search or domain.",
            "empty"
        );
        return;
    }
    list.forEach(internship => {
        const card = createInternshipCard(internship);
        internshipList.appendChild(card);
    });
}
// FILTER INTERNSHIPS
function filterInternships() {
    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();
    const selectedDomain = domainFilter.value;
    const filtered =
        internships.filter(internship => {
            const searchableText = `
                ${internship.title}
                ${internship.domain}
                ${internship.mode}
                ${internship.location}
                ${internship.skills.join(" ")}
            `.toLowerCase();
            const matchesSearch =
                searchableText.includes(searchTerm);
            const matchesDomain =
                selectedDomain === "all" ||
                internship.domain === selectedDomain;
            return (
                matchesSearch &&
                matchesDomain
            );
        });
    displayInternships(filtered);
}
// STATUS MESSAGE
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message show ${type}`;
}
function hideStatus() {
    statusMessage.textContent = "";
    statusMessage.className = "status-message";
}
// OPEN DETAILS MODAL
function openDetailsModal(internship) {
    modalDomain.textContent = internship.domain;
    modalTitle.textContent = internship.title;
    modalMode.textContent = internship.mode;
    modalLocation.textContent = internship.location;
    modalOpenings.textContent = `${internship.openings} Opening${internship.openings !== 1 ? "s" : ""}`;
    modalId.textContent = internship.id;
    // Skills
    modalSkills.innerHTML = "";
    internship.skills.forEach(skill => {
        const skillElement = document.createElement("span");
        skillElement.className = "modal-skill";
        skillElement.textContent = skill;
        modalSkills.appendChild(
            skillElement
        );
    });
    // Apply button
    applyButton.onclick = () => {
        alert(
            `Application started for ${internship.title}.\n\n` +
            `Internship ID: ${internship.id}`
        );
    };
    // Show modal
    detailsModal.classList.add("active");
    detailsModal.setAttribute(
        "aria-hidden",
        "false"
    );
    // Stop background scrolling
    document.body.style.overflow = "hidden";
}
// CLOSE DETAILS MODAL
function closeDetailsModal() {
    detailsModal.classList.remove(
        "active"
    );
    detailsModal.setAttribute(
        "aria-hidden",
        "true"
    );
    // Enable scrolling again
    document.body.style.overflow = "";
}
// MODAL EVENTS
closeModal.addEventListener(
    "click",
    closeDetailsModal
);
modalCloseButton.addEventListener(
    "click",
    closeDetailsModal
);
// Click outside modal
detailsModal.addEventListener(
    "click",
    event => {
        if (
            event.target ===
            detailsModal
        ) {
            closeDetailsModal();
        }
    }
);
// ESC key
document.addEventListener(
    "keydown",
    event => {
        if (
            event.key === "Escape" &&
            detailsModal.classList.contains("active")
        ) {
            closeDetailsModal();
        }
    }
);
// SEARCH EVENTS
searchInput.addEventListener(
    "input",
    filterInternships
);
domainFilter.addEventListener(
    "change",
    filterInternships
);
// LIGHT / DARK MODE
function updateThemeButton() {
    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );
    if (isDark) {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
        themeToggle.setAttribute(
            "title",
            "Switch to light mode"
        );
    } else {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
        themeToggle.setAttribute(
            "title",
            "Switch to dark mode"
        );
    }
}
// Check saved theme
const savedTheme =
    localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add(
        "dark-mode"
    );
}
updateThemeButton();
// Toggle theme
themeToggle.addEventListener(
    "click",
    () => {
        document.body.classList.toggle(
            "dark-mode"
        );
        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );
        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );
        updateThemeButton();
    }
);
// INITIAL SETUP
createDomainFilters();
displayInternships(internships);