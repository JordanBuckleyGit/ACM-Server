const members = [
    // {
    //     firstName: "Andrew",
    //     lastName: "Nash",
    //     role: "IT/Sys Admin",
    //     description:
    //         "Andrew oversees all technical matters in the ACM Chapter.",
    //     linkedIn: "https://www.linkedin.com/in/a-nash/",
    // },
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
    // {
    //     firstName: "Michael",
    //     lastName: "Xuereb",
    //     role: "Finance Officer",
    //     description:
    //         "Michael ensures all finances are well-managed for events.",
    //     linkedIn: "https://www.linkedin.com/in/michael-xuereb1337/",
    // },
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

const teamContainer = document.getElementById("teamContainer");

let html = "";
members.forEach((person) => {
    const imagePath = `images/${person.firstName.toLowerCase()}_${person.lastName.toLowerCase()}.jpg`;
    const rawHtml = `<div
    class="team-member"
    onclick="expandTeamMember(this)"
    >
    <img
        src="${imagePath}"
        alt="An image of ${person.firstName} ${person.lastName}"
        onerror="this.src='images/acmLogo.png'"
    />
    <h3>${person.firstName} ${person.lastName ? person.lastName : ""}</h3>
    <p class="role">${person.role ? person.role : "Acm Member"}</p>
    <p class="description">
        ${
            person.description
                ? person.description
                : `${person.firstName} is apart of the team who contributes to the organisation of the event`
        }
    </p>
    <a
        aria-label="link to linked in page"
        href="${person.linkedIn ? person.linkedIn : "#home"}"
    >
        <i class="fab fa-linkedin"></i>
    </a>
    </div>`;
    html += rawHtml;
});

teamContainer.innerHTML = html;
