import { useLayoutEffect, useRef, useCallback } from 'react';

/**
 * Hook som animerar element när de scrollas in i vyn.
 * Använder IntersectionObserver för prestanda.
 * Respekterar prefers-reduced-motion automatiskt.
 * Element som redan är synliga vid sidladdning visas direkt utan animation.
 */

interface ScrollRevealOptions {
    /** Tröskel för när elementet anses synligt (0-1) */
    threshold?: number;
    /** CSS-klass som läggs till när elementet är synligt */
    activeClass?: string;
    /** Marginal runt viewport för tidig trigger */
    rootMargin?: string;
    /** Animera bara en gång (standard: true) */
    once?: boolean;
}

const defaultOptions: ScrollRevealOptions = {
    threshold: 0.1,
    activeClass: 'revealed',
    rootMargin: '0px 0px -40px 0px',
    once: true,
};

/** Visa element direkt utan transition (för element redan i viewport) */
function revealInstantly(el: HTMLElement, activeClass: string) {
    // Stäng av transitions på elementet OCH alla barn (för stagger-containers)
    el.style.transition = 'none';
    const children = el.children;
    for (let i = 0; i < children.length; i++) {
        (children[i] as HTMLElement).style.transition = 'none';
    }

    el.classList.add(activeClass);

    // Tvinga reflow så browsern applicerar ändringen utan transition
    el.offsetHeight;

    // Återställ transitions
    el.style.transition = '';
    for (let i = 0; i < children.length; i++) {
        (children[i] as HTMLElement).style.transition = '';
    }
}

/** Kolla om element är synligt i viewport */
function isInViewport(el: HTMLElement, threshold: number) {
    const rect = el.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    return visibleHeight > rect.height * threshold;
}

export function useScrollReveal<T extends HTMLElement>(
    options?: ScrollRevealOptions
) {
    const ref = useRef<T>(null);
    const hasRevealed = useRef(false);

    const mergedOptions = { ...defaultOptions, ...options };

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Respektera användarens rörelsepreferenser
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            element.classList.add(mergedOptions.activeClass!);
            return;
        }

        // Element redan synligt vid mount → visa direkt utan animation
        if (isInViewport(element, mergedOptions.threshold!)) {
            revealInstantly(element, mergedOptions.activeClass!);
            hasRevealed.current = true;
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add(mergedOptions.activeClass!);
                    hasRevealed.current = true;

                    if (mergedOptions.once) {
                        observer.unobserve(element);
                    }
                } else if (!mergedOptions.once && hasRevealed.current) {
                    element.classList.remove(mergedOptions.activeClass!);
                }
            },
            {
                threshold: mergedOptions.threshold,
                rootMargin: mergedOptions.rootMargin,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return ref;
}

/**
 * Hook för att animera flera barn-element med staggerade delays.
 * Lägger till 'revealed' på containern när den scrollas in i vyn.
 */
export function useScrollRevealGroup<T extends HTMLElement>(
    options?: ScrollRevealOptions
) {
    return useScrollReveal<T>(options);
}

/**
 * Callback-ref variant för användning i listor/maps.
 * Returnerar en callback som kan kopplas till varje elements ref.
 */
export function useScrollRevealList(options?: ScrollRevealOptions) {
    const elements = useRef<Set<HTMLElement>>(new Set());
    const observer = useRef<IntersectionObserver | null>(null);
    const prefersReducedMotion = useRef(false);

    const mergedOptions = { ...defaultOptions, ...options };

    useLayoutEffect(() => {
        prefersReducedMotion.current = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion.current) {
            elements.current.forEach((el) =>
                el.classList.add(mergedOptions.activeClass!)
            );
            return;
        }

        // Visa element som redan är i viewport direkt
        elements.current.forEach((el) => {
            if (isInViewport(el, mergedOptions.threshold!)) {
                revealInstantly(el, mergedOptions.activeClass!);
            }
        });

        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(mergedOptions.activeClass!);
                        if (mergedOptions.once) {
                            observer.current?.unobserve(entry.target);
                        }
                    }
                });
            },
            {
                threshold: mergedOptions.threshold,
                rootMargin: mergedOptions.rootMargin,
            }
        );

        // Observera bara element som inte redan visats
        elements.current.forEach((el) => {
            if (!el.classList.contains(mergedOptions.activeClass!)) {
                observer.current?.observe(el);
            }
        });

        return () => observer.current?.disconnect();
    }, []);

    const callbackRef = useCallback((node: HTMLElement | null) => {
        if (node) {
            elements.current.add(node);

            // Om observer redan är igång och elementet inte redan visats
            if (observer.current && !prefersReducedMotion.current) {
                if (isInViewport(node, mergedOptions.threshold!)) {
                    revealInstantly(node, mergedOptions.activeClass!);
                } else {
                    observer.current.observe(node);
                }
            }
        }
    }, []);

    return callbackRef;
}
