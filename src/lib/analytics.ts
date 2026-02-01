import { track } from "@vercel/analytics";
import siteConfig from "@/data/site-config.json";

const analytics = siteConfig.analytics;

// Track specific events
export const trackEvent = {
  buttonClick: (label: string, location?: string) => {
    if (!analytics.enabled || !analytics.trackEvents.buttonClicks) return;
    track("button_click", { label, location });
  },

  formSubmit: (formName: string) => {
    if (!analytics.enabled || !analytics.trackEvents.formSubmissions) return;
    track("form_submit", { form_name: formName });
  },

  quizComplete: (resultId: string) => {
    if (!analytics.enabled || !analytics.trackEvents.quizCompletions) return;
    track("quiz_complete", { result_id: resultId });
  },

  addToCart: (itemId: string, itemName: string, itemType: "service" | "package") => {
    if (!analytics.enabled || !analytics.trackEvents.cartActions) return;
    track("add_to_cart", { item_id: itemId, item_name: itemName, item_type: itemType });
  },

  removeFromCart: (itemId: string, itemName: string) => {
    if (!analytics.enabled || !analytics.trackEvents.cartActions) return;
    track("remove_from_cart", { item_id: itemId, item_name: itemName });
  },

  contactClick: (method: "email" | "phone" | "whatsapp" | "form") => {
    if (!analytics.enabled || !analytics.trackEvents.contactActions) return;
    track("contact_click", { method });
  },

  viewItem: (itemId: string, itemName: string, itemType: "service" | "package" | "event") => {
    if (!analytics.enabled) return;
    track("view_item", { item_id: itemId, item_name: itemName, item_type: itemType });
  },
};
