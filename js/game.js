document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll(".draggable");
  const dropzones = document.querySelectorAll(".dropzone");
  const checkBtn = document.getElementById("checkGameBtn");
  const result = document.getElementById("gameResult");

  // Kéo – thả
  draggables.forEach(item => {
    item.addEventListener("dragstart", () => {
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });
  });

  dropzones.forEach(zone => {
    zone.addEventListener("dragover", e => {
      e.preventDefault();
      zone.classList.add("hover");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("hover"));
    zone.addEventListener("drop", e => {
      e.preventDefault();
      zone.classList.remove("hover");
      const dragging = document.querySelector(".dragging");
      if (dragging) zone.appendChild(dragging);
    });
  });

  // Nút kiểm tra
  checkBtn.addEventListener("click", () => {
    let correct = 0;
    let total = draggables.length;

    dropzones.forEach(zone => {
      const acceptType = zone.dataset.accept;
      const items = zone.querySelectorAll(".draggable");

      items.forEach(item => {
        if (item.dataset.type === acceptType) correct++;
      });
    });

    if (correct === total) {
      result.textContent = "🎉 Chính xác! Bạn đã phân loại đúng tất cả!";
      result.className = "game-result success";
    } else {
      result.textContent = `❌ Bạn đúng ${correct}/${total}. Thử lại nhé!`;
      result.className = "game-result fail";
    }
  });
});
