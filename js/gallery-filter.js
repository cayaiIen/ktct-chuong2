// Bộ lọc tiền tệ theo khu vực
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.currency-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Gỡ active cũ
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const region = btn.dataset.region;
    cards.forEach(card => {
      if (region === 'all' || card.classList.contains(region)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
