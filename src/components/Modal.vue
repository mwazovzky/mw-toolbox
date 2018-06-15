<template>
    <transition name="fade">
        <div v-show="active" class="modal-background" ref="background">
            <div class="modal-content" :style="styleObject" ref="content">
                <div class="modal-content-header"
                    v-if="headerExists"
                    @mousedown="mouseDown"
                    @mouseup="mouseUp"
                    @mousemove="mouseMove"
                    @mouseleave="mouseLeave"
                    >
                    <span class="close" @click="cancel">&times;</span>
                    <slot name="header"></slot>
                </div>
                <div class="modal-content-body">
                    <slot></slot>
                </div>
                <div class="modal-content-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            active: {
                required: true
            },
            minWidth: {
                default: 200
            },
            maxWidth: {
                default: 800
            },
            textAlign: {
                default: 'left'
            },
            afterActivation: {
                default: null
            }
        },

        data() {
            return {
                windowHeight: 0,
                windowWidth: 0,
                modalHeight: 0,
                modalWidth: 0,
                MIN_MARGIN: 20,
                top: 0,
                left: 0,
                // dragging parameters
                drag: false,
                startX: 0,
                startY: 0
            }
        },

        computed: {
            headerExists() {
                return !! this.$slots['header'];
            },

            styleObject() {
                if (this.minWidth > this.maxWidth) console.error('MinWidth is greater then MaxWidth.');

                return {
                    top: this.pixels(this.top),
                    left: this.pixels(this.left),
                    minWidth: this.pixels(this.minWidth),
                    maxWidth: this.pixels(this.maxWidth),
                    textAlign: this.textAlign
                };
            },

            minTop() {
                return this.MIN_MARGIN;
            },

            minLeft() {
                return this.MIN_MARGIN;
            },

            maxTop() {
                return this.windowHeight - this.modalHeight - this.MIN_MARGIN;
            },

            maxLeft() {
                return this.windowWidth - this.modalWidth - this.MIN_MARGIN;
            }
        },

        watch: {
            active(value) {
                this.init(value);
            }
        },

        created() {
            const escapeHandler = (event) => {
                if (this.active && event.code == 'Escape') this.close()
            };

            document.addEventListener('keydown', escapeHandler);

            this.$once('hook:destroyed', () => {
                document.removeEventListener('keydown', escapeHandler);
            });
        },

        methods: {
            init(value) {
                const bg = this.$refs.background;

                if (!value) bg.removeEventListener('click', this.clickOutsideHandler);

                this.initModal();

                window.addEventListener('resize', () => this.initModal());

                bg.addEventListener('click', this.clickOutsideHandler);

                if (typeof this.afterActivation == 'function') this.afterActivation();
            },

            cancel() {
                this.close();
            },

            close() {
                this.$emit('close');
            },

            initModal() {
                this.$nextTick(function () {
                    this.windowHeight = window.innerHeight;
                    this.windowWidth = window.innerWidth;

                    this.modalHeight = this.$refs.content.offsetHeight;
                    this.modalWidth = this.$refs.content.offsetWidth;

                    let top  = (this.windowHeight - this.modalHeight) / 5 * 2;
                    let left = (this.windowWidth  - this.modalWidth) / 2;

                    this.positionModal(top, left);
                });
            },

            positionModal(top, left) {
                this.top  = Math.max(this.minTop,  Math.min(this.maxTop,  top));
                this.left = Math.max(this.minLeft, Math.min(this.maxLeft, left));
            },

            mouseDown(event) {
                this.drag = true;

                this.startY = event.screenY;
                this.startX = event.screenX;
            },

            mouseUp() {
                this.drag = false;
            },

            mouseMove(event) {
                if (!this.drag) return;

                // Calculate the shift
                let shiftY = event.screenY - this.startY;
                let shiftX = event.screenX - this.startX;

                // Reset starting point to current coordinates
                this.startY = event.screenY;
                this.startX = event.screenX;

                this.positionModal(this.top + shiftY, this.left + shiftX);
            },

            mouseLeave(event) {
                this.drag = false;
            },

            keyupEventHandler(event) {
                if (this.active && event.code == 'Escape') this.close();
            },

            clickOutsideHandler(event) {
                if (!this.$refs.content.contains(event.target)) this.close();
            },

            pixels(num) {
                return `${num.toFixed(0)}px`
            }
        }
    };
</script>

<style scoped>
/* Modal background */
.modal-background {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.5); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    border: 1px solid #888;
    border-radius: 3px;
    width: 40%; /* Could be more or less, depending on screen size */
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: #FFFFFF;
}

.modal-content > div {
    padding: 10px;
}

.modal-content-footer {
    padding-top: 0 !important;
}

/* Modal Header */
.modal-content-header {
    background-color: #ECEFF1;
    min-height: 40px;
    border-top-left-radius:  3px;
    border-top-right-radius: 3px;
}

/* The Close Button */
.close {
    float: right;
    margin-top:   0px;
    margin-right: 0px;

    color: #aaa;
    font-size: 42px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
