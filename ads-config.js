/**
 * ==============================================================================
 * BrainForge - HilltopAds Monetization Configuration & Integration Script
 * ==============================================================================
 * 
 * This module manages all 6 HilltopAds ad zones for the BrainForge learning platform:
 *  - Zone 1: Popunder / OnClick
 *  - Zone 2: In-Page Push (IPP) MultiTag
 *  - Zone 3: MultiTag Banners (728x90 Header Leaderboard & 300x250 Quiz Sidebar)
 *  - Zone 4: Video Slider MultiTag
 *  - Zone 5: Direct Link / SmartLink (attached to 'View Quiz Certificate', 'Download Study Notes' CTAs)
 *  - Zone 6: Video VAST Ad Tag (integrated with Educational Video Player)
 * 
 * INSTRUCTIONS FOR PUBLISHERS:
 * 1. Register or log in at https://hilltopads.com
 * 2. Add your website domain to your publisher panel.
 * 3. Generate tags for each ad zone and copy the Zone IDs into this file.
 * 4. Switch `isDemoMode: false` to activate production ad rendering.
 * ==============================================================================
 */

const BRAINFORGE_ADS_CONFIG = {
  // Global switch:
  // - true: Displays interactive visual ad slots, simulated push/slider/VAST ads, and helpful guidance toasts.
  // - false: Dynamically injects actual HilltopAds scripts and VAST XML tags.
  isDemoMode: true,

  // ----------------------------------------------------------------------------
  // ZONE 1: Popunder / OnClick
  // Opens a high-eCPM advertising tab behind the user's browser upon first page interaction.
  // ----------------------------------------------------------------------------
  zone1_popunder: {
    enabled: true,
    zoneId: "YOUR_POPUNDER_ZONE_ID", // e.g. "987101"
    scriptUrl: "https://example-hilltopads-cdn.com/popunder.js",
    triggerOncePerSession: true,
    delaySeconds: 0
  },

  // ----------------------------------------------------------------------------
  // ZONE 2: In-Page Push (IPP) MultiTag
  // Native non-intrusive notification card that flies into the viewport.
  // ----------------------------------------------------------------------------
  zone2_inPagePush: {
    enabled: true,
    zoneId: "YOUR_IPP_ZONE_ID", // e.g. "987102"
    scriptUrl: "https://example-hilltopads-cdn.com/ipp-multitag.js",
    position: "bottom-right",
    delayMs: 3500, // Appears after 3.5 seconds
    demoTitle: "ðŸŽ“ Free Certificate Accreditation",
    demoMessage: "Complete today's Science & Coding challenge to claim your verified digital badge!",
    demoIcon: "ðŸ†",
    demoTime: "Just now"
  },

  // ----------------------------------------------------------------------------
  // ZONE 3: MultiTag Banners
  // Auto-optimizing banner placements that switch between top-paying display creatives.
  // ----------------------------------------------------------------------------
  zone3_banners: {
    header_728x90: {
      enabled: true,
      zoneId: "YOUR_HEADER_BANNER_ZONE_ID", // e.g. "987103"
      containerId: "ad-zone-header-728x90",
      scriptUrl: "https://example-hilltopads-cdn.com/banner-728x90.js",
      dimensions: { width: 728, height: 90 },
      label: "728x90 Leaderboard MultiTag"
    },
    sidebar_300x250: {
      enabled: true,
      zoneId: "YOUR_SIDEBAR_BANNER_ZONE_ID", // e.g. "987104"
      containerId: "ad-zone-sidebar-300x250",
      scriptUrl: "https://example-hilltopads-cdn.com/banner-300x250.js",
      dimensions: { width: 300, height: 250 },
      label: "300x250 Sidebar MultiTag"
    }
  },

  // ----------------------------------------------------------------------------
  // ZONE 4: Video Slider MultiTag
  // Smooth corner outstream video unit with auto-play and collapse controls.
  // ----------------------------------------------------------------------------
  zone4_videoSlider: {
    enabled: true,
    zoneId: "YOUR_VIDEO_SLIDER_ZONE_ID", // e.g. "987105"
    containerId: "ad-zone-video-slider",
    scriptUrl: "https://example-hilltopads-cdn.com/video-slider.js",
    position: "bottom-right",
    autoSlideDelayMs: 4500 // Slides in 4.5 seconds after page load
  },

  // ----------------------------------------------------------------------------
  // ZONE 5: Direct Link / SmartLink
  // High-converting monetized link attached to high-intent educational buttons
  // (e.g. 'View Quiz Certificate', 'Download Study Notes').
  // ----------------------------------------------------------------------------
  zone5_directLink: {
    enabled: true,
    smartLinkUrl: "https://hilltopads.com/smartlink?zone=YOUR_SMARTLINK_ZONE_ID", // Replace with your SmartLink
    selectors: [
      ".smartlink-cta",
      "[data-ad-action='direct-link']",
      ".btn-view-certificate",
      ".btn-download-notes",
      ".btn-claim-badge"
    ],
    openInNewTab: true
  },

  // ----------------------------------------------------------------------------
  // ZONE 6: Video VAST (Linear Video Ad)
  // Standard VAST 2.0 / 3.0 / 4.0 tag for pre-roll ads in educational video player.
  // ----------------------------------------------------------------------------
  zone6_videoVAST: {
    enabled: true,
    vastTagUrl: "https://faithfuloccasion.com/dumgF/z.d/GKNwvtZtG/UC/ge/mQ9KuHZBU-lwkjP/T_ce1QNsD/Qs5vMVD/UntRNDznUJ0xNnDtkPwBOgQe",
    videoPlayerId: "brainforge-edu-player",
    adOverlayId: "vast-ad-overlay",
    skipTimeSeconds: 5,
    adDurationSeconds: 15
  }
};

