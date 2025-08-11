import { h } from "./core/h.js";
import { render } from "./core/render.js";
import { useState, withComponent } from "./core/state.js";
import { scheduledUpdate } from "./core/scheduler.js";

const root = document.getElementById("app");

function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return h(
    "div",
    null,
    h("p", null, `A: ${a}`),
    h("button", { onClick: () => setA((v) => v + 1) }, "inc A"),
    h("p", null, `B: ${b}`),
    h("button", { onClick: () => setB((v) => v + 1) }, "inc B"),
  );
}

const component = {
  __hooks: [],
  __hookIndex: 0,
  __render() {
    withComponent(component, () => render(App(), root));
  },
  __schedule() {
    scheduledUpdate(component);
  },
};

component.__render();
