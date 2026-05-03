// Strip browser extension injected attributes before React hydration to prevent
// hydration mismatch errors. This runs AFTER HTML loads but BEFORE React hydrates.
//
// Known culprits:
// - Password managers (1Password, Dashlane, LastPass) inject "fdprocessedid" on buttons/inputs
// - Jetski injects "data-jetski-tab-id" on <html>
// - Grammarly injects "data-gr-ext-installed"
// - Dark Reader injects "data-darkreader-*"

const EXTENSION_ATTRS = [
  'fdprocessedid',
  'data-jetski-tab-id',
  'data-new-gr-c-s-check-loaded',
  'data-gr-ext-installed',
  'data-lt-installed',
  'cz-shortcut-listen',
  'data-darkreader-mode',
  'data-darkreader-scheme',
];

function stripExtensionAttrs(root: Element | Document = document) {
  const targets = root === document ? document.querySelectorAll('*') : [root as Element, ...(root as Element).querySelectorAll('*')];
  for (const el of targets) {
    for (const attr of EXTENSION_ATTRS) {
      if (el.hasAttribute(attr)) {
        el.removeAttribute(attr);
      }
    }
  }
}

try {
  // 1. Strip immediately on all existing elements
  stripExtensionAttrs();

  // 2. Watch for new injections from extensions that run after us
  //    and strip them before React can see them during hydration
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName) {
        if (EXTENSION_ATTRS.includes(mutation.attributeName)) {
          (mutation.target as Element).removeAttribute(mutation.attributeName);
        }
      }
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) {
            stripExtensionAttrs(node);
          }
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: EXTENSION_ATTRS,
    childList: true,
    subtree: true,
  });

  // Stop observing after hydration is done (give it 10 seconds)
  setTimeout(() => observer.disconnect(), 10000);
} catch {
  // Silently ignore
}