/**
 * HilltopAds Controller Class
 */
class BrainForgeAdsManager {
  constructor(config) {
    this.config = config;
    this.popunderFired = false;
  }

  init() {
    console.log("[BrainForge Ads] Initializing HilltopAds integration:", this.config);
    this.initZone1Popunder();
    this.initZone2InPagePush();
    this.initZone3Banners();
    this.initZone4VideoSlider();
    this.initZone5DirectLinks();
    this.initZone6VideoVAST();
    this.initModalTriggers();
  }

  /**
   * ============================================================================
   * ZONE 1: Popunder / OnClick Implementation
   * ============================================================================
   */
  initZone1Popunder() {
    const cfg = this.config.zone1_popunder;
    if (!cfg || !cfg.enabled) return;

    if (!this.config.isDemoMode && cfg.zoneId !== "YOUR_POPUNDER_ZONE_ID") {
      // PRODUCTION: Inject HilltopAds Popunder Script
      console.log("[HilltopAds] Injecting Popunder script for Zone:", cfg.zoneId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `${cfg.scriptUrl}?zone=${encodeURIComponent(cfg.zoneId)}`;
      script.async = true;
      document.head.appendChild(script);
    } else {
      // DEMO MODE: Listen to first general click
      const handlePopunderDemo = (e) => {
        if (e.target.closest("button, a, input, select, textarea, .config-modal, .interactive-card, .toast-close")) {
          return;
        }
        if (cfg.triggerOncePerSession && sessionStorage.getItem("bf_popunder_triggered")) {
          return;
        }

        sessionStorage.setItem("bf_popunder_triggered", "true");
        this.showToast(
          "Zone 1: Popunder / OnClick Triggered",
          `User interaction detected! In production, HilltopAds Popunder (Zone ID: ${cfg.zoneId}) silently opens the monetized destination in a separate background tab.`,
          "teal"
        );
        document.removeEventListener("click", handlePopunderDemo);
      };

      document.addEventListener("click", handlePopunderDemo);
    }
  }

  /**
   * ============================================================================
   * ZONE 2: In-Page Push (IPP) MultiTag Implementation
   * ============================================================================
   */
  initZone2InPagePush() {
    const cfg = this.config.zone2_inPagePush;
    if (!cfg || !cfg.enabled) return;

    if (!this.config.isDemoMode && cfg.zoneId !== "YOUR_IPP_ZONE_ID") {
      console.log("[HilltopAds] Injecting In-Page Push MultiTag script:", cfg.zoneId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `${cfg.scriptUrl}?zone=${encodeURIComponent(cfg.zoneId)}`;
      script.async = true;
      document.body.appendChild(script);
    } else {
      setTimeout(() => {
        const container = document.getElementById("ad-zone-inpage-push");
        if (!container) return;

        container.innerHTML = `
          <div class="ipp-card" id="ipp-card-element">
            <div class="ipp-top-bar">
              <span class="ipp-badge"><span class="pulse-dot"></span> Zone 2: In-Page Push MultiTag</span>
              <button class="ipp-close-btn" id="ipp-close-btn" title="Dismiss notification">&times;</button>
            </div>
            <div class="ipp-inner">
              <div class="ipp-icon-box">${cfg.demoIcon}</div>
              <div class="ipp-details">
                <h4 class="ipp-title">${cfg.demoTitle}</h4>
                <p class="ipp-text">${cfg.demoMessage}</p>
                <div class="ipp-action-row">
                  <span class="ipp-time">${cfg.demoTime}</span>
                  <a href="${this.config.zone5_directLink.smartLinkUrl}" target="_blank" rel="noopener" class="ipp-link-btn">Claim Badge &rarr;</a>
                </div>
              </div>
            </div>
            <div class="ipp-footer-note">
              <span>HilltopAds MultiTag &bull; Zone ID: <code>${cfg.zoneId}</code></span>
            </div>
          </div>
        `;

        container.classList.add("ipp-visible");

        const closeBtn = document.getElementById("ipp-close-btn");
        if (closeBtn) {
          closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            container.classList.remove("ipp-visible");
            setTimeout(() => { container.innerHTML = ""; }, 350);
          });
        }
      }, cfg.delayMs || 3500);
    }
  }

