Object.defineProperty(window, 'fetch', {
    configurable: false,
    enumerable: false,
    value: () => {
        throw new Error('fetch is disabled');
    },
    writable: false,
});
Object.defineProperty(window, 'XMLHttpRequest', {
    configurable: false,
    enumerable: false,
    value: () => {
        throw new Error('XMLHttpRequest is disabled');
    },
    writable: false,
});
Object.defineProperty(window, 'axios', {
    configurable: false,
    enumerable: false,
    value: () => {
        throw new Error('axios is disabled');
    },
    writable: false,
});

// Nonaktifkan inspect elemen
document.addEventListener('contextmenu', event => event.preventDefault());
// Nonaktifkan shortcut
document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey) {
        if (event.key === 'i' || event.key === 'I' || event.key === 'c' || event.key === 'C' || event.key === 'Meta' || event.key === 'Command') {
            event.preventDefault();
        }
    }
});

// Nonaktifkan mengubah apapun dengan cara apapun
window.addEventListener('beforeunload', event => {
    event.preventDefault();
    event.returnValue = '';
});

Object.freeze(window);
Object.freeze(document);
