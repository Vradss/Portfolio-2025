import React, { useState, useCallback } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean // Para imágenes above-the-fold
}

export function ImageWithFallback({ 
  priority = false, 
  ...props 
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError = useCallback(() => {
    setDidError(true)
  }, [])

  const { src, alt, style, className, loading, ...rest } = props

  // Determinar loading: priority = eager, sino lazy
  const loadingAttr = priority ? 'eager' : (loading || 'lazy')

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img 
          src={ERROR_IMG_SRC} 
          alt="Error loading image" 
          {...rest} 
          data-original-url={src}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  ) : (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style} 
      loading={loadingAttr}
      decoding="async"
      {...rest} 
      onError={handleError} 
    />
  )
}