  /**
   * ============================================================================
   * ZONE 3: MultiTag Banners (728x90 Header & 300x250 Sidebar)
   * ============================================================================
   */
  initZone3Banners() {
    const banners = this.config.zone3_banners;
    if (!banners) return;

    // Header 728x90 Banner
    if (banners.header_728x90 && banners.header_728x90.enabled) {
      const cfg = banners.header_728x90;
      const container = document.getElementById(cfg.containerId);
      if (container) {
        if (!this.config.isDemoMode && cfg.zoneId !== "YOUR_HEADER_BANNER_ZONE_ID") {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = `${cfg.scriptUrl}?zone=${encodeURIComponent(cfg.zoneId)}`;
          script.async = true;
          container.innerHTML = "";
          container.appendChild(script);
        } else {
          this.renderBannerPlaceholder(
            container,
            "Zone 3: MultiTag Banner",
            "728x90",
            cfg.zoneId,
            "Header Leaderboard Placement &bull; High Viewability Ad Slot"
          );
        }
      }
    }

    // Sidebar 300x250 Banner
    if (banners.sidebar_300x250 && banners.sidebar_300x250.enabled) {
      const cfg = banners.sidebar_300x250;
      const container = document.getElementById(cfg.containerId);
      if (container) {
        if (!this.config.isDemoMode && cfg.zoneId !== "YOUR_SIDEBAR_BANNER_ZONE_ID") {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = `${cfg.scriptUrl}?zone=${encodeURIComponent(cfg.zoneId)}`;
          script.async = true;
          container.innerHTML = "";
          container.appendChild(script);
        } else {
          this.renderBannerPlaceholder(
            container,
            "Zone 3: MultiTag Banner",
            "300x250",
            cfg.zoneId,
            "Quiz Sidebar Placement &bull; High Engagement Ad Slot"
          );
        }
      }
    }
  }

  renderBannerPlaceholder(container, title, size, zoneId, desc) {
    container.innerHTML = `
      <div class="ad-placeholder-banner size-${size.replace("x", "-")}">
        <div class="ad-banner-header">
          <span class="ad-chip-sponsored">SPONSORED AD</span>
          <span class="ad-title-tag">${title} (${size})</span>
          <span class="ad-zone-badge">Zone ID: <code>${zoneId}</code></span>
        </div>
        <div class="ad-banner-content">
          <div class="ad-icon-animation">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <div class="ad-text-block">
            <strong>HilltopAds Intelligent MultiTag Banner</strong>
            <p>${desc}</p>
            <span class="ad-ready-text">Dynamic monetization ready &bull; Auto eCPM optimization</span>
          </div>
          <button class="ad-config-shortcut-btn" onclick="openAdsConfigModal()">Config ID</button>
        </div>
      </div>
    `;
  }

