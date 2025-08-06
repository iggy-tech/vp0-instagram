// Static video mapping for local assets
const videoAssets = {
  'bamboo.mp4': require('@/assets/videos/bamboo.mp4'),
  'basketball.mp4': require('@/assets/videos/basketball.mp4'),
  'golf.mp4': require('@/assets/videos/golf.mp4'),
  'parrot.mp4': require('@/assets/videos/parrot.mp4'),
  'soccer.mp4': require('@/assets/videos/soccer.mp4'),
  'tiger.mp4': require('@/assets/videos/tiger.mp4'),
  'turtle.mp4': require('@/assets/videos/turtle.mp4'),
};

// Helper function to get video source
export const getVideoSource = (url) => {
  if (url.includes('bamboo.mp4')) return videoAssets['bamboo.mp4'];
  if (url.includes('basketball.mp4')) return videoAssets['basketball.mp4'];
  if (url.includes('golf.mp4')) return videoAssets['golf.mp4'];
  if (url.includes('parrot.mp4')) return videoAssets['parrot.mp4'];
  if (url.includes('soccer.mp4')) return videoAssets['soccer.mp4'];
  if (url.includes('tiger.mp4')) return videoAssets['tiger.mp4'];
  if (url.includes('turtle.mp4')) return videoAssets['turtle.mp4'];
  return { uri: url };
};