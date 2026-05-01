/* View Transitions API によるページ遷移 */
if ('startViewTransition' in document) {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    if (link.target === '_blank') return;

    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#')) return;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (href.startsWith('http://') || href.startsWith('https://')) return;

    e.preventDefault();
    document.startViewTransition(() => {
      window.location.href = link.href;
    });
  });
}
