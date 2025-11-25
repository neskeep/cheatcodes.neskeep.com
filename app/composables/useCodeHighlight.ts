import { codeToHtml } from 'shiki'

export const useCodeHighlight = () => {
  const highlightCode = async (code: string, lang: string = 'javascript') => {
    try {
      const html = await codeToHtml(code, {
        lang,
        theme: 'github-dark',
      })
      return html
    } catch (error) {
      console.error('Error highlighting code:', error)
      return `<pre><code>${code}</code></pre>`
    }
  }

  return {
    highlightCode,
  }
}
