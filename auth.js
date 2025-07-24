(function () {
  const currentPath = window.location.pathname;

  if (!currentPath.startsWith("/pdp/")) return;

  // Apply initial blur and disable pointer events
  document.body.style.filter = "blur(8px)";
  document.body.style.pointerEvents = "none";

  const waitForSecrets = setInterval(() => {
    if (typeof window.PDP_PASSWORD === "undefined") return;

    clearInterval(waitForSecrets);

    const accessGranted = sessionStorage.getItem("pdp_access_granted");
    if (accessGranted === "true") {
      document.body.style.filter = "";
      document.body.style.pointerEvents = "";
      return;
    }

    const entered = prompt("🔐 Enter password to view this page:");

    if (entered === null) {
      // User pressed Cancel - show message and remove blur so it can be read clearly
      document.body.style.filter = "";
      document.body.style.pointerEvents = "";
      document.body.innerHTML = `
        <div style="text-align:center; margin-top:3rem;">
          <h2>⚠️ Access Cancelled</h2>
          <p>You did not enter a password. Please refresh the page to try again.</p>
        </div>`;
      return;
    }

    if (entered !== window.PDP_PASSWORD) {
      document.body.style.filter = "";
      document.body.style.pointerEvents = "";
      document.body.innerHTML = `
        <div style="text-align:center; margin-top:3rem;">
          <h2>❌ Access Denied</h2>
          <p>The password you entered is incorrect.</p>
        </div>`;
    } else {
      sessionStorage.setItem("pdp_access_granted", "true");
      document.body.style.filter = "";
      document.body.style.pointerEvents = "";
    }
  }, 100);
})();
