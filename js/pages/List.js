import { store } from "../main.js";
import { embed } from "../util.js";
import { score } from "../score.js";
import { fetchEditors, fetchList } from "../content.js";

import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

const roleIconMap = {
    owner: "crown",
    admin: "user-gear",
    helper: "user-shield",
    dev: "code",
    trial: "user-lock",
};

export default {
    components: { Spinner, LevelAuthors },
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-list">
            <div class="list-container">
                <br>
                <table class="list" v-if="list">
                    <tr v-for="([level, err], i) in list">
                        <td class="rank">
                            <p v-if="i + 1 <= 150" class="type-label-lg">#{{ i + 1 }}</p>
                            <p v-else class="type-label-lg">Legacy</p>
                        </td>
                        <td class="level" :class="{ 'active': selected == i, 'error': !level }">
                            <button @click="selected = i">
                                <span class="type-label-lg">{{ level?.name || \`Error (\${err}.json)\` }}</span>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="level-container">
                <br>
                <div class="level" v-if="level && level.id!=0">
                    <h1>{{ level.name }}</h1>
                    <LevelAuthors :author="level.author" :creators="level.creators" :verifier="level.verifier" :song-title="level.song-title" :song-link="level.song-link"></LevelAuthors>
                    <iframe class="video" id="videoframe" :src="video" frameborder="0"></iframe>
                    <ul class="stats">
                        <li>
                            <div class="type-title-sm" align="left">Points when completed</div>
                            <p>{{ score(selected + 1, 100, level.percentToQualify).toFixed(0) }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm" align="center">ID</div>
                            <p>{{ level.id }} </p>
                        </li>
                        <li>
                            <div class="type-title-sm" align="right">Fps</div>
                            <p>{{ level.refreshRates|| 'Any' }}</p>
                        </li>
                    </ul>
                    <ul class="stats">
                        <li>
                            <div class="type-title-sm">Song</div>
                            <p v-if="level['song-link']"><a :href="level['song-link']" target="_blank"><u>{{ level['song-title'] }}</u></a></p>
                            <p v-else>{{ level['song-title'] }}</p>


                        </li>
                    </ul>
                    <h2>Records</h2>
                    <p v-if="selected + 1 <= 75"><strong>{{ level.percentToQualify }}%</strong> or better to qualify</p>
                    <p v-else-if="selected +1 <= 150"><strong>100%</strong> or better to qualify</p>
                    <p v-else>This level does not accept new records.</p>
                    <table class="records">
                        <tr v-for="record in level.records" class="record">
                            <td class="percent">
                                <p>{{ record.percent }}%</p>
                            </td>
                            <td class="user">
                                
                                <a :href="record.link" target="_blank" class="type-label-lg">{{ record.user }}</a>
                            </td>
                            <td class="mobile">
                                <img v-if="record.mobile" :src="\`/assets/phone-landscape\${store-dark ? '' : '-dark'}.svg\`" alt="Mobile">
                            </td>
                            <td class="hz">
                                <p>{{ record.hz }}Hz</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-else-if="level.id=0" class="level" style="height: 100%; justify-content: center; align-items: center;">
                    <h1>{{ level.name }}</h1>
                    <p>The levels below are {{ level.name.replace("(", "").replace(")", "") }}.</p>
                </div>
                <div v-else class="level" style="height: 100%; justify-content: center; align-items: center;">
                    <p>(ノಠ益ಠ)ノ彡┻━┻</p>
                </div>
            </div>
            <div class="meta-container">
                <div class="meta">
                    <div class="errors" v-show="errors.length > 0">
                        <p class="error" v-for="error of errors">{{ error }}</p>
                    </div>
                    <div class="og">
                        <br> <br>
                        <p class="type-label-md">Website layout made by <a href="https://tsl.pages.dev/" target="_blank"><u>TheShittyList</u></a>. Some code from <a href="https://laylist.pages.dev/" target="_blank"><u>The Layout List</u></a>.</p>
                    </div>
                    <div class="og">
                        <p class="type-label-md">Find a bug in the website? <a href="https://github.com/editorial50/WalmartList/issues/3" target="_blank"><u>Report it</u></a> here!<br> 
                        This is <b> ONLY </b> for issues with the website itself, to report problems with the list or levels, join the Discord server.<br></p>
                    </div>
                    <template v-if="editors">
                        <h3>List Editors</h3>
                        <ol class="editors">
                            <li v-for="editor in editors">
                                <img :src="\`/assets/\${roleIconMap[editor.role]}\${store-dark ? '' : '-dark'}.svg\`" :alt="editor.role">
                                <a v-if="editor.link" class="type-label-lg link" target="_blank" :href="editor.link">{{ editor.name }}</a>
                                <p v-else>{{ editor.name }}</p>
                            </li>
                        </ol>
                    </template>
                    <h3>Submission Requirements</h3>
                    <p>
                        Achieved the record without using hacks.
                    </p>
                    <p>
                    Click Between Frames (cbf) is allowed, Physics Bypass is not
                    </p>
                    <p>
                        Achieved the record on the level that is listed on the site - please check the level ID before you submit a record.
                    </p>
                    <p>
                        Have clicks/taps in the video. Edited audio only does not count.
                    </p>
                    <p>
                        The recording must have a previous attempt and entire death animation shown before the completion, unless the completion is on the first attempt. Everyplay records are exempt from this.
                    </p>
                    <p>
                        Keep your raw footage for completions as you might be asked to show it (Especially for big completions), Failure to provide raw footage when asked will result in the denial of your record.
                    </p>
                    <p>
                        The recording must also show the full endscreen for at least 1 frame, or the record will be invalidated.
                    </p>
                    <p>
                        Do not use secret routes or bug routes.
                    </p>
                    <p>
                        You must have have Cheat Indicator (excluding iOS) and Show FPS turned on, or the record will be invalidated. <a href="https://geode-sdk.org/" target="_blank"><u>Geode</u></a> has many free mod menus that have cheat indicators for all platforms (except iOS). If you don't know which to choose, <a href="https://geode-sdk.org/mods/firee.PrismMenu/" target="_blank"><u>Prism</u></a> has everything you need.
                    </p>
                                    </div>
            </div>
        </main>
    `,
    data: () => ({
        list: [],
        editors: [],
        loading: true,
        selected: 0,
        errors: [],
        roleIconMap,
        store
    }),
    
    computed: {
        level() {
            return this.list[this.selected][0];
        },
        video() {
            if (!this.level.showcase) {
                return embed(this.level.verification);
            }

            return embed(
                this.toggledShowcase
                    ? this.level.showcase
                    : this.level.verification
            );
        },
    },
    async mounted() {
        // Hide loading spinner
        this.list = await fetchList();
        this.editors = await fetchEditors();

        // Error handling
        if (!this.list) {
            this.errors = [
                "Failed to load list. Retry in a few minutes or notify list staff.",
            ];
        } else {
            this.errors.push(
                ...this.list
                    .filter(([_, err]) => err)
                    .map(([_, err]) => {
                        return `Failed to load level. (${err}.json)`;
                    })
            );
            if (!this.editors) {
                this.errors.push("Failed to load list editors.");
            }
        }

        this.loading = false;
    },
    methods: {
        embed,
        score,
    },
};