  /**
   * ============================================================================
   * ZONE 4: Video Slider MultiTag
   * ============================================================================
   */
  initZone4VideoSlider() {
    const cfg = this.config.zone4_videoSlider;
    if (!cfg || !cfg.enabled) return;

    const container = document.getElementById(cfg.containerId);
    if (!container) return;

    if (!this.config.isDemoMode && cfg.zoneId !== "YOUR_VIDEO_SLIDER_ZONE_ID") {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `${cfg.scriptUrl}?zone=${encodeURIComponent(cfg.zoneId)}`;
      script.async = true;
      container.appendChild(script);
    } else {
      setTimeout(() => {
        container.innerHTML = `
          <div class="video-slider-box" id="video-slider-box">
            <div class="slider-header-bar">
              <div class="slider-title-group">
                <span class="slider-ad-tag">VIDEO OUTSTREAM</span>
                <span class="slider-label">Zone 4: Video Slider MultiTag</span>
              </div>
              <div class="slider-btn-group">
                <button class="slider-ctrl-btn" id="slider-min-btn" title="Minimize">&minus;</button>
                <button class="slider-ctrl-btn" id="slider-close-btn" title="Close">&times;</button>
              </div>
            </div>
            <div class="slider-media-screen">
              <div class="slider-pulse-radar">
                <div class="radar-disc"></div>
                <div class="radar-ring"></div>
                <span class="radar-play-icon">â–¶</span>
              </div>
              <div class="slider-media-info">
                <span class="slider-category-pill">Featured Learning Series</span>
                <h5 class="slider-video-title">Neural Networks & Deep Learning Explained</h5>
                <p class="slider-subtext">HilltopAds high-impact outstream format</p>
              </div>
            </div>
            <div class="slider-bottom-bar">
              <span class="slider-id-tag">Zone ID: <code>${cfg.zoneId}</code></span>
              <a href="${this.config.zone5_directLink.smartLinkUrl}" target="_blank" rel="noopener" class="slider-cta-btn">Watch Full Course &rarr;</a>
            </div>
          </div>
        `;
        container.classList.add("slider-visible");

        const closeBtn = document.getElementById("slider-close-btn");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            container.classList.remove("slider-visible");
          });
        }

        const minBtn = document.getElementById("slider-min-btn");
        if (minBtn) {
          let isMin = false;
          minBtn.addEventListener("click", () => {
            isMin = !isMin;
            container.classList.toggle("slider-minimized", isMin);
            minBtn.innerHTML = isMin ? "&#43;" : "&minus;";
          });
        }
      }, cfg.autoSlideDelayMs || 4500);
    }
  }

  /**
   * ============================================================================
   * ZONE 5: Direct Link / SmartLink (CTAs)
   * ============================================================================
   */
  initZone5DirectLinks() {
    const cfg = this.config.zone5_directLink;
    if (!cfg || !cfg.enabled) return;

    const selectorQuery = cfg.selectors.join(", ");
    const buttons = document.querySelectorAll(selectorQuery);

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const actionName = btn.getAttribute("data-ad-action") || btn.textContent.trim();

        if (this.config.isDemoMode && cfg.smartLinkUrl.includes("YOUR_SMARTLINK_ZONE_ID")) {
          this.showToast(
            "Zone 5: SmartLink / Direct Link Activated",
            `Triggered by "${actionName}". In production, clicking this CTA routes the user to HilltopAds SmartLink (Zone ID placeholder), which targets the top-paying global offers automatically!`,
            "amber"
          );
        } else {
          if (cfg.openInNewTab) {
            window.open(cfg.smartLinkUrl, "_blank", "noopener,noreferrer");
          } else {
            window.location.href = cfg.smartLinkUrl;
          }
        }
      });
    });
  }

  /**
   * ============================================================================
   * ZONE 6: Video VAST (Educational Video Player Integration)
   * ============================================================================
   */
  initZone6VideoVAST() {
    const cfg = this.config.zone6_videoVAST;
    if (!cfg || !cfg.enabled) return;

    const player = document.getElementById(cfg.videoPlayerId);
    const overlay = document.getElementById(cfg.adOverlayId);
    const triggerBtn = document.getElementById("vast-play-trigger");

    if (!player || !overlay) return;

    let vastAdPlayed = false;

    const triggerVastAd = () => {
      if (vastAdPlayed) {
        player.play().catch(() => {});
        return;
      }

      overlay.classList.add("vast-active");
      let timeLeft = cfg.skipTimeSeconds;
      let totalRemaining = cfg.adDurationSeconds;

      const countdownText = overlay.querySelector(".vast-countdown-timer");
      const skipBtn = overlay.querySelector(".vast-skip-action-btn");
      const progressFill = overlay.querySelector(".vast-progress-bar-fill");

      if (countdownText) countdownText.textContent = `Ad: 0:${totalRemaining < 10 ? '0' + totalRemaining : totalRemaining}`;
      if (skipBtn) {
        skipBtn.disabled = true;
        skipBtn.innerHTML = `Skip in ${timeLeft}s`;
        skipBtn.classList.remove("can-skip");
      }

      const interval = setInterval(() => {
        timeLeft--;
        totalRemaining--;

        if (countdownText) {
          countdownText.textContent = `Ad: 0:${totalRemaining < 10 ? '0' + totalRemaining : totalRemaining}`;
        }

        if (progressFill) {
          const pct = ((cfg.adDurationSeconds - totalRemaining) / cfg.adDurationSeconds) * 100;
          progressFill.style.width = `${pct}%`;
        }

        if (timeLeft <= 0 && skipBtn) {
          skipBtn.disabled = false;
          skipBtn.innerHTML = `Skip Ad &#10148;`;
          skipBtn.classList.add("can-skip");
        }

        if (totalRemaining <= 0) {
          finishVast();
        }
      }, 1000);

      const finishVast = () => {
        clearInterval(interval);
        overlay.classList.remove("vast-active");
        vastAdPlayed = true;
        player.play().catch(() => {});
        this.showToast(
          "Zone 6: VAST Ad Completed",
          "VAST pre-roll video ad completed. Educational video playback started. In production, HilltopAds VAST Tag fills linear video creatives automatically.",
          "indigo"
        );
      };

      if (skipBtn) {
        skipBtn.onclick = (e) => {
          e.stopPropagation();
          if (timeLeft <= 0) {
            finishVast();
          }
        };
      }
    };

    if (triggerBtn) {
      triggerBtn.addEventListener("click", () => {
        triggerVastAd();
      });
    }

    player.addEventListener("play", (e) => {
      if (!vastAdPlayed) {
        e.preventDefault();
        player.pause();
        triggerVastAd();
      }
    });
  }

  /**
   * Quick Config Modal & Toast Alerts
   */
  initModalTriggers() {
    window.openAdsConfigModal = () => {
      const modal = document.getElementById("ads-config-modal");
      if (modal) modal.classList.add("modal-active");
    };

    window.closeAdsConfigModal = () => {
      const modal = document.getElementById("ads-config-modal");
      if (modal) modal.classList.remove("modal-active");
    };
  }

  showToast(title, message, colorScheme = "teal") {
    let container = document.getElementById("ad-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "ad-toast-container";
      container.className = "ad-toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `ad-toast scheme-${colorScheme}`;
    toast.innerHTML = `
      <div class="toast-top-row">
        <span class="toast-bullet"></span>
        <strong class="toast-headline">${title}</strong>
        <button class="toast-dismiss-btn" onclick="this.closest('.ad-toast').remove()">&times;</button>
      </div>
      <p class="toast-message-body">${message}</p>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("toast-leaving");
      setTimeout(() => toast.remove(), 400);
    }, 6500);
  }
}

// Auto-run on page load
document.addEventListener("DOMContentLoaded", () => {
  window.brainForgeAds = new BrainForgeAdsManager(BRAINFORGE_ADS_CONFIG);
  window.brainForgeAds.init();
});

