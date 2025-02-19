// Javascript to know about my buttons and ElementInternals
let channelBlocks = document.querySelector('#channel-blocks')
let showVideoButton = document.querySelector('#show-video-button')
let showImageButton = document.querySelector('#show-image-button')
let showAllButton = document.querySelector('#show-all-button')


// Add onclick for my buttons
showVideoButton.onclick = () => {
	// When I click show videos, it should add show-video clas
	channelBlocks.classList.add('show-video')
}

showImageButton.onclick = () => {
	// When I click show videos, it should add show-video clas
	channelBlocks.classList.add('show-image')
}

showAllButton.onclick = () => {
	// When I click show all, it should remove show-video class
	channelBlocks.classList.remove('show-video', 'show-image')
}

