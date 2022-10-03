const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("radio");

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Hi <strong>${username}</strong> - Room: <strong>${room}</strong`;

document
    .getElementById("message-input")
    .addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const message = event.target.value;

            const data = {
                room,
                message,
                username,
            };

            createMessage(data);
            event.target.value = "";
        }
    });

function createMessage(data) {
    const messageDiv = document.getElementById("messages");

    messageDiv.innerHTML += `
    <div class="new_message">
      <label class="form-label">
        <strong>${data.username}:</strong> <span>${data.message}</span>
      </label>
    </div>
    `;
}

socket.emit("select_room", {
    username,
    room,
});
