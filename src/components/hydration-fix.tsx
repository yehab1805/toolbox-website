"use client"

import { useEffect } from 'react'

export default function HydrationFix() {
  useEffect(() => {
    // Remove browser extension attributes that cause hydration mismatches
    const body = document.body
    if (body) {
      // Remove Grammarly attributes
      body.removeAttribute('data-new-gr-c-s-check-loaded')
      body.removeAttribute('data-gr-ext-installed')
      
      // Remove other common extension attributes
      body.removeAttribute('data-grammarly-shadow-root')
      body.removeAttribute('data-gramm')
    }
  }, [])

  return null
}
