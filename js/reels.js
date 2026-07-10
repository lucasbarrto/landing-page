class Reels {

    constructor(data) {

        this.data = data;

        this.list = document.getElementById("reelsList");

        this.commentsPanel = document.getElementById("reelsComments");
        this.commentsList = document.getElementById("reelsCommentsList");
        this.closeCommentsButton = document.getElementById("closeReelsComments");

        this.render();
        this.bindItems();
        this.bindObserver();
        this.bindComments();

    }

    render() {

        this.list.innerHTML = "";

        this.data.forEach((reel) => {

            const item = document.createElement("div");
            item.className = "reel-item";

            item.innerHTML = `
                <video
                    class="reel-video"
                    src="${reel.video}"
                    poster="${reel.poster}"
                    loop
                    muted
                    playsinline
                    preload="metadata"
                ></video>

                <div class="reel-gradient"></div>

                <button class="reel-mute" type="button">🔇</button>

                <div class="reel-side-actions">

                    <div class="reel-side-avatar">
                        <img src="${reel.avatar}" alt="${reel.name}">
                    </div>

                    <button class="reel-action reel-like" type="button">
                        <span class="reel-action-icon">🤍</span>
                        <span class="reel-action-count">${reel.likes}</span>
                    </button>

                    <button class="reel-action reel-comment" type="button">
                        <span class="reel-action-icon">💬</span>
                        <span class="reel-action-count">${reel.comments.length}</span>
                    </button>

                    <button class="reel-action reel-share" type="button">
                        <span class="reel-action-icon">📤</span>
                    </button>

                </div>

                <div class="reel-info">
                    <div class="reel-username">@${reel.name}</div>
                    <p class="reel-caption">${reel.caption}</p>
                </div>
            `;

            this.list.appendChild(item);

        });

    }

    bindItems() {

        const items = this.list.querySelectorAll(".reel-item");

        items.forEach((item, index) => {

            const reel = this.data[index];

            const video = item.querySelector(".reel-video");
            const muteButton = item.querySelector(".reel-mute");

            const likeButton = item.querySelector(".reel-like");
            const likeIcon = likeButton.querySelector(".reel-action-icon");
            const likeCount = likeButton.querySelector(".reel-action-count");

            const commentButton = item.querySelector(".reel-comment");

            let liked = false;

            const toggleMute = () => {

                video.muted = !video.muted;
                muteButton.textContent = video.muted ? "🔇" : "🔊";

            };

            video.addEventListener("click", toggleMute);
            muteButton.addEventListener("click", toggleMute);

            likeButton.addEventListener("click", () => {

                liked = !liked;

                likeIcon.textContent = liked ? "❤️" : "🤍";
                likeButton.classList.toggle("liked", liked);
                likeCount.textContent = reel.likes + (liked ? 1 : 0);

            });

            commentButton.addEventListener("click", () => {

                this.openComments(reel);

            });

        });

    }

    bindObserver() {

        const items = this.list.querySelectorAll(".reel-item");

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                const video = entry.target.querySelector(".reel-video");

                if (entry.isIntersecting) {

                    video.play().catch(() => {});

                } else {

                    video.pause();

                }

            });

        }, {
            root: this.list,
            threshold: 0.6
        });

        items.forEach((item) => observer.observe(item));

    }

    openComments(reel) {

        this.commentsList.innerHTML = "";

        reel.comments.forEach((comment) => {

            const item = document.createElement("div");
            item.className = "reel-comment-item";

            item.innerHTML = `
                <img src="${comment.avatar}" alt="${comment.name}">
                <div>
                    <span class="reel-comment-name">${comment.name}</span>
                    <p>${comment.text}</p>
                </div>
            `;

            this.commentsList.appendChild(item);

        });

        this.commentsPanel.classList.add("active");
        this.commentsPanel.setAttribute("aria-hidden", "false");

    }

    closeComments() {

        this.commentsPanel.classList.remove("active");
        this.commentsPanel.setAttribute("aria-hidden", "true");

    }

    bindComments() {

        this.closeCommentsButton.addEventListener("click", () => {

            this.closeComments();

        });

        this.commentsPanel
            .querySelector(".reels-comments-overlay")
            .addEventListener("click", () => {

                this.closeComments();

            });

    }

}

window.Reels = Reels;
