import shiftImage from '@/assets/projects/shift/shift-main.png'
import shiftBefore from '@/assets/projects/shift/shift-before.png'
import shiftAfter from '@/assets/projects/shift/shift-after.png'
import worthitImage from '@/assets/projects/worthit/worthit-main.png'
import worthitWireframe from '@/assets/projects/worthit/worthit-wireframe.png'
import worthitFinal from '@/assets/projects/worthit/worthit-final.png'
import worthitCompetitiveAnalysis from '@/assets/projects/worthit/worthit-competitive-analysis.png'
import invoiNetImage from '@/assets/projects/invoinet/invoinet-main.png'
import invoiNetBefore from '@/assets/projects/invoinet/invoinet-before.png'
import invoiNetAfter from '@/assets/projects/invoinet/invoinet-after.png'
import nGrowthImage from '@/assets/projects/ngrowth/ngrowth-main.png'
import nGrowthWireframe from '@/assets/projects/ngrowth/ngrowth-wireframe.png'
import nGrowthFinal from '@/assets/projects/ngrowth/ngrowth-final.png'
import juntozImage from '@/assets/projects/juntoz/juntoz-main.png'
import juntozCompetitiveBenchmarking from '@/assets/projects/juntoz/juntoz-competitive-benchmarking.png'
import juntozUserResearch from '@/assets/projects/juntoz/juntoz-user-research.png'
import juntozInformationArchitecture from '@/assets/projects/juntoz/juntoz-information-architecture.png'
import juntozAnalytics from '@/assets/projects/juntoz/juntoz-analytics.png'
import juntozProductos from '@/assets/projects/juntoz/juntoz-productos.png'
import juntozMarketing from '@/assets/projects/juntoz/juntoz-marketing.png'
import juntozLogistica from '@/assets/projects/juntoz/juntoz-logistica.png'
import juntozCapacitaciones from '@/assets/projects/juntoz/juntoz-capacitaciones.png'
import juntozBeforePedidos from '@/assets/projects/juntoz/juntoz-before-pedidos.png'
import juntozBeforeCupones from '@/assets/projects/juntoz/juntoz-before-cupones.png'
import juntozBeforeCatalogo from '@/assets/projects/juntoz/juntoz-before-catalogo.png'
import juntozBeforeListadoPedidos from '@/assets/projects/juntoz/juntoz-before-listado-pedidos.png'
import juntozAfter from '@/assets/projects/juntoz/juntoz-after.png'

export interface Project {
  id: number
  title: string
  description: string
  category: 'Web Design' | 'UX Design' | 'Product Management' | 'Development'
  image: string | any
  technologies?: string[]
  year: string
  country: string
  logo?: string | any
  details?: {
    problem: string
    skills?: string[]
    approach?: string[]
    results: string[]
    beforeImage?: string | any | (string | any)[]
    afterImage?: string | any | (string | any)[]
    wireframeImage?: string | any
    competitiveAnalysisImage?: string | any
    competitiveBenchmarkingImages?: (string | any)[]
    userResearchImage?: string | any
    informationArchitectureImage?: string | any
  }
}

