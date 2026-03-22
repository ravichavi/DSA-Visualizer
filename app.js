let current = "stack";
let stack = [];
let list = [];

/* Section Switch */
function showSection(type, btn) {
  current = type;

  document.querySelectorAll(".nav-btn")
    .forEach(b => b.classList.remove("active"));

  if (btn) btn.classList.add("active");

  const position = document.getElementById("position");

  document.getElementById("title").innerText =
    type === "stack" ? "Stack" : "Linked List";

  document.getElementById("stack-controls").style.display =
    type === "stack" ? "block" : "none";

  document.getElementById("ll-controls").style.display =
    type === "linkedlist" ? "block" : "none";

  // 🔥 Proper show/hide (no weird dropdown behavior)
  if (type === "linkedlist") {
    position.classList.remove("hidden");
  } else {
    position.classList.add("hidden");
  }

  render();
}

/* Render */
function render() {
  const v = document.getElementById("visualizer");
  v.innerHTML = "";
  v.classList.remove("fade");
  void v.offsetWidth;
  v.classList.add("fade");

  if (current === "stack") {
    v.className = "panel stack-container";

    stack.forEach((item, i) => {
      const div = document.createElement("div");
      div.className = "stack-item";
      div.innerText = item;

      if (i === stack.length - 1) {
        div.classList.add("top");
        div.innerText += " ← TOP";
      }

      v.appendChild(div);
    });
  }

  if (current === "linkedlist") {
    v.className = "panel linked-list";

    if (list.length) {
      const head = document.createElement("div");
      head.className = "head";
      head.innerText = "HEAD →";
      v.appendChild(head);
    }

    list.forEach((item) => {
      const node = document.createElement("div");
      node.className = "node";
      node.innerText = item;

      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.innerText = "→";

      v.appendChild(node);
      v.appendChild(arrow);
    });

    const nullNode = document.createElement("div");
    nullNode.className = "null";
    nullNode.innerText = "NULL";
    v.appendChild(nullNode);
  }
}

/* Stack */
function push(e) {
  ripple(e);
  let val = getVal();
  if (!val) return;

  stack.push(val);
  explain(`Pushed ${val}`);
  render();
}

function pop(e) {
  ripple(e);
  if (!stack.length) return alert("Empty");

  let val = stack.pop();
  explain(`Popped ${val}`);
  render();
}

/* Linked List */
function insert(e) {
  ripple(e);
  let val = getVal();
  let pos = getPos();

  if (pos === null) pos = list.length;

  list.splice(pos, 0, val);
  explain(`Inserted ${val} at position ${pos}`);
  render();
}

function deleteNode(e) {
  ripple(e);
  let pos = getPos();

  if (pos === null) pos = list.length - 1;

  let val = list.splice(pos, 1);
  explain(`Deleted ${val} from position ${pos}`);
  render();
}

/* Traverse */
async function traverse(e) {
  ripple(e);
  const nodes = document.querySelectorAll(".node");

  const pointer = document.createElement("div");
  pointer.className = "pointer";
  pointer.innerText = "HEAD";
  document.body.appendChild(pointer);

  for (let node of nodes) {
    const rect = node.getBoundingClientRect();

    pointer.style.transform =
      `translate(${rect.left}px, ${rect.top - 40}px)`;

    node.style.background = "#facc15";
    explain("Visiting node");

    await sleep(700);

    node.style.background = "#38bdf8";
  }

  pointer.innerText = "NULL";
  await sleep(700);
  pointer.remove();
}

/* Ripple */
function ripple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement("span");

  const rect = btn.getBoundingClientRect();
  circle.style.left = e.clientX - rect.left + "px";
  circle.style.top = e.clientY - rect.top + "px";

  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 500);
}

/* Helpers */
function getVal() {
  const input = document.getElementById("value");
  let val = input.value.trim();
  input.value = "";
  return val;
}

function getPos() {
  let pos = document.getElementById("position").value;
  return pos === "" ? null : parseInt(pos);
}

function explain(text) {
  document.getElementById("explain").innerText = text;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

