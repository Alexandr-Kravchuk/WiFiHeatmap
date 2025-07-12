const heatmapInstance = h337.create({
  container: document.getElementById('map')
});

function redraw() {
  fetch('/data')
    .then(res => res.json())
    .then(points => {
      heatmapInstance.setData({
        max: -20,
        min: -100,
        data: points.map(p => ({ x: p.x, y: p.y, value: p.rssi }))
      });
    });
}

document.getElementById('map').addEventListener('click', e => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  fetch('/measure', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x, y })
  })
    .then(res => res.json())
    .then(() => redraw());
});

redraw();
