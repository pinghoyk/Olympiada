function logout() {
    localStorage.removeItem('token');
    document.cookie = 'username=; Max-Age=0; path=/;';
    window.location.reload();
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}

function renderUserMenu() {
    const username = getCookie('username');
    if (username) {
        const loginLink = document.getElementById('loginNav');
        const profileMenu = document.getElementById('profileMenu');
        const profileName = document.getElementById('userNameDisplay')
        if (loginLink) loginLink.style.display = 'none';
        if (profileMenu) {
            profileMenu.style.display = 'inline-block';
            document.getElementById('userName').textContent = username;
        }
        if (profileName) {
            profileName.textContent = username
        }
    }
}

window.onload = renderUserMenu;