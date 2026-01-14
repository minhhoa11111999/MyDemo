// Chuyển đổi giữa các Section
function showSection(id) {
    document.querySelectorAll('main section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// Giả lập dữ liệu phiên sản xuất (Mục 4)
const sessions = [
    { id: "LOT-001", start: "08:00", mid: "08:30", finish: "09:15", status: "Completed" },
    { id: "LOT-002", start: "09:00", mid: "09:45", finish: null, status: "In Progress" },
    { id: "LOT-003", start: "10:00", mid: null, finish: null, status: "In Progress" }
];

// Hàm tính Lead Time (Mục 4.2: Finish - Start)
function calculateLeadTime(start, finish) {
    if (!start || !finish) return "--";
    const s = new Date(`2024-01-01 ${start}`);
    const f = new Date(`2024-01-01 ${finish}`);
    const diff = (f - s) / (1000 * 60); // Phút
    return `${diff} phút`;
}

// Render bảng dữ liệu
const tableBody = document.getElementById('sessionTableBody');
sessions.forEach(s => {
    const row = `<tr>
        <td><b>${s.id}</b></td>
        <td>${s.start}</td>
        <td>${s.mid || '-'}</td>
        <td>${s.finish || '-'}</td>
        <td>${calculateLeadTime(s.start, s.finish)}</td>
        <td><span class="status-pill ${s.status === 'Completed' ? 'status-completed' : 'status-progress'}">${s.status}</span></td>
    </tr>`;
    tableBody.innerHTML += row;
});

// Khởi tạo biểu đồ (Mục 2.2: Biểu đồ lưu lượng)
const ctx = document.getElementById('productionChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01'],
        datasets: [{
            label: 'Số lượng phiên sản xuất/ngày',
            data: [1100, 1250, 1050, 1400, 1300, 1500],
            borderColor: '#3498db',
            tension: 0.3,
            fill: true,
            backgroundColor: 'rgba(52, 152, 219, 0.1)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Quản lý Logout tự động (Mục 1.2: 15-30p)
let timeout;
function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        alert("Hết phiên làm việc. Hệ thống tự động logout!");
        location.reload();
    }, 15 * 60 * 1000); // 15 phút
}
document.onmousemove = resetTimer;
