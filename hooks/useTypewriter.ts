import { useState, useEffect } from 'react'

export function useTypewriter(
  words: string[],
  speed = 100,
  pause = 2000,
): string {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((i) => i + 1)
    } else {
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        )
      }, isDeleting ? speed / 2 : speed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, speed, pause])

  return text
}
