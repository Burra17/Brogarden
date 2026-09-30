import InstagramIcon from '../components/icons/InstagramIcon';
import { Highlight } from '../types';
import { contactInfo } from './contactInfo';

// "Kommande höjdpunkter" på programsidan. Är listan tom tar kalendern hela bredden.
export const highlights: Highlight[] = [
  {
    title: 'Glimtar från årets läger!',
    text: 'Se bilder här:',
    link: { label: 'Instagram', url: contactInfo.instagramUrl, icon: InstagramIcon },
  },
  {
    title: 'Tack till alla gäster som besökt oss i sommar!',
    text: 'Logigäster, lägerdeltagare, gudstjänst- och musikkvällsdeltagare, eller besökare vid andra evenemang. Det är ni som bidrar till att Brogården kan fortsätta fungera som en värdefull kristen mötesplats för alla generationer. Hoppas vi ses nästa sommar igen!',
  },
];
