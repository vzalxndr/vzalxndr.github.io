let currentMode = "static";
let sendTimer = null;

const inputs = ["color", "brightness", "adaptive"];
inputs.forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    checkWakeThenSend(scheduleSend);
  });
});

function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.modes button').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === mode);
  });
  checkWakeThenSend(scheduleSend);
}

function scheduleSend() {
  if (sendTimer) clearTimeout(sendTimer);
  sendTimer = setTimeout(sendLightSettings, 400);
}

function sendLightSettings() {
  const ip = document.getElementById("ip").value.trim();
  if (!ip) return;

  const color = document.getElementById("color").value;
  const brightness = document.getElementById("brightness").value;
  const adaptive = document.getElementById("adaptive").checked ? 1 : 0;

  const url = `http://${ip}/set?color=${encodeURIComponent(color)}&brightness=${brightness}&mode=${currentMode}&adaptive=${adaptive}`;

  fetch(url)
    .then(res => res.json())
    .then(data => console.log("Light settings sent:", data))
    .catch(err => console.error("Light settings error:", err));

  console.log("Request sent:", url);
}

function setWake() {
    const ip = document.getElementById("ip").value.trim();
    if (!ip) return;

    const wakeTime = document.getElementById("wakeTime").value;
    const [hour, minute] = wakeTime.split(":").map(num => parseInt(num));

    const url = `http://${ip}/set?enableWake=1&wakeHour=${hour}&wakeMinute=${minute}`;

    fetch(url)
      .then(res => res.json())
      .then(data => alert("Wake alarm set."))
      .catch(err => alert("Failed to set wake alarm."));
}

function disableWake() {
  const ip = document.getElementById("ip").value.trim();
  if (!ip) return;

  fetch(`http://${ip}/set?enableWake=0`)
    .then(res => res.json())
    .then(() => alert("Wake alarm disabled."))
    .catch(err => alert("Failed to disable wake alarm."));
}

function checkWakeThenSend(callback) {
  const ip = document.getElementById("ip").value.trim();
  if (!ip) return;

  fetch(`http://${ip}/statusWake`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "enabled") {
        const confirmCancel = confirm("Wake alarm is currently enabled.\n\nClick OK to disable it before applying changes.");

        if (confirmCancel) {
          fetch(`http://${ip}/set?enableWake=0`)
            .then(res => res.json())
            .then(() => {
              console.log("Wake disabled.");
              callback();
            })
            .catch(err => {
              alert("Error disabling wake mode.");
              console.error(err);
            });
        } else {
          console.log("Action canceled by user due to active wake mode.");
        }
      } else {
        callback();
      }
    })
    .catch(err => {
      console.warn("Could not check wake status. Proceeding anyway.");
      callback();
    });
}

setMode("static"); 