import { ScrollTrigger } from "gsap/ScrollTrigger";

export function refreshScroll() {
    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });
}