export const projects: Project[] = [
  {
    id: 1,
    title: "SHIFT",
    description: "Brand positioning and website redesign for a creative co-working space blending art, tech, and community.",
    category: "Web Development",
    image: shiftImage,
    technologies: ["Webflow", "UI Design", "Web Development", "UX Research"],
    year: "Innovation Hub",
    country: "Peru",
    details: {
      problem: "SHIFT needed a complete rebrand to differentiate itself in the saturated co-working market. The existing brand lacked personality and failed to communicate their unique value proposition of blending art, technology, and community in one space.",
      skills: ["Web Design", "Content Strategy" , "Visual Identity Design"],
      results: [
        "🚀 40% increase in membership inquiries within first month",
        "🔎 Brand recognition improved by 65% in target demographic",
        "💡 Website conversion rate increased from 2.1% to 8.3%",
        "👀 Featured in 5 major design publications",
      ],
      beforeImage: shiftBefore,
      afterImage: shiftAfter
    }
  },
  {
    id: 2,
    title: "WORTHIT",
    description: "Venture capital platform for early-stage B2B SaaS startups, differentiating through strategic corporate connections.",
    category: "Web Design",
    image: worthitImage,
    technologies: ["Webflow", "Custom CSS/JS"],
    year: "Venture Capital",
    country: "Peru",
    details: {
      problem: "WorthIt, a newly launched venture capital fund, needed to differentiate in a crowded LatAm VC market.\n\nTheir unique value wasn't just capital—it was strategic connections to enterprise clients that accelerate product-market fit.\n\nProduct challenge: build a digital platform that communicated this differentiation to two user segments (founders seeking investment, investors seeking co-investment opportunities) while establishing credibility as a new fund.",
      skills: ["Product Strategy", "UX Design", "Web Development"],
      results: [
        "🎯 Clear dual-path user experience serving both founders and investors",
        "📊 Effective communication of complex investment thesis and criteria",
        "🚀 Established credible digital presence for newly launched VC fund",
        "💼 Streamlined conversion flows for each user segment"
      ],
      wireframeImage: worthitWireframe,
      afterImage: worthitFinal,
      competitiveAnalysisImage: worthitCompetitiveAnalysis
    }
  },
  {
    id: 3,
    title: "INVOINET",
    description: "Repositioned enterprise fintech for regional expansion and rebuilt platform in React",
    category: ["Product Strategy", "UX Design", "Frontend Development"],
    image: invoiNetImage,
    technologies: ["React", "React Router", "Azure DevOps"],
    year: "Fintech",
    country: "United States",
    details: {
      problem: "Invoinet, a fintech serving 40+ enterprise clients, needed to reposition for regional expansion. Their website messaging was misaligned with their evolved product, causing wrong prospect expectations and low enterprise credibility.",
      skills: ["Product Strategy", "UX Design", "Frontend Development"],
      approach: [
        "Led user research with enterprise clients to redefine positioning strategy",
        "Designed UX/UI and information architecture for enterprise audience",
        "Built entire frontend from scratch in React (first solo production app)",
        "Deployed to Azure and managed release"
      ],
      results: [
        "✓ Clarified value proposition enabling sales team to qualify leads better",
        "✓ Positioned as enterprise-grade solution for regional expansion",
        "✓ Page load optimized and improved conversion rate"
      ],
      beforeImage: invoiNetBefore,
      afterImage: invoiNetAfter
    }
  },
  {
    id: 4,
    title: "NGROWTH",
    description: "B2B sales strategies platform optimized for growth, featuring proven methods and playbooks used by unicorn startups, restructuring commercial processes for business expansion.",
    category: "Web Design",
    image: nGrowthImage,
    technologies: ["WordPress", "Custom CSS/JS", "MailerLite"],
    year: "Sales B2B Consulting",
    country: "Peru",
    details: {
      problem: "NGROWTH was launching as a new B2B sales consultancy targeting tech startup founders. They needed to establish market positioning and digital presence from scratch, differentiating themselves in a crowded space while building credibility with zero brand recognition.",
      skills: ["Brand Positioning", "UX Design", "Web Development"],
      results: [
        "🚀 Established strong market positioning in competitive B2B consultancy space",
        "💼 Built credible digital presence that attracted early-stage tech founders",
        "📈 Created scalable website foundation for future growth",
        "✨ Differentiated brand identity that resonated with target audience"
      ],
      wireframeImage: nGrowthWireframe,
      afterImage: nGrowthFinal
    }
  },
  {
    id: 5,
    title: "JUNTOZ",
    description: "E-commerce marketplace redesign: rebuilt Seller Center from user research to production.",
    category: "UX Design",
    image: juntozImage,
    technologies: ["Figma", "User Research", "Prototyping"],
    year: "E-commerce",
    country: "Peru",
    details: {
      problem: "Juntoz, a leading Peruvian e-commerce marketplace recently acquired by EFE Group, was losing sellers to competitors like Amazon Seller Central and Mercado Libre.\n\nThe Seller Center was built without user research, making it extremely difficult for sellers to create and manage their virtual stores. Sellers abandoned the platform and chose competitors with more intuitive seller experiences—directly impacting marketplace growth.\n\nProduct challenge: redesign the Seller Center to match or exceed competitor usability, enabling sellers to onboard and operate independently without friction.",
      skills: ["Product Strategy", "UX Research", "Product Design"],
      results: [
        "✓ Redesigned Seller Center from ground up based on comprehensive user research",
        "✓ Matched competitor usability standards enabling independent seller operations",
        "✓ Improved seller onboarding and retention rates",
        "✓ Reduced seller support tickets through intuitive interface design"
      ],
      competitiveAnalysisImage: juntozCompetitiveBenchmarking,
      competitiveBenchmarkingImages: [juntozAnalytics, juntozProductos, juntozMarketing, juntozLogistica, juntozCapacitaciones],
      userResearchImage: juntozUserResearch,
      informationArchitectureImage: juntozInformationArchitecture,
      beforeImage: [juntozBeforeCatalogo, juntozBeforeListadoPedidos],
      afterImage: [juntozBeforePedidos, juntozBeforeCupones, juntozAfter]
    }
  }
]