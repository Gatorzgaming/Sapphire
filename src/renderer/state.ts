import { useLocalStorage } from "@vueuse/core";
import { computed, reactive } from "vue";

export interface IContextMenuOption {
	title: string;
	icon?: any;
	shortcuts?: string[];
	red?: boolean;
	action: () => any;
}

export class Store {
	public state = reactive({
		isMinimized: false,
		isFocused: true,
		isCheckingForUpdates: false,
		isMaximized: false,
		isShowingBigCover: false,
		updateReady: false,
		theme: "amethyst-dark",
	});

	public defaultSettings = {
		showQueue: true,
		showCoverArt: true,
		showSpectrum: true,
		showBigSpectrum: false,
		showVectorscope: true,
		showDbMeter: true,
		showAmbientBackground: false,
		ambientBackgroundOpacity: 32,
		ambientBackgroundSpin: true,
		ambientBackgroundBlurStrength: 32,
		ambientBackgroundSpinSpeed: 64,
		ambientBackgroundZoom: 125,
		ambientBackgroundBlendMode: "color-dodge",
		spectrumFftSize: 8192,
		spectrumSmoothing: 0.7,
		vectorscopeLineThickness: 1,
		showPlaybackControls: true,
		followQueue: false,
		showInspector: true,
		isSnappingToGrid: false,
		lissajousVectorscope: true,
		showLoudnessMeter: true,
		useLogarithmicSpectrum: true,
		useVsync: true,
		autoUpdatesEnabled: true,
		showBigVectorscope: false,
		useDiscordRichPresence: true,
		showDebugStats: false,
		smoothScrollSpeed: 0.075,
		playOnStartup: false,
		decibelMeterMinimumDb: -60,
		decibelMeterSeperatePrePost: false,
		decibelMeterFftSize: 1024,
		vectorscopeFftSize: 512,
		zoomLevel: 1.25,
	};

	public settings = useLocalStorage("settings", this.defaultSettings, { writeDefaults: true, mergeDefaults: true });

	public applyCurrentTheme = () => {
		if (typeof document !== "undefined") {
			const dom = document.querySelector("html");
			dom!.className = `theme-${this.state.theme}`;
		}
	};

	constructor() {
		this.applyCurrentTheme();
		Object.keys(this.defaultSettings).forEach(key => {
			// @ts-ignore
			if (this.settings[key] === undefined || this.settings[key] === null)
				// @ts-ignore
				this.settings[key] = this.defaultSettings[key];
		});

	}
}