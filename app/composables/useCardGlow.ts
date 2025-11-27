/**
 * Composable to handle card glow effect that follows the mouse cursor
 * Usage: Call useCardGlow() in your component's setup to enable the effect
 * The effect works on all elements with .card-glow or .bento-glow class
 */
export const useCardGlow = () => {
  const handleMouseMove = (e: MouseEvent) => {
    const cards = document.querySelectorAll('.card-glow, .bento-glow')

    cards.forEach((card) => {
      const rect = (card as HTMLElement).getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      ;(card as HTMLElement).style.setProperty('--mouse-x', `${x}px`)
      ;(card as HTMLElement).style.setProperty('--mouse-y', `${y}px`)
    })
  }

  onMounted(() => {
    document.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
  })
}
