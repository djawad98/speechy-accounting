 <template>
    <div
        class="
            w-[360px]
            h-[640px]
            relative
            bg-gray-300
            max-h-screen
            mx-auto
            flex flex-col
        "
    >
        <div class="photo h-[15vh] cursor-pointer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto mt-[34px] h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        </div>
        <div class="fields h-[85vh] bg-red-300 rounded-t-xl overflow-hidden">
            <div class="scrollable h-full overflow-y-auto">
                <!-- component -->
                <div class="bg-gray-100 flex items-center">
                    <div
                        class="
                            container
                            mx-auto
                            max-w-md
                            shadow-md
                            hover:shadow-lg
                            transition
                            duration-300
                        "
                    >
                        <div class="py-12 px-8 bg-white rounded-xl">
                            <div class="mb-6">
                                <label
                                    class="
                                        ml-4
                                        text-gray-700
                                        font-bold
                                        inline-block
                                        mb-2
                                    "
                                    for="name"
                                    >نام</label
                                >
                                <input
                                    type="text"
                                    ref="name"
                                    class="
                                        border
                                        bg-gray-100
                                        py-2
                                        px-4
                                        w-full
                                        max-w-full
                                        outline-none
                                        focus:ring-2 focus:ring-indigo-400
                                        rounded
                                    "
                                    placeholder="نام شما"
                                />
                            </div>
                            <div class="">
                                <label
                                    class="
                                        ml-4
                                        text-gray-700
                                        font-bold
                                        inline-block
                                        mb-2
                                    "
                                    for="description"
                                    >توضیحات</label
                                >
                                <input
                                    ref="desc"
                                    type="text"
                                    class="
                                        border
                                        bg-gray-100
                                        py-2
                                        px-4
                                        w-full
                                        max-w-full
                                        outline-none
                                        focus:ring-2 focus:ring-indigo-400
                                        rounded
                                    "
                                    placeholder="توضیحات"
                                />
                            </div>
                            <button
                                class="
                                    text-sm text-gray-700
                                    inline-block
                                    mt-4
                                    hover:text-indigo-600
                                    hover:underline
                                    hover:cursor-pointer
                                    transition
                                    duration-200
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4 inline-block"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                        clip-rule="evenodd"
                                    /></svg
                                >&nbsp;افزودن
                            </button>
                            <button
                                ref="submit-btn"
                                class="
                                    w-full
                                    mt-6
                                    text-indigo-50
                                    font-bold
                                    bg-indigo-600
                                    py-3
                                    rounded-md
                                    hover:bg-indigo-500
                                    transition
                                    duration-300
                                "
                            >
                                ثبت
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <span
            id="vioce-output"
            :class="recogStates[recogStatus]"
            class="
                absolute
                inset-x-[20px]
                rounded-lg
                shadow-md
                empty:opacity-0
                bottom-8
                bg-green-400
                text-white
                px-5
                py-3
                transition
            "
            >{{ snackText }}</span
        >
        <button
            id="vioce-btn"
            @click="startRecog"
            :class="recogStates[recogStatus]"
            class="
                absolute
                rounded-full
                shadow-md
                empty:hidden
                left-5
                bottom-20
                bg-white
                text-gray-400
                px-4
                py-4
                transition
            "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
            </svg>
        </button>
        <div
            class="absolute inset-0 bg-blue-900/50 hidden"
            :class="{ '!block': isFinished }"
        >
            <div
                class="
                    bg-white
                    rounded-lg
                    absolute
                    inset-x-[20%]
                    right-[20%]
                    top-[50%]
                    p-8
                    px-5
                    text-center
                    transform
                    translate-y-[-50%]
                "
            >
                سند با موفقیت ثبت شد.
            </div>
        </div>
    </div>
    <audio preload="auto" src="/click.wav" ref="clickAudio"></audio>
</template>

<script>
import Recognition from './assets/SpeechRecognition.js';

export default {

    async mounted() {
        this.recog = new Recognition();

        this.recog.onStart(() => {
            this.snackText = "به گوش هستم...";
            this.recogStatus = 2;
            this.$refs.clickAudio.play();
            // TODO: when using a beep app gets a little laggy (in desktop)
            this.isStarted = true;
        });

        this.recog.onResult(results => {
            console.log("onresult");
            this.results = results;
            this.snackText = results[0][0].transcript;
        });

        this.recog.onEnd(() => {

            this.snackText = "درحال پردازش...";
            this.recogStatus = 5;

            this.processSpeech();
        });

        this.recog.onNoMatch(() => {
            this.snackText = "متوجه نشدم..!"
            this.recogStatus = 4;
        });
    },

    data() {
        return {
            recog: null,
            results: null,
            recogStatus: 0,
            target: null,
            recogStates: ['STOPPED', 'STARTED', 'LISTENING', 'ENDED', 'NOMATCH', 'PROCESSING', 'CAPTURED'],
            snackText: null,
            isFinished: false,
            isStarted: false,
        };
    },

    methods: {
        startRecog() {

            if (this.isStarted && this.isFinished) {
                this.recog.abort();
                return;
            }

            this.recog.start();



        },






        processSpeech() {

            const res = this.results[0][0].transcript;
            console.log("precess", res);
            if (res.includes("شروع")) {
                this.target = this.$refs['name'];
                // TODO: Prevent default keyboard-appearance on mobile
                // TODO:
                this.target.focus();
            } else if (res.includes("بعدی")) {
                this.target = this.$refs['desc']
                this.target.focus();
            } else if (res.includes("تمام")) {
                this.target = this.$refs['submit-btn']
                this.target.focus();
                this.isFinished = true;
            } else {
                if (this.target)
                    this.target.value = res;
            }


            // TODO Not working properely
            setTimeout(() => {
                if (!this.isFinished)
                    this.startRecog();
            }, 1000)

        }


    }
}
</script>

<style lang="css">
#vioce-btn.STARTED,
#vioce-btn.LISTENING {
    @apply !bg-blue-500 !text-white;
}

#vioce-btn.STARTED:before,
#vioce-btn.LISTENING:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 0;
    @apply inset-0 rounded-full bg-white animate-ping;
}

#vioce-btn.ENDED {
    /* @apply !bg-blue-500 !text-white; */
}

.NOMATCH {
    @apply !bg-red-500 !text-white;
}

#vioce-output.PROCESSING {
    @apply !bg-blue-600;
}

#vioce-output.CAPTURED {
    @apply !bg-blue-500;
}
</style>
