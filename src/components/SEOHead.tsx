import { useEffect } from 'react'

/**
 * SEO Head Component - Schema.org Structured Data
 * Add this component in your App.tsx or main layout
 */

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function SEOHead({
  title = "Vradis Florez - Product Manager & Developer",
  description = "Product Manager transitioning to full-stack development. Experienced in product strategy, UX design, and building digital products from concept to launch.",
  image = "https://vradis.com/og-image.jpg",
  url = "https://vradis.com"
}: SEOHeadProps) {

  useEffect(() => {
    // Update document title dynamically
    document.title = title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    const ogImage = document.querySelector('meta[property="og:image"]')
    const ogUrl = document.querySelector('meta[property="og:url"]')

    if (ogTitle) ogTitle.setAttribute('content', title)
    if (ogDescription) ogDescription.setAttribute('content', description)
    if (ogImage) ogImage.setAttribute('content', image)
    if (ogUrl) ogUrl.setAttribute('content', url)

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    const twitterImage = document.querySelector('meta[name="twitter:image"]')

    if (twitterTitle) twitterTitle.setAttribute('content', title)
    if (twitterDescription) twitterDescription.setAttribute('content', description)
    if (twitterImage) twitterImage.setAttribute('content', image)

  }, [title, description, image, url])

  return (
    <>
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Vradis Florez",
            "url": "https://vradis.com",
            "image": "https://vradis.com/profile-photo.jpg",
            "sameAs": [
              "https://www.linkedin.com/in/vradisflorez/",
              "https://github.com/vradss"
            ],
            "jobTitle": "Product Manager & Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            },
            "alumniOf": {
              "@type": "Organization",
              "name": "42 Madrid"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Madrid",
              "addressCountry": "ES"
            },
            "knowsAbout": [
              "Product Management",
              "UX Design",
              "Frontend Development",
              "React",
              "TypeScript",
              "Product Strategy",
              "User Research",
              "Web Development"
            ],
            "description": description
          })
        }}
      />

      {/* Additional Structured Data for Portfolio/Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Vradis Florez Portfolio",
            "url": "https://vradis.com",
            "description": description,
            "author": {
              "@type": "Person",
              "name": "Vradis Florez"
            },
            "inLanguage": "en-US"
          })
        }}
      />
    </>
  )
}

/**
 * Usage in App.tsx or layout:
 *
 * import { SEOHead } from '@/components/SEOHead'
 *
 * function App() {
 *   return (
 *     <>
 *       <SEOHead />
 *       <YourContent />
 *     </>
 *   )
 * }
 *
 * Or for dynamic pages:
 *
 * <SEOHead
 *   title="Project Name - Vradis Florez"
 *   description="Project description..."
 *   image="https://vradis.com/project-image.jpg"
 *   url="https://vradis.com/projects/project-name"
 * />
 */
