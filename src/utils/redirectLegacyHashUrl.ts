/**
 * Sidan använde tidigare HashRouter med URL:er som /#/boende. Sådana länkar
 * finns kvar i sökmotorer, bokmärken och på andra sajter. Här skrivs de om till
 * motsvarande riktiga sökväg (/boende) innan appen renderas, utan att lägga
 * till ett extra steg i webbläsarhistoriken. Returnerar true om adressen
 * skrevs om – då matchar den förrenderade HTML:en inte längre sökvägen.
 */
export const redirectLegacyHashUrl = () => {
  const { hash } = window.location;
  if (!hash.startsWith('#/')) return false;
  window.history.replaceState(null, '', hash.slice(1));
  return true;
};
