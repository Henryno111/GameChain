// Debug script to clear localStorage and help identify issues
// Run this in browser console if you still have issues

console.log("=== GameChain Debug Helper ===");

// Clear all GameChain localStorage data
localStorage.removeItem('gamechain-games');
localStorage.removeItem('gamechain-current-game');
console.log("✅ Cleared localStorage data");

// Add debug logging for useEffect calls
window.debugUseEffect = true;

// Log current localStorage state
console.log("Current localStorage keys:", Object.keys(localStorage).filter(key => key.startsWith('gamechain')));

console.log("=== Refresh the page now ===");