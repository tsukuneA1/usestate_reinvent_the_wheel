let queued = false;
const queue = new Set();

export function scheduledUpdate(component) {
    queue.add(component);
    if (!queued) {
        queued = true;
        queueMicrotask(flush);
    }
}

function flush() {
    const list = Array.from(queue);
    queue.clear();
    queued = false;
    for (const c of list) c.__render();
}