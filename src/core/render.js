export function render(vnode, container) {
  container.innerHTML = "";
  container.appendChild(mount(vnode));
}

function mount(vnode) {
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }
  const el = document.createElement(vnode.type);
  setProps(el, vnode.props);
  vnode.children.forEach((c) => el.appendChild(mount(c)));
  return el;
}

function setProps(el, props) {
  for (const [k, v] of Object.entries(props || {})) {
    if (k.startsWith("on") && typeof v === "function") {
      el.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (k === "className") {
      el.setAttribute("class", v);
    } else {
      el.setAttribute(k, v);
    }
  }
}
