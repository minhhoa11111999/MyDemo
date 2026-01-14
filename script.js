const rawData = [
    { id: "001", name: "Nguyễn Minh Tuấn", s: "08:00:00", cp: "08:15:20", f: "08:45:10", status: "Valid", dur: "00:45:10", seconds: 2710 },
    { id: "011", name: "Đỗ Mỹ Linh", s: "08:05:30", cp: "08:19:20", f: "08:50:10", status: "Valid", dur: "00:44:40", seconds: 2680 },
    { id: "004", name: "Phạm Bảo Nam", s: "08:01:20", cp: "08:14:00", f: "08:42:15", status: "Valid", dur: "00:40:55", seconds: 2455 },
    { id: "002", name: "Trần Thị Thanh", s: "08:00:15", cp: "08:16:10", f: "08:47:30", status: "Valid", dur: "00:47:15", seconds: 2835 },
    { id: "008", name: "Vũ Hải Đăng", s: "08:03:45", cp: "08:17:30", f: "08:55:20", status: "Valid", dur: "00:51:35", seconds: 3095 },
    { id: "005", name: "Hoàng Minh Thắng", s: "08:02:00", cp: "08:20:45", f: "09:05:10", status: "Valid", dur: "01:03:10", seconds: 3790 },
    { id: "007", name: "Bùi Anh Đức", s: "08:03:00", cp: "08:22:10", f: "09:12:00", status: "Valid", dur: "01:09:00", seconds: 4140 },
    { id: "010", name: "Phan Thanh Tùng", s: "08:05:00", cp: "08:25:00", f: "09:15:45", status: "Valid", dur: "01:10:45", seconds: 4245 },
    { id: "012", name: "Ngô Quốc Anh", s: "08:06:00", cp: "08:30:00", f: "09:30:00", status: "Valid", dur: "01:24:00", seconds: 5040 },
    { id: "003", name: "Lê Văn Hùng", s: "08:01:00", cp: "--:--:--", f: "08:50:00", status: "Warning", dur: "00:49:00", seconds: 2940 },
    { id: "006", name: "Đặng Thu Thảo", s: "08:02:30", cp: "08:18:00", f: "--:--:--", status: "DNF", dur: "--:--:--", seconds: 99999 },
    { id: "009", name: "Trịnh Công Sơn", s: "08:04:00", cp: "--:--:--", f: "--:--:--", status: "DNF", dur: "--:--:--", seconds: 99999 }
];

function showSection(id) {
    ['dashboard', 'participants', 'qr-view'].forEach(s => {
        document.getElementById('sec-' + s).classList.add('hidden');
        document.getElementById('btn-' + s).classList.remove('nav-active');
        document.getElementById('btn-' + s).classList.add('text-slate-400');
    });
    document.getElementById('sec-' + id).classList.remove('hidden');
    document.getElementById('btn-' + id).classList.add('nav-active');
}

function initData() {
    const sorted = [...rawData].sort((a,b) => a.seconds - b.seconds);
    const validOnly = sorted.filter(p => p.status === "Valid");
    const violations = rawData.filter(p => p.status !== "Valid");

    // Render TOP 5
    const top5El = document.getElementById('top-5-list');
    if(top5El) {
        top5El.innerHTML = validOnly.slice(0, 5).map((p, i) => `
            <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span class="text-xs font-bold text-slate-700">#${i+1} ${p.name}</span>
                <span class="font-mono font-bold text-indigo-600">${p.dur}</span>
            </div>
        `).join('');
    }

    // Render Violations
    const violEl = document.getElementById('violation-list');
    if(violEl) {
        violEl.innerHTML = violations.map(p => `
            <div class="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex justify-between">
                <p class="font-bold text-rose-800 text-xs">${p.name}</p>
                <span class="text-[9px] bg-white px-2 py-1 rounded-full text-rose-600">${p.status}</span>
            </div>
        `).join('');
    }

    // Render Table
    const tableBody = document.getElementById('full-table-body');
    if(tableBody) {
        tableBody.innerHTML = rawData.map(p => `
            <tr class="hover:bg-slate-50">
                <td class="p-5">${p.id}</td>
                <td class="p-5 font-bold">${p.name}</td>
                <td class="p-5 text-center font-mono">${p.s}</td>
                <td class="p-5 text-center font-mono">${p.cp}</td>
                <td class="p-5 text-center font-mono">${p.f}</td>
                <td class="p-5 text-right font-bold text-indigo-600">${p.dur}</td>
                <td class="p-5 text-center">
                    <span class="px-3 py-1 rounded-full text-[9px] font-bold ${p.status === 'Valid' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}">${p.status}</span>
                </td>
            </tr>
        `).join('');
    }
}

window.onload = initData;
