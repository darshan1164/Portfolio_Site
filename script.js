// ========== EMAIL REDIRECT FUNCTIONALITY (Gmail) ==========
// This function opens Gmail compose window with the recipient's email pre-filled
function redirectToGmail(emailAddress) {
  if (!emailAddress) return;
  // Using mailto: as fallback, but we explicitly build Gmail compose URL
  // Gmail's compose URL: https://mail.google.com/mail/?view=cm&fs=1&to=email@example.com
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;
  window.open(gmailComposeUrl, "_blank");
}

// Attach click handlers to all elements with class 'email-link' and data-email attribute
function setupEmailLinks() {
  const emailLinks = document.querySelectorAll(".email-link");
  emailLinks.forEach((link) => {
    // Remove previous listeners to avoid duplicates
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    newLink.addEventListener("click", (e) => {
      e.preventDefault();
      const email = newLink.getAttribute("data-email");
      if (email) {
        redirectToGmail(email);
      } else {
        // fallback: if data-email not set, try text content
        const emailText = newLink.innerText.trim();
        if (emailText.includes("@")) redirectToGmail(emailText);
      }
    });
  });
}

// Initialize email links when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  setupEmailLinks();
});

// Also re-run after any dynamic content (though none here, but safe)
// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinksEl = document.getElementById("navLinks");
if (menuToggle) {
  menuToggle.addEventListener("click", () =>
    navLinksEl.classList.toggle("active"),
  );
  document
    .querySelectorAll(".nav-links a")
    .forEach((link) =>
      link.addEventListener("click", () =>
        navLinksEl.classList.remove("active"),
      ),
    );
}

// Project data modal
const projects = {
  Hospital: {
    title: "Centralized Hospital Management System",
    desc: "Comprehensive business requirement document for a centralized hospital management system to streamline operations and improve patient care.",
    tech: "Google Docs, Draw.io",
    link: "https://drive.google.com/file/d/1YTxUjxxAs5k2h7gxEA0SV3iXMXthdIQP/view?usp=sharing",
  },
  Repido: {
    title: "Women's only repido clone",
    desc: "Business requirement document for a women only ride sharing app to provide safe and reliable transportation for women. The document includes detailed requirements for the app's features, user interface, and backend infrastructure.",
    tech: "Google Docs, Draw.io",
    link: "https://drive.google.com/file/d/1af90AMWz-l9wPqohTq-ceK3dVspRS2Wi/view?usp=drive_link",
  },
  marketing: {
    title: "Corn Market Analysis Dashboard",
    desc: "Analyzed corn market trends using Power BI and Google Sheets for data cleaning, creating an interactive dashboard to visualize price fluctuations and forecast future trends. Provided actionable insights that helped stakeholders make informed decisions, resulting in a 15% increase in profitability.",
    tech: "Power BI, Google Sheets",
    link: "https://github.com/darshan1164/Corn_Market_Analysis",
  },
  Cleaning: {
    title: "Auto Data Cleaning Web Application",
    desc: "Developed a web application that automates data cleaning using AI tools, significantly reducing manual effort and improving data quality for analytics projects.",
    tech: "Python, Pandas, Numpy, Streamlit",
    link: "https://github.com/darshan1164/AutoDataCleaning",
  },
};
const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModalBtn");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalLink = document.getElementById("modalLiveLink");
document.querySelectorAll(".view-project").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-proj");
    if (key && projects[key]) {
      modalTitle.innerText = projects[key].title;
      modalDesc.innerText = projects[key].desc;
      modalTech.innerText = `Tech stack: ${projects[key].tech}`;
      modalLink.href = projects[key].link || "#";
    } else {
      modalTitle.innerText = "Analytics Project";
      modalDesc.innerText = "Full case study available upon request.";
      modalTech.innerText = "Stack: Python, BI, SQL";
    }
    modal.style.display = "flex";
  });
});
closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// active nav + smooth scroll
const sections = document.querySelectorAll("section");
const navLinkItems = document.querySelectorAll(".nav-links a");
function setActive() {
  let current = "";
  const scrollPos = window.scrollY + 120;
  sections.forEach((s) => {
    if (scrollPos >= s.offsetTop && scrollPos < s.offsetTop + s.offsetHeight)
      current = s.getAttribute("id");
  });
  navLinkItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current)
      link.classList.add("active");
  });
}
window.addEventListener("scroll", setActive);
window.addEventListener("load", setActive);
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = this.getAttribute("href").substring(1);
    if (target && document.getElementById(target)) {
      e.preventDefault();
      document.getElementById(target).scrollIntoView({ behavior: "smooth" });
      history.pushState(null, null, `#${target}`);
    }
  });
});
