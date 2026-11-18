const members = [
    {
        firstName: "David",
        lastName: "Shanahan",
        role: "Chairperson",
        description: 
            "David is Master's student and the UCC ACM Chapter Chair.",
        linkedIn: "https://www.linkedin.com/in/david-shanahan-89731a184/",
    },
    {
        firstName: "Andrea",
        lastName: "Visentin",
        role: "Academic Sponsor",
        description: 
            "Andrea is an Assistant Professor.",
        linkedIn: "https://www.linkedin.com/in/andrea-visentin-a4b9a585/",
    },
    {
        firstName: "Mikolaj",
        lastName: "Wujek",
        role: "Vice Chair",
        description:
            "Mikolaj is the Vice Chair of UCC ACM",
        linkedIn: "https://www.linkedin.com/in/mikolaj-wujek-132354333/",
    },
    {
        firstName: "Jordan",
        lastName: "Buckley",
        role: "Webmaster",
        description:
            "Jordan created/manages the website and online infrastructure.",
        linkedIn: "https://www.linkedin.com/in/jordan05/",
    },
    {
        firstName: "Dan",
        lastName: "Bokete",
        role: "Webmaster Team",
        description:
            "Dan assisted with the development/managing of the website and online infrastructure.",
        linkedIn: "https://www.linkedin.com/in/dan-bokete-672a72316/",
    },
        {
        firstName: "Jake",
        lastName: "Sparks",
        role: "Finance Office",
        description:
            "Jake ensures all finances are well-managed for events.",
        linkedIn: "https://www.linkedin.com/in/jake-sparks-9b700936a/",
    },
    {
        firstName: "Ishaan",
        lastName: "Anwar",
        role: "Webmaster Team",
        description:
            "Ishaan helped develop the website, and server infrastructure.",
        linkedIn: "https://www.linkedin.com/in/ishaan-anwar-843ab519a/",
    },
        {
        firstName: "Leonid",
        lastName: "Berdin",
        role: "Webmaster Team",
        description:
            "Working with server/website",
        linkedIn: "https://www.linkedin.com/in/leonid-berdin-6b2301333/",
    },
    {
        firstName: "Swithin",
        lastName: "Pais",
        role: "Webmaster Team",
        description:
            "Swithin helped develop the website, and server infrastructure.",
        linkedIn: "https://www.linkedin.com/in/swithin-pais-70501926b/",
    },
    // {
    //     firstName: "Ivan",
    //     lastName: "Fonagy",
    //     role: "Deputy Technical Manager",
    //     description:
    //         "Ivan helps with deployment and documentation of competition software.",
    //     linkedIn: "https://www.linkedin.com/in/ivan-fonagy/",
    // },
    // {
    //     firstName: "Abigail",
    //     lastName: "Joseph",
    //     role: "OCM",
    //     description: "Abigail is an OCM who is involved in the technical team.",
    //     linkedIn: "https://www.linkedin.com/in/abigail-elizabeth-joseph-a94215334/",
    // }
    // {
    //     firstName: "David",
    //     lastName: "Lesiak",
    //     role: "OCM",
    //     description:
    //         "David is an OCM who is involved in the organisation of the ACM event.",
    //     linkedIn: "https://www.linkedin.com/in/david-lesiak-573830271/",
    // },
];

// Render every card in one DOM write. Photos live at images/firstname_lastname.jpg.
// The LinkedIn badge is the link (on touch screens only the badge is tappable, so
// scrolling past a card can't open LinkedIn by accident; see changes.css).
const teamContainer = document.getElementById("teamContainer");

teamContainer.innerHTML = members
    .map(({ firstName, lastName, role = "ACM Member", linkedIn }) => {
        const name = `${firstName} ${lastName}`;
        const photo = `images/${firstName.toLowerCase()}_${lastName.toLowerCase()}.jpg`;
        const link = linkedIn
            ? `<a class="team-link" href="${linkedIn}" target="_blank" rel="noopener"
                  aria-label="${name} on LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>`
            : "";

        return `
        <div class="team-member">
            <img src="${photo}" alt="${name}" loading="lazy" decoding="async" />
            <div class="team-info">
                <h3>${name}</h3>
                <p>${role}</p>
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
