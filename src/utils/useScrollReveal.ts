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

const defaultOptions: Required<ScrollRevealOptions> = {
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

    const { threshold, activeClass, rootMargin, once } = { ...defaultOptions, ...options };

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Respektera användarens rörelsepreferenser
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            element.classList.add(activeClass);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add(activeClass);
                    hasRevealed.current = true;

                    if (once) {
                        observer.unobserve(element);
                    }
                } else if (!once && hasRevealed.current) {
                    element.classList.remove(activeClass);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, activeClass, rootMargin, once]);

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

    const { threshold, activeClass, rootMargin, once } = { ...defaultOptions, ...options };

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            elements.current.forEach((el) =>
                el.classList.add(activeClass)
            );
            return;
        }

        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(activeClass);
                        if (once) {
                            observer.current?.unobserve(entry.target);
                        }
                    }
                });
            },
            {
                threshold,
                rootMargin,
            }
        );

        elements.current.forEach((el) => observer.current?.observe(el));

        return () => observer.current?.disconnect();
    }, [threshold, activeClass, rootMargin, once]);

    const callbackRef = useCallback((node: HTMLElement | null) => {
        if (node) {
            elements.current.add(node);
            observer.current?.observe(node);
        }
    }, []);

    return callbackRef;
}
