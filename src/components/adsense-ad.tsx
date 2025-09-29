"use client"

import { useEffect } from 'react'

interface AdSenseAdProps {
  className?: string
}

export default function AdSenseAd({ className = "" }: AdSenseAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`flex justify-center my-8 ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2347690342335084"
        data-ad-slot="5900445628"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
