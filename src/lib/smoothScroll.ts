/**
 * Provides smooth scrolling functionality to navigate to page sections
 * @param e Mouse event from the click
 * @param id The section ID to scroll to (including the # symbol)
 */
export function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, id: string): void {
  // Only process if it's a hash link (internal page section)
  if (id.startsWith('#')) {
    e.preventDefault();
    const targetId = id.substring(1); // remove the # symbol
    const element = document.getElementById(targetId);
    
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for the fixed header
        behavior: 'smooth'
      });
    }
  }
}