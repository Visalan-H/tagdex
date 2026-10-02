// The canvas specimen needs JavaScript to show anything, so it draws here.
export function drawSpecimens(root: ParentNode) {
  root.querySelectorAll<HTMLCanvasElement>("canvas[data-draw]").forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ["#ff6b8b", "#ffc94d", "#7be08a", "#6cc6ff", "#b18cff"].forEach((color, i) => {
      ctx.beginPath();
      ctx.arc(30 + i * 45, 45, 26, 0, Math.PI * 2);
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = color;
      ctx.fill();
    });
  });
}
