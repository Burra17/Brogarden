/**
 * Sidan använde tidigare HashRouter med URL:er som /#/boende. Sådana länkar
 * finns kvar i sökmotorer, bokmärken och på andra sajter. Här skrivs de om till
 * motsvarande riktiga sökväg (/boende) innan appen renderas, utan att lägga
 * till ett extra steg i webbläsarhistoriken.
 */
export const redirectLegacyHashUrl = () => {
  const { hash } = window.location;
  if (hash.startsWith('#/')) {
    window.history.replaceState(null, '', hash.slice(1));
  }
};
