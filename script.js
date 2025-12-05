
let count = 2500000;
let minCount = 2300000;
let goingDown = true;
let display = document.getElementById("botCount");
let statusNote = document.getElementById("statusNote");

let botCounts = [count];
let labels = [new Date().toLocaleTimeString()];

const ctx = document.getElementById('botChart').getContext('2d');
const botChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Live Bot Count',
      data: botCounts,
      borderColor: '#38bdf8',
      backgroundColor: '#38bdf822',
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

function updateChart() {
  const time = new Date().toLocaleTimeString();
  labels.push(time);
  botCounts.push(count);
  
  if (labels.length > 20) {
    labels.shift();
    botCounts.shift();
  }

  botChart.update();
}

function updateCount() {
  if (goingDown) {
    count -= 5000;
    if (count <= minCount) {
      goingDown = false;
      statusNote.textContent = "Maintenance done. Bots recovering...";
      } else {
      statusNote.textContent = "Maintenance ongoing. Bots offline...";
    }
  } else {
    count += 5000;
    if (count >= 2500000) {
      goingDown = true;
      statusNote.textContent = "All systems operational";
    }
  }

  display.textContent = count.toLocaleString();
  updateChart();
}

setInterval(updateCount, 1000); // every 1 sec
.
