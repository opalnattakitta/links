// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown

let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

console.log("is this working");

// Okay, Are.na stuff!
let channelSlug = 'asian-american-diaspora' // The “slug” is just the end of the URL



// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.getElementById('channel-title')
	let channelDescription = document.getElementById('channel-description')
	let channelCount = document.getElementById('channel-count')
	let channelLink = document.getElementById('channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	channelCount.innerHTML = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.getElementById('channel-blocks')

	// Links! // 428 640
	if (block.class == 'Link') {

		console.log ("link",block)
		let linkItem =
			`
			<li class="link-block">
				<h3>${ block.title }</h3>
					${ block.description_html }
				<picture> 
					<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
					<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
					<img src="${ block.image.original.url }">
				</picture>
					<dialog>
						<button class="close">x</button>
							<div>
								<p>${block.title}</p>
								<img src=${block.image.original.url}">
								<p><a href="${ block.source.url }">See the original ↗</a></p>
							</div>
					</dialog>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
	}

	// Images!
	else if (block.class == 'Image') {
		console.log ("image",block)
		let ImageItem =
		`
			<li class="image-block">
				<button>
					<figure>
						<h3 class="block-title">${block.title}</h3>
						<img class="image" src="${block.image.original.url}">
					</figure>
				</button>
				<dialog>
						<button class="close">x</button>
						<p>${block.title}</p>
						<img src=${block.image.original.url}">
						<p>${block.description_html}</p>
				</dialog>
			</li>
		`
	channelBlocks.insertAdjacentHTML('beforeend', ImageItem)
	}

	// Text!
	else if (block.class == 'Text') {
		console.log ("text",block)
		// …up to you!
		let textItem =
		`
			<li class="text-block">
				<h3 class="block-title">${block.generated_title}</h3>
				<p>${block.content_html}</p>
			</li>
			`
	channelBlocks.insertAdjacentHTML('beforeend', textItem)
	}

	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		console.log ("attachment",block)
		let attachment = block.attachment.content_type // Save us some repetition

		// Uploaded videos!
		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`
				<li class="video-block">
				<h3 class="block-title">${block.generated_title}</h3>
				<img src="${ block.image.thumb.url }"></img>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
			// More on video, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs!
		else if (attachment.includes('pdf')) {
			// …up to you!
		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			console.log ("audio",block)
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li class="audio-block">
				<button>
					<figure>
						<h3 class="block-title">${ block.generated_title }</h3>
						<img src="${ block.image.thumb.url }"><img>
					</figure>
				</button>

					<dialog>
						<div>
							<h3 class="block-title">${ block.generated_title }</h3>
							<audio controls src="${block.attachment.url}"></audio>
						</div>
					<button class="Close">×</button>
				</dialog>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked media…
	else if (block.class == 'Media') {
		console.log ("media",block)
		let embed = block.embed.type

		// Linked video!
		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
				<li class="video-block">
					<img src="${ block.image.thumb.url }"><img>
					${ block.embed.html }
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// Linked audio!
		else if (embed.includes('rich')) {
			// …up to you!
		}
	}
}



// It‘s always good to credit your work:
let renderUser = (user, container) => { // You can have multiple arguments for a function!
	let userAddress =
		`
		<div>
			<p><a href="https://are.na/${ user.slug }">${ user.first_name }</a></p>
		</div>
		`

		console.log("user", user)

	container.insertAdjacentHTML('beforeend', userAddress)
}

let initInteraction = () => {
	let imageBlocks = document.querySelectorAll('.image-block')
	imageBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		let closeButton = dialog.querySelector('button')

		openButton.onclick = () => {
			dialog.showModal()
		}

		closeButton.onclick =() => {
			dialog.close()
		}

		dialog.onclick = (event) => { // Listen on our `modal` also…
			if (event.target == dialog) { // Only if clicks are to itself (the background).
				dialog.close() // Close it then too.
			}
		}
	})

	let  linkBlocks = document.querySelectorAll('.link-block')
	linkBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		let closeButton = dialog.querySelector('button')

		openButton.onclick = () => {
			dialog.showModal()
		}

		closeButton.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => {
			if (event.target == dialog) {
				dialog.close()
			}
		}
	})

	let  audioBlocks = document.querySelectorAll('.audio-block')
	audioBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		let closeButton = dialog.querySelector('button')


		openButton.onclick = () => {
			dialog.showModal();

		}

		closeButton.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => {
			if (event.target == dialog) {
				dialog.close()
			}
		}
	})
}



// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log("your json", data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})

		initInteraction()

		// Also display the owner and collaborators:
		let channelUsers = document.getElementById('channel-users') // Show them together
		data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		renderUser(data.user, channelUsers)
	})
	