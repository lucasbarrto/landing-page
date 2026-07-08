class Stories {

    constructor(data) {

        this.data = data;

        this.viewer = document.getElementById("storiesViewer");
        this.media = document.getElementById("storiesMedia");
        this.progress = document.getElementById("storiesProgress");

        this.avatar = document.getElementById("storyAvatar");
        this.name = document.getElementById("storyName");

        this.closeButton = document.getElementById("closeStories");

        this.leftZone = document.getElementById("storyTouchLeft");
        this.rightZone = document.getElementById("storyTouchRight");

        this.profileIndex = 0;
        this.storyIndex = 0;

        this.progressAnimation = null;
        this.timeout = null;

        this.currentMedia = null;

        this.paused = false;
        this.remainingTime = 0;
        this.startTime = 0;
        this.duration = 0;

        this.touchStartY = 0;
        this.touchCurrentY = 0;
        this.dragging = false;

        this.preloaded = new Map();

        this.renderProfiles();

        this.bindEvents();

    }

    renderProfiles() {

        const list = document.getElementById("storiesList");

        list.innerHTML = "";

        this.data.forEach((profile, index) => {

            const item = document.createElement("div");
            item.className = "story-item";

            item.innerHTML = `
                <div class="story-avatar">
                    <img src="${profile.avatar}" alt="${profile.name}">
                </div>

                <div class="story-name">
                    ${profile.name}
                </div>
            `;

            item.addEventListener("click", () => {

                this.open(index);

            });

            list.appendChild(item);

        });

    }

    bindEvents() {

        this.closeButton.addEventListener("click", () => {

            this.close();

        });

        this.rightZone.addEventListener("click", () => {

            this.nextStory();

        });

        this.leftZone.addEventListener("click", () => {

            this.previousStory();

        });

        const pauseStart = () => {

            this.pause();

        };

        const pauseEnd = () => {

            this.resume();

        };

        ["mousedown", "touchstart"].forEach(event => {

            this.leftZone.addEventListener(event, pauseStart);

            this.rightZone.addEventListener(event, pauseStart);

        });

        ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach(event => {

            this.leftZone.addEventListener(event, pauseEnd);

            this.rightZone.addEventListener(event, pauseEnd);

        });

        this.viewer.addEventListener("touchstart", (e) => {

            this.touchStartY = e.touches[0].clientY;
            this.touchCurrentY = this.touchStartY;
            this.dragging = false;

        });

        this.viewer.addEventListener("touchmove", (e) => {

            this.touchCurrentY = e.touches[0].clientY;

            const distance = this.touchCurrentY - this.touchStartY;

            if (distance > 0) {

                this.dragging = true;

                this.viewer.querySelector(".stories-container").style.transform =
                    `translateY(${distance}px)`;

            }

        });

        this.viewer.addEventListener("touchend", () => {

            const distance = this.touchCurrentY - this.touchStartY;

            const container = this.viewer.querySelector(".stories-container");

            if (distance > 120) {

                this.close();

                container.style.transform = "";

                return;

            }

            container.style.transition = "transform .2s ease";
            container.style.transform = "";

            setTimeout(() => {

                container.style.transition = "";

            }, 200);

        });

    }

    open(profileIndex) {

        this.profileIndex = profileIndex;
        this.storyIndex = 0;

        this.viewer.classList.add("active");

        document.body.style.overflow = "hidden";

        this.loadStory();

    }

        close() {

        this.stopProgress();

        if (this.currentMedia && this.currentMedia.tagName === "VIDEO") {
            this.currentMedia.pause();
        }

        this.viewer.classList.remove("active");

        document.body.style.overflow = "";

        this.media.innerHTML = "";
        this.progress.innerHTML = "";

    }

    loadStory() {

        this.stopProgress();

        this.media.innerHTML = "";

        const profile = this.data[this.profileIndex];
        const story = profile.items[this.storyIndex];

        this.avatar.src = profile.avatar;
        this.name.textContent = profile.name;

        this.buildProgress();

        let element;

        if (story.type === "image") {

            element = document.createElement("img");
            element.draggable = false;
            element.src = story.src;

            element.onload = () => {

                this.currentMedia = element;

                this.duration = story.duration || 5000;

                this.startProgress(this.duration);

            };

        } else {

            element = document.createElement("video");

            element.src = story.src;
            element.autoplay = true;
            element.muted = true;
            element.playsInline = true;
            element.preload = "auto";

            element.onloadedmetadata = () => {

                this.currentMedia = element;

                this.duration = element.duration * 1000;

                this.startProgress(this.duration);

            };

            element.onended = () => {

                this.nextStory();

            };

        }

        this.media.appendChild(element);

        this.preloadNext();

    }

    buildProgress() {

        this.progress.innerHTML = "";

        const total =
            this.data[this.profileIndex].items.length;

        for (let i = 0; i < total; i++) {

            const bar = document.createElement("div");
            bar.className = "story-progress-item";

            const fill = document.createElement("div");
            fill.className = "story-progress-fill";

            if (i < this.storyIndex) {

                fill.style.width = "100%";

            }

            bar.appendChild(fill);

            this.progress.appendChild(bar);

        }

    }

    startProgress(duration) {

        this.stopProgress();

        const fill =
            this.progress.children[this.storyIndex]
                .querySelector(".story-progress-fill");

        this.duration = duration;
        this.remainingTime = duration;
        this.startTime = performance.now();

        fill.animate(
            [
                { width: "0%" },
                { width: "100%" }
            ],
            {
                duration: duration,
                easing: "linear",
                fill: "forwards"
            }
        );

        this.progressAnimation =
            fill.getAnimations()[0];

        this.timeout = setTimeout(() => {

            this.nextStory();

        }, duration);

    }

    stopProgress() {

        clearTimeout(this.timeout);

        if (this.progressAnimation) {

            this.progressAnimation.cancel();
            this.progressAnimation = null;

        }

    }

        pause() {

        if (this.paused) return;

        this.paused = true;

        clearTimeout(this.timeout);

        if (this.progressAnimation) {
            this.progressAnimation.pause();
        }

        if (
            this.currentMedia &&
            this.currentMedia.tagName === "VIDEO"
        ) {
            this.currentMedia.pause();
        }

        const elapsed =
            performance.now() - this.startTime;

        this.remainingTime =
            Math.max(0, this.duration - elapsed);

    }

    resume() {

        if (!this.paused) return;

        this.paused = false;

        this.startTime = performance.now();

        if (this.progressAnimation) {
            this.progressAnimation.play();
        }

        if (
            this.currentMedia &&
            this.currentMedia.tagName === "VIDEO"
        ) {
            this.currentMedia.play();
        }

        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {

            this.nextStory();

        }, this.remainingTime);

    }

    nextStory() {

        const profile = this.data[this.profileIndex];

        if (
            this.storyIndex <
            profile.items.length - 1
        ) {

            this.storyIndex++;
            this.loadStory();
            return;

        }

        if (
            this.profileIndex <
            this.data.length - 1
        ) {

            this.profileIndex++;
            this.storyIndex = 0;

            this.loadStory();
            return;

        }

        this.close();

    }

    previousStory() {

        if (this.storyIndex > 0) {

            this.storyIndex--;
            this.loadStory();
            return;

        }

        if (this.profileIndex > 0) {

            this.profileIndex--;

            this.storyIndex =
                this.data[this.profileIndex].items.length - 1;

            this.loadStory();

        }

    }

    preloadNext() {

        const profile =
            this.data[this.profileIndex];

        const nextStory =
            profile.items[this.storyIndex + 1];

        if (nextStory) {

            this.preloadMedia(nextStory);

        }

        const nextProfile =
            this.data[this.profileIndex + 1];

        if (
            nextProfile &&
            nextProfile.items.length
        ) {

            this.preloadMedia(
                nextProfile.items[0]
            );

        }

    }

    preloadMedia(item) {

        if (
            this.preloaded.has(item.src)
        ) {
            return;
        }

        if (item.type === "image") {

            const img = new Image();

            img.src = item.src;

            this.preloaded.set(
                item.src,
                img
            );

        } else {

            const video =
                document.createElement("video");

            video.preload = "auto";
            video.src = item.src;

            this.preloaded.set(
                item.src,
                video
            );

        }

    }}

window.Stories = Stories;