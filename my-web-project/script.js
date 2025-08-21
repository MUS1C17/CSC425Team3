// Render members table from localStorage
function renderMembersTable() {
    const container = document.getElementById('membersTableContainer');
    if (!container) return;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
        container.innerHTML = "<p>No members registered yet.</p>";
        return;
    }
    let table = `<table style="margin:auto; border-collapse:collapse; min-width:300px;">
        <thead>
            <tr>
                <th style="border:1px solid #ccc; padding:6px;">First Name</th>
                <th style="border:1px solid #ccc; padding:6px;">Last Name</th>
                <th style="border:1px solid #ccc; padding:6px;">Phone</th>
                <th style="border:1px solid #ccc; padding:6px;">Github</th>
                <th style="border:1px solid #ccc; padding:6px;">Discord</th>
                <th style="border:1px solid #ccc; padding:6px;">Email</th>
            </tr>
        </thead>
        <tbody>
    `;
    users.forEach(user => {
        table += `<tr>
            <td style="border:1px solid #ccc; padding:6px;">${user.firstName}</td>
            <td style="border:1px solid #ccc; padding:6px;">${user.lastName}</td>
            <td style="border:1px solid #ccc; padding:6px;">${user.phone}</td>
            <td style="border:1px solid #ccc; padding:6px;">${user.github || ""}</td>
            <td style="border:1px solid #ccc; padding:6px;">${user.discord}</td>
            <td style="border:1px solid #ccc; padding:6px;">${user.email || ""}</td>
        </tr>`;
    });
    table += "</tbody></table>";
    container.innerHTML = table;
}

// Comments section logic
function renderComments() {
    const commentsSection = document.getElementById('commentsSection');
    if (!commentsSection) return;
    let comments = JSON.parse(localStorage.getItem('comments') || '[]');
    if (comments.length === 0) {
        commentsSection.innerHTML = "<p>No comments yet.</p>";
        return;
    }
    commentsSection.innerHTML = comments.map(c => 
        `<div style="background:#f1f8ff; margin:0.5em auto; max-width:400px; border-radius:4px; padding:0.7em 1em; text-align:left;">${c}</div>`
    ).join('');
}

window.onload = function() {
    renderMembersTable();
    renderComments();
    // Add comment on button click
    const addBtn = document.getElementById('addItem');
    if (addBtn) {
        addBtn.onclick = function() {
            const input = document.getElementById('userInput');
            const value = input.value.trim();
            if (value) {
                let comments = JSON.parse(localStorage.getItem('comments') || '[]');
                comments.push(value);
                localStorage.setItem('comments', JSON.stringify(comments));
                renderComments();
                input.value = '';
            }
        };
    }
};