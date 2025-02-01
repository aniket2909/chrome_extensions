const minThumbnailsRequiredToShuffle = 4

function shuffleThumbnails() {
    /* Function to check for new thumbnails and shuffle there image URLs */
    const thumbnailSelector = [
        "#thumbnail > yt-image > img",
    ]

    const thumbnails = document.querySelectorAll(thumbnailSelector.join(","));
    /*Filter out the elements that
        a) have been processed, ie having id = "suffled"
        b) haven't yet loaded completely, src is missing or not populated
    */
    const processThumbnails = [...thumbnails].filter(img => (img.id !== "suffled" && img.src));
    const alreadyShuffledThumbnails = [...thumbnails].filter(img => (img.id == "suffled"))

    console.log("Total Thumbnails = " + thumbnails.length)
    console.log("Already shuffled Thumbnails = "+alreadyShuffledThumbnails.length)
    console.log("Thumbnails ready to process = " + processThumbnails.length)

    if(processThumbnails.length < minThumbnailsRequiredToShuffle) {
        console.log("Not enough thumbnails to shuffle yet, required:"+minThumbnailsRequiredToShuffle+
            " available:"+processThumbnails.length
        )
        return
    }

    const allURLs = Array.from([...processThumbnails], img => img.src)
    console.log("Unshuffled list of URLs of thumbnails to process: " + allURLs)

    function shuffle(array) {
        /* Function to shuffle arrays */
        for(let i = array.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [array[i],array[j]] = [array[j],array[i]];
        }
        return array;
    }

    const shuffledURLs = shuffle(allURLs)
    console.log("Shuffled list of URLs of thumbnails to process: " + shuffledURLs)

    processThumbnails.forEach((img,index) => {
        /* Set a random thumbnail url and mark the image as processed */
        img.src = shuffledURLs[index];
        img.id = "suffled";
    })
}

shuffleThumbnails();

// Trigger rerun of the shuffleThumbnails function
const observer = new MutationObserver(() => {
    shuffleThumbnails();
});

// Checks for changes in the document DOM
observer.observe(document.body, {childList:true, subtree:true});