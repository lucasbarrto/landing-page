class LiveChat {

    constructor(data) {

        this.older = data.older;
        this.recent = data.recent;
        this.incoming = [...data.incoming];

        this.button = document.getElementById("liveChatButton");
        this.badge = document.getElementById("liveChatBadge");
        this.toast = document.getElementById("liveChatToast");
        this.panel = document.getElementById("liveChatPanel");
        this.list = document.getElementById("liveChatList");
        this.closeButton = document.getElementById("closeLiveChat");
        this.form = document.getElementById("liveChatForm");
        this.input = document.getElementById("liveChatInput");

        this.isOpen = false;
        this.unread = 0;
        this.olderLoaded = false;

        this.renderInitial();
        this.bindOpenClose();
        this.bindLoadMore();
        this.bindForm();
        this.scheduleFirstBadge();
        this.scheduleIncoming();

    }

    createMessageEl(msg, isYou = false) {

        const item = document.createElement("div");
        item.className = "live-chat-item" + (isYou ? " live-chat-item-you" : "");

        if (isYou) {

            item.innerHTML = `
                <div class="live-chat-avatar-you">Você</div>
                <div class="live-chat-bubble">
                    <span class="live-chat-name">Você</span>
                    <p>${msg.text}</p>
                </div>
            `;

        } else {

            const tagLabel = msg.status === "comprou" ? "✅ comprou" : "🤔 decidindo";

            item.innerHTML = `
                <img src="${msg.avatar}" alt="${msg.name}">
                <div class="live-chat-bubble">
                    <span class="live-chat-name">
                        ${msg.name}
                        <span class="live-chat-tag live-chat-tag-${msg.status}">${tagLabel}</span>
                    </span>
                    <p>${msg.text}</p>
                    <span class="live-chat-time">${msg.time}</span>
                </div>
            `;

        }

        return item;

    }

    renderInitial() {

        this.list.innerHTML = "";

        const loadMoreWrap = document.createElement("div");
        loadMoreWrap.className = "live-chat-load-more-wrap";
        loadMoreWrap.id = "liveChatLoadMoreWrap";
        loadMoreWrap.innerHTML = `
            <button type="button" class="live-chat-load-more" id="liveChatLoadMore">
                Carregar mensagens anteriores
            </button>
        `;

        this.list.appendChild(loadMoreWrap);

        this.recent.forEach((msg) => {

            this.list.appendChild(this.createMessageEl(msg));

        });

    }

    bindLoadMore() {

        document
            .getElementById("liveChatLoadMore")
            .addEventListener("click", () => this.loadOlder());

    }

    loadOlder() {

        if (this.olderLoaded) return;

        this.olderLoaded = true;

        const wrap = document.getElementById("liveChatLoadMoreWrap");
        const previousHeight = this.list.scrollHeight;

        const frag = document.createDocumentFragment();

        this.older.forEach((msg) => {

            frag.appendChild(this.createMessageEl(msg));

        });

        wrap.remove();

        this.list.prepend(frag);

        this.list.scrollTop = this.list.scrollHeight - previousHeight;

    }

    scrollToBottom() {

        requestAnimationFrame(() => {

            this.list.scrollTop = this.list.scrollHeight;

        });

    }

    bindOpenClose() {

        this.button.addEventListener("click", () => this.open());

        this.closeButton.addEventListener("click", () => this.close());

        this.panel
            .querySelector(".live-chat-overlay")
            .addEventListener("click", () => this.close());

    }

    open() {

        this.panel.classList.add("active");
        this.panel.setAttribute("aria-hidden", "false");

        this.isOpen = true;

        this.clearUnread();
        this.hideToast();
        this.scrollToBottom();

    }

    close() {

        this.panel.classList.remove("active");
        this.panel.setAttribute("aria-hidden", "true");

        this.isOpen = false;

    }

    bindForm() {

        this.form.addEventListener("submit", (event) => {

            event.preventDefault();

            const text = this.input.value.trim();

            if (!text) return;

            const item = this.createMessageEl({ text }, true);

            this.list.appendChild(item);
            this.input.value = "";

            this.scrollToBottom();

        });

    }

    incrementUnread(showToast) {

        this.unread++;

        this.badge.textContent = this.unread;
        this.badge.classList.add("active");
        this.button.classList.add("live-chat-pulse");

        if (showToast) {

            const label = this.unread === 1 ? "nova mensagem" : "novas mensagens";

            this.toast.textContent = `💬 ${this.unread} ${label}`;
            this.toast.classList.add("active");

            clearTimeout(this.toastTimer);

            this.toastTimer = setTimeout(() => this.hideToast(), 6000);

        }

    }

    clearUnread() {

        this.unread = 0;

        this.badge.classList.remove("active");
        this.button.classList.remove("live-chat-pulse");

    }

    hideToast() {

        this.toast.classList.remove("active");

    }

    scheduleFirstBadge() {

        setTimeout(() => {

            if (!this.isOpen) {

                this.incrementUnread(true);

            }

        }, 9000);

    }

    scheduleIncoming() {

        if (this.incoming.length === 0) return;

        const delay = 18000 + Math.random() * 22000;

        setTimeout(() => {

            const msg = this.incoming.shift();

            if (msg) {

                const item = this.createMessageEl(msg);
                this.list.appendChild(item);

                if (this.isOpen) {

                    this.scrollToBottom();

                } else {

                    this.incrementUnread(true);

                }

            }

            this.scheduleIncoming();

        }, delay);

    }

}

window.LiveChat = LiveChat;
