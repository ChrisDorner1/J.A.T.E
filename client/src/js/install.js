const butInstall = document.getElementById("buttonInstall");

let defPrompt;
// adds functionality to the "install" button.

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  butInstall.style.visibility = "visible";
  defPrompt = event;
});

butInstall.addEventListener("click", () => {
  if (defPrompt) {
    defPrompt.prompt();
    defPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        butInstall.setAttribute("disabled", true);
        butInstall.textContent = "Successfully installed";
      } else {
        console.log("Why no install me?");
      }
    });
  }
  console.error("there was an issue installing");
});

window.addEventListener("appinstalled", (event) => {
  butInstall.textContent = "App Installed";
  console.log("application installed successfully", event);
});
