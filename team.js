const members = [
    {
        firstName: "Mikolaj",
        lastName: "Wujek",
        role: "Chairperson",
        linkedIn: "https://www.linkedin.com/in/mikolaj-wujek-132354333/",
    },
    {
        firstName: "Alona",
        lastName: "Solianyk",
        role: "Vice Chair",
        linkedIn: "https://www.linkedin.com/in/alona-solianyk-5559a4343",
    },
    // {
    //     firstName: "Andrea",
    //     lastName: "Visentin",
    //     role: "Academic Sponsor",
    //     linkedIn: "https://www.linkedin.com/in/andrea-visentin-a4b9a585/",
    // },
    {
        firstName: "Jordan",
        lastName: "Buckley",
        role: "Webmaster",
        linkedIn: "https://www.linkedin.com/in/jordan05/",
    },
    {
        firstName: "Jake",
        lastName: "Sparks",
        role: "Treasurer",
        linkedIn: "https://www.linkedin.com/in/jake-sparks-9b700936a/",
    },
    {
        firstName: "Dan",
        lastName: "Bokete",
        role: "Tech Team",
        linkedIn: "https://www.linkedin.com/in/dan-bokete-672a72316/",
    },
    // {
    //     firstName: "Leonid",
    //     lastName: "Berdin",
    //     role: "Tech Team",
    //     linkedIn: "https://www.linkedin.com/in/leonid-berdin-6b2301333/",
    // },
    {
        firstName: "Gerwin",
        lastName: "Padilla",
        role: "Social Media Manager",
        linkedIn: "https://www.linkedin.com/in/gerwin-angelo-padilla-89342b28b/",
    },
    {
        firstName: "Ewea",
        lastName: "Oshiogwemoh",
        role: "Social Media Team",
        linkedIn: "https://www.linkedin.com/in/ewea-oshiogwemoh-352346395/",
    },
    {
        firstName: "Evan",
        lastName: "Howard",
        role: "Tech Team",
        linkedIn: "https://www.linkedin.com/in/evan-howard-sync",
    },
    {
        firstName: "Semen",
        lastName: "Poiarkov",
        role: "Tech Team",
        linkedIn: "https://www.linkedin.com/in/semen-poiarkov-2b60b225b/",
    },
    {
        firstName: "Jacob (El)",
        lastName: "Egan Morely",
        role: "Committee Member",
        linkedIn: "https://www.linkedin.com/in/yakowahhh",
    },
    {
        firstName: "Aurelia",
        lastName: "Piasecka",
        role: "Committee Member",
        linkedIn: "https://www.linkedin.com/in/aurelia-piasecka",
    },
    {
        firstName: "Hein Htet",
        lastName: "Soe",
        role: "Committee Member",
        linkedIn: "https://www.linkedin.com/in/hhs-hein-htet-soe",
    },
];

// Render every card in one DOM write (photo naming is described above members).
const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

// The LinkedIn badge is the link (on touch screens only the badge is tappable, so
// scrolling past a card can't open LinkedIn by accident; see changes.css).
const teamContainer = document.getElementById("teamContainer");

teamContainer.innerHTML = members
    .map(({ firstName, lastName, role, linkedIn }) => {
        const name = `${firstName} ${lastName}`;
        const photo = `images/team/${slug(firstName)}_${slug(lastName)}.jpg`;
        const link = linkedIn
            ? `<a class="team-link" href="${linkedIn}" target="_blank" rel="noopener"
                  aria-label="${name} on LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>`
            : "";

        return `
        <div class="team-member">
            <img src="${photo}" alt="${name}" width="600" height="800" loading="lazy" decoding="async" />
            <div class="team-info">
                <h3>${name}</h3>
                ${role ? `<p>${role}</p>` : ""}
            </div>
            ${link}
        </div>`;
    })
    .join("");

// Missing photo: fall back to the ACM logo (once, so a missing logo can't loop).
// Image errors don't bubble, so listen in the capture phase.
teamContainer.addEventListener(
    "error",
    (event) => {
        const img = event.target;
        if (img.tagName === "IMG" && !img.src.endsWith("acmLogo.png")) {
            img.src = "images/acmLogo.png";
        }
    },
    true
);
