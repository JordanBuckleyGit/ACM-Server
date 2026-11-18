// Past events page: fullscreen poster.
// Native <dialog> provides Escape-to-close and keyboard focus handling for free.
const posterDialog = document.getElementById("posterDialog");

// The poster and its expand icon both open the fullscreen view.
document.querySelectorAll("#upcomingEventImage, .fullscreen-icon").forEach((element) => {
    element.addEventListener("click", () => posterDialog.showModal());
});

// Clicking the backdrop (the dialog element itself) or the close button closes it.
posterDialog.addEventListener("click", (event) => {
    if (event.target === posterDialog || event.target.closest(".fullscreen-close")) {
        posterDialog.close();
    }
});
