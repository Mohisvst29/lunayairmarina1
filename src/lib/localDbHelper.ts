import fs from 'fs';
import path from 'path';
import { SERVICES, BLOGS, HOME_SECTIONS, PAGE_SECTIONS, IMAGE_MAP } from '@/data/localDatabase';

const STATE_FILE = path.join(process.cwd(), 'src/data/localState.json');

function getInitialState() {
  const images = Object.entries(IMAGE_MAP).map(([slug, url]) => ({
    _id: slug,
    filename: slug,
    url: url,
    metadata: { slug, section: 'general' }
  }));
  
  const defaultImages = [
    { _id: 'ocean-sunrise', filename: 'ocean-sunrise', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80', metadata: { slug: 'ocean-sunrise', section: 'experience-section' } },
    { _id: 'lm-logo', filename: 'lm-logo', url: '/LM Logo.svg', metadata: { slug: 'lm-logo', section: 'experience-section' } },
  ];
  defaultImages.forEach(dimg => {
    if (!images.some(img => img._id === dimg._id)) {
      images.push(dimg);
    }
  });

  return {
    services: SERVICES,
    blogs: BLOGS,
    homeSections: HOME_SECTIONS,
    pageSections: PAGE_SECTIONS,
    images: images,
    videos: [
      {
        _id: 'hero-lonier-video-static',
        filename: 'لونير.mp4',
        metadata: { slug: 'hero-lonier-video', section: 'hero-home', order: -1000 }
      }
    ]
  };
}

export function readState() {
  if (!fs.existsSync(STATE_FILE)) {
    const initial = getInitialState();
    fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
    fs.writeFileSync(STATE_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    const content = fs.readFileSync(STATE_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    return getInitialState();
  }
}

export function writeState(state: any) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
}
