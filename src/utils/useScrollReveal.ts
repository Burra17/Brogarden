import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook som animerar element när de scrollas in i vyn.
 * Använder IntersectionObserver för prestanda.
 * Respekterar prefers-reduced-motion automatiskt.
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

export function useScrollReveal<T extends HTMLElement>(
    options?: ScrollRevealOptions
) {
    const ref = useRef<T>(null);
    const hasRevealed = useRef(false);

    const mergedOptions = { ...defaultOptions, ...options };

    useEffect(() => {
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
    const elements = useRef<Set<Element>>(new Set());
    const observer = useRef<IntersectionObserver | null>(null);

    const mergedOptions = { ...defaultOptions, ...options };

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            elements.current.forEach((el) =>
                el.classList.add(mergedOptions.activeClass!)
            );
            return;
        }

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

        elements.current.forEach((el) => observer.current?.observe(el));

        return () => observer.current?.disconnect();
    }, []);

    const callbackRef = useCallback((node: HTMLElement | null) => {
        if (node) {
            elements.current.add(node);
            observer.current?.observe(node);
        }
    }, []);

    return callbackRef;
}
