const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event done?
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible'
    butInstall.addEventListener('click', async () => {
    event.prompt()
    butInstall.setAttribute('disabled', true)
    butInstall.textContent = "Successfully installed"
});
});

// TODO: Implement a click event handler on the `butInstall` element done?


// TODO: Add an handler for the `appinstalled` event done?
window.addEventListener('appinstalled', (event) => { 
    butInstall.textContent = "App Installed"
    console.log("application installed successfully", event)
});
