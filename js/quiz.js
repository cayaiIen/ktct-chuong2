// ==============================
// 📘 quiz.js - File chính
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    // --- 🧩 1. Danh sách câu hỏi ---
    const questions = [
        { question: "Điều kiện cần của sản xuất hàng hóa là gì?", options: ["Phân công lao động xã hội", "Sự tách biệt về mặt chính trị", "Sự xuất hiện của tiền tệ"], correct: 0 },
        { question: "Điều kiện đủ của sản xuất hàng hóa là gì?", options: ["Phân công lao động xã hội", "Sự tách biệt tương đối về mặt kinh tế", "Sự có mặt của tư bản"], correct: 1 },
        { question: "Giá trị của hàng hóa do đâu tạo ra?", options: ["Do công dụng của hàng hóa", "Do lao động xã hội của người sản xuất kết tinh trong hàng hóa", "Do nhu cầu thị trường"], correct: 1 },
        { question: "Giá trị sử dụng của hàng hóa thể hiện ở:", options: ["Công dụng thỏa mãn nhu cầu con người", "Lượng thời gian lao động", "Tỷ lệ trao đổi"], correct: 0 },
        { question: "Lao động cụ thể tạo ra:", options: ["Giá trị", "Giá trị sử dụng", "Cả hai"], correct: 1 },
        { question: "Lao động trừu tượng tạo ra:", options: ["Giá trị", "Giá trị sử dụng", "Công dụng"], correct: 0 },
        { question: "Tính hai mặt của lao động sản xuất hàng hóa là gì?", options: ["Cụ thể và trừu tượng", "Đơn giản và phức tạp", "Chủ quan và khách quan"], correct: 0 },
        { question: "Khi năng suất lao động tăng, giá trị của một đơn vị hàng hóa:", options: ["Tăng", "Giảm", "Không đổi"], correct: 1 },
        { question: "Khi cường độ lao động tăng, lượng giá trị hàng hóa:", options: ["Tăng", "Giảm", "Không đổi"], correct: 2 },
        { question: "Hình thái chung của giá trị là giai đoạn:", options: ["Sơ khai của tiền tệ", "Phát triển đầy đủ của giá trị", "Hình thành thị trường quốc tế"], correct: 0 },
        { question: "Hàng hóa có mấy thuộc tính cơ bản?", options: ["1", "2", "3"], correct: 1 },
        { question: "Tiền làm phương tiện thanh toán khi:", options: ["Trả tiền sau", "Mua hàng trực tiếp", "Đổi lấy vàng"], correct: 0 },
        { question: "C. Mác gọi cổ phiếu là:", options: ["Tư bản giả", "Hàng hóa thật", "Giấy tờ có giá trị sử dụng"], correct: 0 },
        { question: "Bản chất của tiền tệ là:", options: ["Hàng hóa đặc biệt", "Giấy trao đổi", "Vật trung gian"], correct: 0 },
        { question: "Tiền làm thước đo giá trị khi:", options: ["Định giá hàng hóa", "Trao đổi trực tiếp", "Cất trữ trong ngân hàng"], correct: 0 },
        { question: "Khi bạn gửi tiết kiệm ngân hàng, tiền thực hiện chức năng:", options: ["Phương tiện lưu thông", "Phương tiện cất trữ", "Thước đo giá trị"], correct: 1 },
        { question: "Tiền giấy có giá trị nhờ:", options: ["Nhà nước quy định", "Vật chất bên trong", "Do dân tin tưởng tuyệt đối"], correct: 0 },
        { question: "Hình thái tiền tệ xuất hiện khi:", options: ["Một hàng hóa làm vật ngang giá chung", "Tất cả hàng hóa có giá trị ngang nhau", "Tiền giấy ra đời"], correct: 0 },
        { question: "Chức năng cơ bản đầu tiên của tiền tệ là gì?", options: ["Thước đo giá trị", "Phương tiện cất trữ", "Phương tiện thanh toán"], correct: 0 },
        { question: "Tiền làm phương tiện lưu thông khi:", options: ["Dùng để mua bán hàng hóa", "Lưu trữ lâu dài", "Thanh toán nợ"], correct: 0 }
    ];

    // --- 🎲 2. Lấy ngẫu nhiên 10 câu ---
    function getRandomQuestions() {
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 10);
    }

    // --- 🧱 3. Hiển thị quiz ---
    function renderQuiz() {
        const container = document.querySelector(".quiz-container");
        container.innerHTML = "";
        const selected = getRandomQuestions();

        selected.forEach((q, index) => {
            const div = document.createElement("div");
            div.className = "quiz-question";
            div.id = `q${index}`;

            let optionsHTML = q.options.map((opt, i) => `
                <li>
                    <input type="radio" id="q${index}_${i}" name="q${index}" value="${i}">
                    <label for="q${index}_${i}">${opt}</label>
                </li>
            `).join("");

            div.innerHTML = `
                <h4>Câu ${index + 1}: ${q.question}</h4>
                <ul class="quiz-options">${optionsHTML}</ul>
            `;
            container.appendChild(div);
        });

        container.innerHTML += `
            <div class="quiz-controls">
                <button id="submit-quiz-btn" class="quiz-button">Nộp bài</button>
                <button id="reset-quiz-btn" class="quiz-button reset">Làm lại</button>
                <div id="quiz-result"></div>
            </div>
        `;

        document.getElementById("submit-quiz-btn").addEventListener("click", () => checkAnswers(selected));
        document.getElementById("reset-quiz-btn").addEventListener("click", renderQuiz);
    }

    // --- 🧮 4. Chấm điểm ---
    function checkAnswers(selected) {
        let score = 0;
        const questionsDOM = document.querySelectorAll(".quiz-question");

        questionsDOM.forEach((div, i) => {
            const selectedOption = div.querySelector(`input[name="q${i}"]:checked`);
            const labels = div.querySelectorAll("label");
            labels.forEach(l => l.classList.remove("highlight-correct", "highlight-wrong"));

            if (selectedOption) {
                const correctIndex = selected[i].correct;
                if (parseInt(selectedOption.value) === correctIndex) {
                    score++;
                    labels[correctIndex].classList.add("highlight-correct");
                } else {
                    labels[correctIndex].classList.add("highlight-correct");
                    selectedOption.nextElementSibling.classList.add("highlight-wrong");
                }
            } else {
                div.classList.add("unanswered");
            }
        });

        const resultDiv = document.getElementById("quiz-result");
        resultDiv.className = "";
        resultDiv.textContent = `Bạn làm đúng ${score}/${selected.length} câu!`;

        if (score >= selected.length * 0.8) {
            resultDiv.classList.add("success");
            resultDiv.textContent += " 🎉 Rất xuất sắc!";
        } else if (score >= selected.length * 0.5) {
            resultDiv.classList.add("success");
            resultDiv.textContent += " 👍 Khá tốt!";
        } else {
            resultDiv.classList.add("fail");
            resultDiv.textContent += " 😅 Cần xem lại bài nhé!";
        }
    }

    // --- 🚀 5. Gọi khi load trang ---
    renderQuiz();
});
