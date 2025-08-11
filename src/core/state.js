let currentComponent = null;

export function withComponent(component, renderFn) {
    currentComponent = component;
    component.__hookIndex = 0;
    renderFn();
    currentComponent = null;
}

export function useState(initial) {
    const owner = currentComponent;
    if (!owner) throw new Error("useState must be called within a component");

    const hooks = owner.__hooks || (owner.__hooks = []);
    const i = owner.__hookIndex++;

    if (hooks[i] === undefined) {
        hooks[i] = typeof initial === "function" ? initial() : initial;
    }

    const setState = (next) => {
        const prev = hooks[i];
        hooks[i] = typeof next === "function" ? next(prev) : next;
        owner.__schedule();
    };

    return [hooks[i], setState];
}
