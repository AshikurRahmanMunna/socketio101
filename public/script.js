const socket = io("http://localhost:8000");
const messages = document.getElementById("messages");
let userId = "";
socket.on("conn", ({ id }) => {
  userId = id;
});

socket.on("change", (s) => {
  window.location.reload();
});

socket.on("sentMessage", (msg) => {
  const li = document.createElement("li");
  let innerHtml = "";
  if (userId === msg.id) {
    innerHtml = `<div>
            <p class="text-gray-500 text-sm mb-2"><small>You</small></p>
            <p class="font-bold bg-green-600 inline px-3 py-2 rounded-md">${msg.text}</p>
          </div>`;
  } else {
    innerHtml = `
          <div>
              <p class="text-gray-500 text-sm mb-2">
                <small>${userId}</small>
              </p>
              <p class="font-bold bg-yellow-600 inline px-3 py-2 rounded-md">
                ${msg.text}
              </p>
            </div>
            `;
  }
  li.innerHTML = innerHtml;
  console.log(userId, msg);
  li.className = `${userId === msg.id ? "text-right" : "text-left"}`;
  messages.appendChild(li);
});

document.querySelector("#msg-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.message.value;
  if (!text) {
    return;
  }
  socket.emit("newMessage", text);
  e.target.message.value = "";
});