(function () {
  const video = document.getElementById("video");
  const statusEl = document.getElementById("status");
  const titleEl = document.getElementById("title");
  const metaEl = document.getElementById("meta");
  const descEl = document.getElementById("description");
  const upnextEl = document.getElementById("upnext");

  const data = window.CATALOG || [];
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const item = data.find((v) => v.id === id) || data[0];

  if (!item) {
    statusEl.textContent = "No video found.";
    return;
  }

  document.title = `StreamE03 — ${item.title}`;

  function setStatus(msg) {
    statusEl.textContent = msg || "";
  }

  function loadStream(src) {
    if (window.Hls && window.Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => setStatus(""));
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setStatus("Stream error — trying native playback.");
          video.src = src;
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      video.src = src;
      setStatus("HLS not supported in this browser.");
    }
  }

  titleEl.textContent = item.title;
  metaEl.innerHTML = `
    <span>${item.category}</span>
    <span>${item.year}</span>
    <span>${item.duration}</span>
    <span>${item.rating}</span>`;
  descEl.textContent = item.description;

  loadStream(item.src);

  const others = data.filter((v) => v.id !== item.id);
  others.forEach((v) => {
    const el = document.createElement("div");
    el.className = "upnext-item";
    el.innerHTML = `
      <div class="upnext-thumb" style="background:${v.gradient}"></div>
      <div class="upnext-info">
        <div class="t">${v.title}</div>
        <div class="s">${v.category} · ${v.duration}</div>
      </div>`;
    el.addEventListener("click", () => {
      window.location.href = `player.html?id=${encodeURIComponent(v.id)}`;
    });
    upnextEl.appendChild(el);
  });
})();
