const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("radio");

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Hi <strong>${username}</strong> - Room: <strong>${room}</strong`;

document
    .getElementById("message_input")
    .addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const message = event.target.value;

            const data = {
                room,
                message,
                username,
            };

            socket.emit("message", data);
            event.target.value = "";
        }
    });
    socket.on("message", (data) => {
        console.log(data)
        createMessage(data)
    });
    
function createMessage(data) {
    const messageDiv = document.getElementById("messages");

    messageDiv.innerHTML += `
    <div class="new_message">
      <label class="form-label">
        <strong>${data.username}:</strong> <span>${data.text}</span>
      </label>
    </div>
    `;
}

socket.emit(
    "select_room",
    {
        username,
        room,
    },
    (messages) => {
        messages.forEach((data) => {
            createMessage(data);
        });
    }
);

