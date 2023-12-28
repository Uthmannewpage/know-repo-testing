import { getMetadata } from '../../scripts/aem.js';

// eslint-disable-next-line max-len
function updateContentBlock(mediaType, mediaSrc, textContent, textPosition, mediaContainer, textContainer) {
  // Clear existing content
  mediaContainer.innerHTML = '';
  textContainer.innerHTML = '';
    console.log(mediaType);
  // Set the media content
  if (mediaType === 'image') {
    const image = document.createElement('img');
    image.src = mediaSrc;
    mediaContainer.appendChild(image);
  } else if (mediaType === 'video') {
    const video = document.createElement('video');
    video.src = mediaSrc;
    video.controls = true;
    mediaContainer.appendChild(video);
  }

  // Set the text content
  textContainer.textContent = textContent;

  // Set the text position
  if (textPosition === 'left') {
    textContainer.style.order = -1;
  } else {
    textContainer.style.order = 1;
  }
}

export default function decorate(block) {
    const metadata = block.closest('.section').dataset;
  const {
    type, imagePath, text, position,
  } = metadata;

  console.log(metadata);
  const contentMedia = block.children[0].children[0];
  const contentText = block.children[0].children[1];
  console.log(block.dataset);
  updateContentBlock(
    type,
    imagePath,
    text,
    position,
    contentMedia,
    contentText,
  );
}
