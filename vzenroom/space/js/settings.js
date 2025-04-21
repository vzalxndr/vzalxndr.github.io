document.addEventListener("DOMContentLoaded", () => {
    const ipInput = document.getElementById("ip");
    const LOCAL_STORAGE_KEY = "vzenroom-ip";
  
    const savedIP = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedIP) {
      ipInput.value = savedIP;
    }
  
    ipInput.addEventListener("input", () => {
      const ip = ipInput.value.trim();
      localStorage.setItem(LOCAL_STORAGE_KEY, ip);
    });
  });
  