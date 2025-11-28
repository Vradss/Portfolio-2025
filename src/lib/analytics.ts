// Google Analytics Helper Functions
// Optimized for performance with type safety

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track custom events in Google Analytics
 * @param eventName - Name of the event (e.g., 'project_view', 'contact_click')
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track page views manually (useful for SPA navigation)
 * @param pagePath - Path of the page
 * @param pageTitle - Title of the page
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
};

/**
 * Track project views
 * @param projectId - ID of the project
 * @param projectTitle - Title of the project
 */
export const trackProjectView = (projectId: number, projectTitle: string) => {
  trackEvent('project_view', {
    project_id: projectId,
    project_title: projectTitle,
    event_category: 'engagement',
    event_label: projectTitle,
  });
};

/**
 * Track contact button clicks
 */
export const trackContactClick = (location: string) => {
  trackEvent('contact_click', {
    event_category: 'engagement',
    event_label: location,
    location: location,
  });
};

/**
 * Track social media clicks
 * @param platform - Name of the social platform (e.g., 'linkedin', 'github')
 */
export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    event_category: 'engagement',
    event_label: platform,
    platform: platform,
  });
};

/**
 * Track resume download
 */
export const trackResumeDownload = () => {
  trackEvent('resume_download', {
    event_category: 'engagement',
    event_label: 'Resume Download',
  });
};

/**
 * Track scroll depth (useful for engagement metrics)
 * @param depth - Percentage scrolled (e.g., 25, 50, 75, 100)
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${depth}%`,
    depth: depth,
  });
};
