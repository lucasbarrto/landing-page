const REEL_ICONS = {

    heart:
        `<svg viewBox="0 0 24 24" class="reel-icon-svg"><path d="M12 21s-6.8-4.35-9.5-8.28C.9 10.4 1.2 6.9 4 5.1c2.2-1.4 5-.7 6.4 1.4L12 8.4l1.6-1.9c1.4-2.1 4.2-2.8 6.4-1.4 2.8 1.8 3.1 5.3 1.5 7.6C18.8 16.65 12 21 12 21z"/></svg>`,

    comment:
        `<svg viewBox="0 0 24 24" class="reel-icon-svg"><path d="M12 2C6.48 2 2 6.03 2 11c0 2.42 1.09 4.63 2.88 6.28-.13 1.12-.5 3.15-1.24 4.24 0 0 2.61-.36 4.61-1.87A11.1 11.1 0 0 0 12 20c5.52 0 10-4.03 10-9S17.52 2 12 2z"/></svg>`,

    repost:
        `<svg viewBox="0 0 24 24" class="reel-icon-svg reel-icon-line"><path d="M7 7h9a3 3 0 0 1 3 3v2"/><polyline points="16 4 19 7 16 10"/><path d="M17 17H8a3 3 0 0 1-3-3v-2"/><polyline points="8 20 5 17 8 14"/></svg>`,

    share:
        `<svg viewBox="0 0 24 24" class="reel-icon-svg reel-icon-line"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,

    save:
        `<svg viewBox="0 0 24 24" class="reel-icon-svg"><path d="M19 21l-7-4.5L5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,

    volumeOn:
        `<svg viewBox="0 0 24 24" class="reel-mute-svg"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>`,

    volumeOff:
        `<svg viewBox="0 0 24 24" class="reel-mute-svg"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>`

};


class Reels {

    constructor(data) {

        this.data = data;

        this.list = document.getElementById("reelsList");

        this.commentsPanel = document.getElementById("reelsComments");
        this.commentsList = document.getElementById("reelsCommentsList");
        this.closeCommentsButton = document.getElementById("closeReelsComments");
        this.commentsForm = document.getElementById("reelsCommentsForm");
        this.commentsInput = document.getElementById("reelsCommentsInput");

        this.render();
        this.bindItems();
        this.bindObserver();
        this.bindComments();
        this.bindCommentForm();
        this.bindScrollAutoClose();

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

                <button class="reel-mute" type="button">
                    ${REEL_ICONS.volumeOff}
                </button>

                <div class="reel-side-actions">

                    <div class="reel-side-avatar">
                        <img src="${reel.avatar}" alt="${reel.name}">
                    </div>

                    <button class="reel-action reel-like" type="button">
                        <span class="reel-action-icon">${REEL_ICONS.heart}</span>
                        <span class="reel-action-count">${reel.likes}</span>
                    </button>

                    <button class="reel-action reel-comment" type="button">
                        <span class="reel-action-icon">${REEL_ICONS.comment}</span>
                        <span class="reel-action-count">${reel.comments.length}</span>
                    </button>

                    <button class="reel-action reel-repost" type="button">
                        <span class="reel-action-icon">${REEL_ICONS.repost}</span>
                        <span class="reel-action-count">${reel.reposts || 0}</span>
                    </button>

                    <button class="reel-action reel-share" type="button">
                        <span class="reel-action-icon">${REEL_ICONS.share}</span>
                    </button>

                    <button class="reel-action reel-save" type="button">
                        <span class="reel-action-icon">${REEL_ICONS.save}</span>
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
            const likeCount = likeButton.querySelector(".reel-action-count");

            const commentButton = item.querySelector(".reel-comment");

            const repostButton = item.querySelector(".reel-repost");
            const repostCount = repostButton.querySelector(".reel-action-count");

            const saveButton = item.querySelector(".reel-save");

            let liked = false;
            let reposted = false;
            let saved = false;

            const toggleMute = () => {

                video.muted = !video.muted;

                muteButton.innerHTML =
                    video.muted ? REEL_ICONS.volumeOff : REEL_ICONS.volumeOn;

            };

            video.addEventListener("click", toggleMute);
            muteButton.addEventListener("click", toggleMute);

            likeButton.addEventListener("click", () => {

                liked = !liked;

                likeButton.classList.toggle("liked", liked);
                likeCount.textContent = reel.likes + (liked ? 1 : 0);

            });

            commentButton.addEventListener("click", () => {

                this.openComments(reel);

            });

            repostButton.addEventListener("click", () => {

                reposted = !reposted;

                repostButton.classList.toggle("reposted", reposted);
                repostCount.textContent = (reel.reposts || 0) + (reposted ? 1 : 0);

            });

            saveButton.addEventListener("click", () => {

                saved = !saved;

                saveButton.classList.toggle("saved", saved);

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

    bindCommentForm() {

        this.commentsForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const text = this.commentsInput.value.trim();

            if (!text) return;

            const item = document.createElement("div");
            item.className = "reel-comment-item";

            const avatar = document.createElement("div");
            avatar.className = "reel-comment-avatar-you";
            avatar.textContent = "Você";

            const body = document.createElement("div");

            const name = document.createElement("span");
            name.className = "reel-comment-name";
            name.textContent = "você";

            const paragraph = document.createElement("p");
            paragraph.textContent = text;

            body.appendChild(name);
            body.appendChild(paragraph);

            item.appendChild(avatar);
            item.appendChild(body);

            this.commentsList.appendChild(item);
            this.commentsInput.value = "";

            item.scrollIntoView({ behavior: "smooth", block: "end" });

        });

    }

    bindScrollAutoClose() {

        const reelsSection = document.querySelector(".reels-section");

        if (!reelsSection) return;

        window.addEventListener("scroll", () => {

            if (!this.commentsPanel.classList.contains("active")) return;

            const rect = reelsSection.getBoundingClientRect();
            const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

            if (!isVisible) {

                this.closeComments();

            }

        }, { passive: true });

    }

}

window.Reels = Reels;
