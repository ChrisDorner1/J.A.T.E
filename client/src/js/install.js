const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible'

});



    butInstall.addEventListener('click', (event) => {
        console.log("click")
    event.prompt()
    butInstall.setAttribute('disabled', true)
    butInstall.textContent = "Successfully installed"
    console.error("there was an issue installing", err)
})

window.addEventListener('appinstalled', (event) => { 
    butInstall.textContent = "App Installed"
    console.log("application installed successfully", event)
});
