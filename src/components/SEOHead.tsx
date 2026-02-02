import { useEffect } from 'react'

/**
 * SEO Head Component - Schema.org Structured Data
 * Optimized for Technical Product Manager positioning
 */

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function SEOHead({
  title = "Vradis Florez - Technical Product Manager",
  description = "Technical Product Manager who doesn't wait for dev cycles. I research, design, and code — moving from insight to deployed MVP in weeks. Building products across e-commerce, fintech, and B2B SaaS.",
  image = "https://vradis.es/og-image.jpg",
  url = "https://vradis.es"
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
            "name": "Vradis Florez Luque",
            "url": "https://vradis.es",
            "image": "https://vradis.es/profile-photo.jpg",
            "sameAs": [
              "https://www.linkedin.com/in/vradisflorez/",
              "https://github.com/vradss"
            ],
            "jobTitle": "Technical Product Manager",
            "worksFor": {
              "@type": "Organization",
              "name": "Núcleo Studio",
              "url": "https://nucleostudio.co"
            },
            "alumniOf": [
              {
                "@type": "EducationalOrganization",
                "name": "42 Madrid"
              },
              {
                "@type": "EducationalOrganization",
                "name": "Peruvian University of Applied Sciences"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Madrid",
              "addressRegion": "Madrid",
              "addressCountry": "ES"
            },
            "knowsAbout": [
              "Technical Product Management",
              "Product Strategy",
              "End-to-End Product Development",
              "UX/UI Design",
              "Full-Stack Development",
              "React",
              "Next.js",
              "Python",
              "Django",
              "Rapid Prototyping",
              "MVP Development",
              "B2B SaaS",
              "E-commerce",
              "Fintech",
              "AI Product Development",
              "Workflow Automation",
              "User Research",
              "Data-Driven Decision Making"
            ],
            "description": description,
            "email": "vradis.tech@gmail.com",
            "telephone": "+34613510777"
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
            "name": "Vradis Florez - Technical Product Manager Portfolio",
            "url": "https://vradis.es",
            "description": description,
            "author": {
              "@type": "Person",
              "name": "Vradis Florez Luque"
            },
            "inLanguage": ["en-US", "es-ES"],
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://vradis.es/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* Professional Profile Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "dateCreated": "2024-06-01T00:00:00+00:00",
            "dateModified": new Date().toISOString(),
            "mainEntity": {
              "@type": "Person",
              "name": "Vradis Florez Luque",
              "alternateName": "Vradis Florez",
              "description": "Technical Product Manager specializing in end-to-end product development, from research and strategy to design and code execution.",
              "image": "https://vradis.es/profile-photo.jpg",
              "sameAs": [
                "https://www.linkedin.com/in/vradisflorez/",
                "https://github.com/vradss",
                "https://nucleostudio.co"
              ]
            }
          })
        }}
      />
    </>
  )
}
