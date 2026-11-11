/** sessionStorage key: set once the homepage welcome intro has played in this tab. */
export const INTRO_STORAGE_KEY = "rj_intro_seen";

/**
 * Runs before paint (loaded from the root layout via next/script "beforeInteractive").
 * On the homepage it hides the intro for returning visitors, otherwise locks scrolling
 * until the intro finishes. Other pages are untouched.
 */
export const INTRO_BOOT_SCRIPT = `try{if(location.pathname==='/'){var h=document.documentElement;if(sessionStorage.getItem('${INTRO_STORAGE_KEY}')){h.classList.add('intro-seen')}else{h.classList.add('intro-playing')}}}catch(e){document.documentElement.classList.add('intro-seen')}`;
