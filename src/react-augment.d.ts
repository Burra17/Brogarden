// React 18 känner inte till fetchPriority och varnar i konsolen om den används.
// Attributet skrivs därför med gemener, som i HTML, och typas upp här tills vi
// uppgraderar till React 19 som har stöd för fetchPriority.
import 'react';

declare module 'react' {
  // T måste finnas med för att matcha Reacts egen deklaration, annars slås de inte ihop
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ImgHTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}
