// Javascript to know about my buttons and ElementInternals
let channelBlocks = document.querySelector('#channel-blocks')
let showVideoButton = document.querySelector('#show-video-button')
let showImageButton = document.querySelector('#show-image-button')
let showTextButton = document.querySelector('#show-text-button')
let showLinkButton = document.querySelector('#show-link-button')
let showAudioButton = document.querySelector('#show-audio-button')
let showAllButton = document.querySelector('#show-all-button')


// Add onclick for my buttons
showVideoButton.onclick = () => {
	// When I click show videos, it should add show-video clas
	channelBlocks.classList.add('show-video')
}

showImageButton.onclick = () => {
	channelBlocks.classList.add('show-image')
}

showTextButton.onclick = () => {
	channelBlocks.classList.add('show-text')
}

showLinkButton.onclick = () => {
	channelBlocks.classList.add('show-link')
}

showAudioButton.onclick = () => {
	channelBlocks.classList.add('show-audio')
}


showAllButton.onclick = () => {
	// When I click show all, it should remove show-video class
	channelBlocks.classList.remove('show-video', 'show-image', 'show-text', 'show-link', 'show-audio')
}

