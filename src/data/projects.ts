import i18n from 'i18next'
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
import juntozProductosLong from '@/assets/projects/juntoz/Productos_Long2.jpg'
import juntozCalificaciones from '@/assets/projects/juntoz/Calificaciones.jpg'
import juntozMarketingInfo from '@/assets/projects/juntoz/Marketing_Informacion de campaña 3.jpg'

export interface Project {
  id: number
  title: string
  description: string
  image: string | any
  technologies?: string[]
  industry: string
  country: string
  logo?: string | any
  details?: {
    role?: string
    problem: string
    year?: string
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
    whatILearned?: string[]
    myRole?: {
      title: string
      items: string[]
    }
    theChallenge?: {
      paragraph1: string
      coreProblem: string
      productGoal: string
    }
    theProcess?: {
      productResearch?: {
        userResearch: string
        competitiveBenchmarking: string
        keyInsight: string
      }
      informationArchitecture?: {
        description: string
        modules: string
        keyProductDecisions: {
          desktopFirst: string
          mobileReadOnly: string
          progressiveDisclosure: string
        }
      }
      designPrototyping?: {
        items: string[]
      }
      developmentQA?: {
        items: string[]
      }
    }
    impact?: {
      items: string[]
    }
  }
}

// Helper function to get projects from translations
export function getProjectsFromTranslations(): Project[] {
  const lng = i18n.language || 'en'
  const projectsData = i18n.getResourceBundle(lng, 'projects')
  
  if (!projectsData || !projectsData.projects) {
    // Fallback to English if translation not found
    const enProjects = i18n.getResourceBundle('en', 'projects')
    return enProjects?.projects || []
  }

  return projectsData.projects.map((project: any) => {
    // Map project data and add image references based on ID
    const baseProject: Partial<Project> = {
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      industry: project.industry,
      country: project.country,
      details: project.details ? {
        role: project.details.role,
        problem: project.details.problem,
        year: project.details.year,
        skills: project.details.skills,
        approach: project.details.approach,
        results: project.details.results,
        whatILearned: project.details.whatILearned,
        myRole: project.details.myRole,
        theChallenge: project.details.theChallenge,
        theProcess: project.details.theProcess,
        impact: project.details.impact
      } : undefined
    }

    // Add images based on project ID
    switch (project.id) {
      case 1: // INVOINET
        baseProject.image = invoiNetImage
        if (baseProject.details) {
          baseProject.details.beforeImage = invoiNetBefore
          baseProject.details.afterImage = invoiNetAfter
        }
        break
      case 2: // JUNTOZ
        baseProject.image = juntozImage
        if (baseProject.details) {
          baseProject.details.competitiveAnalysisImage = juntozCompetitiveBenchmarking
          baseProject.details.competitiveBenchmarkingImages = [juntozAnalytics, juntozProductos, juntozMarketing, juntozLogistica, juntozCapacitaciones]
          baseProject.details.userResearchImage = juntozUserResearch
          baseProject.details.informationArchitectureImage = juntozInformationArchitecture
          baseProject.details.beforeImage = [juntozBeforeCatalogo, juntozBeforeListadoPedidos]
          baseProject.details.afterImage = [juntozProductosLong, juntozCalificaciones, juntozBeforePedidos, juntozBeforeCupones, juntozAfter, juntozMarketingInfo]
        }
        break
      case 3: // SHIFT
        baseProject.image = shiftImage
        if (baseProject.details) {
          baseProject.details.beforeImage = shiftBefore
          baseProject.details.afterImage = shiftAfter
        }
        break
      case 4: // NGROWTH
        baseProject.image = nGrowthImage
        if (baseProject.details) {
          baseProject.details.wireframeImage = nGrowthWireframe
          baseProject.details.afterImage = nGrowthFinal
        }
        break
      case 5: // WORTHIT
        baseProject.image = worthitImage
        if (baseProject.details) {
          baseProject.details.wireframeImage = worthitWireframe
          baseProject.details.afterImage = worthitFinal
          baseProject.details.competitiveAnalysisImage = worthitCompetitiveAnalysis
        }
        break
    }

    return baseProject as Project
  })
}

// Note: Projects are now loaded dynamically from translations
// Use getProjectsFromTranslations() in components with useTranslation hook
// to get reactive updates when language changes